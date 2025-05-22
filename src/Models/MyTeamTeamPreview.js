import React, {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
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

const MyTeamTeamPreview = ({visible, onClose, route}) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const TeamRecordId = route?.params?.TeamRecordId;
  const [SelectedImpactPlayer, setSelectedImpactPlayer] = useState([]);
  const [PlayerCount, setPlayerCount] = useState();
  const [Captain, setCaptain] = useState();
  const [ViceCaptain, setViceCaptain] = useState();
  const [Teamdata, setTeamdata] = useState([]);
  const [WicketKeepers, setWicketKeepers] = useState([]);
  const [Bowlers, setBowlers] = useState([]);
  const [Batsman, setBatsman] = useState([]);
  const [AllRounders, setAllrounders] = useState([]);
  const [timeLeft, setTimeLeft] = useState('');
  const DateAndTime = useSelector(state => state.fantasy.DateAndTime[0]);
  const [impact, setImpact] = useState();
  const [isMounted, setIsMounted] = useState(false);
  const [bgColor, setBgColor] = useState(new Animated.Value(0));
  const panY = useRef(new Animated.Value(0)).current;
  const bgOpacity = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);

  const backgroundColor = bgOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)'],
  });

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
          const ratio = Math.min(gestureState.dy / 200, 1);
          bgOpacity.setValue(ratio);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          closeModal();
        } else {
          resetPositionAnim.start();
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
      setTeamdata([]);
      setWicketKeepers([]);
      setBowlers([]);
      setBatsman([]);
      setAllrounders([]);
      setSelectedImpactPlayer([]);
      setLoading(true);
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
      Animated.timing(bgOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  let playercount;
  useEffect(() => {
    if (visible && TeamRecordId && isMounted) {
      console.log('Fetching data for team:', TeamRecordId);
      fetchData();
    }
  }, [visible, TeamRecordId, isMounted]);

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

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) throw new Error('No token found');

      console.log('Fetching data for team:', TeamRecordId);
      await fetchEditTeam(token, TeamRecordId);
    } catch (error) {
      console.error('Initialization error:', error);
    } finally {
      setLoading(false);
    }
  };

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
        {headers},
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

      setTeamdata(response.data.userTeamsDtoList);
    } catch (error) {
      console.error('Error fetching Team:', error);
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
      console.log('sdfghjhgfd', body);

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
    }
  };

  const calculateSectionHeight = players => {
    if (players.length === 0) return '0%';
    if (players.length === 4) return '25%';
    if (players.length === 1) return '20%';
    if (players.length === 3) return '25%';
    if (players.length === 2) return '25%';
    return players.length > 4 ? '35%' : '20%';
  };

  const PlayerItem = ({player}) => {
    return (
      <View
        style={{
          width: 70,
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}>
        {Captain === player.recordId && (
          <View
            style={{
              position: 'absolute',
              top: -4,
              left: -4,
              backgroundColor: '#000',
              borderRadius: 20,
              paddingHorizontal: 4,
              paddingVertical: 1,
              zIndex: 1,
            }}>
            <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 10}}>
              C
            </Text>
          </View>
        )}
        {ViceCaptain === player.recordId && (
          <View
            style={{
              position: 'absolute',
              top: -4,
              left: -4,
              backgroundColor: '#000',
              borderRadius: 20,
              paddingHorizontal: 4,
              paddingVertical: 1,
              zIndex: 1,
            }}>
            <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 10}}>
              VC
            </Text>
          </View>
        )}
        {impact === player.recordId && (
          <View
            style={{
              position: 'absolute',
              top: -4,
              left: -4,
              backgroundColor: '#000',
              borderRadius: 20,
              paddingHorizontal: 4,
              paddingVertical: 1,
              zIndex: 1,
            }}>
            <Image
              source={require('../../assets/ImpactPreviewNotSelected.png')}
              style={{width: 15, height: 15}}
            />
          </View>
        )}
        <Image
          source={{uri: player.playerImagePath}}
          style={{width: 50, height: 50, resizeMode: 'contain'}}
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
    );
  };

  const renderRoleSection = (title, players, height) => {
    if (players.length === 0) return null;

    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height,
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
            <Text style={{color: '#fff', fontWeight: '600', fontSize: 10}}>
              {title}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent:
                players.length === 1
                  ? 'center'
                  : players.length === 2
                  ? 'space-evenly'
                  : players.length === 3 || players.length === 5
                  ? 'space-between'
                  : 'space-between',
              width:
                players.length === 5
                  ? '90%'
                  : players.length === 2
                  ? '60%'
                  : '90%',
              alignItems: 'center',
            }}>
            {players
              .slice(0, players.length === 5 ? 3 : 4)
              .map((player, index) => (
                <PlayerItem key={index} player={player} />
              ))}
          </View>

          {players.length > (players.length === 5 ? 3 : 4) && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent:
                  players.length === 5 ||
                  players.length === 6 ||
                  players.length === 7
                    ? 'space-evenly'
                    : 'space-between',
                width: players.length === 6 ? '55%' : '90%',
                alignItems: 'center',
              }}>
              {players
                .slice(players.length === 5 ? 3 : 4, 8)
                .map((player, index) => (
                  <PlayerItem key={index} player={player} />
                ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="none"
      transparent
      onRequestClose={closeModal}>
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
          <View />
        </View>
        <ImageBackground
          source={require('../../assets/UpdatedTeamView.png')}
          style={{width: wp('100%'), height: hp('100%')}}>
          <View style={{height: '100%', gap: 5}}>
            {/* Header Section */}
            {Teamdata.length > 0 &&
              Teamdata.map((item, index) => {
                return (
                  <View
                    key={index}
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
                        <View
                          style={{flexDirection: 'row', gap: 10, width: '50%'}}>
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
                              {item.team1Name}
                            </Text>
                          </View>
                          <View>
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: 14,
                                fontWeight: '700',
                              }}>
                              {item.team1Count} : {item.team2Count}
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
                              {item.team2Name}
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
                              12/12
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}

            <View
              style={{
                height: '75%',
                gap: 10,
                paddingTop: 25,
                paddingBottom: 10,
              }}>
              {Teamdata.length > 0 ? (
                <View
                  style={{
                    height: '100%',
                    gap: 5,
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  {renderRoleSection(
                    'WICKET-KEEPERS',
                    WicketKeepers,
                    calculateSectionHeight(WicketKeepers),
                  )}
                  {renderRoleSection(
                    'BATTERS',
                    Batsman,
                    calculateSectionHeight(Batsman),
                  )}
                  {renderRoleSection(
                    'ALL-ROUNDERS',
                    AllRounders,
                    calculateSectionHeight(AllRounders),
                  )}
                  {renderRoleSection(
                    'BOWLERS',
                    Bowlers,
                    calculateSectionHeight(Bowlers),
                  )}
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

export default React.memo(MyTeamTeamPreview);
