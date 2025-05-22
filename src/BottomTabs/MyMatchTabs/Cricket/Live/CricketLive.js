import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  BackHandler,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Stats from './Stats';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MyContest from './MyContest';
import MyTeams from './MyTeam';
import Winning from './Winning';
import Leaderboard from './Leaderboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { api } from '../../../../envfile/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CricketLive = () => {
  const Tab = createMaterialTopTabNavigator();

  const [showWinningTabs, setShowWinningTabs] = useState(false);

  const ContestsTabs = React.useMemo(
    () => () =>
    (
      <Tab.Navigator
        initialRouteName="MyContest"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: hp(1.6),
            fontWeight: '700',
            textTransform: 'capitalize',
            color: '#000',
          },
        }}>
        <Tab.Screen name="MyContest" options={{ title: 'My Contest' }}>
          {() => <MyContest setShowWinningTabs={setShowWinningTabs} />}
        </Tab.Screen>
        <Tab.Screen
          name="MyTeams"
          component={MyTeams}
          options={{ title: 'My Teams' }}
        />
        {/*<Tab.Screen name="Scoreboard" component={Scoreboard} />*/}
        <Tab.Screen name="Stats" component={Stats} />
      </Tab.Navigator>
    ),
    [],
  );

  const WinningTabs = React.useMemo(
    () => () =>
    (
      <Tab.Navigator
        initialRouteName="Winning"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: hp(1.4),
            fontWeight: '700',
            textTransform: 'capitalize',
            color: '#000',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}>
        <Tab.Screen name="Winning" component={Winning} />
        <Tab.Screen name="Leaderboard" component={Leaderboard} />
        {/*<Tab.Screen name="Scoreboard" component={Scoreboard} />*/}
        <Tab.Screen name="Stats" component={Stats} />
      </Tab.Navigator>
    ),
    [],
  );

  const handleBackPress = () => {
    if (showWinningTabs) {
      setShowWinningTabs(false);
    } else {
      navigation.goBack();
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleBackPress();
        return true; // prevent default behavior
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [showWinningTabs]),
  );
  const screenWidth = Dimensions.get('window').width;

  const isTablet = screenWidth >= 768;

  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // For pull-to-refresh
  const [error, setError] = useState(null);
  const [loadSkeleton, setLoadSkeleton] = useState(false);

  const matchId = useSelector(state => state.fantasy.matchId);
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    setLoadSkeleton(true);
    try {
      const token = await AsyncStorage.getItem('jwtToken');

      const body = {
        recordId: matchId,
      };
      console.log('body from cricket Live ', body);
      const Response = await axios.post(`${api}/scoreCard`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('body from cricket Live ', Response.data.matchesDtoList);
      setData(Response.data.matchesDtoList);
    } catch (err) {
      console.error(err);
      setError('Error fetching data.');
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop refreshing when done
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3247A0' }}>
      <StatusBar barStyle="light-content" backgroundColor="#020202" />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header Section */}
        <View
          style={{
            height: isTablet ? hp('30%') : hp('20%'),
            // backgroundColor: '#126',
            width: wp('100%'),
          }}>
          <LinearGradient
            style={{ flex: 1 }}
            colors={['#020202', '#020202', '#1B2656', '#3247A0']}>

            {data.map((item, index) => (
              <View
                key={index}
                style={{
                  width: wp('100%'),
                  alignItems: 'center',
                  paddingTop: hp('2%'),
                }}>

                {/* Top Row */}
                <View
                  style={{
                    width: wp('95%'),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: wp('2%'),
                  }}>

                  {/* Left Side */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Pressable onPress={handleBackPress} style={{ marginRight: wp('2%') }}>
                      <Ionicons name="arrow-back" size={hp('2.5%')} color="#fff" />
                    </Pressable>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: hp('1.8%'),
                      }}>
                      {item.identifier || '-'}
                    </Text>
                  </View>

                  {/* Right Side */}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="questioncircleo" size={hp('2.5%')} color="#fff" style={{ marginRight: wp('4%') }} />
                    <View
                    >
                      <Image
                        source={require('../../../../../assets/ptsImg.png')}
                        style={{
                          width: 25,
                          height: 25,
                        }}
                      />
                    </View>
                  </View>
                </View>

                {/* Teams and Score Section */}
                <View
                  style={{
                    flexDirection: 'row',
                    width: wp('90%'),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: hp('1%'),
                  }}>

                  {/* Team 1 */}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={{ uri: item.team1Dto?.logoPath }}
                      style={{
                        width: wp('14%'),
                        height: wp('14%'),
                        borderRadius: wp('6%'),
                        resizeMode: 'contain',
                        marginRight: wp('2%'),
                      }}
                    />
                    <View>
                      <Text style={{ color: '#fff', fontSize: hp('1.6%'), fontWeight: 'bold' }}>
                        {item.team1Dto?.shortName}
                      </Text>
                      <Text style={{ color: '#fff', fontSize: hp('1.6%'), fontWeight: 'bold' }}>
                        {item.team1Dto?.score}-{item.team1Dto?.wicket}
                      </Text>
                      <Text style={{ color: '#d0d0d0', fontSize: hp('1.3%'), fontWeight: 'bold' }}>
                        {item.team1Dto?.over ? `${item.team1Dto.over} overs` : 'Yet to bat'}
                      </Text>
                    </View>
                  </View>

                  {/* Status */}
                  <View
                    style={{
                      backgroundColor: '#ac050b',
                      paddingHorizontal: wp('2%'),
                      paddingVertical: hp('0.5%'),
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: hp('1.6%'),
                        fontWeight: '500',
                      }}>
                      {item.eventStatus}
                    </Text>
                  </View>

                  {/* Team 2 */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: wp('2%') }}>
                    <View style={{ marginRight: wp('2%'), alignItems: 'flex-end' }}>
                      <Text style={{ color: '#fff', fontSize: hp('1.6%'), fontWeight: 'bold' }}>
                        {item.team2Dto?.shortName}
                      </Text>
                      <Text style={{ color: '#fff', fontSize: hp('1.6%'), fontWeight: 'bold' }}>
                        {item.team2Dto?.score}-{item.team2Dto?.wicket}
                      </Text>
                      <Text style={{ color: '#d0d0d0', fontSize: hp('1.3%'), fontWeight: 'bold' }}>
                        {item.team2Dto?.over ? `${item.team2Dto.over} overs` : 'Yet to bat'}
                      </Text>
                    </View>
                    <Image
                      source={{ uri: item.team2Dto?.logoPath }}
                      style={{
                        width: wp('14%'),
                        height: wp('14%'),
                        borderRadius: wp('6%'),
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                </View>

                {/* Match Note */}
                <View
                  style={{
                    width: wp('90%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: hp('1%'),
                  }}>
                  <Text style={{ color: '#fff', fontSize: hp('1.5%'), textAlign: 'center' }}>
                    {item.note}
                  </Text>
                </View>
              </View>
            ))}
          </LinearGradient>
        </View>

        {/* Tabs Section */}
        <View style={{ flex: 1, minHeight: hp('70%'), width: wp('100%') }}>
          {showWinningTabs ? <WinningTabs /> : <ContestsTabs />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CricketLive;

const styles = StyleSheet.create({});
