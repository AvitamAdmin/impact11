import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  BackHandler,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { api } from '../../../envfile/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ContestHeader from '../ContestHeader';
import ContestTabNavigator from './ContestTabNavigator';
import {
  setcontestId,
  setuserTeamId,
  triggerReloadApi,
} from '../../../Redux/Slice';
import LinearGradient from 'react-native-linear-gradient';
import JoinContestPopup from '../../../Models/JoinContestPopup';
import MaskedView from '@react-native-masked-view/masked-view';
import Tooltip from 'react-native-walkthrough-tooltip';

const ContestDetailScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedEntryFee, setSelectedEntryFee] = useState(null);
  const [contestData, setContestData] = useState([]);
  const [contestNames, setContestNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTeamId, setCurrentTeamId] = useState([]);

  const [teamCount, setTeamCount] = useState(null);

  const walletBalance = useSelector(state => state.fantasy.WalletBalance);

  const contestId = useSelector(state => state.fantasy.contestId);
  const matchId = useSelector(state => state.fantasy.matchId);
  const userTeamId = useSelector(state => state.fantasy.userTeamId);

  console.log("contestData", contestData);


  const [tooltipVisible, setTooltipVisible] = useState(null);

  const fetchContest = useCallback(async (token, contestId) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const body = {
        recordId: contestId,
        matchId: matchId,
        userId: userId,
      };

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(`${api}/admin/contest/getedit`, body, { headers });

      // Process the contests data
      let allContests = [];
      if (response.data.contestDtos && response.data.contestDtos.length > 0) {
        allContests = response.data.contestDtos.map(contest => ({
          ...contest,
          maxRankPrice: contest.maxRankPrice || [], // Ensure maxRankPrice is at least an empty array
          remainingSlots: contest.maxTeams - (contest.filledSlots || 0) // Calculate remaining slots if not provided
        }));
      } else if (response.data.contests) {
        const contests = response.data.contests || {};
        allContests = Object.values(contests).flat().map(contest => ({
          ...contest,
          maxRankPrice: contest.maxRankPrice || [],
          remainingSlots: contest.maxTeams - (contest.filledSlots || 0)
        }));
      }

      setContestData(allContests);

      // Rest of your code...
    } catch (error) {
      console.error('Error fetching contest data:', error);
      setError('Error fetching contest data.');
    }
  }, []);

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
        await ListingTeam(token);
      } catch (err) {
        console.error('Error fetching contest data:', err);
        setError('Error fetching contest data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contestId, fetchContest]);

  const ListingTeam = async () => {
    //console.log('hitting api');

    try {
      const token = await AsyncStorage.getItem('jwtToken');

      const userId = await AsyncStorage.getItem('userId');
      const body = {
        userId: userId,
        matchId: matchId,
      };

      // console.log('body from contest', body);

      const response = await axios.post(
        `${api}/admin/userTeams/getUserTeamsDetails`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const teams = response.data.userTeamsDtoList || [];
      setTeamCount(teams.length); // Store count in state
    } catch (error) {
      console.error('Error fetching listing teams:', error);
    }
  };

  const [joinedContests, setJoinedContests] = useState([]);
  const [contestEntriesCount, setContestEntriesCount] = useState({});

  const ListContest = async token => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const userId = await AsyncStorage.getItem('userId');
      const body = {
        userId: userId,
        matchId: matchId,
      };
      const response = await axios.post(
        `${api}/admin/contestJoined/getUserContests`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const Contest = response.data.contestJoinedDtoList || [];
      setContestCount(Contest.length);
      setJoinedContests(Contest);

      const entriesCount = {};
      Contest.forEach(contest => {
        entriesCount[contest.contestId] =
          (entriesCount[contest.contestId] || 0) + 1;
      });
      setContestEntriesCount(entriesCount);
    } catch (error) {
      console.error('Error fetching listing Contest:', error);
    } finally {
      setRefreshing(false);
    }
  };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    const token = AsyncStorage.getItem('jwtToken');
    dispatch(triggerReloadApi(''));
    //  getTokenAndFetchData(token);
    ListingTeam(token);
    ListContest(token);
  };

  useEffect(() => {
      const backAction = () => {
       
        navigation.navigate('ContestScreen'); 
        return true; 
      };
  
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
  
      return () => backHandler.remove(); // Cleanup on unmount
    }, [navigation]);
  return (
    <View style={{ flex: 1 }}>
      <ContestHeader />

      <View
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <View style={styles.container}>
            {/* Since contestData is now an array, we don't need Object.entries */}
            {contestData && contestData.map((data, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: '#fff',
                  padding: 7,
                  width: '100%',
                  marginBottom: 10, // Added some margin between contests
                }}>
                <View style={{ padding: 1, gap: 5 }}>
                  <View
                    style={{
                      width: '50%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                    }}>
                    {/* Left - First Prize */}
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          fontSize: hp(1.3),
                          fontWeight: '800',
                          color: '#000',
                        }}>
                        First Prize
                      </Text>

                      {/* Left - First Prize */}
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          width: '100%',
                        }}>
                        <MaskedView
                          maskElement={
                            <Text
                              style={{
                                fontFamily: 'Roboto-Bold',
                                fontStyle: 'italic',
                                fontWeight: '800',
                                fontSize: hp(2.7),
                                color: '#000',
                              }}>
                              {data.maxRankPrice && Array.isArray(data.maxRankPrice) && data.maxRankPrice.length > 0
                                ? `₹${data.maxRankPrice[0].amount}`
                                : '₹0'}
                            </Text>
                          }>
                          <LinearGradient
                            colors={['#3E57C4', '#1E2E74']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}>
                            <Text
                              style={{
                                fontFamily: 'Roboto-Bold',
                                fontStyle: 'italic',
                                fontSize: 25,
                                opacity: 0,
                              }}>
                              {data.maxRankPrice && Array.isArray(data.maxRankPrice) && data.maxRankPrice.length > 0
                                ? `₹${data.maxRankPrice[0].amount}`
                                : '₹0'}
                            </Text>
                          </LinearGradient>
                        </MaskedView>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: 5,
                      width: '100%',
                      alignItems: 'center',
                      padding: 5,
                    }}>
                    <View>
                      <Progress.Bar
                        progress={(data.maxTeams - data.remainingSlots) / data.maxTeams}
                        width={wp(92)}
                        height={3}
                        borderWidth={0.2}
                        backgroundColor="#ababab"
                      />
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}>
                      <View>
                        <Text style={{ color: '#D62424', fontSize: hp(1.5) }}>
                          {data.remainingSlots} Spots Left
                        </Text>
                      </View>
                      <View>
                        <Text style={{ fontSize: hp(1.5), color: '#000' }}>
                          {data.maxTeams} Spots
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Prize Pool Score in Percentage */}
                <View style={{ padding: 10 }}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      gap: 15,
                      alignItems: 'center',
                      justifyContent: 'space-around',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 3,
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: hp(1.2),
                          color: '#000',
                        }}>
                        Price Pool
                      </Text>
                      <Text
                        style={{
                          fontSize: hp(1.5),
                          fontWeight: '600',
                          color: '#000',
                        }}>
                        ₹{data.winningsAmount}
                      </Text>
                    </View>
                    {data.maxTeamsPerUser === 1 ? (
                      <Tooltip
                        isVisible={tooltipVisible === data.recordId}
                        content={
                          <Text style={{ color: '#3E57C4' }}>
                            Max 1 entry per user in this contest
                          </Text>
                        }
                        placement="bottom"
                        onClose={() => setTooltipVisible(null)}>
                        <Pressable
                          onPress={() => setTooltipVisible(data.recordId)}
                          style={{}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: 3,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <View
                              style={{
                                padding: 0,
                                borderRadius: 2,
                                borderWidth: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 14,
                              }}>
                              <Text
                                style={{
                                  fontSize: hp(1.1),
                                  fontWeight: '600',
                                  color: '#000',
                                }}>
                                S
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={{
                                  fontSize: hp(1.3),
                                  fontWeight: '600',
                                  color: '#000',
                                }}>
                                Single
                              </Text>
                            </View>
                          </View>
                        </Pressable>
                      </Tooltip>
                    ) : (
                      <Tooltip
                        isVisible={tooltipVisible === data.recordId}
                        content={
                          <Text style={{ color: '#3E57C4' }}>
                            Max {data.maxTeamsPerUser} entries per user
                          </Text>
                        }
                        placement="bottom"
                        onClose={() => setTooltipVisible(null)}>
                        <Pressable
                          onPress={() => setTooltipVisible(data.recordId)}
                          style={{}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: 3,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <View
                              style={{
                                padding: 0,
                                borderRadius: 2,
                                borderWidth: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 14,
                              }}>
                              <Text
                                style={{
                                  fontSize: hp(1.1),
                                  fontWeight: '600',
                                  color: '#000',
                                }}>
                                M
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={{
                                  fontSize: hp(1.3),
                                  fontWeight: '600',
                                  color: '#000',
                                }}>
                                Upto {data.maxTeamsPerUser}
                              </Text>
                            </View>
                          </View>
                        </Pressable>
                      </Tooltip>
                    )}
                    {/* Win % and Flexible */}
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '50%',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 3,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Ionicons
                          name="trophy-outline"
                          size={15}
                          color="#000"
                        />
                        <Text
                          style={{
                            fontSize: hp(1.5),
                            fontWeight: '600',
                            color: '#000',
                          }}>
                          {data.winPercentage}%
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 3,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={require('../../../../assets/Flexible.png')}
                          style={{ width: 16.5, height: 15 }}
                        />
                        <Text
                          style={{
                            fontSize: hp(1.3),
                            color: '#000',
                            fontWeight: '800',
                          }}>
                          Flexible
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Join Button */}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                  }}>
                  {data.contestJoinedCount < 1 ? (
                   <Pressable
                   onPress={async () => {
                          try {
                            const token = await AsyncStorage.getItem('jwtToken');
                            const userId = await AsyncStorage.getItem('userId');

                            const response = await axios.post(
                              `${api}/admin/userTeams/getUserTeamsDetails`,
                              { userId, matchId },
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              },
                            );

                            const teams = response.data.userTeamsDtoList || [];

                            if (teams.length === 0) {
                              navigation.navigate('CreateTeam');
                              return;
                            }

                            if (walletBalance < data.entryFee) {
                              navigation.navigate('ADD CASH', {
                                walletBalance,
                                entryFee: data.entryFee,
                              });
                              return;
                            }

                            if (data.maxTeamsPerUser === 1) {
                              const teamId = teams[0].recordId;
                              setSelectedEntryFee(data.entryFee);
                              dispatch(setcontestId(data.recordId));
                              dispatch(setuserTeamId([teamId]));
                              setCurrentTeamId([teamId]);
                              setIsPopupVisible(true);
                              return;
                            }

                            if (teams.length > 1 && data.maxTeamsPerUser > 1) {
                              dispatch(setcontestId(data.recordId));
                              setSelectedEntryFee(data.entryFee);
                              setSelectPopup(true);
                              return;
                            }

                            const teamId = teams[0].recordId;
                            dispatch(setcontestId(data.recordId));
                            dispatch(setuserTeamId([teamId]));
                            setCurrentTeamId([teamId]);
                            setIsPopupVisible(true);
                          } catch (error) {
                            console.error('Join contest error:', error);
                          }
                        }}
                        style={{
                        width: '100%',

                        }}
                   >
                     <LinearGradient
                      colors={['#3b53bd', '#243373', '#192451']}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      style={{
                        width: '100%',
                        padding: 10,
                        borderRadius: 5,
                        alignItems: 'center',
                      }}>
                      <Pressable
                        >
                        <Text style={{ fontWeight: 'bold', color: '#fff' }}>
                          ₹{data.entryFee}
                        </Text>
                      </Pressable>
                    </LinearGradient>
                   </Pressable>
                  ) : (
                    <View
                      style={{
                        width: '98%',
                        padding: 10,
                        borderRadius: 5,
                        alignItems: 'center',
                        backgroundColor: '#f0f0f0',
                        borderWidth: 1,
                        borderColor: '#ddd',
                      }}>
                      <Text style={{ fontWeight: 'bold', color: '#999' }}>
                        ₹{data.entryFee}
                      </Text>
                    </View>
                  )}
                </View>

              </View>
            ))}
          </View>
        </View>
      </View>
      <ContestTabNavigator />

      <JoinContestPopup
        visible={isPopupVisible}
        entryFee={selectedEntryFee}
        onClose={() => setIsPopupVisible(false)}
        userTeamId={currentTeamId.length > 0 ? currentTeamId : userTeamId}
        onDiscard={() => setIsPopupVisible(false)}
        onSuccess={onRefresh}
      />
    </View>
  );
};

export default ContestDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  contestCard: {
    backgroundColor: '#f2f',
    // padding: 10,
    width: '100%',
  },
  contestTitle: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  rankContainer: {
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 14,
  },
  rankRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 7,
  },
  highlight: {
    backgroundColor: '#f1f1f1',
  },
  rankImage: {
    width: 35,
    height: 35,
  },
  rankText: {
    fontSize: 16,
    fontWeight: '600',
  },
  amountText: rank => ({
    fontSize: rank === 1 ? 20 : 16,
    fontWeight: '500',
  }),
  noData: {
    textAlign: 'center',
    marginTop: 20,
  },
});
