import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Tooltip from 'react-native-walkthrough-tooltip';

import * as Progress from 'react-native-progress';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ContestHeader from './ContestHeader';
import { api } from '../../envfile/api';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  setcontestId,
  setEditTeamRecordId,
  setuserTeamId,
} from '../../Redux/Slice';
import MaskedView from '@react-native-masked-view/masked-view';
import JoinContestPopup from '../../Models/JoinContestPopup';

const MyContest = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [Token, setToken] = useState();
  const [contestData, setContestData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(''); // Add error state
  const [Dropdown, setDropdown] = useState({});
  const { teamCount } = route.params;
  const [SelectedImpactPlayer, setSelectedImpactPlayer] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedEntryFee, setSelectedEntryFee] = useState(null);
  const [currentTeamId, setCurrentTeamId] = useState([]);
  const [contestJoinedId, setcontestJoinedId] = useState();
  const [tooltipVisible, setTooltipVisible] = useState(null);

  const userTeamId = useSelector(state => state.fantasy.userTeamId);
  const walletBalance = useSelector(state => state.fantasy.WalletBalance);

  const UserName = useSelector(state => state.fantasy.UserName);
  const matchId = useSelector(state => state.fantasy.matchId);

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        setToken(token);
        if (token) {
          await ListingContest(token);
        } else {
          setError('No token found.');
        }
      } catch (error) {
        setError('Unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  const ListingContest = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const userId = await AsyncStorage.getItem('userId');

      const body = {
        userId: userId,
        matchId: matchId,
      };
      // console.log('body from user contest', body);

      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.post(
        `${api}/admin/contestJoined/getUserContests`,
        body,
        { headers },
      );
      // console.log(
      //   'user contest',
      //   JSON.stringify(response.data.contestJoinedDtoList),
      // );
      // console.log('user contest', response.data.contestJoinedDtoList);
      setContestData(response.data.contestJoinedDtoList);
    } catch (error) {
      // console.error('Error fetching contest data:', error);
      setError('Error fetching contest data.');
    }
  };
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = id => {
    setOpenDropdownId(prevId => (prevId === id ? null : id));
  };

  const handleTeamPreview = TeamRecordId => {
    navigation.navigate('MyTeam_TeamPreview', { TeamRecordId });
  };
  const handleEdit = (TeamRecordId, editMatchId) => {
    navigation.navigate('EditUserTeam', { TeamRecordId, editMatchId });
  };

  const handleContestDetailsNavigate = async (contestId) => {
    const userId = await AsyncStorage.getItem('userId');
    navigation.navigate('ContestDetailScreen', {
      recordId: contestId,
      matchId: matchId, // make sure this is defined in your scope
      userId: userId,
    });
    dispatch(setcontestId(contestId));
  };
  


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ContestHeader />
      <View
        style={{
          flex: 1,
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          backgroundColor: '#fFf',
        }}>
        {loading ? (
          <View style={{ padding: 10, gap: 5 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 10,
              }}>
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
        ) : error ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: hp('50%'),
            }}>
            <Image
              source={require('../../../assets/Break.png')}
              style={{
                width: '50%',
                height: '30%',
                resizeMode: 'contain',
              }}
            />
            <View style={{ display: 'flex', width: '50%', height: '5%' }}>
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
            <View style={{ display: 'flex', width: '50%', height: '5%' }}>
              <Text style={{ textAlign: 'center', color: '#666666' }}>
                Something Went Wrong
              </Text>
            </View>
            <LinearGradient
              colors={['#3E57C4', '#1E2E74']}
              style={{
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Pressable
                onPress={() => ListingContest()}
                style={{
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
        ) : contestData.length > 0 ? (
          <ScrollView>
            {contestData.map((data, index) => {
              // console.log("amount:", data.contestDto.winningsAmount.toLocaleString('en-IN', {
              //       minimumFractionDigits: 2,
              //       maximumFractionDigits: 2
              //     }))

              return (
                <View style={{ flexDirection: 'column', width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: 5 }}>
                  <View key={index} style={{ flexDirection: 'column', width: "95%", display: "flex", justifyContent: "center", alignItems: "center" }} >
                    <Pressable
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderWidth: 1,
                        // borderLeftWidth:1,
                        // borderRightWidth:1,
                        // borderBottomLeftRadius:0,
                        // borderBottomRightRadius:0,
                        borderColor: '#CCCCCC',
                        borderRadius: 10,
                        padding: 10,
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 5

                      }}
                      onPress={() => {
                        handleContestDetailsNavigate(data.recordId); // make sure `data` is defined
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
                                  ₹{' '}
                                  {data.contestDto.winningsAmount.toLocaleString(
                                    'en-IN',
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    },
                                  )}
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
                                  ₹{' '}
                                  {data.contestDto.winningsAmount.toLocaleString(
                                    'en-IN',
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    },
                                  )}
                                </Text>
                              </LinearGradient>
                            </MaskedView>
                          </View>
                        </View>

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
                            <Text style={{ fontSize: hp(1.3), color: '#000' }}>
                              Guaranteed
                            </Text>
                          </View>
                        )}

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
                              ₹
                              {data.contestDto.winningsAmount.toLocaleString(
                                'en-IN',
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                },
                              )}
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
                                Max {data.contestDto.maxTeamsPerUser} entries per user
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
                                    Upto {data.contestDto.maxTeamsPerUser}
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
                            {data.contestDto.winPercentage.toLocaleString(
                              'en-IN',
                              {},
                            )}
                            %
                          </Text>
                        </View>
                        <View
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
                            <Image
                              source={require('../../../assets/Flexible.png')}
                              style={{ width: 17, height: 15 }}
                            />
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

                      {/* Progress Section */}
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          gap: 2,
                          width: '100%',
                          alignItems: 'center',
                          // padding: 3,
                        }}>
                        <Progress.Bar
                          progress={data.contestDto.filledSlots}
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
                            {data.contestDto.remainingSlots} Spots Left
                          </Text>
                          <Text style={{ fontSize: hp(1.3), color: '#000' }}>
                            {data.contestDto.maxTeams} Spots
                          </Text>
                        </View>
                      </View>

                      {openDropdownId === data.id ? (
                        <View
                          key={index}
                          style={{
                            // display: 'flex',
                            flexDirection: 'column',
                            gap: 15,
                            // borderBottomWidth: 1,
                            // borderLeftWidth:1,
                            // borderRightWidth:1,
                            // borderTopLeftRadius:0,
                            // borderTopRightRadius:0,
                            // borderBottomLeftRadius:8,
                            // borderBottomRightRadius:8,
                            // borderColor: '#CCCCCC',
                            // borderRadius: 10,
                            // padding:5,
                            width: "100%",
                          }}

                        >
                          <View
                            style={{
                              flexDirection: 'row',
                              display: 'flex',
                              width: '100%',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              //  backgroundColor:"#f5f",
                            }}>
                            <View
                              key={data.id}
                              style={{
                                flexDirection: 'row',
                                display: 'flex',
                                // padding: 7,
                                alignItems: 'center',
                                //  backgroundColor:"#528",
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  gap: 5,
                                  alignItems: 'center',
                                }}>
                                <View style={{ flexDirection: "column", gap: 5 }}>
                                  <View>
                                    {
                                      data.userTeamsDtos.length == 1 ? <Text style={{ color: '#000', fontWeight: 600 }}>
                                        Joined with {data.userTeamsDtos.length} team
                                      </Text> : <Text style={{ color: '#000', fontWeight: 600 }}>
                                        Joined with {data.userTeamsDtos.length} teams
                                      </Text>
                                    }

                                  </View>
                                  <View
                                    style={{ flexDirection: "row", gap: 5 }}
                                  >
                                    {data.userTeamsDtos.map((item, index) => {
                                      return (
                                        <View
                                          key={index}
                                          style={{ width: "20%", flexDirection: "row", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#4c4c4c", borderRadius: 5 }}>
                                          <Text style={{ color: "#fff", padding: 2, fontSize: 10, fontWeight: 700 }}>{item.teamName}</Text>
                                        </View>
                                      );
                                    })}

                                  </View>
                                </View>


                              </View>
                            </View>
                            <Pressable
                              onPress={() => {
                                // console.log('data.recordIkd:', data.recordId);

                                toggleDropdown(data.id);
                              }}>
                              {openDropdownId ? (
                                <Entypo
                                  name="chevron-up"
                                  size={24}
                                  color="#000"
                                />
                              ) : (
                                <Entypo
                                  name="chevron-down"
                                  size={24}
                                  color="#000"
                                />
                              )}
                            </Pressable>
                          </View>
                          <View style={{ width: '100%', }}>

                            {data.userTeamsDtos.map((item, index) => {
                              return (
                                <Pressable
                                  key={index}
                                  onPress={() => handleTeamPreview(item.recordId)}
                                  style={{
                                    flexDirection: 'column',
                                    backgroundColor: '#ecf0ff',
                                    borderRadius: 5,
                                    padding: 10,
                                    gap: 10,
                                    marginBottom: 10,
                                  }}>
                                  {/* Header with Team title and edit icon */}
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      // backgroundColor:"#f5f"
                                    }}>
                                    <Text style={{ color: '#000' }}>Team</Text>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        gap: 5,
                                        alignItems: 'center',
                                      }}>
                                      <Pressable
                                        style={{ flexDirection: 'row', gap: 15 }}
                                        onPress={() => {
                                          dispatch(
                                            setEditTeamRecordId(item.recordId),
                                          );
                                          handleEdit(item.recordId, item.matchId);
                                        }}
                                        length>
                                        <Octicons
                                          name="pencil"
                                          size={16}
                                          color="#000"
                                        />
                                      </Pressable>
                                      {teamCount > 1 && (
                                        <Pressable
                                          key={index}
                                          onPress={() => {
                                            dispatch(
                                              setEditTeamRecordId(item.recordId),
                                            );
                                            navigation.navigate('SwapTeam', {
                                              recordId: item.recordId,
                                              contestJoinedId:
                                                item.contestJoinedId,
                                              teamCount: teamCount,
                                            });
                                            // console.log(
                                            //   'teamRecordIdswap:',
                                            //   item.recordId,
                                            // );
                                          }}>
                                          <MaterialCommunityIcons
                                            name="swap-horizontal"
                                            size={20}
                                            color="black"
                                          />
                                        </Pressable>
                                      )}
                                    </View>
                                  </View>

                                  {/* Players Info Section */}
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      padding: 5,
                                      borderRadius: 5,
                                    }}>
                                    {/* Captain */}
                                    <View
                                      style={{
                                        flexDirection: 'column',
                                        gap: 5,
                                        alignItems: 'center',
                                      }}>
                                      <View
                                        style={{ flexDirection: 'row', gap: 5 }}>
                                        <View
                                          style={{
                                            backgroundColor: '#000',
                                            borderRadius: 20,
                                            paddingVertical: 2,
                                            paddingHorizontal: 5,
                                          }}>
                                          <Text
                                            style={{
                                              fontWeight: 'bold',
                                              color: '#fff',
                                              fontSize: 10,
                                            }}>
                                            C
                                          </Text>
                                        </View>
                                        {item.players?.map((player, i) =>
                                          player.captain ? (
                                            <Text key={i} style={{ color: '#000' }}>
                                              {player.playerName}
                                            </Text>
                                          ) : null,
                                        )}
                                      </View>
                                      {item.players?.map((player, i) =>
                                        player.captain ? (
                                          <Image
                                            key={i}
                                            source={{
                                              uri:
                                                player.playerImage ||
                                                'https://cdn.sportmonks.com/images/cricket/placeholder.png',
                                            }}
                                            style={{
                                              width: 50,
                                              height: 50,
                                              // borderRadius: 20,
                                              // borderColor: '#324599',
                                              // borderWidth: 1,
                                              // backgroundColor: '#fff',
                                            }}
                                          />
                                        ) : null,
                                      )}
                                    </View>

                                    {/* Vice Captain */}
                                    <View
                                      style={{
                                        flexDirection: 'column',
                                        gap: 5,
                                        alignItems: 'center',
                                      }}>
                                      <View
                                        style={{ flexDirection: 'row', gap: 5 }}>
                                        <View
                                          style={{
                                            backgroundColor: '#000',
                                            borderRadius: 20,
                                            padding: 3,
                                          }}>
                                          <Text
                                            style={{
                                              fontWeight: 'bold',
                                              color: '#fff',
                                              fontSize: 10,
                                            }}>
                                            VC
                                          </Text>
                                        </View>
                                        {item.players?.map((player, i) =>
                                          player.viceCaptain ? (
                                            <Text key={i} style={{ color: '#000' }}>
                                              {player.playerName}
                                            </Text>
                                          ) : null,
                                        )}
                                      </View>
                                      {item.players?.map((player, i) =>
                                        player.viceCaptain ? (
                                          <Image
                                            key={i}
                                            source={{
                                              uri:
                                                player.playerImage ||
                                                'https://cdn.sportmonks.com/images/cricket/placeholder.png',
                                            }}
                                            style={{
                                              width: 50,
                                              height: 50,
                                              // borderRadius: 20,
                                              // borderColor: '#324599',
                                              // borderWidth: 1,
                                              // backgroundColor: '#fff',
                                            }}
                                          />
                                        ) : null,
                                      )}
                                    </View>

                                    {/* Impact Player */}
                                    <View
                                      style={{
                                        flexDirection: 'column',
                                        gap: 5,
                                        alignItems: 'center',
                                      }}>
                                      <View
                                        style={{ flexDirection: 'row', gap: 5 }}>
                                        <View
                                          style={{
                                            backgroundColor: '#000',
                                            borderRadius: 20,
                                            padding: 3,
                                          }}>
                                          <Image
                                            source={require('../../../assets/ImpactPreviewNotSelected.png')}
                                            style={{ width: 15, height: 15 }}
                                          />
                                        </View>
                                        {item.players?.map((player, i) =>
                                          player.impactPlayer ? (
                                            <Text key={i} style={{ color: '#000' }}>
                                              {player.playerName}
                                            </Text>
                                          ) : null,
                                        )}
                                      </View>
                                      {item.players?.map((player, i) =>
                                        player.impactPlayer ? (
                                          <Image
                                            key={i}
                                            source={{
                                              uri:
                                                player.playerImage ||
                                                'https://cdn.sportmonks.com/images/cricket/placeholder.png',
                                            }}
                                            style={{
                                              width: 50,
                                              height: 50,
                                              // borderRadius: 20,
                                              // borderColor: '#324599',
                                              // borderWidth: 1,
                                              // backgroundColor: '#fff',
                                            }}
                                          />
                                        ) : null,
                                      )}
                                    </View>
                                  </View>
                                </Pressable>
                              );
                            })}
                          </View>

                          <LinearGradient
                            colors={['#3b53bd', '#243373', '#192451']} // gradient colors
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                              borderRadius: 4,
                              padding: 1.5, // thickness of the border
                              width: '100%',
                              alignItems: 'center',
                              justifyContent: 'center',

                            }}>
                            <Pressable
                              style={{
                                backgroundColor: '#fff', // inner background
                                borderRadius: 4,
                                // paddingVertical: 10,
                                // paddingHorizontal: 20,
                                padding: 5,
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <MaskedView
                                maskElement={
                                  <Pressable
                                    onPress={async () => {
                                      if (teamCount === 0) {
                                        navigation.navigate('CreateTeam');
                                      } else if (walletBalance < data.entryFee) {
                                        navigation.navigate('ADD CASH', {
                                          walletBalance: walletBalance,
                                          entryFee: data.entryFee,
                                        });
                                      } else if (teamCount > 1) {
                                        dispatch(setcontestId(data.contestId));
                                        navigation.navigate('SelectTeam', {
                                          entryFee: data.entryFee,
                                        });
                                      } else {
                                        try {
                                          const token =
                                            await AsyncStorage.getItem(
                                              'jwtToken',
                                            );
                                          const userId =
                                            await AsyncStorage.getItem('userId');
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
                                          if (teams.length === 1) {
                                            const teamId = teams[0].recordId;
                                            // console.log(
                                            //   'Selected team ID:',
                                            //   teamId,
                                            // );
                                            setSelectedEntryFee(data.entryFee);
                                            dispatch(
                                              setcontestId(data.contestId),
                                            );
                                            // Wrap the single team ID in an array
                                            dispatch(setuserTeamId([teamId])); // Updated to handle array
                                            setCurrentTeamId([teamId]); // Updated to handle array
                                            setIsPopupVisible(true);
                                          }
                                        } catch (error) {
                                          console.error('Error:', error);
                                        }
                                      }
                                    }}
                                    style={{
                                      width: '100%',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      padding: 3,
                                      borderRadius: 5,
                                    }}>
                                    <Text
                                      style={{
                                        fontFamily: 'Roboto-Bold',
                                        fontSize: hp(1.5),
                                        color: 'black',
                                        textAlign: 'center',
                                      }}>
                                      ADD ANOTHER TEAM ₹{data.entryFee}
                                    </Text>
                                  </Pressable>
                                }>
                                <LinearGradient
                                  colors={['#3E57C4', '#1E2E74']}
                                  start={{ x: 0, y: 0 }}
                                  end={{ x: 1, y: 0 }}>
                                  <Pressable
                                    onPress={async () => {
                                      if (teamCount === 0) {
                                        navigation.navigate('CreateTeam');
                                      } else if (walletBalance < data.entryFee) {
                                        navigation.navigate('ADD CASH', {
                                          walletBalance: walletBalance,
                                          entryFee: data.entryFee,
                                        });
                                      } else if (teamCount > 1) {
                                        dispatch(setcontestId(data.contestId));
                                        navigation.navigate('SelectTeam', {
                                          entryFee: data.entryFee,
                                        });
                                      } else {
                                        try {
                                          const token =
                                            await AsyncStorage.getItem(
                                              'jwtToken',
                                            );
                                          const userId =
                                            await AsyncStorage.getItem('userId');
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
                                          if (teams.length === 1) {
                                            const teamId = teams[0].recordId;
                                            // console.log(
                                            //   'Selected team ID:',
                                            //   teamId,
                                            // );
                                            setSelectedEntryFee(data.entryFee);
                                            dispatch(
                                              setcontestId(data.contestId),
                                            );
                                            // Wrap the single team ID in an array
                                            dispatch(setuserTeamId([teamId])); // Updated to handle array
                                            setCurrentTeamId([teamId]); // Updated to handle array
                                            setIsPopupVisible(true);
                                          }
                                        } catch (error) {
                                          console.error('Error:', error);
                                        }
                                      }
                                    }}
                                    style={{
                                      width: '100%',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      padding: 3,
                                      borderRadius: 5,
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: hp(1.6),
                                        opacity: 0,
                                        fontFamily: 'Roboto-Bold',
                                      }}>
                                      ADD ANOTHER TEAM ₹{data.entryFee}
                                    </Text>
                                  </Pressable>
                                </LinearGradient>
                              </MaskedView>
                            </Pressable>
                          </LinearGradient>
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: 'row',
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            // backgroundColor:"#f5f"

                          }}>
                          <View
                            key={data.id}
                            style={{
                              flexDirection: 'row',
                              display: 'flex',
                              width: '50%',
                              // padding: 7,
                              alignItems: 'center',
                              // backgroundColor:"#f5f"
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                gap: 5,
                                alignItems: 'center',
                              }}>
                              <View style={{ flexDirection: "column", gap: 5 }}>
                                <View>
                                  {
                                    data.userTeamsDtos.length == 1 ? <Text style={{ color: '#000', fontWeight: 600 }}>
                                      Joined with {data.userTeamsDtos.length} team
                                    </Text> : <Text style={{ color: '#000', fontWeight: 600 }}>
                                      Joined with {data.userTeamsDtos.length} teams
                                    </Text>
                                  }

                                </View>
                                <View
                                  style={{ flexDirection: "row", gap: 5 }}
                                >
                                  {data.userTeamsDtos.map((item, index) => {
                                    return (
                                      <View
                                        key={index}
                                        style={{ width: "20%", flexDirection: "row", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#4c4c4c", borderRadius: 5 }}>
                                        <Text style={{ color: "#fff", padding: 2, fontSize: 10, fontWeight: 700 }}>{item.teamName}</Text>
                                      </View>
                                    );
                                  })}

                                </View>
                              </View>


                            </View>
                          </View>
                          <Pressable
                            onPress={() => {
                              // console.log('data.recordIkd:', data.recordId);

                              toggleDropdown(data.id);
                            }}
                          >
                            {openDropdownId ? (
                              <Entypo
                                name="chevron-up"
                                size={24}
                                color="#000"
                              />
                            ) : (
                              <Entypo
                                name="chevron-down"
                                size={24}
                                color="#000"
                              />
                            )}
                          </Pressable>
                        </View>
                      )}
                    </Pressable>
                    {/* <View style={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",paddingTop:0}}>
                 
                  </View> */}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View
            style={{
              width: wp('100%'),
              height: hp('100%'),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 15,
            }}>
            <View style={{}}>
              <Image
                source={require('../../.././assets/CreateTeam.png')}
                style={{ height: hp('35%'), width: wp('75%') }}
              />
            </View>
            <View style={{ width: '60%' }}>
              <Text
                style={{ textAlign: 'center', fontWeight: '600', color: '#000' }}>
                You haven’t joined any contest yet!{'   '}The contest you join
                will appear here
              </Text>
            </View>
            <Pressable
              onPress={() => {
                // dispatch(resetFinalPlayerSelected());
                navigation.goBack();
              }}
              style={{
                display: 'flex',
                flexDirection: 'row',
                // gap: 10,
                width: '50%',
                backgroundColor: '#2BC96A',
                elevation: 10,
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="plus-circle-outline"
                size={20}
                color="#fff"
              />
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: hp(1.7),
                  fontWeight: '600',
                }}>
                JOIN A CONTEST
              </Text>
            </Pressable>
          </View>
        )}
      </View>
      <JoinContestPopup
        visible={isPopupVisible}
        entryFee={selectedEntryFee}
        onClose={() => setIsPopupVisible(false)}
        userTeamId={currentTeamId.length > 0 ? currentTeamId : userTeamId}
        onDiscard={() => setIsPopupVisible(false)}
      // onSuccess={onRefresh}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: hp(2),
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: hp(2),
    color: '#606060',
  },
});

export default MyContest;
