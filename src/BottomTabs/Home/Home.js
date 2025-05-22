import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { api } from '../../envfile/api';
import { setDateAndTime, setMatchesTeam1Id, setMatchesTeam2Id, setmatchId, setMatchShortName, setReferalcode, setteam1ShortName, setteam2ShortName, setTournamentId, setWalletBalance } from '../../Redux/Slice';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { navigationRef } from '../../../Navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSport } from '../../SportContext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TouchableOpacity } from 'react-native';
import TabSelection from '../TabSelection';
import CricketHome from './CricketHome';
import FootballHome from './FootballHome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import { setRefresh } from '../../Redux/Slice';



const TopScreen1 = () => {
    // console.log("screen nrenderd");
    
    const Tab = createMaterialTopTabNavigator();
  const {selectedSport, setSelectedSport} = useSport();

  const [tabIndex, setTabIndex] = useState(
    selectedSport === 'Football' ? 1 : 0,
  );

  const navigationRef = React.useRef();

  // Update when selectedSport changes
  useEffect(() => {
    if (navigationRef.current) {
      navigationRef.current.jumpTo(selectedSport);
      setTabIndex(selectedSport === 'Football' ? 1 : 0); // manually set index
    }
  }, [selectedSport]);

  return (
    <Tab.Navigator
      initialRouteName={selectedSport === 'Football' ? 'Football' : 'Cricket'}
      screenOptions={{swipeEnabled: false}}
      tabBar={({state, descriptors, navigation}) => {
        navigationRef.current = navigation; // store navigation object into ref

        return (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#E1E1E1',
              borderRadius: 10,
              margin: 10,
              width: '95%',
              alignSelf: 'center',
            }}>
            {state.routes.map((route, index) => {
              const focused = tabIndex === index;
              const label = route.name;
              const iconSource =
                label === 'Cricket'
                  ? require('../../../assets/cricket5.png')
                  : require('../../../assets/Football.png');

              const onPress = () => {
                setSelectedSport(label);
              };

              return focused ? (
                <LinearGradient
                  key={label}
                  colors={['#3b53bd', '#243373', '#192451', '#000']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={{borderRadius: 10, flex: 1}}>
                  <TouchableOpacity
                    onPress={onPress}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                      borderRadius: 5,
                      flex: 1,
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={iconSource}
                      style={{
                        width: 22,
                        height: 22,
                        tintColor: 'white',
                        marginRight: 8,
                      }}
                    />
                    <Text style={{fontWeight: 'bold', color: 'white'}}>
                      {label.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              ) : (
                <TouchableOpacity
                  key={label}
                  onPress={onPress}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    padding: 12,
                    borderRadius: 10,
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Image 
                    source={iconSource}
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: label === 'Football' ? '#1C274C' : 'black',
                      marginRight: 8,
                    }}
                  />
                  <Text style={{fontWeight: 'bold', color: 'black'}}>
                    {label.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}>
      <Tab.Screen name="Cricket" component={CricketHome} />
      <Tab.Screen name="Football" component={FootballHome} />
    </Tab.Navigator>
  );
};


const Home = () => {
  const navigation = useNavigation();
  const reloadStatus = useSelector(state => state.fantasy.reloadStatus);
  const walletBalance = useSelector(state => state.fantasy.WalletBalance);
  const refresh = useSelector(state=>state.fantasy.refresh);
  const [userMatches, setUserMatches] = useState([]);

  const [userDetails, setUserDetails] = useState({balance: 0});
  const [teams, setTeams] = useState({});

  useEffect(() => {
    fetchUserMatch();
  }, []);

useEffect(() => {
  if (refresh) {
    fetchUserMatch();
  }
}, [refresh]);

  const CountdownTimer = ({matchTime, eventStatus}) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
      const updateCountdown = () => {
        const now = new Date();
        const matchDate = moment(matchTime, 'YYYY/M/D, h:mm:ss A').toDate();

        if (isNaN(matchDate.getTime())) {
          setDisplayText('Invalid Date');
          return;
        }

        const difference = matchDate - now;

        // Show eventStatus if match has started (difference <= 0)
        if (difference <= 0) {
          setDisplayText(eventStatus);
          return;
        }

        // For upcoming matches, show the countdown
        const diffHours = Math.floor(difference / (1000 * 60 * 60));
        const diffDays = Math.floor(difference / (1000 * 60 * 60 * 24));

        if (diffHours < 24) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          setDisplayText(`${hours}h ${minutes}m ${seconds}s`);
          if (hours == 0 && minutes == 0 && seconds == 0) {
            setDisplayText(eventStatus);
          }
        } else if (diffDays === 1) {
          setDisplayText('Tomorrow');
        } else {
          setDisplayText(
            matchDate.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }),
          );
        }
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);

      return () => clearInterval(interval);
    }, [matchTime, eventStatus]);

    const textColor =
      displayText === 'Live'
        ? 'red'
        : displayText === 'Completed'
        ? 'red'
        : 'red';

    return (
      <Text
        style={{
          fontSize: hp(1.4),
          color: textColor,
          fontWeight: 'bold',
          textTransform: 'capitalize',
        }}>
        {displayText}
      </Text>
    );
  };

  const fetchUserMatch = async () => {
    const token = await AsyncStorage.getItem('jwtToken');
    const userId = await AsyncStorage.getItem('userId');
    const body = {userId: userId};

    try {
      const userMatchesResponse = await axios.post(
        `${api}/admin/matches/getMatchesByUser`,
        body,
        {headers: {Authorization: `Bearer ${token}`}},
      );
      
      const allMatches = userMatchesResponse.data?.matchesDtoList || [];
      const sortedMatches = allMatches.sort((a, b) => {
        const timeA = a.creationTime
          ? new Date(a.creationTime)
          : new Date(a.matchTime);
        const timeB = b.creationTime
          ? new Date(b.creationTime)
          : new Date(b.matchTime);
        return timeB - timeA;
      });

      const recentMatches = sortedMatches.slice(0, 3);
      setUserMatches(recentMatches);

      const teamIds = [
        ...new Set(recentMatches.flatMap(m => [m.team1Id, m.team2Id])),
      ];

      if (teamIds.length > 0) {
        const teamResponse = await axios.post(
          `${api}/admin/team/getedit`,
          {teamDtoList: teamIds.map(id => ({recordId: id}))},
          {headers: {Authorization: `Bearer ${token}`}},
        );

        const teamData = {};
        if (teamResponse.data.teamDtoList) {
          teamResponse.data.teamDtoList.forEach(team => {
            teamData[team.recordId] = team;
          });
        }

        setTeams(prev => ({...prev, ...teamData}));
      }
    } catch (error) {
      console.error('Error fetching user matches:', error);
    }
    finally{
       dispatch(setRefresh(false)); 
    }
  };

  const handleMatchNavigate = matchId => {
    // console.log('🔍 Attempting to navigate to ContestScreen with matchId:', matchId);

    if (navigationRef.isReady()) {
      // console.log('✅ Navigation is ready! Navigating now...');
      navigationRef.navigate('ContestScreen', {matchId});
    } else {
      // console.log('❌ Navigation is NOT ready!');
    }
  };
  useEffect(() => {
    console.log('hitting reload status api');
    if (reloadStatus === 'reload') {
      getReferalCodeData();
    }
  }, [reloadStatus]);
  useEffect(() => {
    getReferalCodeData();
  }, []);
  const dispatch = useDispatch();
  const getReferalCodeData = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const recordId = await AsyncStorage.getItem('userId');

      if (!token) return;

      const body = {recordId};
      console.log('body from ', body);

      const response = await axios.post(`${api}/admin/user/getUserById`, body, {
        headers: {Authorization: `Bearer ${token}`},
      });

      if (response.data?.userDtoList?.length > 0) {
        const userData = response.data.userDtoList[0];
        setUserDetails(userData);
        dispatch(setWalletBalance(userData.balance));
        dispatch(setReferalcode(userData.referralCode));
        const balance = userData.balance;
        await AsyncStorage.setItem('walletBalance', JSON.stringify(balance));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={{display:"flex",flexDirection:"column",width:"100%",justifyContent:"center",alignItems:"center",height:"100%",gap:0}}>
    {
      userMatches.length >= 1 ?  <View style>
         <LinearGradient
      colors={['#000', '#192451', '#243373', '#3b53bd']}
      style={{paddingTop: Platform.OS === 'ios' ? 50 : 0}}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 15,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingBottom: 10,
            paddingHorizontal: 15,
          }}>
          <Pressable
            style={{justifyContent: 'flex-start', paddingLeft: 10}}
            onPress={() => navigation.toggleDrawer()}>
            <Feather name="menu" size={22} color={'white'} />
          </Pressable>

          <Image
            source={require('../../../assets/IMPACT11LogoExtended.png')}
            style={{
              width: 120,
              height: 20,
              borderRadius: 20,
              resizeMode: 'contain',
            }}
          />

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 18,
            }}>
            <Pressable
              onPress={() => navigation.navigate('ADD CASH')}
              style={{
                // borderColor: 'rgb(179, 179, 179)',
                // borderRadius: 4,
                justifyContent: 'space-around',
                flexDirection: 'row',
                // minWidth: 75,
                // backgroundColor: '#6C77AA',
                // alignItems: 'center',
                // borderWidth: 0.8,
                // paddingLeft: 2,
                // paddingRight: 2,
                // gap: 5,
              }}>
              <Text
              // style={{
              //   color: '#fff',
              //   fontFamily: 'Roboto-Bold',
              //   paddingLeft: 2,
              // }}
              >
                {/* ₹ {userDetails.balance || 0} */}
              </Text>
              <Ionicons name="wallet-outline" size={24} color="white" />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('HomeNotification')}
              style={{marginRight: 15, alignItems: 'center'}}>
              <Ionicons name="notifications-outline" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          width: wp('100%'),
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            padding: 10,
          }}>
             <View style={{}}>
                <Text
                  style={{fontWeight: '800', fontSize: hp(1.8), color: '#fff'}}>
                  My Matches
                </Text>
              </View>
          {userMatches.length > 1 && (
            <>
             
              <Pressable
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('Recently Played')}>
                <View>
                  <Text style={{fontSize: hp(1.7), color: '#B9BBC6'}}>
                    View all
                  </Text>
                </View>
                <View>
                  <AntDesign name="right" size={14} color="#B9BBC6" />
                </View>
              </Pressable>
            </>
          )}
        </View>

        <View style={{width: '100%', padding: 10}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{}}
            contentContainerStyle={
              {
                // paddingHorizontal: 10
              }
            }>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                //paddingBottom: 30,
              }}>
              {userMatches.map(match => {
                const cardWidth =
                  userMatches.length > 1 ? wp('75%') : wp('95%');

                const team1Data = teams[match.team1Id] || {
                  shortName: 'Unknown',
                  logo: null,
                };
                const team2Data = teams[match.team2Id] || {
                  shortName: 'Unknown',
                  logo: null,
                };

                return (
                  <View
                    key={match.recordId}
                    style={{gap: 10, paddingBottom: 10}}>
                    <View
                      style={{
                        width: cardWidth,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Pressable
                        onPress={() => {
                          dispatch(setTournamentId(match.tournamentId));
                          dispatch(setMatchShortName(match.identifier));
                          dispatch(setMatchesTeam1Id(match.team1Id));
                          dispatch(setMatchesTeam2Id(match.team2Id));
                          dispatch(setmatchId(match.recordId));
                          dispatch(setteam1ShortName(team1Data.shortName));
                          dispatch(setteam2ShortName(team2Data.shortName));
                          dispatch(setDateAndTime(match.matchTime));
                          if (match.eventStatus === 'Live') {
                            navigation.navigate('CricketLive', {
                              matchId: match.recordId,
                            });
                          } else if (match.eventStatus === 'Completed') {
                            navigation.navigate('CricketCompleted', {
                              matchId: match.recordId,
                            });
                          } else if (match.eventStatus === 'Abandoned') {
                            navigation.navigate('CricketCompleted', {
                              matchId: match.recordId,
                            });
                          } else {
                            handleMatchNavigate(match.recordId);
                          }
                        }}
                        style={{
                          borderRadius: 5,
                          overflow: 'hidden',
                          width: '100%',
                          backgroundColor: '#fff',
                          flexDirection: 'column',
                          borderWidth: 0.5,
                          borderColor: '#cccccc',
                          justifyContent: 'space-between',
                          ...Platform.select({
                            ios: {
                              shadowColor: 'red',
                              shadowOpacity: 0.8,
                              shadowOffset: {width: 20, height: 10},
                            },
                          }),
                        }}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            //  backgroundColor:"#f3f"
                          }}>
                          {/* Match Details */}
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              width: '100%',
                              padding: 2,
                            }}>
                            <View
                              style={{
                                width: '70%',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderBottomRightRadius: 50,
                                position: 'relative',

                                paddingHorizontal: 8,
                                // backgroundColor:"#f4f"
                              }}>
                              <View
                                style={{
                                  backgroundColor: '#595959',
                                  borderRadius: 10,
                                  padding: 2,
                                  justifyContent: 'flex-end',
                                  alignItems: 'center',
                                  width: '15%',
                                }}>
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    fontSize: hp(1.2),
                                  }}>
                                  {match.matchType}
                                </Text>
                              </View>
                              <Text
                                style={{
                                  fontSize: hp(1.4),
                                  padding: 10,
                                  color: '#000',
                                  fontWeight: 'bold',
                                  // position: 'absolute',
                                  // width: '70%',
                                  justifyContent: 'flex-end',
                                  alignItems: 'flex-end',
                                }}
                                numberOfLines={1}>
                                {match.tournamentName}
                              </Text>
                            </View>

                            {match.eventStatus === 'Lineups Out' && (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: 'rgba(25, 200, 105, 0.1)',
                                  borderRadius: 12,
                                  paddingHorizontal: 10,
                                  paddingVertical: 4,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: hp(1.3),
                                    color: '#19c869',
                                    fontWeight: '900',
                                    marginLeft: 5,
                                  }}>
                                  Lineups Out
                                </Text>
                              </View>
                            )}
                          </View>

                          <View>
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                // justifyContent: 'space-between',
                              }}>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  width: '22%',
                                  // gap: 10,
                                }}>
                                <View style={{padding: 2}}>
                                  {team1Data.logoPath ? (
                                    <Image
                                      source={{
                                        uri: team1Data.logoPath,
                                        cache: 'force-cache',
                                      }}
                                      style={{
                                        width: 60,
                                        height: 60,
                                      }}
                                    />
                                  ) : (
                                    <View
                                      style={{
                                        width: 40,
                                        height: 40,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}>
                                      <Text style={{fontSize: hp(1.5)}}>
                                        No Logo
                                      </Text>
                                    </View>
                                  )}
                                </View>
                              </View>

                              <View
                                style={{
                                  width: '50%',
                                  // backgroundColor: '#f5f',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 10,
                                    width: '100%',
                                    // backgroundColor: '#f5f',
                                  }}>
                                  <View
                                    style={{
                                      width: '30%',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      display: 'flex',
                                      // backgroundColor: '#126',
                                    }}>
                                    <View>
                                      <Text
                                        style={{
                                          fontWeight: 'bold',
                                          fontFamily: 'Roboto-Bold',
                                          color: '#000',
                                          fontStyle: 'italic',
                                          fontSize: hp(2),
                                        }}>
                                        {team1Data.shortName}
                                      </Text>
                                    </View>
                                  </View>

                                  <View>
                                    <Text
                                      style={{
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: hp(1.5),
                                        backgroundColor: '#dfe1ec',
                                        width: 25,
                                        height: 25,
                                        textAlign: 'center',
                                        textAlignVertical: 'center',
                                        borderRadius: 17.5,
                                        // paddingVertical: 5,
                                      }}>
                                      VS
                                    </Text>
                                  </View>

                                  <View
                                    style={{
                                      width: '30%',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      display: 'flex',
                                    }}>
                                    <View>
                                      <Text
                                        style={{
                                          fontWeight: 'bold',
                                          fontFamily: 'Roboto-Bold',
                                          color: '#000',
                                          fontStyle: 'italic',
                                          fontSize: hp(2),
                                        }}>
                                        {team2Data.shortName}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    // gap: 15,
                                    width: '100%',
                                    // backgroundColor: '#f5f',
                                  }}>
                                  <View
                                    style={{
                                      // gap: 40,
                                      width: '40%',
                                      justifyContent: 'flex-end',
                                      alignItems: 'flex-end',
                                      display: 'flex',
                                      // backgroundColor: '#f5f',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 10,
                                        color: '#000',
                                      }}
                                      numberOfLines={1}>
                                      {team1Data.identifier}
                                    </Text>
                                  </View>

                                  <View
                                    style={{
                                      width: '40%',
                                      justifyContent: 'flex-start',
                                      alignItems: 'flex-start',
                                      display: 'flex',
                                      // backgroundColor: '#f5f',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 10,
                                        color: '#000',
                                        textAlign: 'center',
                                      }}
                                      numberOfLines={1}>
                                      {team2Data.identifier}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  width: '25%',
                                  // gap: 10,
                                  // backgroundColor: '#126',
                                }}>
                                <View style={{padding: 2}}>
                                  {team2Data.logoPath ? (
                                    <Image
                                      source={{
                                        uri: team2Data.logoPath,
                                        cache: 'force-cache',
                                      }}
                                      style={{
                                        width: 60,
                                        height: 60,
                                        // borderRadius: 30,
                                        // borderWidth: 1,
                                        // borderColor: '#c0c0c0',
                                      }}
                                    />
                                  ) : (
                                    <View
                                      style={{
                                        width: 40,
                                        height: 40,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}>
                                      <Text style={{fontSize: hp(1.5)}}>
                                        No Logo
                                      </Text>
                                    </View>
                                  )}
                                </View>
                              </View>
                            </View>
                          </View>

                          {/* Countdown Timer Section */}
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              width: '100%',
                              alignItems: 'center',
                              justifyContent: 'center',
                              // backgroundColor: '#126',
                              // gap: 5,
                            }}>
                            <View
                              style={{
                                padding: 5,
                              }}>
                              <Text
                                style={{
                                  fontSize: hp(1.5),
                                  color: 'red',
                                  textAlign: 'center',
                                  fontWeight: 'bold',
                                }}>
                                <CountdownTimer
                                  matchTime={match.matchTime}
                                  eventStatus={match.eventStatus}
                                />
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={{
                                  fontSize: hp(1.4),
                                  color: '#000',
                                  fontWeight: '500',
                                }}>
                                {match.matchTime.split(' ')[1]}
                              </Text>
                            </View>
                          </View>

                          <View
                            style={{
                              padding: 5,
                              width: wp('95%'),
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              // borderTopWidth: 0.5,
                              borderColor: '#cccccc',
                              paddingLeft: 10,
                              // paddingRight: 10,
                            }}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 7,
                                alignItems: 'center',
                                // backgroundColor: '#3D55C0',
                              }}>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: 3,
                                  // borderRadius: 5,
                                  // backgroundColor: '#3D55C0',
                                }}>
                                <MaterialCommunityIcons
                                  name="tshirt-v-outline"
                                  size={16}
                                  color="#000"
                                />
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    borderRadius: 15,
                                    color: '#000',
                                    padding: 1,
                                    fontSize: hp(1.2),
                                  }}>
                                  {match.teamCount} Teams
                                </Text>
                              </View>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: 3,
                                  alignItems: 'center',
                                }}>
                                <MaterialCommunityIcons
                                  name="ticket-confirmation-outline"
                                  size={16}
                                  color="#000"
                                />
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    fontSize: hp(1.2),
                                    color: '#000',
                                  }}>
                                  {match.contestCount} Contest
                                </Text>
                              </View>
                            </View>
                            {/* <Pressable onPress={() => setIsPopupVisible(true)}> */}
                            {/* <MaterialCommunityIcons
                              name="bell-circle"
                              size={22}
                              color="grey"
                            /> */}
                            {/* <AppExitModel
        visible={exitModalVisible}
        onCancel={() => setExitModalVisible(false)}
        onExit={exitApp}
      /> */}
                            {/* <MatchReminder
                              visible={isPopupVisible}
                              onClose={() => setIsPopupVisible(false)}
                            />
                          </Pressable> */}
                          </View>
                        </View>
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </LinearGradient>
     </View> : (
      <View style={{height:"10%",width:"100%"}}>
             <LinearGradient
      colors={['#000', '#192451',]}
      style={{paddingTop: Platform.OS === 'ios' ? 50 : 0,height:"80%"}}>
                <View
          style={{
            flexDirection: 'row',
            paddingTop: 15,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingBottom: 10,
            paddingHorizontal: 15,
          }}>
          <Pressable
            style={{justifyContent: 'flex-start', paddingLeft: 10}}
            onPress={() => navigation.toggleDrawer()}>
            <Feather name="menu" size={22} color={'white'} />
          </Pressable>

          <Image
            source={require('../../../assets/IMPACT11LogoExtended.png')}
            style={{
              width: 120,
              height: 20,
              borderRadius: 20,
              resizeMode: 'contain',
            }}
          />

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 18,
            }}>
            <Pressable
              onPress={() => navigation.navigate('ADD CASH')}
              style={{
                // borderColor: 'rgb(179, 179, 179)',
                // borderRadius: 4,
                justifyContent: 'space-around',
                flexDirection: 'row',
                // minWidth: 75,
                // backgroundColor: '#6C77AA',
                // alignItems: 'center',
                // borderWidth: 0.8,
                // paddingLeft: 2,
                // paddingRight: 2,
                // gap: 5,
              }}>
              <Text
              // style={{
              //   color: '#fff',
              //   fontFamily: 'Roboto-Bold',
              //   paddingLeft: 2,
              // }}
              >
                {/* ₹ {userDetails.balance || 0} */}
              </Text>
              <Ionicons name="wallet-outline" size={24} color="white" />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('HomeNotification')}
              style={{marginRight: 15, alignItems: 'center'}}>
              <Ionicons name="notifications-outline" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </LinearGradient>
      </View>
     )

    }
  <View style={{flex:1,width:"100%"}}>
     <TopScreen1/>
  </View>
    </View>
  );
};


export default Home

const styles = StyleSheet.create({})