import React, {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Text,
  View,
  Modal,
  Animated,
  PanResponder,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {api} from '../envfile/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EditTeampreview = ({visible, onClose, route}) => {
  const [isMounted, setIsMounted] = useState(false);

  const [bgColor, setBgColor] = useState(new Animated.Value(0));
  const panY = useRef(new Animated.Value(0)).current;
  const bgOpacity = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const [Token, setToken] = useState();
  const WicketKeepersId = useSelector(state => state.fantasy.WicketKeepers);
  const BowlersId = useSelector(state => state.fantasy.Bowlers);
  const BatsmanId = useSelector(state => state.fantasy.Batsman);
  const AllRoundersId = useSelector(state => state.fantasy.AllRounders);

  const [WicketKeepers, setWicketKeepers] = useState([]);
  const [Bowlers, setBowlers] = useState([]);
  const [Batsman, setBatsman] = useState([]);
  const [AllRounders, setAllrounders] = useState([]);
  const [timeLeft, setTimeLeft] = useState('');

  const playercount = useSelector(
    state => state.fantasy.EditFinalPlayerSelected.length,
  );
  const remindplayer = 12 - playercount;
  const player = useSelector(state => state.fantasy.EditFinalPlayerSelected);
  // console.log(player.length, 'player length');

  const impactPlayerprofile = useSelector(state => state.fantasy.impactPlayer);
  // console.log("impact player", impactPlayerprofile);

  // const allPlayers = teamsArray.flatMap((team) => team.players);
  const selectedPlayer = useSelector(
    state => state.fantasy.EditFinalPlayerSelected,
  );
  const DateAndTime = useSelector(state => state.fantasy.DateAndTime[0]);

  useEffect(() => {
    if (DateAndTime) {
      //  console.log("DateAndTime from Redux:", DateAndTime);

      const [datePart, timePart] = DateAndTime.split(' ');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hour, minute, second] = timePart.split(':').map(Number);

      const targetDate = new Date(year, month - 1, day, hour, minute, second);
      //  console.log("Parsed Target Date (Local):", targetDate);

      const interval = setInterval(() => {
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60),
          );
          setTimeLeft(`${hours}hr ${minutes}m left`);
        } else {
          setTimeLeft('Time expired');
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [DateAndTime]);

  //   const selectedPlayers = allPlayers.filter(player =>
  //     selectedPlayer.includes(player.id),
  //   );
  const [SelectedImpactPlayer, setSelectedImpactPlayer] = useState([]);

  const impactPlayer = useSelector(state => state.fantasy.impactPlayer?.[0]);
  //  console.log("impact from team preview:",impactPlayer);

  const team1count = useSelector(state => state.fantasy.selectedTeam1.length);
  const team2count = useSelector(state => state.fantasy.selectedTeam2.length);
  const team1ShortName = useSelector(state => state.fantasy.team1ShortName);
  const team2ShortName = useSelector(state => state.fantasy.team2ShortName);
  //console.log("impact from team1count:",team1count);

  const fetchPlayerList = async token => {
    // console.log('fetchPlayerList called with token in cvc screen:', token);
    try {
      const body = {
        playerDtoList: player.map(id => ({
          recordId: id,
        })),
      };
      const token = await AsyncStorage.getItem('jwtToken');
      const headers = {Authorization: `Bearer ${token}`};
      const response = await axios.post(`${api}/admin/player/getedit`, body, {
        headers,
      });

      const filteredPlayers = response.data.playerDtoList;
      // console.log("response from my team",filteredPlayers);

      const WicketKeeper = filteredPlayers.filter(item =>
        WicketKeepersId.includes(item.recordId),
      );
      setWicketKeepers(WicketKeeper);
      // console.log('wicketKeepers from teamPreview screen', WicketKeeper);

      const bowler = filteredPlayers.filter(item =>
        BowlersId.includes(item.recordId),
      );
      setBowlers(bowler);
      const batsman = filteredPlayers.filter(item =>
        BatsmanId.includes(item.recordId),
      );
      setBatsman(batsman);
      // console.log('Batsman from teamPreview screen', batsman);
      const allRounder = filteredPlayers.filter(item =>
        AllRoundersId.includes(item.recordId),
      );
      setAllrounders(allRounder);
    } catch (error) {
      console.error('Error fetching TeamPreview data:', error);
      setError('Error fetching TeamPreview data.');
    }
  };
  const fetchImpactPlayer = async (token, impactPlayer) => {
    // console.log("inside func impact: ",impactPlayer);

    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const body = {
        playerDtoList: [
          {
            recordId: impactPlayer,
          },
        ],
      };

      const headers = {Authorization: `Bearer ${token}`};
      const response = await axios.post(`${api}/admin/player/getedit`, body, {
        headers,
      });
      console.log('res of imp:', response.data.playerDtoList);

      setSelectedImpactPlayer(response.data.playerDtoList || null);

      // console.log('From Myteam - impact :', response.data.playerDtoList);
    } catch (error) {
      // console.error('Error fetching ImpactPlayer data:', error);
      setError('Error fetching Impactplayer data.');
    }
  };

  // console.log("Selected Impact player from team preview new:",SelectedImpactPlayer);

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeAnim = Animated.parallel([
    Animated.timing(panY, {
      toValue: Dimensions.get('window').height,
      duration: 300,
      useNativeDriver: true,
    }),
    Animated.timing(bgOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }),
  ]);

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
          // Update background opacity based on drag position
          const ratio = Math.min(gestureState.dy / 200, 1);
          bgOpacity.setValue(ratio);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          closeModal();
        } else {
          resetPositionAnim.start();
          // Reset background opacity
          Animated.timing(bgOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const closeModal = () => {
    closeAnim.start(() => {
      // Reset all states

      setWicketKeepers([]);
      setBowlers([]);
      setBatsman([]);
      setAllrounders([]);
      setSelectedImpactPlayer([]);

      setIsMounted(false);
      setModalVisible(false);
      onClose();
    });
  };

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      setIsMounted(true);
      panY.setValue(0);
      // Fade in background
      Animated.timing(bgOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  useEffect(() => {
    if (visible && isMounted) {
      fetchPlayerList();
      fetchImpactPlayer(impactPlayer);
    }
  }, [visible, isMounted]);

  useEffect(() => {
    if (DateAndTime) {
      const [datePart, timePart] = DateAndTime.split(' ');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hour, minute, second] = timePart.split(':').map(Number);

      const targetDate = new Date(year, month - 1, day, hour, minute, second);

      const interval = setInterval(() => {
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60),
          );
          setTimeLeft(`${hours}hr ${minutes}m left`);
        } else {
          setTimeLeft('Time expired');
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [DateAndTime]);

  const fetchEditTeam = async (token, TeamRecordId) => {
    console.log('Starting fetchEditTeam with ID:', TeamRecordId);
    console.log('entered ---');

    try {
      const body = {
        userTeamsDtoList: [
          {
            recordId: TeamRecordId,
          },
        ],
      };
      const headers = {Authorization: `Bearer ${token}`};
      const response = await axios.post(
        `${api}/admin/userTeams/getedit`,
        body,
        {
          headers,
        },
      );

      console.log('reponse:', response.data.userTeamsDtoList);

      let playersId = response.data.userTeamsDtoList[0].players.map(
        item => item.playerId,
      );

      const impact = response.data.userTeamsDtoList[0].players.find(
        player => player.impactPlayer === true,
      )?.playerId;
      setImpact(impact);
      const captain = response.data.userTeamsDtoList[0].players.find(
        player => player.captain === true,
      )?.playerId;

      setCaptain(captain);
      const viceCaptain = response.data.userTeamsDtoList[0].players.find(
        player => player.viceCaptain === true,
      )?.playerId;

      setViceCaptain(viceCaptain);

      fetchPlayerData(token, playersId, impact);
      console.log('preview:', playersId);

      playercount = playersId.length;
      setPlayerCount(playercount);
    } catch (error) {
      console.error('Error fetching  Team:', error);
    }
  };

  const fetchPlayerData = async (token, playersId, impact) => {
    console.log('entered data:', playersId);
    try {
      const body = {
        playerDtoList: playersId.map(id => ({
          recordId: id,
        })),
      };

      const headers = {Authorization: `Bearer ${token}`};
      const response = await axios.post(`${api}/admin/player/getedit`, body, {
        headers,
      });

      const filteredPlayers = response.data.playerDtoList;

      let WicketKeeper = filteredPlayers.filter(
        item => item.playerRole === 'Wicketkeeper',
      );
      setWicketKeepers(WicketKeeper);

      let bowler = filteredPlayers.filter(item => item.playerRole === 'Bowler');
      setBowlers(bowler);
      let batsman = filteredPlayers.filter(
        item => item.playerRole === 'Batsman',
      );
      setBatsman(batsman);
      let allRounder = filteredPlayers.filter(
        item => item.playerRole === 'Allrounder',
      );
      setAllrounders(allRounder);
      let impactPlayer = filteredPlayers.filter(
        item => item.recordId == impact,
      );

      setSelectedImpactPlayer(impactPlayer);
    } catch (error) {
      console.error('Error fetching TeamPreview data:', error);
      setError('Error fetching TeamPreview data.');
    }
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="none"
      transparent
      onRequestClose={closeModal}>
      {/* Background overlay */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {backgroundColor: 'black', opacity: bgOpacity},
        ]}
      />

      <Animated.View
        style={[styles.modalContainer, {transform: [{translateY: translateY}]}]}
        {...panResponders.panHandlers}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}>
          <View
            style={
              {
                // width: 40,
                // height: 5,
                // borderRadius: 5,
                // margin: 10,
                // backgroundColor: '#ccc',
              }
            }
          />
        </View>
        <ImageBackground
          source={require('../../assets/UpdatedTeamView.png')}
          style={{width: wp('100%'), height: hp('100%')}}>
          <View style={{height: '100%', gap: 5}}>
            {/* Header Section */}
            <View
              style={{
                paddingTop: 20,
                height: '10%',
                justifyContent: 'center',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '95%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center',
                    }}>
                    <View>
                      <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name="close" size={26} color="#fff" />
                      </Pressable>
                    </View>
                    <View style={{flexDirection: 'column', gap: 5}}>
                      <View>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 14,
                            fontWeight: '600',
                          }}>
                          Team Preview
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            color: '#ffffffcc',
                            fontSize: 10,
                            fontWeight: '600',
                          }}>
                          {timeLeft}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center',
                    }}>
                    <Pressable>
                      <MaterialCommunityIcons
                        name="pencil"
                        size={20}
                        color="#fff"
                      />
                    </Pressable>
                    <Pressable>
                      <MaterialCommunityIcons
                        name="share-outline"
                        size={24}
                        color="#fff"
                      />
                    </Pressable>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row', gap: 10, width: '50%'}}>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        width: '25%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 2,
                        borderRadius: 3,
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 12,
                          fontWeight: '700',
                        }}>
                        {team1ShortName}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 14,
                          fontWeight: '700',
                        }}>
                        {team1count} : {team2count}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#000',
                        width: '25%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 2,
                        borderRadius: 3,
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 12,
                          fontWeight: '700',
                        }}>
                        {team2ShortName}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 10,
                          fontWeight: '700',
                        }}>
                        PLAYERS
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 12,
                          fontWeight: '700',
                        }}>
                        {playercount}/12
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Players Section */}
            <View
              style={{
                height: '75%',
                gap: 10,
                paddingTop: 25,
                paddingBottom: 10,
              }}>
              {player.length > 0 ? (
                <View
                  style={{
                    height: '100%',
                    gap: 5,
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  {/* Wicket-Keeper Section */}

                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '25%',
                      width: '100%',
                      // backgroundColor: '#000',
                      display: 'flex',
                    }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          width: '100%',
                          height: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            padding: 2,
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: '600',
                              fontSize: 10,
                            }}>
                            WICKET-KEEPERS
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent:
                              WicketKeepers.length === 1
                                ? 'center'
                                : WicketKeepers.length === 2
                                ? 'space-evenly'
                                : WicketKeepers.length === 3 ||
                                  WicketKeepers.length === 5
                                ? 'space-between'
                                : 'space-between',
                            width:
                              WicketKeepers.length === 5
                                ? '90%'
                                : WicketKeepers.length === 2
                                ? '60%'
                                : '90%',
                            alignItems: 'center',
                          }}>
                          {WicketKeepers.slice(
                            0,
                            WicketKeepers.length === 5 ? 3 : 4,
                          ).map((player, index) => (
                            <View
                              key={index}
                              style={{
                                width: 70,
                                flexDirection: 'column',
                                alignItems: 'center',
                                position: 'relative',
                              }}>
                              <Image
                                source={{uri: player.playerImagePath}}
                                style={{
                                  width: 50,
                                  height: 50,
                                  resizeMode: 'contain',
                                }}
                              />
                              <View
                                style={{
                                  width: '100%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: 4,
                                  backgroundColor: player.teamDto?.teamColor,
                                  paddingVertical: 2,
                                }}>
                                <Text
                                  style={{
                                    fontSize: hp(1.2),
                                    fontWeight: '900',
                                    color: player.teamDto?.textColor,
                                    textAlign: 'center',
                                  }}
                                  numberOfLines={1}>
                                  {player.shortName}
                                </Text>
                              </View>
                            </View>
                          ))}
                        </View>

                        {WicketKeepers.length >
                          (WicketKeepers.length === 5 ? 3 : 4) && (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent:
                                WicketKeepers.length === 5 ||
                                WicketKeepers.length === 6 ||
                                WicketKeepers.length === 7
                                  ? 'space-evenly'
                                  : 'space-between',
                              width: WicketKeepers.length === 6 ? '55%' : '90%',
                              alignItems: 'center',
                            }}>
                            {WicketKeepers.slice(
                              WicketKeepers.length === 5 ? 3 : 4,
                              8,
                            ).map((player, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 70,
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  position: 'relative',
                                }}>
                                <Image
                                  source={{uri: player.playerImagePath}}
                                  style={{
                                    width: 50,
                                    height: 50,
                                    resizeMode: 'contain',
                                  }}
                                />
                                <View
                                  style={{
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 4,
                                    backgroundColor: player.teamDto?.teamColor,
                                    paddingVertical: 2,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 10,
                                      fontWeight: '600',
                                      color: player.teamDto?.textColor,
                                      textAlign: 'center',
                                    }}
                                    numberOfLines={1}>
                                    {player.shortName}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </View>
                        )}
                      </View>
                  </View>

                  {/* Batter Section */}
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '25%',
                      width: '100%',
                    }}>
                   <View
                        style={{
                          flexDirection: 'column',
                          width: '100%',
                          height: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            padding: 2,
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: '600',
                              fontSize: 10,
                            }}>
                            BATTERS
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent:
                              Batsman.length === 1
                                ? 'center'
                                : Batsman.length === 2
                                ? 'space-evenly'
                                : Batsman.length === 3 || Batsman.length === 5
                                ? 'space-between'
                                : 'space-between',
                            width:
                              Batsman.length === 5
                                ? '90%'
                                : Batsman.length === 2
                                ? '60%'
                                : '90%',
                            alignItems: 'center',
                          }}>
                          {Batsman.slice(0, Batsman.length === 5 ? 3 : 4).map(
                            (player, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 70,
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  position: 'relative',
                                }}>
                                <Image
                                  source={{uri: player.playerImagePath}}
                                  style={{
                                    width: 50,
                                    height: 50,
                                    resizeMode: 'contain',
                                  }}
                                />
                                <View
                                  style={{
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 4,
                                    backgroundColor: player.teamDto?.teamColor,
                                    paddingVertical: 2,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 10,
                                      fontWeight: '600',
                                      color: player.teamDto?.textColor,
                                      textAlign: 'center',
                                    }}
                                    numberOfLines={1}>
                                    {player.shortName}
                                  </Text>
                                </View>
                              </View>
                            ),
                          )}
                        </View>

                        {Batsman.length > (Batsman.length === 5 ? 3 : 4) && (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent:
                                Batsman.length === 5 ||
                                Batsman.length === 6 ||
                                Batsman.length === 7
                                  ? 'space-evenly'
                                  : 'space-between',
                              width: Batsman.length === 6 ? '55%' : '90%',
                              alignItems: 'center',
                            }}>
                            {Batsman.slice(Batsman.length === 5 ? 3 : 4, 8).map(
                              (player, index) => (
                                <View
                                  key={index}
                                  style={{
                                    width: 70,
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    position: 'relative',
                                  }}>
                                  <Image
                                    source={{uri: player.playerImagePath}}
                                    style={{
                                      width: 50,
                                      height: 50,
                                      resizeMode: 'contain',
                                    }}
                                  />
                                  <View
                                    style={{
                                      width: '100%',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderRadius: 4,
                                      backgroundColor:
                                        player.teamDto?.teamColor,
                                      paddingVertical: 2,
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 10,
                                        fontWeight: '600',
                                        color: player.teamDto?.textColor,
                                        textAlign: 'center',
                                      }}
                                      numberOfLines={1}>
                                      {player.shortName}
                                    </Text>
                                  </View>
                                </View>
                              ),
                            )}
                          </View>
                        )}
                      </View>
                  </View>
                  {/* All-Rounder Section */}
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '25%',
                      width: '100%',
                    }}>
                   <View
                        style={{
                          flexDirection: 'column',
                          width: '100%',
                          height: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            padding: 2,
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: '600',
                              fontSize: 10,
                            }}>
                            ALL-ROUNDERS
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent:
                              AllRounders.length === 1
                                ? 'center'
                                : AllRounders.length === 2
                                ? 'space-evenly'
                                : AllRounders.length === 3 ||
                                  AllRounders.length === 5
                                ? 'space-between'
                                : 'space-between',
                            width:
                              AllRounders.length === 5
                                ? '90%'
                                : AllRounders.length === 2
                                ? '60%'
                                : '90%',
                            alignItems: 'center',
                          }}>
                          {AllRounders.slice(
                            0,
                            AllRounders.length === 5 ? 3 : 4,
                          ).map((player, index) => (
                            <View
                              key={index}
                              style={{
                                width: 70,
                                flexDirection: 'column',
                                alignItems: 'center',
                                position: 'relative',
                              }}>
                              <Image
                                source={{uri: player.playerImagePath}}
                                style={{
                                  width: 50,
                                  height: 50,
                                  resizeMode: 'contain',
                                }}
                              />
                              <View
                                style={{
                                  width: '100%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: 4,
                                  backgroundColor: player.teamDto?.teamColor,
                                  paddingVertical: 2,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 10,
                                    fontWeight: '600',
                                    color: player.teamDto?.textColor,
                                    textAlign: 'center',
                                  }}
                                  numberOfLines={1}>
                                  {player.shortName}
                                </Text>
                              </View>
                            </View>
                          ))}
                        </View>

                        {AllRounders.length >
                          (AllRounders.length === 5 ? 3 : 4) && (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent:
                                AllRounders.length === 5 ||
                                AllRounders.length === 6 ||
                                AllRounders.length === 7
                                  ? 'space-evenly'
                                  : 'space-between',
                              width: AllRounders.length === 6 ? '55%' : '90%',
                              alignItems: 'center',
                            }}>
                            {AllRounders.slice(
                              AllRounders.length === 5 ? 3 : 4,
                              8,
                            ).map((player, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 70,
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  position: 'relative',
                                }}>
                                <Image
                                  source={{uri: player.playerImagePath}}
                                  style={{
                                    width: 50,
                                    height: 50,
                                    resizeMode: 'contain',
                                  }}
                                />
                                <View
                                  style={{
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 4,
                                    backgroundColor: player.teamDto?.teamColor,
                                    paddingVertical: 2,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 10,
                                      fontWeight: '600',
                                      color: player.teamDto?.textColor,
                                      textAlign: 'center',
                                    }}
                                    numberOfLines={1}>
                                    {player.shortName}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </View>
                        )}
                      </View>
                  </View>

                  {/* Bowler Section */}
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '25%',
                      width: '100%',
                    }}>
                    <View
                        style={{
                          flexDirection: 'column',
                          width: '100%',
                          height: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            padding: 2,
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: '600',
                              fontSize: 10,
                            }}>
                            BOWLERS
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent:
                              Bowlers.length === 1
                                ? 'center'
                                : Bowlers.length === 2
                                ? 'space-evenly'
                                : Bowlers.length === 3 || Bowlers.length === 5
                                ? 'space-between'
                                : 'space-between',
                            width:
                              Bowlers.length === 5
                                ? '90%'
                                : Bowlers.length === 2
                                ? '60%'
                                : '90%',
                            alignItems: 'center',
                          }}>
                          {Bowlers.slice(0, Bowlers.length === 5 ? 3 : 4).map(
                            (player, index) => (
                              <View
                                key={index}
                                style={{
                                  width: 70,
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  position: 'relative',
                                }}>
                                <Image
                                  source={{uri: player.playerImagePath}}
                                  style={{
                                    width: 50,
                                    height: 50,
                                    resizeMode: 'contain',
                                  }}
                                />
                                <View
                                  style={{
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 4,
                                    backgroundColor: player.teamDto?.teamColor,
                                    paddingVertical: 2,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 10,
                                      fontWeight: '600',
                                      color: player.teamDto?.textColor,
                                      textAlign: 'center',
                                    }}
                                    numberOfLines={1}>
                                    {player.shortName}
                                  </Text>
                                </View>
                              </View>
                            ),
                          )}
                        </View>

                        {Bowlers.length > (Bowlers.length === 5 ? 3 : 4) && (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent:
                                Bowlers.length === 5 ||
                                Bowlers.length === 6 ||
                                Bowlers.length === 7
                                  ? 'space-evenly'
                                  : 'space-between',
                              width: Bowlers.length === 6 ? '55%' : '90%',
                              alignItems: 'center',
                            }}>
                            {Bowlers.slice(Bowlers.length === 5 ? 3 : 4, 8).map(
                              (player, index) => (
                                <View
                                  key={index}
                                  style={{
                                    width: 70,
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    position: 'relative',
                                  }}>
                                  <Image
                                    source={{uri: player.playerImagePath}}
                                    style={{
                                      width: 50,
                                      height: 50,
                                      resizeMode: 'contain',
                                    }}
                                  />
                                  <View
                                    style={{
                                      width: '100%',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderRadius: 4,
                                      backgroundColor:
                                        player.teamDto?.teamColor,
                                      paddingVertical: 2,
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: hp(1.2),
                                        fontWeight: '900',
                                        color: player.teamDto?.textColor,
                                        textAlign: 'center',
                                      }}
                                      numberOfLines={1}>
                                      {player.shortName}
                                    </Text>
                                  </View>
                                </View>
                              ),
                            )}
                          </View>
                        )}
                      </View>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: hp('60%'),
                  }}>
                  <Text
                    style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                    WICKET-KEEPER
                  </Text>
                  <Text
                    style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                    BATTER
                  </Text>
                  <Text
                    style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                    ALL-ROUNDER
                  </Text>
                  <Text
                    style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                    BOWLER
                  </Text>
                </View>
              )}
            </View>

            {/* Impact Player Section */}
            <View
              style={{
                height: '15%',
                display: 'flex',
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'center',
                gap: 15,

                width: '100%',
                alignItems: 'center',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',

                  width: '100%',
                  backgroundColor: '#191B19',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  gap: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <View>
                    <Image
                      source={require('../../assets/ImpactPreviewNotSelected.png')}
                      style={{width: 38, height: 33}}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: '900',
                        fontStyle: 'italic',
                      }}>
                      IMPACT PLAYER
                    </Text>
                  </View>
                </View>
                <View>
                  {SelectedImpactPlayer && SelectedImpactPlayer.length > 0 ? (
                    SelectedImpactPlayer.map((item, id) =>
                      item && item.identifier ? (
                        <View
                          key={id}
                          style={{
                            flexDirection: 'column',
                            gap: 3,
                            alignItems: 'center',
                            paddingBottom: 5,
                          }}>
                          <Image
                            source={{uri: item.playerImagePath}}
                            style={{width: 40, height: 40, borderRadius: 25}}
                          />
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: '600',
                              fontSize: 10,
                            }}>
                            {item.shortName}
                          </Text>
                        </View>
                      ) : null,
                    )
                  ) : (
                    <Text style={{color: '#fff'}}>
                      No impact player selected
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default React.memo(EditTeampreview);
