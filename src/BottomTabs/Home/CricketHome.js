import React, { useRef, useEffect, useState } from 'react';
import {
  
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../envfile/api';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  setMatchShortName,
  setMatchesTeam1Id,
  setMatchesTeam2Id,
  setteam1ShortName,
  setteam2ShortName,
  setmatchId,
  setDateAndTime,
  setTournamentId,
  setvenue,
  setRefresh,
} from '../../Redux/Slice';
import { navigationRef } from '../../../Navigation';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const CricketHome = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [teams, setTeams] = useState({});
  const [error, setError] = useState(null);
  const [loadSkeleton, setLoadSkeleton] = useState(false);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [userMatches, setUserMatches] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isModelVisible, setIsModelVisible] = useState(false);
  const UserWalletBalance = useSelector(state => state.fantasy.WalletBalance);
  // const [exitModalVisible, setExitModalVisible] = useState(false);
  // // const navigation = useNavigation();

  // useEffect(() => {
  //   const handleBackPress = async () => {
  //     const token = await AsyncStorage.getItem("jwtToken");

  //     // Get the current route name
  //     const currentRoute = navigation.getState()?.routes?.slice(-1)[0]?.name;

  //     if (currentRoute === "Home") {
  //       if (token) {
  //         setExitModalVisible(true);
  //         return true; // Prevent back navigation on Home Screen
  //       }
  //     } else {
  //       return false; // Allow default back behavior on other screens
  //     }
  //   };

  //   const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);

  //   return () => backHandler.remove(); // Cleanup listener on unmount
  // }, [navigation]);

  // const exitApp = () => {
  //   BackHandler.exitApp(); // Exit the app
  // };

  const scrollRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const ads = [
    require('../../../assets/Ad.png'),
    require('../../../assets/Ad.png'), // Add different ad images if needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % ads.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * Dimensions.get('window').width,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    const checkNavigationReady = setInterval(() => {
      if (navigation.isReady) {
        setIsNavigationReady(true);
        clearInterval(checkNavigationReady);
      }
    }, 200);

    return () => clearInterval(checkNavigationReady);
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    setLoadSkeleton(true);

    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const userId = await AsyncStorage.getItem('userId');

      const body = { userId: userId };

      // Fetch matches
      const matchResponse = await axios.post(
        `${api}/admin/matches/getMatchesNotStarted`,
        // { page: 0, sizePerPage: 50, sortField: 'matchTime' },
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      // console.log("matches from home:",matchResponse.data.matchesDtoList);

      const matchData = matchResponse.data.matchesDtoList || [];
      setLoadSkeleton(false);
      setData(matchData);

      // Fetch teams
      const teamIds = [
        ...new Set(matchData.flatMap(m => [m.team1Id, m.team2Id])),
      ];
      if (teamIds.length > 0) {
        const teamResponses = await Promise.all(
          teamIds.map(id =>
            axios.post(
              `${api}/admin/team/getedit`,
              { teamDtoList: [{ recordId: id }] },
              { headers: { Authorization: `Bearer ${token}` } },
            ),
          ),
        );

        const teamData = Object.fromEntries(
          teamResponses
            .filter(res => res.data.teamDtoList?.length > 0)
            .map(res => [
              res.data.teamDtoList[0].recordId,
              res.data.teamDtoList[0],
            ]),
        );
        setTeams(teamData);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error fetching data.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    fetchUserMatch();
  }, []);

  const fetchUserMatch = async () => {
    const token = await AsyncStorage.getItem('jwtToken');
    const userId = await AsyncStorage.getItem('userId');
    const body = { userId: userId };
    console.log('response from crickethome', body);

    try {
      const userMatchesResponse = await axios.post(
        `${api}/admin/matches/getMatchesByUser`,
        body,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const matches = userMatchesResponse.data?.matchesDtoList || [];
      // console.log("response from crickethome",matches);

      setUserMatches(matches);

      // Extract ALL unique team IDs from ALL matches
      const teamIds = [
        ...new Set(matches.flatMap(m => [m.team1Id, m.team2Id])),
      ];

      if (teamIds.length > 0) {
        // Fetch all teams in a single request if your API supports it
        const teamResponse = await axios.post(
          `${api}/admin/team/getedit`,
          { teamDtoList: teamIds.map(id => ({ recordId: id })) },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        // Create a map of team data
        const teamData = {};
        if (teamResponse.data.teamDtoList) {
          teamResponse.data.teamDtoList.forEach(team => {
            teamData[team.recordId] = team;
          });
        }

        // Merge with existing teams data
        setTeams(prev => ({ ...prev, ...teamData }));
      }
    } catch (error) {
      console.error('Error fetching user matches:', error);
    }
  };
  const handleMatchNavigate = matchId => {
    // console.log('🔍 Attempting to navigate to ContestScreen with matchId:', matchId);

    if (navigationRef.isReady()) {
      // console.log('✅ Navigation is ready! Navigating now...');
      navigationRef.navigate('ContestScreen', { matchId });
    } else {
      // console.log('❌ Navigation is NOT ready!');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(setRefresh(true));
    fetchAllData();

  };

  const CountdownTimer = ({ matchTime, eventStatus }) => {
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

  const renderMyMatches = () => {
    if (!Array.isArray(userMatches) || userMatches.length === 0) {
      return null;
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading && (
          <View style={{ padding: 10, gap: 15 }}>
            {[...Array(7)].map((_, index) => (
              <SkeletonPlaceholder key={index} borderRadius={8}>
                <View
                  style={{
                    // backgroundColor: '#f3f',
                    borderRadius: 8,
                    padding: 20,
                    // marginBottom: 10,
                    borderWidth: 1, // Overall border
                    borderColor: '#DDD', // Border color
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  {/* Row */}
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    {/* Left Section */}
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          backgroundColor: '#DDD',
                        }}
                      />
                      <View
                        style={{
                          width: '85%',
                          height: 15,
                          backgroundColor: '#DDD',
                        }}
                      />
                    </View>

                    {/* Middle Section */}
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '60%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <View
                        style={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: '#DDD',
                          width: '100%',
                        }}
                      />
                      <View
                        style={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: '#DDD',
                          width: '40%',
                        }}
                      />
                    </View>

                    {/* Right Section */}
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          backgroundColor: '#DDD',
                        }}
                      />
                      <View
                        style={{
                          width: '85%',
                          height: 15,
                          backgroundColor: '#DDD',
                        }}
                      />
                    </View>
                  </View>
                </View>
              </SkeletonPlaceholder>
            ))}
          </View>
        )}

        {!loading && (
          <View style={{  }}>
            {/* {renderMyMatches()} */}
            <View
              style={{
                width: wp('100%'),
                alignItems: 'center',
                
              }}>
              <ScrollView
                ref={scrollRef} 
                horizontal
                pagingEnabled
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                style={{
                  width: wp('95%'),
                  height: hp('10%'),
                  
                }}>
                {ads.map((ad, index) => (
                  <Image
                    key={index}
                    source={ad}
                    style={{
                      width: wp('95%'),
                      height: hp('10%'),
                      resizeMode: 'contain',
                    }}
                  />
                ))}
              </ScrollView>
            </View>
            {/* Render Upcoming Matches */}
            <View style={{width:"100%",flexDirection:"column",display:"flex",justifyContent:"center",alignItems:"center"}}>
              <View style={{width:"95%",flexDirection:"column",display:"flex",justifyContent:"center",alignItems:"flex-start"}}>
              {
                data.length > 0 && (
                  <View>
                    <Text
                style={{ fontWeight: '800', color: '#000', fontSize: hp(1.6) }}>
                Upcoming Matches
              </Text>
                  </View>
             
                )
              }

              {error && (
                <View
                  style={{
                    flex: 1,
                    display:"flex",
                    width:"100%",
                    flexDirection:"column",
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: hp('50%'),
                  }}>
                  <Image
                    source={require('../../../assets/Break.png')}
                    style={{
                      width: '50%',
                      height: '50%',
                      resizeMode: 'contain',
                    }}
                  />
                  <View style={{ display: 'flex', width: '50%', height: '8%' }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#666666',
                        fontSize: hp(2.1),
                        fontWeight: 800,
                      }}>
                      Ooops!!
                    </Text>
                  </View>
                  <View style={{ display: 'flex', width: '50%', height: '15%' }}>
                    <Text style={{ textAlign: 'center', color: '#666666' }}>
                      No internet connection found Check your connection.
                    </Text>
                  </View>
                  <LinearGradient
                    colors={['#3E57C4', '#1E2E74']}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <Pressable
                      onPress={() => ListingContest()}
                      style={{
                        width: '',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                        padding: 10,

                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,

                        gap: 8,
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: hp(1.7),
                        }}>
                        Try Again
                      </Text>
                    </Pressable>
                  </LinearGradient>
                </View>
              )}
              </View>
            </View>

            {/* Render All Matches */}
            {data.map((item, index) => {
              const team1Data = teams[item.team1Id] || {
                shortName: 'Unknown',
                logo: null,
              };
              const team2Data = teams[item.team2Id] || {
                shortName: 'Unknown',
                logo: null,
              };

              const shouldDisplayLineup = matchStartTime => {
                // Check if matchStartTime is valid
                if (!matchStartTime) {
                  console.error('Invalid matchTime:', matchStartTime);
                  return false;
                }

                const currentTime = new Date();
                const matchTime = moment(
                  matchStartTime,
                  'YYYY-MM-DD HH:mm:ss',
                ).toDate(); // Correct format

                // Check if matchTime is a valid date
                if (isNaN(matchTime.getTime())) {
                  console.error('Invalid parsed matchTime:', matchTime);
                  return false;
                }

                // Calculate 30 minutes before the match
                const thirtyMinutesBeforeMatch = new Date(
                  matchTime.getTime() - 30 * 60 * 1000,
                );

                // Check if current time is within 30 minutes before the match
                return (
                  currentTime >= thirtyMinutesBeforeMatch &&
                  currentTime < matchTime
                );
              };

              return (
                <View key={index} style={{flexDirection:"column",gap:0}}>
                  <View
                    style={{
                      width: wp('100%'),
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 10,
                      gap:0
                      // backgroundColor: '#f5f',
                    }}>
                      
                    <Pressable
                      onPress={() => {
                        // console.log('match id from homeeee:', item.recordId);
                        // console.log("tournament id from home:",item.tournamentId);

                        handleMatchNavigate(item.recordId);
                        dispatch(setTournamentId(item.tournamentId));
                        dispatch(setMatchShortName(item.identifier));
                        dispatch(setMatchesTeam1Id(item.team1Id));
                        dispatch(setMatchesTeam2Id(item.team2Id));
                        dispatch(setmatchId(item.recordId));
                        dispatch(setteam1ShortName(team1Data.shortName));
                        dispatch(setteam2ShortName(team2Data.shortName));
                        dispatch(setDateAndTime(item.matchTime));
                        dispatch(setvenue(item.venue));
                        // console.log("venue",venue);
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
                            shadowOffset: { width: 20, height: 10 },
                          },
                        }),
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: wp('95%'),
                          //  gap: 8,
                        }}>
                        {/* Match Details */}
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: wp('100%'),
                            // width: wp('90%'),
                            //  backgroundColor:"#f5f",
                          }}>
                          <View
                            style={{
                              
                              width: wp('80%'),
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              borderBottomRightRadius: 50,
                              position: 'relative',
                              //  backgroundColor:"#f5f",
                              //gap:5
                              paddingHorizontal: 8,
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

                                }} numberOfLines={1}>
                                {item.matchType}
                              </Text>
                            </View>
                            <Text
                              style={{
                                fontSize: hp(1.4),
                                padding: 10,
                                color: '#000',
                                fontWeight: 'bold',
                                // position: 'absolute',
                                width: '70%',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                              }}>
                              {item.tournamentName}
                            </Text>
                          </View>
                          {item.lineUpOut && (
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
                              {/* <Ionicons
                                  name="megagram-outline"
                                  size={14}
                                  color="#19c869"
                                /> */}

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

                        <View
                          style={
                            {
                              // padding: 10,
                            }
                          }>
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
                                width: '25%',
                                // gap: 10,
                                // backgroundColor: '#126',
                              }}>
                              <View style={{ padding: 2 }}>
                                {team1Data.logoPath ? (
                                  <Image
                                    source={{
                                      uri: team1Data.logoPath,
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
                                    <Text style={{ fontSize: hp(1.5) }}>
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
                                    // backgroundColor: '#f5f',
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
                                    // backgroundColor: '#f5f',
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
                              <View style={{ padding: 2 }}>
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
                                    <Text style={{ fontSize: hp(1.5) }}>
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
                                matchTime={item.matchTime}
                                eventStatus={item.eventStatus}
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
                              {item.matchTime.split(' ')[1]}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            padding: 3,
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
                              // backgroundColor: '#f5f',
                              padding: 5,
                            }}>
                            <View
                              style={{
                                borderRadius: 5,
                                backgroundColor: '#3D55C0',
                              }}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  borderRadius: 15,
                                  color: '#fff',
                                  padding: 3,
                                  fontSize: hp(1.1),
                                }}>
                                MEGA
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  fontSize: hp(1.1),
                                  color: '#fff',
                                }}>
                                1 CRORE
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
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:"column",
    gap:5
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  eventDetails: {
    fontSize: 14,
    color: '#333',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    width: '60%',
    height: 15,
    marginBottom: 6,
  },
  subtitle: {
    width: '80%',
    height: 10,
    marginBottom: 4,
  },
});

export default CricketHome;
