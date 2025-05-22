import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {navigationRef} from '../../../../../Navigation';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../../../../envfile/api';
import axios from 'axios';
import {setcontestId} from '../../../../Redux/Slice';
import MaskedView from '@react-native-masked-view/masked-view';
import Live_Completed_TeamPreview from '../../../../Models/Live_Completed_TeamPreview';

const MyContests = ({setShowWinningTabs}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [Token, setToken] = useState();
  const [contestdata, setcontestData] = useState([]); // For list
  const [contestSummary, setContestSummary] = useState({}); // For totalWinningAmount and contestJoinedCount
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [isTeamPreviewVisible, setIsTeamPreviewVisible] = useState(false);
    const [previewData, setPreviewData] = useState();

  const screenWidth = Dimensions.get('window').width;

  const isTablet = screenWidth >= 768;
  const UserName = useSelector(state => state.fantasy.UserName);
  const matchId = useSelector(state => state.fantasy.matchId);

  useEffect(() => {
    ListingContest();
  }, []);

  const ListingContest = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem('jwtToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId || !matchId) {
        throw new Error('Missing required data');
      }

      const body = {matchId, userId};

      console.log('body from my contest', body);

      const response = await axios.post(
        `${api}/admin/contestJoined/getUserContests`,
        body,
        {headers: {Authorization: `Bearer ${token}`}},
      );

      // console.log('Full API response:', response.data.contestJoinedDtoList);

      // Check if data exists and has expected structure
      if (response.data && response.data.contestJoinedDtoList) {
        setcontestData(response.data.contestJoinedDtoList);
        setContestSummary({
          totalWinningAmount: response.data.totalWinningAmount,
          contestJoinedCount: response.data.contestJoinedCount,
        });
      } else {
        setcontestData([]);
        setContestSummary({});
      }
    } catch (error) {
      console.error('Error in ListingContest:', error);
      setError(error.message || 'Failed to load contests');
      setcontestData([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

 

  



  const handleContestDetailsNavigate = contestId => {
    setShowWinningTabs(true);
    dispatch(setcontestId(contestId));

    // If you need to navigate to a specific screen in WinningTabs:
    // navigationRef.navigate('Winning', {contestId});
  };
  const onRefresh = () => {
    setRefreshing(true);
    ListingContest();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: hp('50%'),
        }}>
        <Image
          source={require('../../../../../assets/Break.png')}
          style={{
            width: '50%',
            height: '40%',
            resizeMode: 'contain',
          }}
        />
        <View style={{display: 'flex', width: '50%', height: '5%'}}>
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
        <View style={{display: 'flex', width: '50%', height: '5%'}}>
          <Text style={{textAlign: 'center', color: '#666666'}}>
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
              shadowOffset: {width: 0, height: 2},
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
    );
  }

  if (contestdata.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No contests joined yet</Text>
        <TouchableOpacity onPress={ListingContest}>
          <Text style={styles.retryText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleNavigate = (
    players,
    team1Name,
    team2Name,
    username,
    teamPoints,
    team1Count,
    team2Count,
    teamName,
  ) => {
    let data = {
      players,
      team1Name,
      team2Name,
      username,
      teamPoints,
      team1Count,
      team2Count,
      teamName,
    }
    console.log("data:",data);
    
    setPreviewData(data);
    setIsTeamPreviewVisible(true);
   
  };

  const closeTeamPreview = () => {
    setIsTeamPreviewVisible(false);
   
  };

  
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
             <Live_Completed_TeamPreview
                    visible={isTeamPreviewVisible}
                    onClose={closeTeamPreview}
                    route={{params: {...previewData}}}
                  />
           
          <View style={{}}>
            {contestSummary && (
              <View style={{width: '100%', padding: 10, gap: 10}}>
                {contestSummary.totalWinningAmount > 0 ? (
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 5,
                      flexDirection: 'column',
                    }}>
                    <View
                      style={{
                        width: '100',
                        flexDirection: 'column',
                        borderWidth: 1,
                        borderColor: '#CCCCCC',
                        borderRadius: 8,
                        // margin: 10,
                        overflow: 'hidden',
                        padding: 2,
                        gap: 5,
                        // backgroundColor: "#fff",
                      }}>
                      <ImageBackground
                        source={require('../../../../../assets/CurrentlyWinning.png')}
                        resizeMode="cover"
                        style={{borderRadius: 10, overflow: 'hidden'}}>
                        <Pressable
                        // onPress={() => navigation.navigate('WinningsBreakup')}
                        >
                          <View
                            style={{
                              width: wp('95%'),
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: 10,
                            }}>
                            <View style={{flexDirection: 'column', gap: 5}}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontWeight: 'bold',
                                  fontSize: hp(1.5),
                                }}>
                                Currently Winning
                              </Text>
                              <Text
                                style={{
                                  color: '#0D9E47',
                                  fontWeight: 'bold',
                                  fontSize: hp(2.5),
                                }}>
                                ₹ {contestSummary.totalWinningAmount}
                              </Text>
                            </View>
                          </View>
                        </Pressable>
                      </ImageBackground>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 5,
                      flexDirection: 'column',
                    }}>
                    <View
                      style={{
                        width: '100',
                        flexDirection: 'column',
                        borderWidth: 1,
                        borderColor: '#CCCCCC',
                        borderRadius: 8,
                        // margin: 10,
                        overflow: 'hidden',
                        padding: 2,
                        gap: 5,
                        // backgroundColor: "#fff",
                      }}>
                      <ImageBackground
                        source={require('../../../../../assets/CurrentlyWinning2.png')}
                        resizeMode="cover"
                        style={{borderRadius: 10, overflow: 'hidden'}}>
                        <Pressable
                        // onPress={() => navigation.navigate('WinningsBreakup')}
                        >
                          <View
                            style={{
                              width: wp('95%'),
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: 10,
                            }}>
                            <View style={{flexDirection: 'column', gap: 5}}>
                              <Text
                                style={{
                                  color: '#000',
                                  fontWeight: 'bold',
                                  fontSize: hp(1.5),
                                }}>
                                Currently Winning
                              </Text>
                              <Text
                                style={{
                                  color: '#666666',
                                  fontWeight: '500',
                                  fontSize: hp(1.7),
                                }}>
                                Track your rank and points in the Leaderboard
                              </Text>
                            </View>
                          </View>
                        </Pressable>
                      </ImageBackground>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>

          <View style={{width: '100%', padding: 10, gap: 10}}>
            {contestdata.map(data => (
              <Pressable
                key={data.recordId}
                style={{
                  width: '100%',
                  flexDirection: 'column',
                  borderWidth: 1,
                  borderColor: '#CCCCCC',
                  borderRadius: 8,
                  // margin: 10,
                  overflow: 'hidden',
                  padding: 10,
                  gap: 10,
                }}
                onPress={() => {
                  handleContestDetailsNavigate(data.contestId);
                  dispatch(setcontestId(data.contestId));
                }}>
                {/* Prize and Entry Fee Section */}

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    // backgroundColor: '#f5f',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    //  padding: 10,
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
                            {data.contestDto?.maxRankPrice &&
                            data.contestDto?.maxRankPrice.length > 0
                              ? `₹${data.contestDto?.maxRankPrice[0].amount.toLocaleString(
                                  'en-IN',
                                )}`
                              : '₹0'}
                          </Text>
                        }>
                        <LinearGradient
                          colors={['#3E57C4', '#1E2E74']}
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}>
                          <Text
                            style={{
                              fontFamily: 'Roboto-Bold',
                              fontStyle: 'italic',
                              fontSize: 25,
                              opacity: 0,
                            }}>
                            {data.contestDto?.maxRankPrice &&
                            data.contestDto?.maxRankPrice.length > 0
                              ? `₹${data.contestDto?.maxRankPrice[0].amount.toLocaleString(
                                  'en-IN',
                                )}`
                              : '₹0'}
                          </Text>
                        </LinearGradient>
                      </MaskedView>
                    </View>
                  </View>

                  {data.amountWon > 0 && (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        gap: 3,
                      }}>
                      <View
                        style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          justifyContent: 'flex-end',
                        }}>
                        <Text
                          style={{
                            fontSize: hp(1.3),
                            color: '#000',
                          }}>
                          Currently Winning
                        </Text>
                      </View>

                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                        }}>
                        <Text
                          style={{
                            fontWeight: '500',
                            fontSize: hp(1.9),
                            color: '#0D9E47',
                          }}>
                          ₹{data.amountWon}
                        </Text>
                      </View>
                    </View>
                  )}

                  {/* Right - Entry Fee */}

                  <View
                    style={{
                      //  width: '50%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      // backgroundColor: '#f5f',
                      gap: 3,
                    }}>
                    <View
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        //  backgroundColor: '#f5f',
                      }}>
                      <Text
                        style={{
                          fontSize: hp(1.3),
                          fontWeight: '800',
                          color: '#666666',
                        }}>
                        Entry
                      </Text>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        // width: '100%',
                        // backgroundColor: '#f5f',
                      }}>
                      <View>
                        <Text
                          style={{
                            fontWeight: '800',
                            fontSize: hp(1.9),
                            color: '#000',
                            // textAlign: 'center',
                            //   width:"100%",
                          }}>
                          ₹{data.entryFee}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Prize Pool and Max Teams */}
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'column',
                    display: 'flex',
                    gap: 10,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      gap: 5,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      // backgroundColor: '#f5f',
                    }}>
                    <View
                      style={{
                        position: 'relative',
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
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
                          ₹{data.contestDto?.winningsAmount}
                        </Text>
                      </View>
                    </View>
                    {data.maxTeamsPerUser > 0 ? (
                      <>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 3,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              width: 14,
                              // height: 14,
                              borderRadius: 2,
                              borderWidth: 1,
                              justifyContent: 'flex-start',
                              alignItems: 'center',
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
                          <View style={{}}>
                            <Text
                              style={{
                                fontSize: hp(1.3),
                                fontWeight: '600',
                                color: '#000',
                              }}>
                              Upto {data.contestDto?.maxTeamsPerUser}
                            </Text>
                          </View>
                        </View>
                      </>
                    ) : (
                      <>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '15%',
                            // backgroundColor:"#129"
                          }}>
                          <View
                            style={{
                              width: 14,
                              // height: 14,
                              borderRadius: 2,
                              borderWidth: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
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
                      </>
                    )}
                    {/* Win % and Flexible */}
                    {data.contestDto?.guaranteed && (
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

                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Ionicons name="trophy-outline" size={15} color="#000" />
                      <Text
                        style={{
                          fontSize: hp(1.5),
                          fontWeight: '600',
                          color: '#000',
                        }}>
                        {data.contestDto?.winPercentage}%
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
                          source={require('../../../../../assets/Flexible.png')}
                          style={{width: 16.5, height: 15}}
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

                  {data.userTeamsDtos.map((item, index) => {
                    return (
                      <Pressable
                        key={index}
                        onPress={() => {
                          handleNavigate(
                            item.players,
                            item.team1Name,
                            item.team2Name,
                            data.userDto?.username,
                            item.points,
                            item.team1Count,
                            item.team2Count,
                            item.teamName,
                          );
                        }}
                        style={
                          {
                            // width: '100%',
                            // justifyContent: 'center',
                            // alignItems: 'center',
                          }
                        }>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            backgroundColor: '#e6e6e6',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 10,
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: '#CCCCCC',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: 8,
                              //  width: '100%',
                              alignItems: 'center',
                              // backgroundColor: '#f5f',
                            }}>
                            <View>
                              <Text
                                style={{
                                  color: '#000',
                                  fontSize: hp(1.8),
                                  fontWeight: 'bold',
                                }}>
                                {data.userDto?.name || 'Unknown name'}
                              </Text>
                            </View>
                            <View
                              style={{
                                backgroundColor: '#D9D9D9',
                                padding: 2,
                                paddingHorizontal: 3,

                                //  width: '15%',
                                borderRadius: 3,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color: '#000',
                                  fontSize: hp(1.2),
                                }}>
                                {item.teamName}
                              </Text>
                            </View>
                            {data.hasAmountWon && (
                              <View
                                style={{
                                  backgroundColor: '#d1eadb',
                                  padding: 2,
                                  paddingHorizontal: 10,
                                  borderRadius: 6,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderWidth: 1.5,
                                  borderColor: '#83cea1',
                                }}>
                                <Ionicons
                                  name="trophy-outline"
                                  size={12}
                                  color="#0D9E47"
                                  style={{
                                    fontWeight: 'bold',
                                  }}
                                />
                              </View>
                            )}
                          </View>

                          <View
                            style={
                              {
                                // backgroundColor: '#f5f',
                              }
                            }>
                            <Text
                              style={{
                                color: '#000',
                                fontSize: hp(1.8),
                                fontWeight: 'bold',
                              }}>
                              {item.points || '0'}
                            </Text>
                          </View>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: 3,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <View>
                              <Text
                                style={{fontSize: hp(1.6), color: '#C81919'}}>
                                ▼
                              </Text>
                            </View>

                            <View>
                              <Text
                                style={{
                                  color: '#000',
                                  fontSize: hp(2),
                                  fontWeight: 'bold',
                                }}>
                                #{data.rank || '0'}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
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
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  retryText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  contestCard: {
    width: '100',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    // margin: 10,
    overflow: 'hidden',
    padding: 10,
    gap: 10,
  },
  cardHeader: {
    padding: 10,
    // backgroundColor: '#f5f',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prizePoolContainer: {
    width: '25%',
  },
  prizeAmount: {
    fontWeight: 'bold',
    color: '#000',
  },
  spotsContainer: {
    width: '40%',
    alignItems: 'center',
  },
  spotsLabel: {
    fontWeight: 'bold',
    color: '#606060',
  },
  spotsValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  entryContainer: {
    width: '25%',
    alignItems: 'flex-end',
  },
  entryButton: {
    padding: 5,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  entryFee: {
    fontWeight: 'bold',
    color: '#000',
  },
  cardFooter: {
    width: wp('100%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#ebebeb',
    alignItems: 'center',
  },
  footerLeft: {
    width: wp('50%'),
    flexDirection: 'row',
    gap: 15,
  },
  footerItem: {
    width: wp('20%'),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  medalIcon: {
    borderRadius: 10,
    borderWidth: 1,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medalText: {
    fontSize: 10,
    color: '#000',
  },
  footerText: {
    fontSize: 12,
    color: '#000',
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  flexibleIcon: {
    width: 18.5,
    height: 17,
  },
});

export default MyContests;
