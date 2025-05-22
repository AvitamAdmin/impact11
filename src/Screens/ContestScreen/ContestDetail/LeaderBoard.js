import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {api} from '../../../envfile/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDetails, setuserDetails] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      fetchLeaderBoard(); // Refetch leaderboard every time screen is focused
    }, []),
  );

  const dispatch = useDispatch();

  const matchId = useSelector(state => state.fantasy.matchId);
  const contestId = useSelector(state => state.fantasy.contestId);

  useEffect(() => {
    fetchLeaderBoard();
  }, []);

  const fetchLeaderBoard = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const headers = {Authorization: `Bearer ${token}`};
      const body = {
        contestId: contestId,
        matchId: matchId,
        
      };
      // console.log('Request body:', body);

      const response = await axios.post(
        `${api}/admin/contestJoined/getContestLeaderBoard`,
        body,
        {headers},
      );
      // console.log(
      //   'Response from leaderboard:',
      //   response.data.contestJoinedDtoList,
      // );

      setLeaderboard(response.data.contestJoinedDtoList || []);
    } catch (error) {
      setError('Error fetching Leaderboard data: ' + error.message);
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {leaderboard.length > 0 && leaderboard[0]?.userTeamsCount ? (
        <>
          <View>
            <Text
              style={{
                fontSize: hp(2),
                padding: 10,
                color: '#000',
                fontWeight: '600',
              }}>
              Leaderboard
            </Text>
            <Text
              style={{
                fontSize: hp(1.5),
                padding: 10,
                color: '#000',
                fontWeight: '400',
              }}>
              {leaderboard[0].userTeamsCount} teams joined
            </Text>
          </View>

          <ScrollView style={{backgroundColor: '#fff'}}>
            {leaderboard.map((item, index) => (
              <View
                key={index}
                style={{
                  gap: 20,
                  padding: 10,
                  flexDirection: 'column',
                  backgroundColor: '#fff',
                  width: wp('100%'),
                }}>
                <View style={{gap: 5}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      width: wp('100%'),
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      borderBottomWidth: 2,
                      borderColor: '#d9d9d9',
                      paddingBottom: 10,
                    }}>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('UserProfileScreen', {
                          profileImage: userDetails.profileImage,
                        })
                      }>
                      <Image
                        source={
                          item.userDto?.profileImage
                            ? {
                                uri: `data:image/jpeg;base64,${item.userDto.profileImage}`,
                              }
                            : require('../../../../assets/ProfileImpact.jpg')
                        }
                        style={{
                          width: wp(10),
                          height: wp(10),
                          borderWidth: 2,
                          borderColor: '#FFFFFF',
                          borderRadius: 50,
                          overflow: 'hidden',
                        }}
                      />
                    </Pressable>
                    <View>
                      <Text
                        style={{
                          fontSize: hp(1.3),
                          fontWeight: 'bold',
                          color: '#000',
                        }}>
                        {item.userDto?.username || 'No user Found'}
                      </Text>
                    </View>
                    <View
                      style={{
                        padding: 2,
                        borderRadius: 5,
                        backgroundColor: '#ebebeb',
                      }}>
                      <Text style={{fontSize: hp(1.2), color: '#000'}}>
                        {item.userTeamsDto?.teamName || 'Unknown Team'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      ) : (
        <View
          style={{
            width: wp('100%'),
            height: hp('60%'),
            justifyContent: 'center',
            alignItems: 'center',
            gap: 15,
          }}>
          <Image
            source={require('../../../../assets/CreateTeam.png')}
            style={{height: hp('35%'), width: wp('75%')}}
          />
          <View style={{width: '60%'}}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '600',
                color: '#000',
              }}>
              You haven’t joined any Teams yet
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({});
