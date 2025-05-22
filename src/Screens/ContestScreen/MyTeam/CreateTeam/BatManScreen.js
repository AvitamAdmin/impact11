import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  setfinalPlayerSelected,
  setplayerId,
  setselectedPlayerTeamId,
  setPlayerRole,
  setbatsManId,
} from './../../../../Redux/Slice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import PlayerInfo from '../../../../Models/PlayerInfo';

const BatManScreen = ({ allPlayers }) => {
  const dispatch = useDispatch();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [id, setId] = useState('');
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  const selectedPlayer = useSelector(
    state => state.fantasy.finalPlayerSelected,
  );
  const roleCounts = useSelector(state => ({
    WicketKeepers: state.fantasy.WicketKeepers.length,
    Batsman: state.fantasy.Batsman.length,
    Bowlers: state.fantasy.Bowlers.length,
    AllRounders: state.fantasy.AllRounders.length,
  }));

  const allRounders = useSelector(state => state.fantasy.AllRounders);
  const disable = useSelector(state => state.fantasy.DisableWicket);
  const totalSelected = useSelector(
    state => state.fantasy.finalPlayerSelected.length,
  );

  const isAnyRoleMaxed = Object.values(roleCounts).some(count => count >= 8);
  const isAllRoundersMaxed = roleCounts.AllRounders >= 8;

  const handleAdd = (playerId, teamID, playerRole) => {
    if (selectedPlayer.includes(playerId)) {
      dispatch(setfinalPlayerSelected({ playerId, playerRole }));
      return;
    }

    if (isAnyRoleMaxed) {
      const maxedRoles = Object.entries(roleCounts)
        .filter(([_, count]) => count >= 8)
        .map(([role]) => {
          switch (role) {
            case 'WicketKeepers':
              return 'Wicket Keeper';
            case 'Batsman':
              return 'Batsman';
            case 'Bowlers':
              return 'Bowler';
            case 'AllRounders':
              return 'All-Rounder';
            default:
              return role;
          }
        });

      showMessage({
        message: `Maximum 8 ${maxedRoles.join('/')} players selected`,
        type: 'danger',
        position: 'top',
        duration: 2000,
      });
      return;
    }

    // Check if total players reached (12)
    if (totalSelected >= 12) {
      showMessage({
        message: 'Maximum 12 players selected in team',
        type: 'danger',
        position: 'top',
        duration: 2000,
      });
      return;
    }

    // Proceed with selection
    setId(playerId);
    dispatch(setplayerId(playerId));
    dispatch(setPlayerRole(playerRole));
    dispatch(setselectedPlayerTeamId(teamID));
    dispatch(setfinalPlayerSelected({ playerId, playerRole }));
  };

  React.useEffect(() => {
    if (id) {
      dispatch(setbatsManId(id));
    }
  }, [id, dispatch]);

  if (!allPlayers) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000', '#000', '#000', '#18224e', '#3d56c2']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <View
        style={{
          // backgroundColor: '#fff',
          width: wp('100%'),
          alignItems: 'center',
          paddingBottom: 5
        }}>
        <View style={{ padding: 5 }}>
          <Text style={{ fontSize: hp(1.5), color: '#fff' }}>
            Pick 1-8 Batters
          </Text>
        </View>
        <View style={{ flexDirection: "row", width: "100%", gap: 10, paddingHorizontal: 15, paddingTop: 8 }}>
          <Pressable style={{ borderWidth: 1, borderColor: "#fff", borderRadius: 20, paddingHorizontal: 10, justifyContent: "center", alignItems: "center", paddingVertical: 2 }}>
            <Text style={{ color: "#fff", fontSize: 13 }}>
              Selected By %
            </Text>
          </Pressable>
          <Pressable style={{ borderWidth: 1, borderColor: "#fff", borderRadius: 20, paddingHorizontal: 10, justifyContent: "center", alignItems: "center", paddingVertical: 2 }}>
            <Text style={{ color: "#fff", fontSize: 13 }}>
              Points
            </Text>
          </Pressable>
          <Pressable style={{ borderWidth: 1, borderColor: "#fff", borderRadius: 20, paddingHorizontal: 10, justifyContent: "center", alignItems: "center", paddingVertical: 2 }}>
            <Text style={{ color: "#fff", fontSize: 13 }}>
              Team
            </Text>
          </Pressable>
        </View>
      </View>



      <ScrollView
        style={{
          width: wp('100%'),
          height: hp('100%'),
          paddingBottom: 50,
          padding: 15,
          gap: 5,
          display: 'flex',
          flexDirection: 'column',
        }}
        contentContainerStyle={{
          //  alignItems: 'center',

          paddingBottom: 150,
        }}>
        {Object.entries(allPlayers).map(([category, players]) => {
          const Batsman = players.filter(player => {
            if (!player.playerRole) return false;
            const role = player.playerRole.toLowerCase();
            return (
              role.includes('bat') || role.includes('man') || role === 'bat'
            );
          });

          if (Batsman.length === 0) return null;

          return (
            <View key={category} style={{ width: '100%' }}>
              <View
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: category.split('|')[1],
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    width: '35%',
                  }}>
                  {category.split('|')[0] !== 'ZZZ' && (
                    <Text
                      style={{
                        display: 'flex',
                        color: '#fff',
                        padding: 5,
                        fontSize: hp(1.3),
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}>
                      {category.split('|')[0]}
                    </Text>
                  )}
                </View>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 5,
                  width: '100%',
                }}>
                {Batsman.map(player => {
                  const shouldDisablePlayer =
                    (isAnyRoleMaxed || totalSelected >= 12) &&
                    !selectedPlayer.includes(player.recordId);

                  return (
                    <Pressable
                      key={player.recordId}
                      onPress={() =>
                        handleAdd(
                          player.recordId,
                          player.teamId,
                          player.playerRole,
                        )
                      }
                      style={{
                        flexDirection: 'row',
                        padding: 8,
                        borderRadius: 2,
                        backgroundColor: selectedPlayer.includes(
                          player.recordId,
                        )
                          ? '#555555'
                          : '#1A1A1A',
                        width: '100%',
                        alignItems: 'center',
                        gap: 8,
                        borderWidth: 0.2,
                        borderColor: '#e6e6e6',
                        opacity: shouldDisablePlayer ? 0.5 : 1,
                      }}
                      disabled={shouldDisablePlayer}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: 10,
                          width: '60%',
                          // backgroundColor:"#f3f"
                        }}>
                        <Pressable
                          onPress={() => {
                            // console.log('player:', player);
                            // console.log('recordId:', player?.recordId);
                            setSelectedPlayerId(player?.recordId);
                            setIsPopupVisible(true);
                          }}
                          style={{
                            width: '25%',
                            overflow: 'hidden',
                            position: 'relative',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // backgroundColor:'#f3f',
                          }}>
                          <Image
                            source={{
                              uri:
                                player.playerImagePath ||
                                'https://cdn.sportmonks.com/images/cricket/placeholder.png',
                            }}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 30,
                              borderColor: '#324599',
                              borderWidth: 1,
                              backgroundColor: '#000',
                            }}
                          />
                        </Pressable>
                        <View
                          style={{
                            // width: '75%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            // gap: 5,
                            //  backgroundColor: "#196"
                          }}>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: 5,
                              // backgroundColor:"#f27",
                              // width: '100%',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                            }}>
                            <View>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color: '#fff',
                                  fontSize: hp(1.6),
                                }}>
                                {player.shortName ||
                                  player.identiier ||
                                  'Player'}
                              </Text>
                            </View>
                            <View
                              style={{
                                backgroundColor:
                                  player.teamDto?.teamColor || '#000',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: wp('12%'),
                                borderRadius: wp('6%'),
                                bottom: 0,
                              }}>
                              <Text
                                style={{
                                  fontSize: hp(1.2),
                                  color: player.teamDto?.textColor || '#fff',
                                }}>
                                {player.teamDto?.shortName || player.teamId}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              //  backgroundColor: '#fff',
                              gap: 3
                            }}
                          >
                            <View
                              style={{
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                //  width: '15%',
                                // backgroundColor: '#fff',
                              }}>
                              {category.split('|')[0] !== 'ZZZ' && (
                                <Icon
                                  name="fiber-manual-record"
                                  size={14}
                                  style={{
                                    color: category.split('|')[1],
                                  }}
                                />
                              )}


                            </View>
                            <View>
                              {category.split('|')[0] !== 'ZZZ' && (
                                <Text
                                  style={{
                                    display: 'flex',
                                    color: category.split('|')[1],

                                    //  padding: 5,
                                    fontSize: hp(1.3),
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                  }}>
                                  {category.split('|')[0]}
                                </Text>
                              )}
                            </View>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '40%',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '60%',
                            gap: 5,
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            // backgroundColor:'#f3f',
                          }}>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexDirection: 'row',
                              display: 'flex',
                              gap: 5,
                              width: '100%',
                            }}>
                            <View
                              style={{
                                width: 15,
                                height: 15,
                                borderRadius: 14, // half of width/height for a perfect circle
                                backgroundColor: '#fff',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderColor: '#fff',
                                borderWidth: 1.5,
                              }}>
                              <MaterialCommunityIcons
                                name="trending-up" // use hyphen instead of underscore
                                size={12}
                                color="#000" // cfhange to your desired icon color
                              />
                            </View>

                            <View
                              style={{
                                backgroundColor: '#c0c0c0',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '70%',
                                borderRadius: wp('1%'),
                                bottom: 0,
                                padding: 5,
                              }}>
                              <Text
                                style={{
                                  fontSize: hp(1.2),
                                  color: '#000',
                                  fontWeight: 'bold',
                                }}>
                                {player.teamDto?.selectedBy || "0"} %
                              </Text>
                            </View>
                          </View>

                          <View
                            style={{
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexDirection: 'row',
                              display: 'flex',
                              gap: 5,
                              width: '100%',
                            }}>
                            <View>
                              <MaterialCommunityIcons
                                name="refresh-circle"
                                size={19}
                                color="white"
                              />
                            </View>

                            <View
                              style={{
                                backgroundColor: '#c0c0c0',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '70%',
                                borderRadius: wp('1%'),
                                bottom: 0,
                                padding: 5,
                              }}>
                              <Text
                                style={{
                                  fontSize: hp(1.2),
                                  color: '#000',
                                  fontWeight: 'bold',
                                }}>
                                {player.teamDto?.points || "0"}
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            width: '30%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Pressable
                            onPress={() =>
                              handleAdd(
                                player.recordId,
                                player.teamId,
                                player.playerRole,
                              )
                            }>
                            {selectedPlayer.includes(player.recordId) ? (
                              // Selected: Solid red background with white close icon
                              <View
                                style={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: 4,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor: '#FF5656',
                                }}>
                                <MaterialCommunityIcons
                                  name="close"
                                  size={14}
                                  color="#fff"
                                />
                              </View>
                            ) : (
                              // Not selected: Gradient background with white plus icon
                              <View
                                style={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: 4,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor: '#00b347',
                                }}>
                                <MaterialCommunityIcons
                                  name="plus"
                                  size={15}
                                  color="#fff"
                                />
                              </View>
                            )}
                          </Pressable>
                        </View>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            gap: 15,
            // justifyContent: 'space-between',
            alignItems: 'flex-start',
            // backgroundColor:'#f3f',
            paddingTop: 15,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              // width: '60%',
              gap: 5,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              // backgroundColor:'#f3f',
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                display: 'flex',
                gap: 5,
                //  width: '100%',
              }}>
              <View
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 14, // half of width/height for a perfect circle
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: '#fff',
                  borderWidth: 1.5,
                }}>
                <MaterialCommunityIcons
                  name="trending-up" // use hyphen instead of underscore
                  size={12}
                  color="#000" // cfhange to your desired icon color
                />
              </View>

              <View
                style={{
                  //  backgroundColor: '#c0c0c0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // width: '75%',
                  borderRadius: wp('1%'),
                  bottom: 0,
                  padding: 5,
                }}>
                <Text
                  style={{
                    fontSize: hp(1.5),
                    color: '#fff',
                    fontWeight: 'bold',
                  }}>
                  Selected By %
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              display: 'flex',
              gap: 5,
              //   width: '100%',
            }}>
            <MaterialCommunityIcons
              name="refresh-circle"
              size={19}
              color="white"
            />
            <View
              style={{
                //  backgroundColor: '#c0c0c0',
                justifyContent: 'center',
                alignItems: 'center',
                //  width: '75%',
                //  borderRadius: wp('1%'),
                bottom: 0,
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: hp(1.5),
                  color: '#fff',
                  fontWeight: 'bold',
                }}>
                Recent Points
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <PlayerInfo
        visible={isPopupVisible}
        onCancel={() => setIsPopupVisible(false)}
        playerId={selectedPlayerId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BatManScreen;
