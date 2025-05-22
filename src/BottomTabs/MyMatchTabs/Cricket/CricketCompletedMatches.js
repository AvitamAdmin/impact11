import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  setMatchShortName,
  setMatchesTeam1Id,
  setMatchesTeam2Id,
  setmatchId,
  setteam1ShortName,
  setteam2ShortName,
  setDateAndTime,
  setTournamentId,
} from '../../../Redux/Slice';
import { api } from '../../../envfile/api';
import { navigationRef } from '../../../../Navigation';
import LinearGradient from 'react-native-linear-gradient';
import { useSport } from '../../../SportContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CricketCompletedMatches = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [teams, setTeams] = useState({});
  const dispatch = useDispatch();

  const { setTabName } = useSport();

  useEffect(() => {
    fetchAllData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchAllData();
  };

  const matchId = useSelector(state => state.fantasy.matchId);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const userId = await AsyncStorage.getItem('userId');
      const body = {
        eventStatus: 'Completed',
        userId: userId,
      };
      console.log('body from completed', body);

      const userTeamsResponse = await axios.post(
        `${api}/admin/matches/getMatchesByUserAndStatus`,
        body,

        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const userTeams = userTeamsResponse.data.matchesDtoList || [];

      console.log('response from upcoming matches', userTeams);

      setMatches(userTeams);

      const teamIds = [
        ...new Set(userTeams.flatMap(m => [m.team1Id, m.team2Id])),
      ];

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
        teamResponses.map(res => [
          res.data.teamDtoList[0].recordId,
          res.data.teamDtoList[0],
        ]),
      );

      setTeams(teamData);
    } catch (err) {
      console.error(err);
      setError('Error fetching data.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleMatchNavigate = matchId => {
    // console.log("🔍 Attempting to navigate to ContestScreen with matchId:", matchId);

    if (navigationRef.isReady()) {
      // console.log("✅ Navigation is ready! Navigating now...");
      navigationRef.navigate('CricketCompleted', { matchId });
    } else {
      // console.log("❌ Navigation is NOT ready!");
    }
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

        // Only show eventStatus if it's Live or Completed
        if (
          (eventStatus === 'Live' || eventStatus === 'Completed') &&
          difference <= 0
        ) {
          setDisplayText(eventStatus);
          return;
        }

        // For Lineups Out or other statuses, show the countdown
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
      displayText === 'Live' || displayText === 'Completed' ? 'Red' : 'red';

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

  const shouldDisplayLineup = matchStartTime => {
    const currentTime = new Date();
    const matchTime = moment(matchStartTime, 'M/D/YYYY, h:mm:ss A').toDate();
    const thirtyMinutesBeforeMatch = new Date(
      matchTime.getTime() - 30 * 60 * 1000,
    );
    return currentTime >= thirtyMinutesBeforeMatch && currentTime < matchTime;
  };

  if (loading) {
    return (
      <View style={{ padding: 10 }}>
        {[...Array(5)].map((_, index) => (
          <SkeletonPlaceholder key={index} borderRadius={8}>
            <View
              style={{
                backgroundColor: '#FFF',
                borderRadius: 8,
                padding: 20,
                marginBottom: 10,
                borderWidth: 1,
                borderColor: '#DDD',
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 5,
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              {/* Skeleton UI */}
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: '#DDD',
                  }}
                />
                <View style={{ width: '60%', gap: 10 }}>
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
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: '#DDD',
                  }}
                />
              </View>
            </View>
          </SkeletonPlaceholder>
        ))}
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ height: hp('100%') }}>
      {!loading && matches.length === 0 && (
        <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
          <Image
            source={require('../../../../assets/ContestScreen.png')}
            style={{
              width: '70%',
              height: '45%',
              resizeMode: 'contain',
              opacity: 0.6,
            }}
          />
          <View style={{ display: 'flex', width: '85%' }}>
            <Text style={{ textAlign: 'center', color: '#000' }}>
              You haven’t join any contests that completed recently join contest
              for any of the upcoming matches.
            </Text>
          </View>
          <View style={{ height: hp('30%'), paddingTop: 20 }}>
            <LinearGradient
              colors={['#3E57C4', '#1E2E74']}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Pressable
                onPress={() => {
                  setTabName('home');
                  navigation.navigate('Home');
                }}
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
                  VIEW UPCOMING MATCHES
                </Text>
              </Pressable>
            </LinearGradient>
          </View>
        </View>
      )}

      {/* Show matches list when matches exist */}
      {!loading && matches.length > 0 && (
        <View style={{ flex: 1 }}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 100 // Add padding if content is cut off at bottom
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={{ height: hp('100%') }}>

              {matches.map((item, index) => {
                const team1Data = teams[item.team1Id] || {
                  shortName: 'Unknown',
                  logoPath: null,
                };
                const team2Data = teams[item.team2Id] || {
                  shortName: 'Unknown',
                  logoPath: null,
                };

                return (
                  <View key={item.recordId} style={{ paddingBottom: 10 }}>
                    <View
                      style={{
                        width: wp('100%'),

                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                      }}>
                      <Pressable
                        onPress={() => {
                          dispatch(setTournamentId(item.tournamentId));
                          dispatch(setMatchShortName(item.identifier));
                          dispatch(setMatchesTeam1Id(item.team1Id));
                          dispatch(setMatchesTeam2Id(item.team2Id));
                          dispatch(setmatchId(item.recordId));
                          dispatch(setteam1ShortName(team1Data.shortName));
                          dispatch(setteam2ShortName(team2Data.shortName));
                          dispatch(setDateAndTime(item.matchTime));
                          if (item.eventStatus === 'Live') {
                            navigation.navigate('CricketLive', {
                              matchId: item.recordId,
                            });
                          } else if (item.eventStatus === 'Completed') {
                            navigation.navigate('CricketCompleted', {
                              matchId: item.recordId,
                            });
                          } else {
                            handleMatchNavigate(item.recordId);
                          }
                        }}
                        style={{
                          borderRadius: 5,
                          overflow: 'hidden',
                          width: wp('95%'),
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
                        {(item?.amountWon || 0) > 0 ? (
                          <LinearGradient
                            colors={[
                              '#fff',
                              '#fff',
                              '#fff',
                              '#fff',
                              '#fff',
                              '#fff',
                              '#d4f8d4',
                            ]}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: wp('95%'),
                              }}>
                              {/* Match Details */}
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  width: '100%',
                                }}>
                                <View
                                  style={{
                                    width: wp('70%'),
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderBottomRightRadius: 50,
                                    position: 'relative',
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
                                      }}>
                                      {item.matchType}
                                    </Text>
                                  </View>
                                  <Text
                                    style={{
                                      fontSize: hp(1.4),
                                      padding: 10,
                                      color: '#000',
                                      fontWeight: 'bold',
                                      width: '70%',
                                      justifyContent: 'flex-end',
                                      alignItems: 'flex-end',
                                    }}>
                                    {item.tournamentName}
                                  </Text>
                                </View>
                                {item.eventStatus === 'Lineups Out' && (
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
                                  }}>
                                  <View
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      width: '25%',
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
                                      }}>
                                      <View
                                        style={{
                                          width: '25%',
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
                                          }}>
                                          VS
                                        </Text>
                                      </View>

                                      <View
                                        style={{
                                          width: '25%',
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
                                        width: '100%',
                                      }}>
                                      <View
                                        style={{
                                          width: '40%',
                                          justifyContent: 'flex-end',
                                          alignItems: 'flex-end',
                                          display: 'flex',
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
                                    }}>
                                    <View style={{ padding: 2 }}>
                                      {team1Data.logoPath ? (
                                        <Image
                                          source={{
                                            uri: team2Data.logoPath,
                                            cache: 'force-cache',
                                          }}
                                          style={{
                                            width: 60,
                                            height: 65,
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
                                }}>
                                <View
                                  style={{
                                    padding: 5,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: hp(1.5),
                                      color: '#35b267',
                                      textAlign: 'center',
                                      fontWeight: 'bold',
                                    }}>
                                    {item.eventStatus}
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
                                  borderColor: '#cccccc',
                                  paddingLeft: 10,
                                }}>
                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 7,
                                    alignItems: 'center',
                                  }}>
                                  <View
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      gap: 3,
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
                                      {item.teamCount} Teams
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
                                      {item.contestCount} Contest
                                    </Text>
                                  </View>
                                </View>

                                <View style={{ paddingRight: 10, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                  <Image
                                    source={require('../../../../assets/YouWon.png')}
                                    style={{
                                      width: 20,
                                      height: 20,
                                      resizeMode: 'contain',
                                    }} />
                                  <Text
                                    style={{
                                      fontWeight: '600',
                                      fontSize: hp(1.3),
                                      color: '#35b267',
                                    }}>
                                    You won : {item.amountWon || "0"}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </LinearGradient>
                        ) : (
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              width: wp('95%'),
                            }}>
                            {/* Match Details */}
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                              }}>
                              <View
                                style={{
                                  width: wp('70%'),
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  borderBottomRightRadius: 50,
                                  position: 'relative',
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
                                    }}>
                                    {item.matchType}
                                  </Text>
                                </View>
                                <Text
                                  style={{
                                    fontSize: hp(1.4),
                                    padding: 10,
                                    color: '#000',
                                    fontWeight: 'bold',
                                    width: '70%',
                                    justifyContent: 'flex-end',
                                    alignItems: 'flex-end',
                                  }}>
                                  {item.tournamentName}
                                </Text>
                              </View>
                              {item.eventStatus === 'Lineups Out' && (
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
                                }}>
                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '25%',
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
                                    }}>
                                    <View
                                      style={{
                                        width: '25%',
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
                                        }}>
                                        VS
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        width: '25%',
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
                                      width: '100%',
                                    }}>
                                    <View
                                      style={{
                                        width: '40%',
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                        display: 'flex',
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
                                  }}>
                                  <View style={{ padding: 2 }}>
                                    {team1Data.logoPath ? (
                                      <Image
                                        source={{
                                          uri: team2Data.logoPath,
                                          cache: 'force-cache',
                                        }}
                                        style={{
                                          width: 60,
                                          height: 65,
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
                              }}>
                              <View
                                style={{
                                  padding: 5,
                                }}>
                                <Text
                                  style={{
                                    fontSize: hp(1.5),
                                    color: '#35b267',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                  }}>
                                  {item.eventStatus}
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
                                borderColor: '#cccccc',
                                paddingLeft: 10,
                              }}>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: 7,
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 3,
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
                                    {item.teamCount} Teams
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
                                    {item.contestCount} Contest
                                  </Text>
                                </View>
                              </View>

                              {/* <View style={{ paddingRight: 10, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <Image
                                  source={require('../../../../assets/YouWon.png')}
                                  style={{
                                    width: 20,
                                    height: 20,
                                    resizeMode: 'contain',
                                  }} />
                                <Text
                                  style={{
                                    fontWeight: '600',
                                    fontSize: hp(1.3),
                                    color: '#35b267',
                                  }}>
                                  You won : {item.amountWon || "0"}
                                </Text>
                              </View> */}
                            </View>
                          </View>
                        )}
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = {
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    height: '100%',


  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
};

export default CricketCompletedMatches;
