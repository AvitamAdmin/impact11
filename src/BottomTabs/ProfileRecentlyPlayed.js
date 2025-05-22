import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  BackHandler,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSport} from '../SportContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {api} from '../envfile/api';
import LinearGradient from 'react-native-linear-gradient';

export default function ProfileRecentlyPlayed() {
  const navigation = useNavigation();

  const [userPlayed, setuserPlayed] = useState([]);

  const {setTabName, TabName} = useSport();

  useEffect(() => {
    const backAction = () => {
      if (TabName === 'Profile') {
        navigation.goBack();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [TabName]);

  useFocusEffect(
    useCallback(() => {
      getReferalCodeData();
    }, []),
  );

  const getReferalCodeData = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId) {
        console.log('Token or UserId missing');
        return;
      }

      const body = {userId: userId};
      const headers = {Authorization: `Bearer ${token}`};

      const userPlayed = await axios.post(
        `${api}/admin/matches/getUserMatches`,
        body,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      if (userPlayed.data?.matchesDtoList && userPlayed.data?.userDto) {
        setuserPlayed(userPlayed.data?.matchesDtoList);
      }
    } catch (error) {
      console.log(
        'API Error:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <View
      style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <ScrollView
        style={{width: wp('95%'), paddingRight: 10, paddingTop: 10}}
        contentContainerStyle={{paddingHorizontal: 10}}>
        {userPlayed.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => navigation.navigate('CricketCompleted')}
            style={{
              width: wp('90%'),
              flexDirection: 'column',
              gap: 3,
              borderRadius: 6,
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#cccccc',
              marginBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: wp('90%'),
                padding: 7,
              }}>
              <Text style={{fontSize: hp(1.5), color: '#000'}}>
                {item.matchTime
                  ? new Date(item.matchTime).toLocaleDateString()
                  : 'Date not available'}
              </Text>
              <Text style={{fontSize: hp(1.5), color: '#000'}}>
                {item.sportType || 'Cricket'}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                gap: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: wp('30%'),
                  gap: 8,
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri:
                      item.team1Dto?.logoPath ||
                      'https://via.placeholder.com/50',
                  }}
                  style={{
                    height: hp(5),
                    width: wp(10),
                    borderRadius: 25,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#000',
                    fontSize: hp(1.8),
                  }}>
                  {item.team1Dto?.shortName || 'T1'}
                </Text>
              </View>

              <View
                style={{
                  width: wp('30%'),
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  padding: 12,
                }}>
                <Text style={{fontSize: hp(1.5), color: '#000'}}>
                  Highest Points
                </Text>
                <Text
                  style={{
                    fontWeight: '800',
                    fontSize: hp(1.6),
                    color: '#000',
                  }}>
                  {item.highestPoints
                    ? `${item.highestPoints}(${
                        item.highestScoringTeamName || 'T1'
                      })`
                    : 'N/A'}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: wp('30%'),
                  gap: 8,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#000',
                    fontSize: hp(1.8),
                  }}>
                  {item.team2Dto?.shortName || 'T2'}
                </Text>
                <Image
                  source={{
                    uri:
                      item.team2Dto?.logoPath ||
                      'https://via.placeholder.com/50',
                  }}
                  style={{
                    height: hp(5),
                    width: wp(10),
                    borderRadius: 25,
                  }}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 5,
                paddingVertical: 1,
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: hp(1.4),
                    color: '#000',
                  }}
                  numberOfLines={1}>
                  {item.team1Dto?.identifier || 'Team 1'}
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text
                  style={{
                    fontSize: hp(1.4),
                    color: '#000',
                  }}
                  numberOfLines={1}>
                  {item.team2Dto?.identifier || 'Team 2'}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: wp('90%'),
                borderBottomEndRadius: 4,
                borderBottomStartRadius: 4,
                borderColor: '#cccccc',
                borderTopWidth: 1,
                padding: 4,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: hp(1.3),
                  color: '#000',
                  paddingLeft: 4,
                }}>
                Teams Created{' '}
                <Text style={{fontWeight: 'bold'}}>{item.teamCount ?? 0}</Text>
              </Text>
              <LinearGradient
                colors={['#ffffff', '#d4f8d4']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={{borderRadius: 4}}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: hp(1.3),
                    color: '#35b267',
                    paddingRight: 5,
                  }}>
                  You won: ₹{item.amountWon ?? 0}
                </Text>
              </LinearGradient>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
