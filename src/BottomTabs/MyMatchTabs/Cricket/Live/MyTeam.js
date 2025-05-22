import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  Share,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {
  setImpactPlayerTeam,
  resetFinalPlayerSelected,
  setmatchId,
  setEditTeamRecordId,
} from '../../../../Redux/Slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../../../../envfile/api';
import axios from 'axios';

import LinearGradient from 'react-native-linear-gradient';
import Live_Completed_TeamPreview from '../../../../Models/Live_Completed_TeamPreview';

const MyTeam = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [Token, setToken] = useState();

  const [DisplayingTeams, setDisplayingTeams] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [isTeamPreviewVisible, setIsTeamPreviewVisible] = useState(false);
  const [previewData, setPreviewData] = useState();

  const UserName = useSelector(state => state.fantasy.UserName);

  const matchId = useSelector(state => state.fantasy.matchId);

  const screenWidth = Dimensions.get('window').width;

  // const screenWidth = screenWidth >= 768;

  const {height} = Dimensions.get('window');

  //  const screenWidths = screenHigh >= 768;

  const [C, setC] = useState([]);
  const [Vc, setVc] = useState([]);
  const [I, setI] = useState([]);
  const [User, setUser] = useState();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');

        setToken(token);
        if (!token) {
        }
        if (token) {
          await ListingTeam(token);
          await getUser(token);
        } else {
        }
      } catch (error) {
        setError('Unexpected error occurred.');
      }
    };

    fetchToken();
  }, []);

  const ListingTeam = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const userId = await AsyncStorage.getItem('userId');

      const body = {
        matchId: matchId,
        userId: userId,
      };

      console.log('body from MyTeam', body);

      const response = await axios.post(
        `${api}/admin/userTeams/getUserTeamsDetails`,
        body,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      console.log(
        'response from mcompleted myteam',
        response.data.userTeamsDtoList,
      );

      console.log(
        'Listing teams:',
        response.data.userTeamsDtoList.map(item => item.recordId),
      );

      const filterPlayers = response.data.userTeamsDtoList.flatMap(
        item => item.players,
      );

      // const userDet = await getUser(token,)

      const captainsExist = await getCaptain(token, filterPlayers);
      const viceCaptainExist = await getViceCaptain(token, filterPlayers);
      const impactPlayerExist = await getImpactPlayer(token, filterPlayers);
      if (captainsExist && viceCaptainExist && impactPlayerExist) {
        // console.log('displayingteams:',JSON.stringify( response.data.userTeamsDtoList));

        setDisplayingTeams(response.data.userTeamsDtoList);
      }
    } catch (error) {
      console.error('Error fetching listing teams:', error);
    } finally {
      setRefreshing(false);
    }
  };
  const getUser = async token => {
    console.log('entered getuser');

    try {
      const userId = await AsyncStorage.getItem('userId');

      const body = {
        recordId: userId,
      };

      console.log('body from MyTeam', body);

      const response = await axios.post(`${api}/admin/user/getedit`, body, {
        headers: {Authorization: `Bearer ${token}`},
      });
      const user = response.data.userDtoList[0].name;
      console.log('user:', user);

      setUser(user);
      console.log('user', user);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const getCaptain = async (token, players) => {
    try {
      const headers = {Authorization: `Bearer ${token}`};
      // Filter only captains
      const captains = players.filter(player => player.captain === true);

      // Construct request body with correct recordId mapping
      const body = {
        playerDtoList: captains.map(player => ({
          recordId: player.playerId, // Ensure correct ID mapping
        })),
      };

      const response = await axios.post(`${api}/admin/player/getedit`, body, {
        headers,
      });
      // console.log('captain details:', response.data.playerDtoList);

      setC(response.data.playerDtoList);
      return true;
    } catch (error) {
      console.error('Error fetching captain:', error);
      return false;
    } finally {
      setRefreshing(false);
    }
  };
  const getViceCaptain = async (token, players) => {
    try {
      const headers = {Authorization: `Bearer ${token}`};
      // Filter only captains
      const captains = players.filter(player => player.viceCaptain === true);

      // Construct request body with correct recordId mapping
      const body = {
        playerDtoList: captains.map(player => ({
          recordId: player.playerId, // Ensure correct ID mapping
        })),
      };

      const response = await axios.post(`${api}/admin/player/getedit`, body, {
        headers,
      });

      setVc(response.data.playerDtoList);
      return true;
    } catch (error) {
      console.error('Error fetching captain:', error);
      return false;
    } finally {
      setRefreshing(false);
    }
  };
  const getImpactPlayer = async (token, players) => {
    try {
      const headers = {Authorization: `Bearer ${token}`};
      // Filter only captains
      const captains = players.filter(player => player.impactPlayer === true);

      // Construct request body with correct recordId mapping
      const body = {
        playerDtoList: captains.map(player => ({
          recordId: player.playerId, // Ensure correct ID mapping
        })),
      };

      const response = await axios.post(`${api}/admin/player/getedit`, body, {
        headers,
      });

      setI(response.data.playerDtoList);
      return true;
    } catch (error) {
      console.error('Error fetching captain:', error);
      return false;
    } finally {
      setRefreshing(false);
    }
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this fantasy app! https://yourapp.link', // Replace with your URL or message
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // console.log('Shared with activity type: ', result.activityType);
        } else {
          // console.log('Shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        // console.log('Share dismissed.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setRefreshing(false);
    }
  };
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
    };
    console.log('data:', data);

    setPreviewData(data);
    setIsTeamPreviewVisible(true);
  };
  const onRefresh = () => {
    setRefreshing(true);
    ListingTeam();
  };

  const closeTeamPreview = () => {
    setIsTeamPreviewVisible(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 200}}
        style={{
          display: 'flex',
          flexDirection: 'column',
          // backgroundColor: "#f5f",
          padding: 15,
          // paddingBottom: 50,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Live_Completed_TeamPreview
          visible={isTeamPreviewVisible}
          onClose={closeTeamPreview}
          route={{params: {...previewData}}}
        />
        <View style={{flexDirection: 'column', gap: 10}}>
          {DisplayingTeams.length > 0
            ? DisplayingTeams.map((item, id) => {
                const captainDetails = C[id] || {}; // Match by index
                const ViceCaptainDetails = Vc[id] || {};
                const ImpactPlayerDetails = I[id] || {};

                return (
                  <Pressable
                    key={id}
                    onPress={() => {
                      handleNavigate(
                        item.players,
                        item.team1Name,
                        item.team2Name,

                        User,
                        item.points,
                        item.team1Count,
                        item.team2Count,
                        item.teamName,
                      );
                      console.log('players:', item.players);
                      console.log('team1Name:', item.team1Name);
                      console.log('team2Name:', item.team2Name);
                      console.log('team1Count:', item.team1Count);
                      console.log('team2Count:', item.team2Count);
                      console.log('username:', User);
                      console.log('points:', item.points);
                    }}
                    style={{
                      width: '100%',
                      height: height * 0.22,
                      alignItems: 'center',
                      borderRadius: 15,
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: '#d0d0d0',
                      // elevation: 5,
                      padding: 4,
                    }}>
                    <ImageBackground
                      source={require('../../../../../assets/TeamPreview.png')}
                      resizeMode="cover"
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                        overflow: 'hidden',
                      }}>
                      {/* Header Section */}
                      <View
                        style={{
                          flexDirection: 'row',
                          padding: 10,
                          justifyContent: 'space-between',
                          backgroundColor: '#0101013d',
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                        }}>
                        {/* Team Name and User */}
                        <View
                          style={{
                            flexDirection: 'row',
                            width: screenWidth * 0.3,
                            //justifyContent: 'space-evenly',
                            alignItems: 'center',
                            gap: 5,
                          }}>
                          <Text
                            style={{fontWeight: 'bold', color: '#fff'}}
                            numberOfLines={1}>
                            {item.name || 'Unknown User'}
                          </Text>
                          <View
                            style={{
                              width: screenWidth * 0.05,
                              height: height * 0.02,
                              backgroundColor: '#fff',
                              borderRadius: 2,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                color: '#000',
                                fontSize: hp(1.2),
                              }}
                              numberOfLines={1}>
                              {item.teamName}
                            </Text>
                          </View>
                        </View>

                        {/* Action Icons */}
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '15%',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            // backgroundColor: "#196",
                          }}>
                          {/* <Pressable
                                                   onPress={() => {
                                                     dispatch(setEditTeamRecordId(item.recordId));
                                                     handleEdit(item.recordId, item.matchId);
                                                   }}
                                                   >
                                                   <MaterialCommunityIcons
                                                     name="pencil"
                                                     size={20}
                                                     color="#fff"
                                                   />
                                                 </Pressable>
                                                 <Pressable
                                                   onPress={() => {
                                                     dispatch(setEditTeamRecordId(item.recordId));
                                                     handleCopy(item.recordId, item.matchId);
                                                   }}>
                                                   <MaterialCommunityIcons
                                                     name="content-copy"
                                                     size={20}
                                                     color="#fff"
                                                   />
                                                 </Pressable> */}
                          <Pressable onPress={onShare}>
                            <MaterialCommunityIcons
                              name="share-outline"
                              size={25}
                              color="#fff"
                            />
                          </Pressable>
                        </View>
                      </View>

                      {/* Player Info Section */}
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          padding: 10,
                          // backgroundColor: '#129',
                          justifyContent: 'space-evenly',
                          alignItems: 'center',
                          // gap: 5,
                        }}>
                        {/* Captain */}
                        <View
                          style={{
                            width: '25%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // backgroundColor: '#188',
                          }}>
                          {captainDetails && (
                            <View
                              style={{
                                alignItems: 'center',
                                position: 'relative',
                                width: '100%',
                              }}>
                              <View
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  right: 60,
                                  backgroundColor: '#000',
                                  borderRadius: 20,
                                  paddingHorizontal: 5,
                                  paddingVertical: 2,
                                }}>
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    fontSize: hp(1.4),
                                  }}>
                                  C
                                </Text>
                              </View>
                              <Image
                                source={{uri: captainDetails.playerImagePath}}
                                style={{
                                  height: height * 0.06,
                                  width: screenWidth * 0.15,
                                }}
                              />
                              <View
                                style={{
                                  width: '75%',
                                  backgroundColor:
                                    captainDetails.teamDto?.teamColor || '#fff',
                                  borderRadius: 5,
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    color:
                                      captainDetails.teamDto?.textColor ||
                                      '#000',
                                    fontSize: hp(1.3),
                                    fontWeight: 'bold',
                                  }}
                                  numberOfLines={1}>
                                  {captainDetails.shortName}
                                </Text>
                              </View>
                            </View>
                          )}
                        </View>

                        {/* Vice Captain & Impact Player */}
                        <View
                          style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            width: '100%',
                            // backgroundColor: '#f5f',
                            // padding:5,
                            gap: 10,
                          }}>
                          {/* Vice Captain */}
                          {ViceCaptainDetails && (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 5,
                                width: '100%',
                                // marginBottom: 5,
                                // backgroundColor: '#f5f',
                              }}>
                              <View
                                style={{
                                  backgroundColor: '#000',
                                  borderRadius: 10,
                                  padding: 5,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  width: '20%',
                                }}>
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    fontSize: hp(1.2),
                                  }}>
                                  VC
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: '#000',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: 3,
                                  paddingHorizontal: 5,
                                  // paddingVertical: 2,
                                  width: '60%',
                                  gap: 5,
                                }}>
                                <Image
                                  source={{
                                    uri: ViceCaptainDetails.playerImagePath,
                                  }}
                                  style={{
                                    height: height * 0.03,
                                    width: screenWidth * 0.06,
                                    resizeMode: 'contain',
                                  }}
                                />
                                {/* <View
                                                      style={{
                                                        backgroundColor:
                                                          ViceCaptainDetails.teamDto?.teamColor ||
                                                          '#fff',
                                                        borderRadius: 2,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        paddingHorizontal: 3,
                                                      }}>
                                                      <Text
                                                        style={{
                                                          color:
                                                            ViceCaptainDetails.teamDto?.textColor ||
                                                            '#000',
                                                          fontSize: hp(1.1),
                                                          fontWeight: 'bold',
                                                        }}
                                                        numberOfLines={1}>
                                                        {ViceCaptainDetails.shortName}
                                                      </Text>
                                                    </View> */}
                                <View
                                  style={{
                                    borderRadius: 2,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 3,
                                  }}>
                                  <Text
                                    style={{
                                      color: '#fff',
                                      fontSize: hp(1.1),
                                      fontWeight: 'bold',
                                    }}
                                    numberOfLines={1}>
                                    {ViceCaptainDetails.shortName}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          )}

                          {/* Impact Player */}
                          {ImpactPlayerDetails && (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 5,
                                width: '100%',
                                // marginBottom: 5,
                                // backgroundColor: '#f5f',
                              }}>
                              <View
                                style={{
                                  backgroundColor: '#000',
                                  borderRadius: 10,
                                  padding: 5,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  width: '20%',
                                }}>
                                <Image
                                  source={require('../../../../../assets/ImpactPreviewNotSelected.png')}
                                  style={{width: 15, height: 15}}
                                />
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  backgroundColor: '#000',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: 3,
                                  paddingHorizontal: 5,
                                  // paddingVertical: 2,
                                  width: '60%',
                                  gap: 5,
                                }}>
                                <Image
                                  source={{
                                    uri: ImpactPlayerDetails.playerImagePath,
                                  }}
                                  style={{
                                    height: height * 0.03,
                                    width: screenWidth * 0.06,
                                    resizeMode: 'contain',
                                  }}
                                />
                                {/* <View
                                                      style={{
                                                        backgroundColor:
                                                          ImpactPlayerDetails.teamDto?.teamColor ||
                                                          '#fff',
                                                        borderRadius: 2,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        paddingHorizontal: 3,
                                                      }}>
                                                      <Text
                                                        style={{
                                                          color:
                                                            ImpactPlayerDetails.teamDto
                                                              ?.textColor || '#000',
                                                          fontSize: hp(1.1),
                                                          fontWeight: 'bold',
                                                        }}
                                                        numberOfLines={1}>
                                                        {ImpactPlayerDetails.shortName}
                                                      </Text>
                                                    </View> */}
                                <View
                                  style={{
                                    borderRadius: 2,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 3,
                                  }}>
                                  <Text
                                    style={{
                                      color: '#fff',
                                      fontSize: hp(1.1),
                                      fontWeight: 'bold',
                                    }}
                                    numberOfLines={1}>
                                    {ImpactPlayerDetails.shortName}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          )}
                        </View>

                        <View
                          style={{
                            display: 'flex',
                            width: '30%',
                            flexDirection: 'column',
                            // padding: 5,
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            gap: 0,
                          }}>
                          <View
                            style={{
                              display: 'flex',
                              width: '100%',
                              flexDirection: 'row',
                              justifyContent: 'center',

                              alignItems: 'center',
                              // backgroundColor: '#0101013d',
                              padding: 2,
                            }}>
                            <Text
                              style={{
                                color: '#c0c0c0',
                                fontSize: hp(1.5),
                              }}>
                              Points
                            </Text>
                          </View>
                          <View
                            style={{
                              display: 'flex',
                              width: '100%',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              // backgroundColor: '#0101013d',
                              padding: 2,
                            }}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                fontSize: hp(2),
                              }}>
                              {item.points || '0'}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* Score */}

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          // backgroundColor: '#f5f5f5', // corrected color
                          width: '100%',
                          paddingVertical: 8,
                        }}>
                        {/* Wicket Keeper */}
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '25%',
                          }}>
                          <Text
                            style={{
                              color: '#c0c0c0',
                              fontSize: hp(1.6),
                              marginRight: 5,
                            }}>
                            WK
                          </Text>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#fff',
                              fontSize: hp(1.6),
                            }}>
                            {item.wicketKeeperCount}
                          </Text>
                        </View>

                        {/* Batsman */}
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '25%',
                          }}>
                          <Text
                            style={{
                              color: '#c0c0c0',
                              fontSize: hp(1.6),
                              marginRight: 5,
                            }}>
                            BAT
                          </Text>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#fff',
                              fontSize: hp(1.6),
                            }}>
                            {item.batsManCount}
                          </Text>
                        </View>

                        {/* All Rounder */}
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '25%',
                          }}>
                          <Text
                            style={{
                              color: '#c0c0c0',
                              fontSize: hp(1.6),
                              marginRight: 5,
                            }}>
                            AR
                          </Text>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#fff',
                              fontSize: hp(1.6),
                            }}>
                            {item.allRounderCount}
                          </Text>
                        </View>

                        {/* Bowler */}
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '25%',
                          }}>
                          <Text
                            style={{
                              color: '#c0c0c0',
                              fontSize: hp(1.6),
                              marginRight: 5,
                            }}>
                            BOWL
                          </Text>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#fff',
                              fontSize: hp(1.6),
                            }}>
                            {item.bowlerCount}
                          </Text>
                        </View>
                      </View>
                    </ImageBackground>
                  </Pressable>
                );
              })
            : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyTeam;

const styles = StyleSheet.create({});
