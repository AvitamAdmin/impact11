import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Image,
  Button,
  Platform,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {api} from '../../envfile/api';
import {
  setDateAndTime,
  setMatchesTeam1Id,
  setMatchesTeam2Id,
  setmatchId,
  setMatchShortName,
  setReferalcode,
  setteam1ShortName,
  setteam2ShortName,
  setTournamentId,
  setWalletBalance,
} from '../../Redux/Slice';
import {navigationRef} from '../../../Navigation';

const HeaderHome = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const reloadStatus = useSelector(state => state.fantasy.reloadStatus);
  const walletBalance = useSelector(state => state.fantasy.WalletBalance);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userMatches, setUserMatches] = useState([]);
  const [userDetails, setUserDetails] = useState({balance: 0});
  const [teams, setTeams] = useState({});

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

        if (difference <= 0) {
          setDisplayText(eventStatus);
          return;
        }

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

  const fetchUserMatch = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId) {
        throw new Error('Authentication tokens not found');
      }

      const body = {userId};
      const response = await axios.post(
        `${api}/admin/matches/getMatchesByUser`,
        body,
        {headers: {Authorization: `Bearer ${token}`}},
      );

      const matches = response.data?.matchesDtoList || [];
      setUserMatches(matches);

      // Fetch team data if matches exist
      if (matches.length > 0) {
        const teamIds = [
          ...new Set(matches.flatMap(m => [m.team1Id, m.team2Id])),
        ];
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
        setTeams(teamData);
      }
    } catch (error) {
      console.error('Error fetching matches:', error);
      throw error;
    }
  };

  const getReferalCodeData = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const recordId = await AsyncStorage.getItem('userId');

      if (!token || !recordId) {
        return;
      }

      const body = {recordId};
      const response = await axios.post(`${api}/admin/user/getUserById`, body, {
        headers: {Authorization: `Bearer ${token}`},
      });

      if (response.data?.userDtoList?.length > 0) {
        const userData = response.data.userDtoList[0];
        setUserDetails(userData);
        dispatch(setWalletBalance(userData.balance));
        dispatch(setReferalcode(userData.referralCode));
        await AsyncStorage.setItem(
          'walletBalance',
          JSON.stringify(userData.balance),
        );
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleMatchNavigate = matchId => {
    if (navigationRef.isReady()) {
      navigationRef.navigate('ContestScreen', {matchId});
    }
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await Promise.all([fetchUserMatch(), getReferalCodeData()]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (reloadStatus === 'reload') {
      loadData();
    }
  }, [reloadStatus]);

  if (loading) {
    return (
      <LinearGradient colors={['#000', '#192451', '#243373', '#3b53bd']}>
        <View style={{height: hp(30), justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient colors={['#000', '#192451', '#243373', '#3b53bd']}>
        <View style={{padding: 20, alignItems: 'center'}}>
          <Text style={{color: 'red', marginBottom: 10}}>{error}</Text>
          <Pressable
            onPress={loadData}
            style={{
              backgroundColor: '#3b53bd',
              padding: 10,
              borderRadius: 5,
            }}>
            <Text style={{color: 'white'}}>Retry</Text>
          </Pressable>
        </View>
      </LinearGradient>
    );
  }

  if (userMatches.length === 0) {
    return (
      <LinearGradient colors={['#000', '#192451', '#243373', '#3b53bd']}>
        <View style={{padding: 20, alignItems: 'center'}}>
          <Text style={{color: 'white'}}>No matches available</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#000', '#192451', '#243373', '#3b53bd']}
      style={{paddingTop: Platform.OS === 'ios' ? 50 : 0}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Matches</Text>
          {userMatches.length > 0 && (
            <Pressable
              style={styles.viewAllButton}
              onPress={() => navigation.navigate('Recently Played')}>
              <Text style={styles.viewAllText}>View all</Text>
              <AntDesign name="right" size={14} color="#B9BBC6" />
            </Pressable>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.matchesContainer}>
          {userMatches.slice(-3).map(match => {
            const team1Data = teams[match.team1Id] || {
              shortName: 'Unknown',
              logoPath: null,
              identifier: 'Unknown',
            };
            const team2Data = teams[match.team2Id] || {
              shortName: 'Unknown',
              logoPath: null,
              identifier: 'Unknown',
            };

            return (
              <View key={match.recordId} style={styles.matchCardContainer}>
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
                  style={styles.matchCard}>
                  <View style={styles.matchHeader}>
                    <View style={styles.matchTypeContainer}>
                      <Text style={styles.matchTypeText}>
                        {match.matchType}
                      </Text>
                    </View>
                    <Text style={styles.tournamentName}>
                      {match.tournamentName}
                    </Text>
                    {match.lineUpOut && (
                      <View style={styles.lineupOutBadge}>
                        <Text style={styles.lineupOutText}>Lineups Out</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.teamsContainer}>
                    <View style={styles.teamContainer}>
                      {team1Data.logoPath ? (
                        <Image
                          source={{uri: team1Data.logoPath}}
                          style={styles.teamLogo}
                        />
                      ) : (
                        <View style={styles.noLogoContainer}>
                          <Text style={styles.noLogoText}>No Logo</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.matchInfo}>
                      <View style={styles.teamNames}>
                        <Text style={styles.teamName}>
                          {team1Data.shortName}
                        </Text>
                        <Text style={styles.vsText}>VS</Text>
                        <Text style={styles.teamName}>
                          {team2Data.shortName}
                        </Text>
                      </View>
                      <View style={styles.teamIdentifiers}>
                        <Text style={styles.teamIdentifier} numberOfLines={1}>
                          {team1Data.identifier}
                        </Text>
                        <Text style={styles.teamIdentifier} numberOfLines={1}>
                          {team2Data.identifier}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.teamContainer}>
                      {team2Data.logoPath ? (
                        <Image
                          source={{uri: team2Data.logoPath}}
                          style={styles.teamLogo}
                        />
                      ) : (
                        <View style={styles.noLogoContainer}>
                          <Text style={styles.noLogoText}>No Logo</Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <View style={styles.countdownContainer}>
                    <CountdownTimer
                      matchTime={match.matchTime}
                      eventStatus={match.eventStatus}
                    />
                    <Text style={styles.matchTime}>
                      {match.matchTime.split(' ')[1]}
                    </Text>
                  </View>

                  <View style={styles.matchFooter}>
                    <View style={styles.statsContainer}>
                      <View style={styles.statItem}>
                        <MaterialCommunityIcons
                          name="tshirt-v-outline"
                          size={16}
                          color="#000"
                        />
                        <Text style={styles.statText}>
                          {match.teamCount} Teams
                        </Text>
                      </View>
                      <View style={styles.statItem}>
                        <MaterialCommunityIcons
                          name="ticket-confirmation-outline"
                          size={16}
                          color="#000"
                        />
                        <Text style={styles.statText}>
                          {match.contestCount} Contest
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    // flex: 1,
    // height:"100%"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  headerTitle: {
    fontWeight: '800',
    fontSize: hp(1.8),
    color: '#fff',
  },
  viewAllButton: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: hp(1.7),
    color: '#B9BBC6',
  },
  matchesContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  matchCardContainer: {
    gap: 10,
    paddingBottom: 10,
  },
  matchCard: {
    borderRadius: 5,
    overflow: 'hidden',
    width: wp('75%'),
    backgroundColor: '#fff',
    flexDirection: 'column',
    borderWidth: 0.5,
    borderColor: '#cccccc',
    ...Platform.select({
      ios: {
        shadowColor: 'red',
        shadowOpacity: 0.8,
        shadowOffset: {width: 20, height: 10},
      },
    }),
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  matchTypeContainer: {
    backgroundColor: '#595959',
    borderRadius: 10,
    padding: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '15%',
  },
  matchTypeText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: hp(1.2),
  },
  tournamentName: {
    fontSize: hp(1.4),
    padding: 10,
    color: '#000',
    fontWeight: 'bold',
    width: '70%',
  },
  lineupOutBadge: {
    flexDirection: 'row',
    backgroundColor: 'rgba(25, 200, 105, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineupOutText: {
    fontSize: hp(1.3),
    color: '#19c869',
    fontWeight: '900',
    marginLeft: 5,
  },
  teamsContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  teamContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '22%',
  },
  teamLogo: {
    width: 60,
    height: 60,
  },
  noLogoContainer: {
    width: 40,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noLogoText: {
    fontSize: hp(1.5),
  },
  matchInfo: {
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamNames: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  teamName: {
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    color: '#000',
    fontStyle: 'italic',
    fontSize: hp(2),
  },
  vsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp(1.5),
    backgroundColor: '#dfe1ec',
    width: 25,
    height: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 17.5,
  },
  teamIdentifiers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  teamIdentifier: {
    fontSize: 10,
    color: '#000',
  },
  countdownContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  matchTime: {
    fontSize: hp(1.4),
    color: '#000',
    fontWeight: '500',
  },
  matchFooter: {
    padding: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
  },
  statText: {
    fontWeight: 'bold',
    fontSize: hp(1.2),
    color: '#000',
  },
});
