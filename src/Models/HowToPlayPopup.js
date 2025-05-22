import { View, Text, Image, Pressable, StyleSheet, SafeAreaView, Modal } from 'react-native';
import { ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const HowToPlayPopup = ({ visible, onClose }) => {
  const navigation = useNavigation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}

    >

      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: wp('100%'),
            gap: 10,
            backgroundColor: '#fff',
            flex: 1,
          }}>
          <View
            style={{ display: 'flex', flexDirection: 'column', width: wp('100%') }}>
            <LinearGradient
              colors={['#3b53bd', '#243373', '#192451']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ height: hp('8%') }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 20,
                }}>
                <View style={{ width: wp('10%') }}>
                  <Pressable onPress={() => {
                    onClose(); // Close the modal
                    navigation.navigate('CreateTeam'); // Navigate to CreateTeam
                  }}>
                    <AntDesign name="left" size={22} color="white" />
                  </Pressable>
                </View>
                <View style={{ width: wp('50%') }}>
                  <Text
                    style={{ fontSize: hp(2.1), color: '#fff', fontWeight: '600' }}>
                    How to Play
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          <ScrollView style={{ width: '100%', paddingBottom: 15 }}>
            <View
              style={{
                width: wp('100%'),
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View
                  style={{
                    width: wp('80%'),
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#4C5789',
                      fontWeight: '700',
                      fontSize: hp(1.9),
                    }}>
                    FOLLOW THE STEPS MENTIONED BELOW &
                  </Text>
                  <Text
                    style={{
                      color: '#4C5789',
                      fontWeight: '700',
                      fontSize: hp(1.9),
                    }}>
                    BEGIN YOUR WINNING JOURNEY
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                <View style={{ width: '40%' }}>
                  <Image
                    source={require('../../assets/HowToPlay.png')}
                    style={{
                      width: 200,
                      height: 200,
                    }}
                  />
                </View>

                <View
                  style={{
                    width: '59%',
                    flexDirection: 'row',
                    gap: 20,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      borderColor: '#000',
                      borderWidth: 0.5,
                      height: 180,
                    }}>
                    {/* line */}
                  </View>

                  <View
                    style={{
                      width: '85%',
                      flexDirection: 'column',
                      gap: 12,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: '#D9DEF3',
                        padding: 5,
                        width: '100%',
                        borderWidth: 1,
                        borderRadius: 50,
                        borderColor: '#8B9BDB',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: '#000',
                        }}>
                        SELECT A MATCH
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#D9DEF3',
                        padding: 5,
                        width: '100%',
                        borderWidth: 1,
                        borderRadius: 50,
                        borderColor: '#8B9BDB',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: '#000',
                        }}>
                        CREATE YOUR TEAM
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#D9DEF3',
                        padding: 5,
                        width: '100%',
                        borderWidth: 1,
                        borderRadius: 50,
                        borderColor: '#8B9BDB',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: '#000',
                        }}>
                        JOIN CONTEST
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#D9DEF3',
                        padding: 5,
                        width: '100%',
                        borderWidth: 1,
                        borderRadius: 50,
                        borderColor: '#8B9BDB',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: '#000',
                        }}>
                        FOLLOW THE MATCH
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: wp('100%'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                }}>
                <View
                  style={{
                    width: wp('100%'),
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/SelectAMatch-Updated.png')}
                    style={{
                      width: wp('90%'),
                      height: 190,
                      resizeMode: 'contain',
                    }}
                  />
                </View>

                <View
                  style={{
                    width: wp('100%'),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: hp(1.9),
                      color: '#4D4D4D',
                      // textAlign: 'center',
                      width: '95%',
                      lineHeight: 24,
                    }}>
                    To participate in a match, click on an upcoming match  you  want to play and keep eye on the match deadline.
                  </Text>

                </View>
              </View>

              {/* 2 text */}

              <View
                style={{
                  width: wp('100%'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                }}>
                <View
                  style={{
                    width: wp('100%'),
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/CreateYourTeams-Updated.png')}
                    style={{
                      width: wp('92%'),
                      height: 190,
                      resizeMode: 'contain',
                    }}
                  />
                </View>

                <View
                  style={{
                    width: wp('95%'),
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}>
                  <View
                    style={{
                      width: wp('100%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}>
                    <Text style={{ fontSize: hp(1.9), color: '#4D4D4D', lineHeight: 24 }}>
                      Use your sports knowledge to create your own fantasy team with
                      players whom do you think will score most points.
                    </Text>
                  </View>

                  <View
                    style={{
                      width: wp('96%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                      justifyContent: 'center',
                    }}>
                    <Text style={{ fontSize: hp(1.9), color: '#4D4D4D', lineHeight: 24 }}>
                      Your team much contain 11 players of different categories (WK,
                      Battter, All- rounder,Bowler).Maximum 7 players from one team.
                    </Text>
                  </View>

                  <View style={{ width: wp('100%'), display: 'flex', padding: 5 }}>
                    <Text style={{ fontSize: hp(1.9), color: '#4D4D4D', lineHeight: 24 }}>
                      you can create up to 20 teams
                    </Text>
                  </View>
                </View>
              </View>

              {/* 3 text */}
              <View
                style={{
                  width: wp('100%'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: wp('100%'),
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: 18,
                  }}>
                  <Image
                    source={require('../../assets/SelectC-VC-Updated.png')}
                    style={{
                      width: wp('95%'),
                      height: 190,
                      resizeMode: 'stretch',
                    }}
                  />
                </View>

                <View
                  style={{
                    width: wp('100%'),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                  }}>
                  <View
                    style={{
                      width: wp('96%'),
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{ fontSize: hp(1.9), lineHeight: 24, color: '#4D4D4D', paddingTop: 10 }}>
                      After creating your team,select the Captain, Vice-captain and
                      Impact player
                    </Text>
                  </View>
                  <View
                    style={{
                      width: wp('98%'),
                      display: 'flex',
                      flexDirection: 'row',
                      padding: 10,
                      gap: 10,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#000',
                        width: '12%',
                        borderRadius: 8,
                        padding: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: hp(2),
                          color: '#fff',
                          textAlign: 'center',
                          fontWeight: '500',
                        }}>
                        C{' '}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: wp('95%'),
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 3,
                      }}>
                      <Text
                        style={{
                          fontSize: hp(1.9),
                          color: '#000',
                          fontWeight: '700',
                        }}>
                        CAPTAIN :{' '}
                      </Text>
                      <Text style={{ fontSize: hp(1.8), color: '#4D4D4D' }}>
                        {' '}
                        will get x2 points
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: wp('98%'),
                      display: 'flex',
                      flexDirection: 'row',
                      padding: 10,
                      gap: 10,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#000',
                        width: '12%',
                        borderRadius: 8,
                        padding: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: hp(1.9),
                          color: '#fff',
                          textAlign: 'center',
                          fontWeight: '500',
                        }}>
                        VC{' '}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: wp('98%'),
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 3,
                      }}>
                      <Text
                        style={{
                          fontSize: hp(1.9),
                          color: '#000',
                          fontWeight: '700',
                        }}>
                        VICE-CAPTAIN :{' '}
                      </Text>
                      <Text style={{ fontSize: hp(1.8), color: '#4D4D4D' }}>
                        {' '}
                        will get x2 points
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: wp('98%'),
                      display: 'flex',
                      flexDirection: 'row',
                      padding: 10,
                      gap: 10,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#000',
                        width: '12%',
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../../assets/ImpactPreviewNotSelected.png')}
                        style={{
                          width: 25,
                          height: 25,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>

                    <Text
                      style={{ fontSize: hp(1.9), color: '#000', fontWeight: '700' }}>
                      IMPACT PLAYER :{' '}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 6,
                    }}>
                    <Text
                      style={{
                        fontSize: hp(1.9),
                        color: '#4D4D4D',
                        lineHeight: 24,
                        padding: 5,
                      }}>
                      IMPACT PLAYER will replace a player with least points in your
                      team after, the match completes.
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: hp(1.9),
                        color: '#4D4D4D',
                        lineHeight: 24,
                        padding: 8,
                      }}>
                      So,add a player whom do you think will perfect backup for your
                      team
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: wp('100%'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: wp('100%'),
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: 18,
                  }}>
                  <Image
                    source={require('../../assets/JoinContest-Updated.png')}
                    style={{
                      width: wp('95%'),
                      height: 190,
                      resizeMode: 'stretch',
                    }}
                  />
                </View>

                <View
                  style={{
                    width: wp('100%'),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                  }}>
                  <View
                    style={{
                      width: wp('96%'),
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{ fontSize: hp(1.9), color: '#4D4D4D', lineHeight: 24, paddingTop: 10 }}>
                      There are different contest available.you can join Free and
                      Paid contest or you can even create a new private contest and
                      play with your friends.{' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: wp('96%'),
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{ fontSize: hp(1.9), lineHeight: 24, color: '#4D4D4D', paddingTop: 10 }}>
                      You can join as many contest you want!{' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: wp('96%'),
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{ fontSize: hp(1.9), color: '#4D4D4D', paddingTop: 10 }}>
                      Join and start Winning!!{' '}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: wp('100%'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: wp('100%'),
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: 18,
                  }}>
                  <Image
                    source={require('../../assets/FollowTheMatch-Updated.png')}
                    style={{
                      width: wp('95%'),
                      height: 190,
                      resizeMode: 'stretch',
                    }}
                  />
                </View>

                <View
                  style={{
                    width: wp('100%'),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                  }}>
                  <View
                    style={{
                      width: wp('96%'),
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{ fontSize: hp(1.9), lineHeight: 24, color: '#4D4D4D', paddingTop: 10 }}>
                      Once a match is live, you can follow your contests
                      leaderboards to see how your're performing against your
                      competition.
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ width: wp('100%'), display: 'flex', paddingTop: 23 }}>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'stretch',
                    width: '100%',
                    paddingHorizontal: 15,
                  }}>
                  <Text
                    style={{ fontWeight: 'bold', color: '#000', display: 'flex', fontSize: hp(2) }}>
                    WITHDRAW YOUR WINNINGS
                  </Text>
                </View>

                 <View
              style={{
                width: wp('100%'),
                display: 'flex',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Image
                source={require('../../assets/Won.png')}
                style={{
                  width: wp('95%'),
                  height: 85,
                  resizeMode: 'cover',
                }}
              />
            </View>

                <View
                  style={{
                    width: wp('100%'),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                  }}>
                  <View
                    style={{
                      width: wp('96%'),
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{ fontSize: hp(1.9), lineHeight: 24, color: '#4D4D4D', paddingTop: 10 }}>
                      After a match ends, if you're in the winning zone for a
                      contest, then your contest winnings are transferred to your
                      account.{' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: wp('96%'),
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{ fontSize: hp(1.9), lineHeight: 24, color: '#4D4D4D', paddingTop: 10 }}>
                      Use them to join more contests, or withdraw it and celebrate
                      your success!
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: wp('100%'),
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingBottom: 10,
                }}>
                <View style={{ width: wp('55%') }}>
                  <Text
                    style={{ fontSize: hp(1.8), color: '#000', fontWeight: '500' }}>
                    Check our fantasy point system
                  </Text>
                </View>
                <View style={{ width: wp('35%') }}>
                  <Pressable
                    style={{
                      width: wp('35%'),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        backgroundColor: '#35B267',
                        padding: 8,
                        fontWeight: '800',
                        borderRadius: 4,
                      }}>
                      POINT SYSTEM
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default HowToPlayPopup;

const styles = StyleSheet.create({
  button: {
    padding: 9,
    width: wp('50%'),
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  btn1: {
    backgroundColor: '#D9DEF3',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#8B9BDB',
  },
  btn: {
    color: '#fff',
    backgroundColor: '#35B267',
    padding: 10,
    fontWeight: '800',
  },
  line: {
    borderColor: '#000',
    borderWidth: 0.5,
    height: 186,
    right: 30,
  },
});
