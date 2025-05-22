import React, { useState, useEffect } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../envfile/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  setDateAndTime,
  setMatchesTeam1Id,
  setMatchesTeam2Id,
  setmatchId,
  setMatchShortName,
  setteam1ShortName,
  setteam2ShortName,
  setTournamentId,
} from '../Redux/Slice';
import { useNavigation } from '@react-navigation/native';
import { navigationRef } from '../../Navigation';
import LinearGradient from 'react-native-linear-gradient';

export default function RecentlyPlayed() {
  const [userMatches, setUserMatches] = useState([]);
  const [teams, setTeams] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const fetchUserMatches = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const userId = await AsyncStorage.getItem('userId');
      const body = {
        userId: userId,
      };

      // Fetch matches
      const response = await axios.post(
        `${api}/admin/matches/getMatchesByUser`,
        body,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // Ensure the response data is an array
      if (Array.isArray(response.data?.matchesDtoList)) {
        setUserMatches(response.data.matchesDtoList); // Store the fetched data in state

        // Fetch team data for all matches
        const teamIds = [
          ...new Set(
            response.data.matchesDtoList.flatMap(m => [m.team1Id, m.team2Id]),
          ),
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
      } else {
        setError('Invalid data format: Expected an array');
        setUserMatches([]); // Set to empty array to avoid errors
      }

      setLoading(false); // Set loading to false
    } catch (err) {
      console.error('Error fetching matches:', err);
      setError(err.message || 'An error occurred while fetching matches.');
      setLoading(false); // Set loading to false
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchUserMatches();
  }, []);

  // Countdown Timer Component
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

        // If we have an eventStatus and the match time has passed
        if (eventStatus && difference <= 0) {
          setDisplayText(eventStatus);
          return;
        }

        // Normal countdown logic
        const diffHours = Math.floor(difference / (1000 * 60 * 60));
        const diffDays = Math.floor(difference / (1000 * 60 * 60 * 24));

        if (diffHours < 24) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          // Only show countdown if time is in future
          if (difference > 0) {
            setDisplayText(`${hours}h ${minutes}m ${seconds}s`);
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
        ? 'Red'
        : displayText === 'Completed'
          ? 'Red'
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
  const handleMatchNavigate = matchId => {
    // console.log('🔍 Attempting to navigate to ContestScreen with matchId:', matchId);

    if (navigationRef.isReady()) {
      // console.log('✅ Navigation is ready! Navigating now...');
      navigationRef.navigate('ContestScreen', { matchId });
    } else {
      // console.log('❌ Navigation is NOT ready!');
    }
  };

  // Render loading or error states
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  // If userMatches is not an array, display a message
  if (!Array.isArray(userMatches)) {
    return <Text>No matches found or invalid data format.</Text>;
  }


  return (
    <View style={{ width: '100%' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 10,
        }}>
        <View style={{ flexDirection: 'column' }}>
          {userMatches.map(match => {
            const cardWidth = userMatches.length > 1 ? wp('75%') : wp('95%');
            const isCompleted = match.eventStatus === 'Completed';
            const isLiveOrScheduledOrLineups =
              match.eventStatus === 'Live' ||
              match.eventStatus === 'Scheduled' ||
              match.eventStatus === 'Lineups Out';

            const team1Data = teams[match.team1Id] || {
              shortName: 'Unknown',
              logo: null,
            };
            const team2Data = teams[match.team2Id] || {
              shortName: 'Unknown',
              logo: null,
            };

            return (
              <View key={match.recordId} style={{ paddingBottom: 10 }}>
                <View style={{
                  width: wp('100%'),
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
                      } else {
                        handleMatchNavigate(match.recordId);
                      }
                    }}
                    style={{
                      borderRadius: 5,
                      overflow: 'hidden',
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
                    {isCompleted && (match?.amountWon || 0) > 0 ? (
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
                        <View style={{ display: 'flex', flexDirection: 'column', width: wp('95%') }}>
                          {/* Match Details */}
                          <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                          }}>
                            <View style={{
                              width: wp('70%'),
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              borderBottomRightRadius: 50,
                              position: 'relative',
                              paddingHorizontal: 8,
                            }}>
                              <View style={{
                                backgroundColor: '#595959',
                                borderRadius: 10,
                                padding: 2,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                width: '15%',
                              }}>
                                <Text style={{
                                  fontWeight: 'bold',
                                  color: '#fff',
                                  fontSize: hp(1.2),
                                }}>
                                  {match.matchType}
                                </Text>
                              </View>
                              <Text style={{
                                fontSize: hp(1.4),
                                padding: 10,
                                color: '#000',
                                fontWeight: 'bold',
                                width: '70%',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                              }}>
                                {match.tournamentName}
                              </Text>
                            </View>
                            {match.eventStatus === 'Lineups Out' && (
                              <View style={{
                                flexDirection: 'row',
                                backgroundColor: 'rgba(25, 200, 105, 0.1)',
                                borderRadius: 12,
                                paddingHorizontal: 10,
                                paddingVertical: 4,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                                <Text style={{
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
                            <View style={{
                              width: '100%',
                              flexDirection: 'row',
                            }}>
                              <View style={{
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
                                    <View style={{
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

                              <View style={{
                                width: '50%',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                                <View style={{
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  gap: 10,
                                  width: '100%',
                                }}>
                                  <View style={{
                                    width: '25%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: 'flex',
                                  }}>
                                    <View>
                                      <Text style={{
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
                                    <Text style={{
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

                                  <View style={{
                                    width: '25%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: 'flex',
                                  }}>
                                    <View>
                                      <Text style={{
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
                                <View style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  width: '100%',
                                }}>
                                  <View style={{
                                    width: '40%',
                                    justifyContent: 'flex-end',
                                    alignItems: 'flex-end',
                                    display: 'flex',
                                  }}>
                                    <Text style={{
                                      fontSize: 10,
                                      color: '#000',
                                    }}
                                      numberOfLines={1}>
                                      {team1Data.identifier}
                                    </Text>
                                  </View>

                                  <View style={{
                                    width: '40%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    display: 'flex',
                                  }}>
                                    <Text style={{
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
                              <View style={{
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
                                    <View style={{
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
                          <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <View style={{ padding: 5 }}>
                              <Text style={{
                                fontSize: hp(1.5),
                                color: '#35b267',
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}>
                                {match.eventStatus}
                              </Text>
                            </View>
                          </View>

                          <View style={{
                            padding: 5,
                            width: wp('95%'),
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderColor: '#cccccc',
                            paddingLeft: 10,
                          }}>
                            <View style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: 7,
                              alignItems: 'center',
                            }}>
                              <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 3,
                              }}>
                                <MaterialCommunityIcons
                                  name="tshirt-v-outline"
                                  size={16}
                                  color="#000"
                                />
                                <Text style={{
                                  fontWeight: 'bold',
                                  borderRadius: 15,
                                  color: '#000',
                                  padding: 1,
                                  fontSize: hp(1.2),
                                }}>
                                  {match.teamCount} Teams
                                </Text>
                              </View>
                              <View style={{
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
                                <Text style={{
                                  fontWeight: 'bold',
                                  fontSize: hp(1.2),
                                  color: '#000',
                                }}>
                                  {match.contestCount} Contest
                                </Text>
                              </View>
                            </View>
                            {isCompleted && (match?.amountWon || 0) > 0 && (
                              <View style={{ paddingRight: 10, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                <Image
                                  source={require('../../assets/YouWon.png')}
                                  style={{
                                    width: 20,
                                    height: 20,
                                    resizeMode: 'contain',
                                  }}
                                />
                                <Text style={{
                                  fontWeight: '600',
                                  fontSize: hp(1.3),
                                  color: '#35b267',
                                }}>
                                  You won: {match.amountWon}
                                </Text>
                              </View>
                            )}
                          </View>
                        </View>
                      </LinearGradient>
                    ) : (
                      <View style={{ display: 'flex', flexDirection: 'column', width: wp('95%'), backgroundColor: "#fff" }}>
                        {/* Match Details */}
                        <View style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '100%',

                        }}>
                          <View style={{
                            width: wp('70%'),
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomRightRadius: 50,
                            position: 'relative',
                            paddingHorizontal: 8,
                          }}>
                            <View style={{
                              backgroundColor: '#595959',
                              borderRadius: 10,
                              padding: 2,
                              justifyContent: 'flex-end',
                              alignItems: 'center',
                              width: '15%',
                            }}>
                              <Text style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                fontSize: hp(1.2),
                              }}>
                                {match.matchType}
                              </Text>
                            </View>
                            <Text style={{
                              fontSize: hp(1.4),
                              padding: 10,
                              color: '#000',
                              fontWeight: 'bold',
                              width: '70%',
                              justifyContent: 'flex-end',
                              alignItems: 'flex-end',
                            }}>
                              {match.tournamentName}
                            </Text>
                          </View>
                          {match.eventStatus === 'Lineups Out' && (
                            <View style={{
                              flexDirection: 'row',
                              backgroundColor: 'rgba(25, 200, 105, 0.1)',
                              borderRadius: 12,
                              paddingHorizontal: 10,
                              paddingVertical: 4,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                              <Text style={{
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
                          <View style={{
                            width: '100%',
                            flexDirection: 'row',
                          }}>
                            <View style={{
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
                                  <View style={{
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

                            <View style={{
                              width: '50%',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                              <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 10,
                                width: '100%',
                              }}>
                                <View style={{
                                  width: '25%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  display: 'flex',
                                }}>
                                  <View>
                                    <Text style={{
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
                                  <Text style={{
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

                                <View style={{
                                  width: '25%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  display: 'flex',
                                }}>
                                  <View>
                                    <Text style={{
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
                              <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                              }}>
                                <View style={{
                                  width: '40%',
                                  justifyContent: 'flex-end',
                                  alignItems: 'flex-end',
                                  display: 'flex',
                                }}>
                                  <Text style={{
                                    fontSize: 10,
                                    color: '#000',
                                  }}
                                    numberOfLines={1}>
                                    {team1Data.identifier}
                                  </Text>
                                </View>

                                <View style={{
                                  width: '40%',
                                  justifyContent: 'flex-start',
                                  alignItems: 'flex-start',
                                  display: 'flex',
                                }}>
                                  <Text style={{
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
                            <View style={{
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
                                  <View style={{
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
                        <View style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <View style={{ padding: 5 }}>
                            <Text style={{
                              fontSize: hp(1.5),
                              color: isLiveOrScheduledOrLineups ? 'red' : '#35b267',
                              textAlign: 'center',
                              fontWeight: 'bold',
                            }}>
                              {match.eventStatus}
                            </Text>
                          </View>
                        </View>

                        <View style={{
                          padding: 5,
                          width: wp('95%'),
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderColor: '#cccccc',
                          paddingLeft: 10,
                        }}>
                          <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 7,
                            alignItems: 'center',
                          }}>
                            <View style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: 3,
                            }}>
                              <MaterialCommunityIcons
                                name="tshirt-v-outline"
                                size={16}
                                color="#000"
                              />
                              <Text style={{
                                fontWeight: 'bold',
                                borderRadius: 15,
                                color: '#000',
                                padding: 1,
                                fontSize: hp(1.2),
                              }}>
                                {match.teamCount} Teams
                              </Text>
                            </View>
                            <View style={{
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
                              <Text style={{
                                fontWeight: 'bold',
                                fontSize: hp(1.2),
                                color: '#000',
                              }}>
                                {match.contestCount} Contest
                              </Text>
                            </View>
                          </View>
                          {/* 
                          {isCompleted && (
                            <View style={{ paddingRight: 10, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                              <Image
                                source={require('../../assets/YouWon.png')}
                                style={{
                                  width: 20,
                                  height: 20,
                                  resizeMode: 'contain',
                                }}
                              />
                              <Text style={{
                                fontWeight: '600',
                                fontSize: hp(1.3),
                                color: '#35b267',
                              }}>
                                You won: {match.amountWon || "0"}
                              </Text>
                            </View>
                          )} */}
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
  );
}
