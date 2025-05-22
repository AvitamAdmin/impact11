import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../../envfile/api';
import axios from 'axios';
import { use } from 'react';

const DetailScreen = () => {
  const [contestData, setContestData] = useState([]);
  const [contestNames, setContestNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contestId = useSelector(state => state.fantasy.contestId);
  const matchId = useSelector(state => state.fantasy.matchId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('jwtToken');

        if (!token) {
          console.error('Token not found');
          setError('Authentication token not found.');
          return;
        }

        await fetchContest(token, contestId);
      } catch (err) {
        console.error('Error fetching contest data:', err);
        setError('Error fetching contest data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contestId]);

  const fetchContest = async (token, contestId) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const body = {
        recordId: contestId,
        matchId: matchId,
        userId: userId
      };

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(`${api}/admin/contest/getedit`, body, { headers });

      // Handle both contestDtos and contests in response
      let flatContestList = [];
      if (response.data.contestDtos && response.data.contestDtos.length > 0) {
        flatContestList = response.data.contestDtos;
      } else if (response.data.contests) {
        flatContestList = Object.values(response.data.contests).flat();
      }

      // Ensure maxRankPrice exists for each contest
      const processedContestList = flatContestList.map(contest => ({
        ...contest,
        maxRankPrice: contest.maxRankPrice || [] // Ensure maxRankPrice is always an array
      }));

      setContestData(processedContestList);

      // Extract contest type IDs for filtering
      const contestTypeIds = processedContestList.map(item => item.contestTypeId);

      // Fetch contest type names
      const contestTypeResponse = await axios.get(
        `${api}/admin/contestType/get`,
        { headers },
      );

      // Filter and set only relevant contest types
      const filteredContestTypeNames = contestTypeResponse.data.contestTypeDtoList.filter(item =>
        contestTypeIds.includes(item.recordId),
      );

      setContestNames(filteredContestTypeNames);

    } catch (error) {
      console.error('Error fetching contest data:', error);
      setError('Error fetching contest data.');
    }
  };
  return (
    <View style={{}}>
      {contestNames.length > 0 ? (
        <View>
          {contestNames.map((item, index) => (
            <View key={item.recordId}>
              {/* <View style={{display: 'flex', width: '100%'}}>
                <Text style={{fontWeight: 'bold', color: '#000'}}>
                  {item.name}
                </Text>
              </View> */}
              {contestData
                .filter(contest => contest.contestTypeId == item.recordId)
                .map((data, index) => (
                  <View
                    key={data.recordId}
                    style={{
                      backgroundColor: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}>
                    <ScrollView>
                      <View
                        style={{
                          gap: 15,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: wp('100%'),
                            padding: 15,
                            backgroundColor: '#fff',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            // borderBottomWidth:1,
                            elevation: 5,
                          }}>
                          <View>
                            <Text
                              style={{
                                fontWeight: '500',
                                fontSize: hp(1.5),
                                color: '#000',
                              }}>
                              RANK
                            </Text>
                          </View>
                          <View>
                            <Text
                              style={{
                                fontWeight: '500',
                                fontSize: hp(1.5),
                                color: '#000',
                              }}>
                              WINNINGS
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            gap: 15,
                            paddingVertical: 15,
                            padding: 10,
                          }}>
                          {data.maxRankPrice.map((rankData, idx) => (
                            <View
                              key={idx}
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                paddingLeft: 40,
                                paddingRight: 70,
                                padding: 10,
                                borderRadius: 7,
                                borderWidth: 0.5,
                                borderColor: '#c0c0c0',
                              }}>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                {rankData.rank === 1 && (
                                  <Image
                                    source={require('../../../../assets/1stRank.png')}
                                    style={{ width: 30, height: 30 }}
                                  />
                                )}
                                {rankData.rank === 2 && (
                                  <Image
                                    source={require('../../../../assets/2ndRank.png')}
                                    style={{ width: 30, height: 30 }}
                                  />
                                )}
                                {rankData.rank === 3 && (
                                  <Image
                                    source={require('../../../../assets/3rdRank.png')}
                                    style={{ width: 30, height: 30 }}
                                  />
                                )}

                                {![1, 2, 3].includes(rankData.rank) && (
                                  <View>
                                    <Text
                                      style={{
                                        width: wp('10%'),
                                        display: 'flex',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: hp(1.5),
                                        fontWeight: '600',
                                        color: '#000',
                                      }}>
                                      #{rankData.rank}
                                    </Text>
                                  </View>
                                )}
                              </View>
                              <View>
                                <Text
                                  style={{
                                    fontSize:
                                      rankData.rank <= 3 ? hp(2) : hp(1.5),
                                    fontWeight:
                                      rankData.rank <= 3 ? 'bold' : '700',
                                    color: '#000',
                                  }}>
                                  ₹{rankData.amount}
                                </Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                ))}
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noData}>No contests found.</Text>
      )}
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});


