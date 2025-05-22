import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  Image,
  RefreshControl,
  BackHandler,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../envfile/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaskedView from '@react-native-masked-view/masked-view';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';

import {
  resetFinalPlayerSelected,
  setcontestId,
  setuserTeamId,
  triggerReloadApi,
} from '../../Redux/Slice';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ContestHeader from './ContestHeader';
import LinearGradient from 'react-native-linear-gradient';
import CreateContestPopup from '../../Models/CreateContestPopup';
import JoinContestPopup from '../../Models/JoinContestPopup';
import { navigationRef } from '../../../Navigation';
import { Token } from '@mui/icons-material';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import SelectTeam from '../../Models/SelectTeam';
import Tooltip from 'react-native-walkthrough-tooltip';

const ContestScreen = ({ route }) => {
  //const { token} = route.params;
  const [Token, setToken] = useState();
  const [contestData, setContestData] = useState({});
  const [ContestNames, setContestNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teamCount, setTeamCount] = useState(null);
  const [contestCount, setContestCount] = useState(null);
  const walletBalance = useSelector(state => state.fantasy.WalletBalance);
  const [currentTeamId, setCurrentTeamId] = useState([]);
  const [filterContest, setFilterContest] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(null);
  const dispatch = useDispatch();
  const [isSingleSelection, setisSingleSelection] = useState(0);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [SelectPopup, setSelectPopup] = useState(false);
  const [selectedEntryFee, setSelectedEntryFee] = useState(null);

  const navigation = useNavigation();

  const matchId = useSelector(state => state.fantasy.matchId);
  const contestId = useSelector(state => state.fantasy.contestId);
  const userTeamId = useSelector(state => state.fantasy.userTeamId);

  useEffect(() => {
    const token = AsyncStorage.getItem('jwtToken');

    getTokenAndFetchData(token);
    ListingTeam(token);
    ListContest(token);
  }, []);

  const getTokenAndFetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      setToken(token);
      if (token) {
        await fetchContest(matchId, token);
        // await filteringContest(token);
        // await ContestTypess(token);
      } else {
        console.error('Token not found');
        setError('Authentication token not found.');
      }
    } catch (err) {
      console.error('Error during data fetching:', err);
      setError('Unexpected error occurred.');
    } finally {
      setRefreshing(false);
    }
  };

  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const fetchContest = async (matchId, token) => {
    try {
      setSkeletonLoading(true);
      const body = { matchId: matchId };
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(
        `${api}/admin/contest/getContests`,
        body,
        { headers },
      );
      // console.log('Contest from con screen new:', response.data.contests);
      setContestData(response.data.contests);
      // const contesTypeIds = response.data.contests.map(
      //   item => item.contestTypeId,
      // );
      // console.log('contesTypeIds', contesTypeIds);

      // const contestType = await axios.get(`${api}/admin/contestType/get`, {
      //   headers: {Authorization: `Bearer ${token}`},
      // });

      // console.log('ContestType names:', contestType.data.contestTypeDtoList);

      // const filteredContestTypenames =
      //   contestType.data.contestTypeDtoList.filter(item =>
      //     contesTypeIds.includes(item.recordId),
      //   );
      // console.log(
      //   'filteredContestTypenames',
      //   filteredContestTypenames.map(item => item.identifier),
      // );
      // setContestNames(filteredContestTypenames);
    } catch (error) {
      console.error('Error fetching  contest data new:', error);
      setError('Error fetching  contest data. new');
    } finally {
      setLoading(false);
      setSkeletonLoading(false);
    }
  };

  const handleContestDetailsNavigate = contestId => {
    // console.log(
    //   '🔍 Attempting to navigate to ContestDetailScreen with ContestID:',
    //   contestId,
    // );

    if (navigationRef.isReady()) {
      // console.log('✅ Navigation is ready! Navigating now...');
      navigationRef.navigate('ContestDetailScreen', { contestId });
    } else {
      // console.log('❌ Navigation is NOT ready!');
    }
  };
  const ListingTeam = async token => {
    // console.log('hitting ListingTeam api');

    try {
      const token = await AsyncStorage.getItem('jwtToken');

      const userId = await AsyncStorage.getItem('userId');
      const body = {
        userId: userId,
        matchId: matchId,
      };
      
      // console.log('body from ListingTeam', body);

      const response = await axios.post(
        `${api}/admin/userTeams/getUserTeamsDetails`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // console.log(
      //   response.data.userTeamsDtoList,
      //   'response.data.userTeamsDtoList',
      // );

      const teams = response.data.userTeamsDtoList || [];
      setTeamCount(teams.length); // Store count in state
    } catch (error) {
      console.error('Error fetching listing teams:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const [joinedContests, setJoinedContests] = useState([]);
  const [contestEntriesCount, setContestEntriesCount] = useState({});

  // console.log('joinedContests', joinedContests);
  // console.log('contestEntriesCount', contestEntriesCount);

  const ListContest = async () => {
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

  // Fetch teams when necessary (for example, on component mount):
  useEffect(() => {
    const checkUserTeam = async () => {
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
        setTeamCount(teams.length);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    checkUserTeam();
  }, [matchId]);

  useEffect(() => {
    const backAction = () => {
      if (navigationRef.isReady()) {
        if (navigationRef.isReady() && navigationRef.getCurrentRoute()?.name !== 'DrawerNavigation') {
          navigationRef.navigate('DrawerNavigation'); // Navigate to Home screen
        }
        return true; // Prevent default back behavior
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Cleanup on unmount
  }, []);


  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    const token = AsyncStorage.getItem('jwtToken');
    dispatch(triggerReloadApi(''));
    getTokenAndFetchData(token);
    ListingTeam(token);
    ListContest(token);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ContestHeader />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          padding: 10,
          justifyContent: 'flex-start',
        }}>
        {skeletonLoading ? (
          <SkeletonPlaceholder>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                width: '100%',
                paddingTop: 5,
              }}>
              <View style={{ width: 100, height: 15, borderRadius: 25 }} />
              <View style={{ width: 50, height: 15, borderRadius: 25 }} />
              <View style={{ width: 70, height: 15, borderRadius: 25 }} />
              <View style={{ width: 90, height: 15, borderRadius: 25 }} />
              <View style={{ width: 100, height: 15, borderRadius: 25 }} />
              <View style={{ width: 70, height: 15, borderRadius: 25 }} />
            </View>
          </SkeletonPlaceholder>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContentContainer}>
            {/* "All" Button */}
            <Pressable
              onPress={() => setFilterContest('')}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: filterContest === '' ? '#3E57C4' : '#fff',
                  borderColor: filterContest === '' ? '#3E57C4' : '#878787', // Active -> white, otherwise -> #878787
                },
              ]}>
              <Text
                style={{
                  color: filterContest === '' ? '#fff' : '#878787',
                  fontSize: hp(1.4),
                }}>
                All
              </Text>
            </Pressable>

            {/* Category Buttons */}
            {Object.keys(contestData).map((category, index) => (
              <Pressable
                key={index}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor:
                      filterContest === category ? '#3E57C4' : '#fff',
                    borderColor:
                      filterContest === category ? '#3E57C4' : '#878787', // Active -> white, otherwise -> #878787
                  },
                ]}
                onPress={() => setFilterContest(category)}>
                <Text
                  style={{
                    color: filterContest === category ? '#fff' : '#878787',
                    fontSize: hp(1.4),
                  }}>
                  {category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {skeletonLoading ? (
          <View style={{ padding: 10, gap: 5 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 10,
              }}>
              <SkeletonPlaceholder borderRadius={8}>
                <View style={{ width: 100, height: 15, borderRadius: 25 }} />
              </SkeletonPlaceholder>
              {[...Array(1)].map((_, index) => (
                <SkeletonPlaceholder key={index} borderRadius={8}>
                  <View
                    style={{
                      backgroundColor: '#FFF',
                      borderWidth: 1, // Overall border
                      borderColor: '#DDD', // Border color
                      shadowColor: '#000',
                      shadowOpacity: 0.1,
                      shadowRadius: 5,
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '100%',
                      justifyContent: 'flex-start',
                    }}>
                    {/* Row */}
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10,
                        padding: 20,
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View style={{ width: '25%', height: 10 }} />
                        <View style={{ width: '40%', height: 30 }} />
                        <View style={{ width: '20%', height: 20 }} />
                      </View>
                      <View style={{ width: '100%', height: 3 }} />
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: 10,
                        }}>
                        <View style={{ width: '30%', height: 10 }} />
                        <View style={{ width: '30%', height: 10 }} />
                      </View>
                    </View>
                    <View
                      style={{ width: '100%', height: 35, borderRadius: 0 }}
                    />
                  </View>
                </SkeletonPlaceholder>
              ))}
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 10,
                marginTop: 15,
              }}>
              <SkeletonPlaceholder borderRadius={8}>
                <View style={{ width: 100, height: 15, borderRadius: 25 }} />
              </SkeletonPlaceholder>
              {[...Array(4)].map((_, index) => (
                <SkeletonPlaceholder key={index} borderRadius={8}>
                  <View
                    style={{
                      backgroundColor: '#FFF',
                      borderWidth: 1, // Overall border
                      borderColor: '#DDD', // Border color
                      shadowColor: '#000',
                      shadowOpacity: 0.1,
                      shadowRadius: 5,
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '100%',
                      justifyContent: 'flex-start',
                    }}>
                    {/* Row */}
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10,
                        padding: 20,
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View style={{ width: '25%', height: 10 }} />
                        <View style={{ width: '40%', height: 30 }} />
                        <View style={{ width: '20%', height: 20 }} />
                      </View>
                      <View style={{ width: '100%', height: 3 }} />
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingTop: 10,
                        }}>
                        <View style={{ width: '30%', height: 10 }} />
                        <View style={{ width: '30%', height: 10 }} />
                      </View>
                    </View>
                    <View
                      style={{ width: '100%', height: 35, borderRadius: 0 }}
                    />
                  </View>
                </SkeletonPlaceholder>
              ))}
            </View>
          </View>
        ) : (
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              paddingBottom: 80,
            }}>
            {Object.entries(contestData)
              .filter(
                ([category]) => !filterContest || category === filterContest,
              )
              .map(([category, contestList]) => (
                <View key={category} style={{ padding: 10, gap: 10 }}>
                  <Text
                    style={{
                      fontSize: hp(1.5),
                      fontWeight: '500',
                      color: '#000',
                    }}>
                    {category}
                  </Text>

                  {contestList.map((data, index) => (
                    <Pressable
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderWidth: 1,
                        borderColor: '#CCCCCC',
                        borderRadius: 10,
                        padding: 10,
                      }}
                      onPress={() => {
                        console.log("data.recordId:",data.recordId);
                        
                        handleContestDetailsNavigate(data.recordId);
                        dispatch(setcontestId(data.recordId));
                      }}>
                      {/* Prize and Entry Fee Section */}

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            // width: '50%',
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
      {data.maxRankPrice && 
       data.maxRankPrice.length > 0 && 
       data.maxRankPrice[0].amount 
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
                                  {data.maxRankPrice &&
                                    data.maxRankPrice.length > 0
                                    ? `₹${data.maxRankPrice[0].amount}`
                                    : '₹0'}
                                </Text>
                              </LinearGradient>
                            </MaskedView>
                          </View>
                        </View>
                        {data.guaranteed ? (
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 3,
                            }}>
                            <MaterialCommunityIcons
                              name="shield-check"
                              size={18}
                              color="green"
                            />
                            <Text style={{ fontSize: hp(1.3), color: '#000' }}>
                              Guaranteed
                            </Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: 15,
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                gap: 3,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <View>
                                <Image
                                  source={require('../../../assets/Flexible.png')}
                                  style={{ width: 18, height: 16 }}
                                />
                              </View>
                              <View>
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
                        )}

                        {/* {data.guaranteed && (
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 5,
                              // justifyContent: 'flex-end',
                            }}>
                            <MaterialCommunityIcons
                              name="shield-check"
                              size={18}
                              color="green"
                            />
                            <Text style={{ fontSize: hp(1.3), color: '#000' }}>
                              Guaranteed
                            </Text>
                          </View>
                        )} */}

                        {/* Right - Entry Fee */}

                        {data.remainingSlots > 0 &&
                          ((data.maxTeamsPerUser === 1 &&
                            !joinedContests.some(
                              contest => contest.contestId === data.recordId,
                            )) ||
                            (data.maxTeamsPerUser > 1 &&
                              (contestEntriesCount[data.recordId] || 0) <
                              data.maxTeamsPerUser)) ? (
                          <LinearGradient
                            colors={['#3b53bd', '#243373', '#192451']}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={{
                              width: '20%',
                              padding: 5,
                              borderRadius: 5,
                              alignItems: 'center',
                            }}>
                            <Pressable
                              onPress={async () => {
                                try {
                                  const token = await AsyncStorage.getItem(
                                    'jwtToken',
                                  );
                                  const userId = await AsyncStorage.getItem(
                                    'userId',
                                  );

                                  const response = await axios.post(
                                    `${api}/admin/userTeams/getUserTeamsDetails`,
                                    { userId, matchId },
                                    {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    },
                                  );

                                  const teams =
                                    response.data.userTeamsDtoList || [];

                                  if (teams.length === 0) {
                                    navigation.navigate('CreateTeam');
                                    return;
                                  } else if (walletBalance < data.entryFee) {
                                    navigation.navigate('ADD CASH', {
                                      walletBalance,
                                      entryFee: data.entryFee,
                                    });
                                    return;
                                  } else if (
                                    teams.length == 1 &&
                                    data.maxTeamsPerUser == 1
                                  ) {
                                    const teamId = teams[0].recordId;
                                    setSelectedEntryFee(data.entryFee);
                                    dispatch(setcontestId(data.recordId));
                                    dispatch(setuserTeamId([teamId]));
                                    setisSingleSelection(data.maxTeamsPerUser);
                                    setCurrentTeamId([teamId]);
                                    setIsPopupVisible(true);

                                    return;
                                  } else if (
                                    teams.length > 1 &&
                                    data.maxTeamsPerUser == 1
                                  ) {
                                    dispatch(setcontestId(data.recordId));
                                    setSelectedEntryFee(data.entryFee);
                                    setisSingleSelection(data.maxTeamsPerUser);
                                    setSelectPopup(true);
                                  } else if (
                                    teams.length > 1 &&
                                    data.maxTeamsPerUser > 1
                                  ) {
                                    dispatch(setcontestId(data.recordId));
                                    setSelectedEntryFee(data.entryFee);
                                    setisSingleSelection(data.maxTeamsPerUser);
                                    setSelectPopup(true);
                                    return;
                                  } else if (data.maxTeamsPerUser > 1) {
                                    const teamId = teams[0].recordId;
                                    setSelectedEntryFee(data.entryFee);
                                    dispatch(setcontestId(data.recordId));
                                    dispatch(setuserTeamId([teamId]));
                                    setCurrentTeamId([teamId]);
                                    setisSingleSelection(data.maxTeamsPerUser);
                                    setIsPopupVisible(true);
                                    return;
                                  } else {
                                    const teamId = teams[0].recordId;
                                    dispatch(setcontestId(data.recordId));
                                    dispatch(setuserTeamId([teamId]));
                                    setCurrentTeamId([teamId]);
                                    setisSingleSelection(data.maxTeamsPerUser);
                                    setIsPopupVisible(true);
                                  }
                                } catch (error) {
                                  console.error('Join contest error:', error);
                                }
                              }}>
                              <Text style={{ fontWeight: 'bold', color: '#fff' }}>
                                ₹{data.entryFee}
                              </Text>
                            </Pressable>
                          </LinearGradient>
                        ) : (
                          <View
                            style={{
                              width: '20%',
                              padding: 5,
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
                      {/* Prize Pool and Max Teams */}
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          gap: 5,
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          //  backgroundColor: '#f5f',
                          padding: 10,
                        }}>
                        <View
                          style={{
                            position: 'relative',
                            flexDirection: 'row',
                            gap: 5,
                            alignItems: 'center',
                            // justifyContent: 'flex-start',
                            //  backgroundColor: '#c7c7c7c7',
                            //  width: '30%',
                          }}>
                          <View>
                            <Text
                              style={{
                                fontSize: hp(1.2),
                                // fontWeight: '600',
                                color: '#000',
                              }}>
                              Price Pool
                            </Text>
                          </View>
                          <View>
                            <Text
                              style={{
                                fontSize: hp(1.5),
                                fontWeight: '600',
                                color: '#000',
                              }}>
                              ₹{data.winningsAmount || '0'}
                            </Text>
                          </View>
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

                        {/* Win % and Flexible 
                        {data.guaranteed && (
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 5,
                              // justifyContent: 'flex-end',
                            }}>
                            <MaterialCommunityIcons
                              name="shield-check"
                              size={18}
                              color="green"
                            />
                            <Text style={{fontSize: hp(1.3), color: '#000'}}>
                              Guaranteed
                            </Text>
                          </View>
                        )}
                        */}
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
                        {/* <View
                          style={{
                            //  width: '35%',
                            flexDirection: 'row',
                            gap: 15,
                            alignItems: 'center',
                            //  justifyContent: 'flex-end',
                            // backgroundColor: '#f29',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: 3,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                           <View>
                             <Image
                              source={require('../../../assets/Flexible.png')}
                              style={{ width: 17, height: 15 }}
                            />
                           </View>
                            <View>
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
                        </View> */}
                      </View>

                      {/* Progress Section */}
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          gap: 5,
                          width: '100%',
                          alignItems: 'center',
                          // padding: 3,
                        }}>
                        <Progress.Bar
                          progress={data.filledSlots}
                          width={wp(88)}
                          height={5}
                          borderWidth={0.1}
                          backgroundColor="#bac0dd"
                        />
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '98%',
                          }}>
                          <Text style={{ color: '#D62424', fontSize: hp(1.3) }}>
                            {data.remainingSlots} Spots Left
                          </Text>
                          <Text style={{ fontSize: hp(1.3), color: '#000' }}>
                            {data.maxTeams} Spots
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  ))}
                </View>
              ))}
          </View>
        )}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          alignItems: 'center',

        }}>
        {/* Floating Action Button */}
        <Pressable
          onPress={() => {
            dispatch(resetFinalPlayerSelected());
            navigation.navigate('CreateTeam');
          }}
          style={{
            position: 'absolute',
            right: 20,
            bottom: 50,
            backgroundColor: 'black',
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
            marginBottom: 15,
          }}>
          <MaterialCommunityIcons name="plus" size={30} color="white" />
        </Pressable>

        {/* Bottom Buttons */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            backgroundColor: 'transparent',
            flex: 1,
          }}>
          <Pressable
            onPress={() => {
              // console.log('sending contestId :', contestId);

              navigation.navigate('MyContest', { teamCount });
            }}
            style={{
              backgroundColor: '#000',
              // paddingTop: 10,
              // paddingBottom: 10,
              borderRadius: 8,
              width: wp('43%'),
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 7,
              padding: 12,
              
            }}>
            <FontAwesome5 name="ticket-alt" size={17} color="#fff" />
            <Text style={{ color: '#fff', fontSize: hp(1.7), fontWeight: "bold" }}>
              MY CONTEST {contestCount > 0 ? `(${contestCount})` : ''}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('MyTeam')}
            style={{
              backgroundColor: '#000',
              // paddingTop: 10,
              // paddingBottom: 10,
              borderRadius: 8,
              width: wp('43%'),
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 7,
              padding: 12

            }}>
            <Image
              source={require('../../../assets/Jersey.png')}
              style={{ width: 25, height: 25 }}
            />
            <Text style={{ color: '#fff', fontSize: hp(1.7), fontWeight: "bold" }}>
              MY TEAMS {teamCount > 0 ? `(${teamCount})` : ''}
            </Text>
          </Pressable>
        </View>
      </View>
      <JoinContestPopup
        visible={isPopupVisible}
        entryFee={selectedEntryFee}
        onClose={() => setIsPopupVisible(false)}
        userTeamId={currentTeamId.length > 0 ? currentTeamId : userTeamId}
        onDiscard={() => setIsPopupVisible(false)}
        onSuccess={onRefresh}
      />
      <SelectTeam
        visible={SelectPopup}
        entryFee={selectedEntryFee}
        isSingleSelection={isSingleSelection}
        onClose={() => setSelectPopup(false)}
        onDiscard={() => setSelectPopup(false)}
        onSuccess={onRefresh}
      />
    </SafeAreaView>
  );
};

export default ContestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  mainContestName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  childItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
  childName: {
    fontSize: 16,
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  noData: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  scrollContentContainer: {
    alignItems: 'center',
    gap: 5,
    padding: 5,
    // backgroundColor:"#196",
  },
  scrollContainer: {
    flexGrow: 2,
    gap: 1,
    color: '#000',
    width: '90%',
    paddingHorizontal: 3,
    paddingTop: 5,

    // Shadow only at the bottom (iOS)
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 4 }, // Moves shadow downward
    // shadowOpacity: 0.2,
    // shadowRadius: 4,

    // // Elevation for bottom shadow (Android)
    // elevation: 4,
  },
  scrollDataStyle: {
    padding: 2,
    flexDirection: 'row',
    // backgroundColor:"#f5f",
    gap: 10,
  },
  filterText: {
    fontSize: hp(1.4),
    color: '#000',
    fontWeight: '300',
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 5,
  },
  scrollContentContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    borderRadius: 19,
    paddingVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
});
