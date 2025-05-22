import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {api} from '../../../../envfile/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const CompletedTeamPreview = ({route}) => {
  const [token, setToken] = useState(null);
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const {players, team1Name, team2Name, username,teamPoints} = route.params;
  

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
  let playercount;

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');

        if (!token) {
          console.error('No token found in AsyncStorage. Did you set it?');
        }
        if (token) {
          await fetchPlayerData(token, players);
        } else {
          console.error('token not found');
        }
      } catch (error) {
        setError('Unexpected error occurred.');
      }
    };

    fetchToken();
  }, []);

  
  const fetchPlayerData = async (token, playersId) => {
    console.log("entered leaderbord preview==========");
    
    console.log(
      'entered data:',
      playersId.map(id => id.playerId),
    );
    const impact = playersId
      .filter(id => id.impactPlayer == true)
      .map(item => item.playerId);

    const captain = playersId
      .filter(id => id.captain == true)
      .map(item => item.playerId);
    setCaptain(captain);
    const viceCaptain = playersId
      .filter(id => id.viceCaptain == true)
      .map(item => item.playerId);
    setViceCaptain(viceCaptain);
    try {
      const body = {
        playerDtoList: playersId.map(id => ({
          recordId: id.playerId,
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
      WicketKeeper = WicketKeeper.filter(id => id.recordId != impact);
      setWicketKeepers(WicketKeeper);
      // console.log('wicketKeepers from teamPreview screen', WicketKeeper);

      let bowler = filteredPlayers.filter(item => item.playerRole === 'Bowler');
      bowler = bowler.filter(id => id.recordId != impact);
      setBowlers(bowler);
      let batsman = filteredPlayers.filter(
        item => item.playerRole === 'Batsman',
      );
      batsman = batsman.filter(id => id.recordId != impact);
      setBatsman(batsman);
      // console.log('Batsman from teamPreview screen', batsman);
      let allRounder = filteredPlayers.filter(
        item => item.playerRole === 'Allrounder',
      );
      allRounder = allRounder.filter(id => id.recordId != impact);
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
    <SafeAreaView style={{flex: 1}}>
    <ImageBackground
      source={require('../../../../../assets/UpdatedTeamView.png')}
      style={{width: wp('100%'), height: hp('100%')}}>
      {/* Header Section */}
      <View
        style={{
          padding: 10,
          paddingBottom: 0,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
              paddingTop: 5,
            }}>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={26} color="#fff" />
            </Pressable>
            <View
              style={{
                flexDirection: 'column',
                gap: 5,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: '#fff',
                }}>
                {username}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                }}>
                {teamPoints}
              </Text>
            </View>
          </View>
          {Teamdata.length > 0 &&
            Teamdata.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
                    paddingHorizontal: 3,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: '#000',
                    }}>
                    {item.team1Name}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}>
                  {item.team1Count} : {item.team2Count}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'red',
                    borderRadius: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
                    paddingHorizontal: 3,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: '#000',
                    }}>
                    {item.team2Name}
                  </Text>
                </View>
              </View>
            ))}
        </View>
      </View>

      {/* Main Content */}
      <View
        style={{
          height: '100%',
          // backgroundColor: "#f5f",
          //justifyContent:"center"
        }}>
        {Teamdata.length > 0 ? (
          <>
            {/* Wicket-Keeper Section */}
            {WicketKeepers.length > 0 && (
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  height: '20%',
                  // backgroundColor: "#f5f",
                  gap: 15,
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
                      fontWeight: '800',
                      fontSize: hp(1.3),
                    }}>
                    WICKEEPERS
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 7,
                  }}>
                  {WicketKeepers.map((player, index) => (
                    <View
                      key={index}
                      style={{
                        width: 85,
                        marginHorizontal: 5,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        gap: 5,
                      }}>
                      {Captain === player.recordId && (
                        <View
                          style={{
                            position: 'absolute',
                            top: -4,
                            right: -4,
                            backgroundColor: '#000',
                            borderRadius: 20,
                            paddingHorizontal: 4,
                            paddingVertical: 1,
                            zIndex: 1,
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#fff',
                              fontSize: 12,
                            }}>
                            C
                          </Text>
                        </View>
                      )}
                      {ViceCaptain === player.recordId && (
                        <View
                          style={{
                            position: 'absolute',
                            top: -4,
                            right: -4,
                            backgroundColor: '#000',
                            borderRadius: 20,
                            paddingHorizontal: 4,
                            paddingVertical: 1,
                            zIndex: 1,
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#fff',
                              fontSize: 12,
                            }}>
                            VC
                          </Text>
                        </View>
                      )}
                      <Image
                        source={{uri: player.playerImagePath}}
                        style={{
                          width: 60,
                          height: 60,
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 70,
                          borderRadius: 2,
                          backgroundColor: player.teamDto?.teamColor,
                        }}>
                        <Text
                          style={{
                            fontSize: hp(1.2),
                            fontWeight: '900',
                            color: player.teamDto?.textColor,
                          }}
                          numberOfLines={1}>
                          {player.shortName}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Batter Section */}
            {Batsman.length > 0 && (
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  height: '20%',
                  // backgroundColor: "#f5f",
                  gap: 15,
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
                      fontWeight: '800',
                      fontSize: hp(1.3),
                    }}>
                    BATTER
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 7,
                  }}>
                  {Batsman.map((player, index) => (
                    <View
                      key={index}
                      style={{
                        width: 85,
                        marginHorizontal: 5,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        gap: 5,
                      }}>
                      {Captain === player.recordId && (
                        <View
                          style={{
                            position: 'absolute',
                            top: -4,
                            right: -4,
                            backgroundColor: '#000',
                            borderRadius: 20,
                            paddingHorizontal: 4,
                            paddingVertical: 1,
                            zIndex: 1,
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#fff',
                              fontSize: 12,
                            }}>
                            C
                          </Text>
                        </View>
                      )}
                      {ViceCaptain === player.recordId && (
                        <View
                          style={{
                            position: 'absolute',
                            top: -4,
                            right: -4,
                            backgroundColor: '#000',
                            borderRadius: 20,
                            paddingHorizontal: 4,
                            paddingVertical: 1,
                            zIndex: 1,
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#fff',
                              fontSize: 12,
                            }}>
                            VC
                          </Text>
                        </View>
                      )}
                      <Image
                        source={{uri: player.playerImagePath}}
                        style={{
                          width: 60,
                          height: 60,
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 70,
                          borderRadius: 2,
                          backgroundColor: player.teamDto?.teamColor,
                        }}>
                        <Text
                          style={{
                            fontSize: hp(1.2),
                            fontWeight: '900',
                            color: player.teamDto?.textColor,
                          }}
                          numberOfLines={1}>
                          {player.shortName}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* All-Rounder Section */}
            {AllRounders.length > 0 && (
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  height: '20%',
                  // backgroundColor: "#f5f",
                  gap: 15,
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
                      fontWeight: '800',
                      fontSize: hp(1.3),
                    }}>
                    ALL-ROUNDER
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 7,
                  }}>
                  {AllRounders.map((player, index) => (
                    <View
                      key={index}
                      style={{
                        width: 85,
                        marginHorizontal: 5,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        gap: 5,
                      }}>
                      {Captain === player.recordId && (
                        <View
                          style={{
                            position: 'absolute',
                            top: -4,
                            right: -4,
                            backgroundColor: '#000',
                            borderRadius: 20,
                            paddingHorizontal: 4,
                            paddingVertical: 1,
                            zIndex: 1,
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#fff',
                              fontSize: 12,
                            }}>
                            C
                          </Text>
                        </View>
                      )}
                      {ViceCaptain === player.recordId && (
                        <View
                          style={{
                            position: 'absolute',
                            top: -4,
                            right: -4,
                            backgroundColor: '#000',
                            borderRadius: 20,
                            paddingHorizontal: 4,
                            paddingVertical: 1,
                            zIndex: 1,
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#fff',
                              fontSize: 12,
                            }}>
                            VC
                          </Text>
                        </View>
                      )}
                      <Image
                        source={{uri: player.playerImagePath}}
                        style={{
                          width: 60,
                          height: 60,
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 70,
                          borderRadius: 2,
                          backgroundColor: player.teamDto?.teamColor,
                        }}>
                        <Text
                          style={{
                            fontSize: hp(1.2),
                            fontWeight: '900',
                            color: player.teamDto?.textColor,
                          }}
                          numberOfLines={1}>
                          {player.shortName}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Bowler Section */}
            {Bowlers.length > 0 && (
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  height: '20%',
                  // backgroundColor: "#f5f",
                  gap: 15,
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
                      fontWeight: '800',
                      fontSize: hp(1.3),
                    }}>
                    BOWLER
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 7,
                  }}>
                  {Bowlers.map((player, index) => (
                    <View
                      key={index}
                      style={{
                        width: 85,
                        marginHorizontal: 5,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        gap: 5,
                      }}>
                      {Captain === player.recordId && (
                        <View
                          style={{
                            position: 'absolute',
                            top: -4,
                            right: -4,
                            backgroundColor: '#000',
                            borderRadius: 20,
                            paddingHorizontal: 4,
                            paddingVertical: 1,
                            zIndex: 1,
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#fff',
                              fontSize: 12,
                            }}>
                            C
                          </Text>
                        </View>
                      )}
                      {ViceCaptain === player.recordId && (
                        <View
                          style={{
                            position: 'absolute',
                            top: -4,
                            right: -4,
                            backgroundColor: '#000',
                            borderRadius: 20,
                            paddingHorizontal: 4,
                            paddingVertical: 1,
                            zIndex: 1,
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#fff',
                              fontSize: 12,
                            }}>
                            VC
                          </Text>
                        </View>
                      )}
                      <Image
                        source={{uri: player.playerImagePath}}
                        style={{
                          width: 60,
                          height: 60,
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 70,
                          borderRadius: 2,
                          backgroundColor: player.teamDto?.teamColor,
                        }}>
                        <Text
                          style={{
                            fontSize: hp(1.2),
                            fontWeight: '900',
                            color: player.teamDto?.textColor,
                          }}
                          numberOfLines={1}>
                          {player.shortName}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              height: hp('60%'),
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              WICKET-KEEPER
            </Text>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              BATTER
            </Text>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              ALL-ROUNDER
            </Text>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              BOWLER
            </Text>
          </View>
        )}
      </View>

      {/* Impact Player Bar */}
      <View
        style={{
          width: wp('95%'),
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          padding: 10,
          gap: 15,
          position: 'absolute',
          alignSelf: 'center',
          bottom: hp('2%'),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
          }}>
          <Image
            source={require('../../../../../assets/ImpactPlayerIcon.png')}
            style={{
              width: wp('30%'),
              height: 40,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {SelectedImpactPlayer && SelectedImpactPlayer.length > 0 ? (
            SelectedImpactPlayer.map((item, id) =>
              item && item.identifier ? (
                <View
                  key={id}
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item.playerImagePath}}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 25,
                    }}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: '600',
                    }}>
                    {item.shortName}
                  </Text>
                </View>
              ) : null,
            )
          ) : (
            <Text
              style={{
                color: '#fff',
              }}>
              No impact player selected
            </Text>
          )}
        </View>
      </View>
    </ImageBackground>
  </SafeAreaView>
  );
};

export default CompletedTeamPreview;

const styles = StyleSheet.create({});
