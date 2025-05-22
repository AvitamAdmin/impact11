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
  BackHandler,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import {
  setImpactPlayerTeam,
  resetFinalPlayerSelected,
  setmatchId,
  setEditTeamRecordId,
} from '../../../Redux/Slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../../envfile/api';
import axios from 'axios';
import ContestHeader from '../ContestHeader';
import { load } from 'npm';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MyTeamTeamPreview from '../../../Models/MyTeamTeamPreview';
import { RefreshControl } from 'react-native-gesture-handler';



const MyTeam = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [Token, setToken] = useState();

  const [DisplayingTeams, setDisplayingTeams] = useState([]);

  const UserName = useSelector(state => state.fantasy.UserName);

  const matchId = useSelector(state => state.fantasy.matchId);

  const screenWidth = Dimensions.get('window').width;

  const [refreshing, setRefreshing] = useState(false);

  // const screenWidth = screenWidth >= 768;

  const { height } = Dimensions.get('window');

  //  const screenWidths = screenHigh >= 768;

  const [C, setC] = useState([]);
  const [Vc, setVc] = useState([]);
  const [I, setI] = useState([]);
  const [isTeamPreviewVisible, setIsTeamPreviewVisible] = useState(false);
  const [selectedTeamRecordId, setSelectedTeamRecordId] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');

        setToken(token);
        if (!token) {
        }
        if (token) {
          await ListingTeam(token);
        } else {
        }
      } catch (error) {
        setError('Unexpected error occurred.');
      }
    };

    fetchToken();
  }, []);

  const ListingTeam = async token => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      setLoading(true);
      const body = {
        matchId: matchId,
        userId: userId,
      };

      console.log('body from MyTeam', body);

      const response = await axios.post(
        `${api}/admin/userTeams/getUserTeamsDetails`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // console.log(
      //   'Listing teams:',
      //   response.data.userTeamsDtoList.map(item => item.recordId),
      // );



      const filterPlayers = response.data.userTeamsDtoList.flatMap(
        item => item.players,
      );

      const captainsExist = await getCaptain(token, filterPlayers);
      const viceCaptainExist = await getViceCaptain(token, filterPlayers);
      const impactPlayerExist = await getImpactPlayer(token, filterPlayers);
      if (captainsExist && viceCaptainExist && impactPlayerExist) {
        console.log(
          'displayingteams:',
          JSON.stringify(response.data.userTeamsDtoList),
        );

        setDisplayingTeams(response.data.userTeamsDtoList);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching listing teams:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    ListingTeam(Token);
  };

  const getCaptain = async (token, players) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
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
    }
  };
  const getViceCaptain = async (token, players) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
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
    }
  };
  const getImpactPlayer = async (token, players) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
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
    }
  };
 const onShare = async () => {
  try {
    const result = await Share.share({
      message: `Check out my Imapact 11 team! 🔥\nView team: https://myfantasyapp.com/team/view`,
    });

    if (result.action === Share.sharedAction) {
      console.log('Team shared successfully!');
    }
  } catch (error) {
    console.error('Error sharing team:', error);
  }
};

  const handleEdit = (TeamRecordId, editMatchId) => {
    // console.log('dispatching teamRecordId in myTeam:', TeamRecordId);

    navigation.navigate('EditUserTeam', { TeamRecordId, editMatchId });
    // navigation.navigate('CreateTeam')
  };
  const handleCopy = (TeamRecordId, editMatchId) => {
    // console.log('dispatching teamRecordId:', TeamRecordId);

    navigation.navigate('CopyTeam', { TeamRecordId, editMatchId });
    // navigation.navigate('CreateTeam')
  };
  const handleTeamPreview = TeamRecordId => {
    console.log('Opening preview for team:', TeamRecordId); // Add this for debugging
    setSelectedTeamRecordId(TeamRecordId);
    setIsTeamPreviewVisible(true);
  };

  const closeTeamPreview = () => {
    setIsTeamPreviewVisible(false);
    setSelectedTeamRecordId(null);
  };

  useEffect(() => {
    const backAction = () => {
      if (isTeamPreviewVisible) {
        closeTeamPreview(); // Close the team preview modal if it's open
        return true; // Prevent default back behavior
      }

      navigation.navigate('ContestScreen'); // Navigate to the ContestScreen
      return true; // Prevent default back behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Cleanup on unmount
  }, [isTeamPreviewVisible, navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ContestHeader />
      <MyTeamTeamPreview
        visible={isTeamPreviewVisible}
        onClose={closeTeamPreview}
        route={{ params: { TeamRecordId: selectedTeamRecordId } }}
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 200 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fff',
          padding: 10,
          // paddingBottom: 50,

          minHeight: '100%',
        }}>
        {loading ? (
          <View style={{ padding: 5, gap: 5 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 20,
                // marginTop: 15,
              }}>
              {[...Array(6)].map((_, index) => (
                <SkeletonPlaceholder key={index} borderRadius={8} gap={10}>
                  <View
                    style={{
                      backgroundColor: '#FFF',
                      borderWidth: 2, // Overall border
                      borderColor: '#DDD', // Border color
                      shadowColor: '#000',
                      shadowOpacity: 0.1,
                      shadowRadius: 5,
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '100%',
                      justifyContent: 'flex-start',
                      elevation: 5,
                    }}>
                    <View
                      style={{ width: '100%', height: 35, borderRadius: 0 }}
                    />
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
                        <View
                          style={{
                            width: '60%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{ width: 55, height: 55, borderRadius: 999 }}
                          />
                          <View
                            style={{ width: 55, height: 55, borderRadius: 999 }}
                          />
                        </View>
                        <View
                          style={{
                            width: '40%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{ width: 55, height: 55, borderRadius: 999 }}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '100%',
                          justifyContent: 'space-around',
                          alignItems: 'center',
                          // paddingTop: 10,
                        }}>
                        <View style={{ width: '40%', height: 20 }} />
                        <View style={{ width: '40%', height: 20 }} />
                      </View>
                    </View>
                  </View>
                </SkeletonPlaceholder>
              ))}
            </View>
          </View>
        ) : (
          <View style={{ flexDirection: 'column', gap: 10 }}>
            {DisplayingTeams.length > 0 ? (
              DisplayingTeams.map((item, id) => {
                const captainDetails = C[id] || {}; // Match by index
                const ViceCaptainDetails = Vc[id] || {};
                const ImpactPlayerDetails = I[id] || {};

                return (
                  <Pressable
                    key={id}
                    onPress={() => handleTeamPreview(item.recordId)}
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
                      source={require('../../../../assets/TeamPreview.png')}
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
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{ fontWeight: 'bold', color: '#fff' }}
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
                            width: '30%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Pressable
                            onPress={() => {
                              dispatch(setEditTeamRecordId(item.recordId));
                              handleEdit(item.recordId, item.matchId);
                            }}>
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
                          </Pressable>
                          <Pressable onPress={onShare}>
                            <MaterialCommunityIcons
                              name="share-outline"
                              size={20}
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
                          padding: wp(3),
                          justifyContent: 'space-evenly',
                          alignItems: 'center',
                        }}>
                        {/* Captain */}
                        <View style={{ flex: 1, alignItems: 'center' }}>
                          {captainDetails && (
                            <View
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                              }}>
                              {/* "C" Badge */}
                              <View
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  right: wp(15),
                                  backgroundColor: '#000',
                                  borderRadius: 20,
                                  paddingHorizontal: wp(1.5),
                                  paddingVertical: hp(0.3),
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

                              {/* Player Image */}
                              <Image
                                source={{ uri: captainDetails.playerImagePath }}
                                style={{
                                  height: hp(6),
                                  width: wp(15),
                                  resizeMode: 'contain',
                                }}
                              />

                              {/* Player Name */}
                              <View
                                style={{
                                  width: '80%',
                                  backgroundColor:
                                    captainDetails.teamDto?.teamColor || '#fff',
                                  borderRadius: 5,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  paddingVertical: hp(0.3),
                                  marginTop: hp(0.5),
                                }}>
                                <Text
                                  style={{
                                    width: '100%',
                                    color:
                                      captainDetails.teamDto?.textColor ||
                                      '#000',
                                    fontSize: hp(1.3),
                                    fontWeight: 'bold',
                                    textAlign: 'center',
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
                            flex: 2,
                            justifyContent: 'space-evenly',
                            alignItems: 'flex-start',
                            gap: hp(2),
                            // backgroundColor: '#0101013d',
                          }}>
                          {ViceCaptainDetails && (
                            <View
                              style={{
                                width: '75%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: wp(2),
                              }}>
                              {/* VC Tag */}
                              <View
                                style={{
                                  backgroundColor: '#000',
                                  width: wp(6),
                                  height: wp(6),
                                  borderRadius: 5,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: hp(1.4),
                                  }}>
                                  VC
                                </Text>
                              </View>

                              {/* VC Details */}
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  backgroundColor: '#000',
                                  paddingVertical: hp(0.4),
                                  paddingHorizontal: wp(2),
                                  borderRadius: 5,
                                  flex: 1,
                                  gap: wp(2),
                                }}>
                                <Image
                                  source={{
                                    uri: ViceCaptainDetails.playerImagePath,
                                  }}
                                  style={{
                                    height: hp(2.2),
                                    width: wp(5),
                                    borderRadius: 5,
                                    resizeMode: 'contain',
                                  }}
                                />

                                <Text
                                  style={{
                                    width: '80%',
                                    // backgroundColor: '#f5f',
                                    color: '#fff',
                                    fontSize: hp(1.3),
                                    fontWeight: 'bold',
                                    flexShrink: 1,
                                  }}
                                  numberOfLines={1}>
                                  {ViceCaptainDetails.shortName}
                                </Text>
                              </View>
                            </View>
                          )}

                          {ImpactPlayerDetails && (
                            <View
                              style={{
                                width: '75%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: wp(2),
                              }}>
                              {/* Impact Icon */}
                              <View
                                style={{
                                  backgroundColor: '#000',
                                  width: wp(6),
                                  height: wp(6),
                                  borderRadius: 5,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={require('../../../../assets/ImpactPreviewNotSelected.png')}
                                  style={{ width: wp(4.5), height: wp(4.5) }}
                                />
                              </View>

                              {/* Impact Details */}
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  backgroundColor: '#000',
                                  paddingVertical: hp(0.4),
                                  paddingHorizontal: wp(2),
                                  borderRadius: 5,
                                  flex: 1,
                                  gap: wp(2),
                                }}>
                                <View>
                                  <Image
                                    source={{
                                      uri: ImpactPlayerDetails.playerImagePath,
                                    }}
                                    style={{
                                      height: hp(2.2),
                                      width: wp(5),
                                      borderRadius: 5,
                                      resizeMode: 'contain',
                                    }}
                                  />
                                </View>

                                <Text
                                  style={{
                                    width: '80%',
                                    // backgroundColor: '#f5f',
                                    color: '#fff',
                                    fontSize: hp(1.3),
                                    fontWeight: 'bold',
                                    flexShrink: 1,
                                  }}
                                  numberOfLines={1}>
                                  {ImpactPlayerDetails.shortName}
                                </Text>
                              </View>
                            </View>
                          )}
                        </View>

                        {/* Team Counts */}
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            gap: hp(1),
                          }}>
                          {[
                            { name: item.team1Name, count: item.team1Count },
                            { name: item.team2Name, count: item.team2Count },
                          ].map((team, index) => (
                            <View
                              key={index}
                              style={{
                                width: '80%',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                                padding: hp(0.5),
                              }}>
                              <Text
                                style={{ color: '#c0c0c0', fontSize: hp(1.5) }}>
                                {team.name}
                              </Text>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color: '#fff',
                                  fontSize: hp(1.6),
                                }}>
                                {team.count}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>

                      {/* Score Breakdown Section */}
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                          paddingVertical: hp(1),
                        }}>
                        {[
                          ['WK', item.wicketKeeperCount],
                          ['BAT', item.batsManCount],
                          ['AR', item.allRounderCount],
                          ['BOWL', item.bowlerCount],
                        ].map(([label, count], index) => (
                          <View
                            key={index}
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
                                marginRight: wp(1.5),
                              }}>
                              {label}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                fontSize: hp(1.6),
                              }}>
                              {count}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </ImageBackground>
                  </Pressable>
                );
              })
            ) : (
              <View
                style={{
                  width: wp('90%'),
                  height: hp('100%'),
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: 15,
                  paddingTop: 40,
                  // backgroundColor:"#f5f"
                }}>
                <View style={{ padding: 1 }}>
                  <Image
                    source={require('../../../../assets/CreateTeam.png')}
                    style={{ height: hp('37%'), width: wp('75%') }}
                  />
                </View>
                <View style={{ width: '55%' }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#000',
                    }}>
                    You haven’t created a team yet! Create and start winning
                  </Text>
                </View>
                <Pressable
                  onPress={() => {
                    dispatch(resetFinalPlayerSelected());
                    navigation.navigate('CreateTeam');
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
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
                    CREATE TEAM
                  </Text>
                </Pressable>
              </View>
            )}


          </View>


        )}
      </ScrollView>

      {DisplayingTeams.length > 0 && (
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            alignItems: 'center',
            padding: 15,
            // backgroundColor: '#0101013d',
          }}>
          <Pressable
            onPress={() => {
              dispatch(resetFinalPlayerSelected());
              navigation.navigate('CreateTeam');
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              width: '50%',
              backgroundColor: '#383838',
              elevation: 10,
              padding: 15,
              borderRadius: 25,
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
              CREATE TEAM
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MyTeam;

const styles = StyleSheet.create({});
