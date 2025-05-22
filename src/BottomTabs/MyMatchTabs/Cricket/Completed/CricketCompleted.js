import {
  Image,
  Pressable,
  Dimensions,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  BackHandler,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MyContests from './MyContests';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../../../envfile/api';
import axios from 'axios';
import Winning from './Winning';
import MyTeams from './MyTeam';
import Scoreboard from './Scoreboard';
import Stats from './Stats';
import Leaderboard from './Leaderboard';
import { ScrollView } from 'react-native-gesture-handler';

const CricketCompleted = () => {
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();

  const [showWinningTabs, setShowWinningTabs] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const isTablet = screenWidth >= 768;

  const ContestsTabs = React.useMemo(
    () => () =>
    (
      <Tab.Navigator
        initialRouteName="My Contests"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: hp(1.5),
            fontWeight: 'bold',
            textTransform: 'capitalize',
            color: '#000',
          },
        }}>
        <Tab.Screen name="My Contests">
          {() => <MyContests setShowWinningTabs={setShowWinningTabs} />}
        </Tab.Screen>
        <Tab.Screen
          name="MyTeams"
          component={MyTeams}
          options={{ title: 'My Teams' }}
        />
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
            fontSize: hp(1.5),
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

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loadSkeleton, setLoadSkeleton] = useState(false);
  const matchId = useSelector(state => state.fantasy.matchId);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    setLoadSkeleton(true);
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const body = { recordId: matchId };
      const Response = await axios.post(`${api}/scoreCard`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(Response.data.matchesDtoList);

      console.log('Response:', Response.data.matchesDtoList);
      
    } catch (err) {
      console.error(err);
      setError('Error fetching data.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3247A0',paddingBottom:50 }}>
      <StatusBar barStyle="light-content" backgroundColor="#020202" />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom:50 }} >
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
                        {item.team1Dto?.over} overs
                      </Text>
                    </View>
                  </View>

                  {/* Status */}
                  <View
                    style={{
                      backgroundColor: '#0b6930',
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
                        {item.team2Dto?.over} overs
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

export default CricketCompleted;

const styles = StyleSheet.create({});
