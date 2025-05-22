import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function TestScreen() {
  const [Drop, setDrop] = useState(false);
  const [bowling, setBowling] = useState(false);
  const [fielding, setFielding] = useState(false);
  const [points, setPoints] = useState(false);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            width: wp('94%'),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LinearGradient
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingTop: 6,
              borderRadius: 15,
            }}
            colors={['#3b53bd', '#243373', '#192451']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}>
            <Text
              style={{
                color: '#fff',
                fontWeight: '600',
                textAlign: 'center',
                fontSize: hp(1.7),
                paddingBottom: 6,
              }}>
              IMPORTANT FANTASY POINTS
            </Text>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                borderRadius: 15,
                backgroundColor: '#fff',
                justifyContent: 'flex-end',
                width: '100%',
                gap: 10,
                borderWidth: 1.5,

                borderColor: '#cccccc',
              }}>
              <Image
                source={require('../../../assets/ImportantFantasyPoints1.png')}
                style={{
                  width: 90,
                  height: 100,
                  resizeMode: 'cover',
                  // alignItems: 'baseline',
                }}
              />
              <View
                style={{
                  flex: 1,
                  gap: 8,
                  width: '100%',
                }}>
                <View style={{width: '100%'}}>
                  <LinearGradient
                    style={{borderRadius: 5}}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 1, y: 1}}
                    end={{x: 0, y: 0}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 5,
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: '#000',
                        }}>
                        Wicket
                      </Text>
                      <Text
                        style={{
                          color: '#00A000',
                          fontWeight: 'bold',
                        }}>
                        +25 Pts{' '}
                      </Text>
                    </View>
                  </LinearGradient>
                </View>
                <View style={{width: '100%'}}>
                  <LinearGradient
                    style={{borderRadius: 5}}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 1, y: 1}}
                    end={{x: 0, y: 0}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 5,
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: '#000',
                        }}>
                        Runs
                      </Text>
                      <Text
                        style={{
                          color: '#00A000',
                          fontWeight: 'bold',
                        }}>
                        +1 Pts{' '}
                      </Text>
                    </View>
                  </LinearGradient>
                </View>
                <View style={{width: '100%'}}>
                  <LinearGradient
                    style={{borderRadius: 5}}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 1, y: 1}}
                    end={{x: 0, y: 0}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 5,
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: '#000',
                        }}>
                        Catches
                      </Text>
                      <Text
                        style={{
                          color: '#00A000',
                          fontWeight: 'bold',
                        }}>
                        +8 Pts{' '}
                      </Text>
                    </View>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        <ScrollView
          style={{
            width: wp('95%'),
            height: hp('100%'),
            flexDirection: 'column',
            display: 'flex',
            paddingBottom: 10,
            padding: 5,
          }}>
          <View
            style={{
              width: wp('92%'),
              flexDirection: 'column',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 10,
            }}>
            <Pressable
              onPress={() => {
                setDrop(!Drop);
              }}
              style={{
                width: wp('92%'),
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'center',
                borderWidth: 1.5,
                borderRadius: 5,
                borderColor: '#cccccc',
              }}>
              <View
                style={{
                  width: wp('92%'),
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 8,
                }}>
                <Text style={{fontWeight: 'bold', color: '#000'}}>Batting</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                  }}>
                  <Pressable
                    onPress={() => {
                      setDrop(!Drop);
                    }}>
                    {Drop ? (
                      <Entypo name="chevron-small-up" size={24} color="black" />
                    ) : (
                      <Entypo
                        name="chevron-small-down"
                        size={24}
                        color="black"
                      />
                    )}
                  </Pressable>
                </View>
              </View>
              {Drop && (
                <View
                  style={{
                    width: wp('90%'),
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15,
                    paddingBottom: 5,
                  }}>
                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('90%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',

                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('40%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.6),
                          }}>
                          Run
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('45%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +1 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('90%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',

                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('45%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.6),
                          }}>
                          Boundary Bonus
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('40%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +1 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('90%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('45%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.5),
                          }}>
                          Six Bonus
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('40%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +2 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('90%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',

                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('45%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.5),
                          }}>
                          30 Run Bonus
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('40%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +4 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('90%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',

                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('45%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.5),
                          }}>
                          Half Century Bonus
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('40%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +8 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('90%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',

                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('45%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.5),
                          }}>
                          Century Bonus
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('40%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +16 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('90%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',

                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('45%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.5),
                          }}>
                          Dismissal For A Duck
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('40%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#ff0000'}}>
                          -2 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('90%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',

                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: '70%'}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#000',
                            fontSize: hp(1.7),
                          }}>
                          Strick Rate Points (Except Bowler)
                        </Text>
                        <Text
                          style={{
                            color: '#515151',
                            fontSize: hp(1.3),
                            fontWeight: '500',
                          }}>
                          (Minimum 10 Balls to be Played)
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('30%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}></View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('90%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',

                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('55%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.5),
                          }}>
                          Above 170 runs per 100 balls
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('30%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +6 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('90%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',

                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('55%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.5),
                          }}>
                          Between 150.01 - 170 runs per 100 balls
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('30%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +4 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('90%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',

                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('55%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.5),
                          }}>
                          Between 130 - 150 runs per 100 balls
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('30%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +2 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('90%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',

                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('55%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.5),
                          }}>
                          Between 60 - 70 runs per 100 balls
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('30%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#ff0000'}}>
                          -2 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('90%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('55%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.5),
                          }}>
                          Between 50 - 59.99 runs per 100 balls
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('30%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#ff0000'}}>
                          -4 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('90%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('55%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.5),
                          }}>
                          Below 50 runs 100 balls
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('30%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#ff0000'}}>
                          -6 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              )}
            </Pressable>
          </View>

          <View
            style={{
              width: wp('92%'),
              flexDirection: 'column',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 10,
            }}>
            <Pressable
              onPress={() => {
                setBowling(!bowling);
              }}
              style={{
                width: wp('92%'),
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'center',
                borderWidth: 1.5,
                borderRadius: 5,
                borderColor: '#cccccc',
              }}>
              <View
                style={{
                  width: wp('92%'),
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 8,
                }}>
                <Text style={{fontWeight: 'bold', color: '#000'}}>Bowling</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                  }}>
                  <Pressable
                    onPress={() => {
                      setBowling(!bowling);
                    }}>
                    {bowling ? (
                      <Entypo name="chevron-small-up" size={24} color="black" />
                    ) : (
                      <Entypo
                        name="chevron-small-down"
                        size={24}
                        color="black"
                      />
                    )}
                  </Pressable>
                </View>
              </View>
              {bowling && (
                <View
                  style={{
                    width: wp('91%'),
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15,
                    paddingBottom: 5,
                  }}>
                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.5),
                          }}>
                          Wickets <Text>(Excluding Run Out) </Text>
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +25 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.5),
                          }}>
                          Bonus <Text>(LBW/Bowled)</Text>
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +8 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.5),
                          }}>
                          3 Wicket Bonus
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +4 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.5),
                          }}>
                          4 Wicket Bonus
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +8 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',

                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.5),
                          }}>
                          5 Wicket Bonus
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +16 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.6),
                          }}>
                          Maiden Over
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +12 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text style={{fontWeight: 'bold', color: '#000'}}>
                          Economy Rate Points
                        </Text>
                        <Text
                          style={{
                            fontWeight: '500',
                            color: '#515151',
                            fontSize: hp(1.3),
                          }}>
                          (Min 2 Overs to be Bowled)
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}></View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.6),
                          }}>
                          Below 5 Runs per over
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +6 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.6),
                          }}>
                          Between 5 - 5.99 per over
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +4 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.6),
                          }}>
                          Between 6 - 7 per over
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +2 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.6),
                          }}>
                          Between 10 - 11 per over
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#ff0000'}}>
                          -2 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.6),
                          }}>
                          Between 11.01 - 12 run per over
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#ff0000'}}>
                          -4 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.6),
                          }}>
                          Above 12 runs per over
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#ff0000'}}>
                          -6 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              )}
            </Pressable>
          </View>
          <View
            style={{
              width: wp('92%'),
              flexDirection: 'column',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 10,
            }}>
            <Pressable
              onPress={() => {
                setFielding(!fielding);
              }}
              style={{
                width: wp('92%'),
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'center',
                borderWidth: 1.5,
                borderRadius: 5,
                borderColor: '#cccccc',
              }}>
              <View
                style={{
                  width: wp('92%'),
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 8,
                }}>
                <Text style={{fontWeight: 'bold', color: '#000'}}>
                  Fielding
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                  }}>
                  <Pressable
                    onPress={() => {
                      setFielding(!fielding);
                    }}>
                    {fielding ? (
                      <Entypo name="chevron-small-up" size={24} color="black" />
                    ) : (
                      <Entypo
                        name="chevron-small-down"
                        size={24}
                        color="black"
                      />
                    )}
                  </Pressable>
                </View>
              </View>
              {fielding && (
                <View
                  style={{
                    width: wp('91%'),
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15,
                    paddingBottom: 5,
                  }}>
                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.6),
                          }}>
                          Catch
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +8 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.6),
                          }}>
                          3 Catch Bonus
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +4 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.6),
                          }}>
                          Stumping
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +12 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',

                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.6),
                          }}>
                          Run out (Direct hit)
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +12 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',

                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.6),
                          }}>
                          Run out (Not a direct hit)
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +6 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              )}
            </Pressable>
          </View>

          <View
            style={{
              width: wp('92%'),
              flexDirection: 'column',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 10,
            }}>
            <Pressable
              onPress={() => {
                setPoints(!points);
              }}
              style={{
                width: wp('92%'),
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'center',
                borderWidth: 1.5,
                borderRadius: 5,
                borderColor: '#cccccc',
              }}>
              <View
                style={{
                  width: wp('92%'),
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 8,
                }}>
                <Text style={{fontWeight: 'bold', color: '#000'}}>
                  Additional Points
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                  }}>
                  <Pressable
                    onPress={() => {
                      setPoints(!points);
                    }}>
                    {points ? (
                      <Entypo name="chevron-small-up" size={24} color="black" />
                    ) : (
                      <Entypo
                        name="chevron-small-down"
                        size={24}
                        color="black"
                      />
                    )}
                  </Pressable>
                </View>
              </View>
              {points && (
                <View
                  style={{
                    width: wp('91%'),
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15,
                    paddingBottom: 5,
                  }}>
                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',

                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.6),
                          }}>
                          Captain Points
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          2x
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',

                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.6),
                          }}>
                          Vice Captain Points
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          1.5x
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',

                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.6),
                          }}>
                          In Announced Lineups
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +4 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  <LinearGradient
                    style={{
                      paddingBottom: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: wp('91%'),
                      display: 'flex',
                      flexDirection: 'column',
                      padding: 5,
                    }}
                    colors={['#eaeaea', '#e7e7e7', '#f3f3f3', '#fff']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <View
                      style={{
                        width: wp('85%'),
                        flexDirection: 'row',

                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <View style={{width: wp('50%')}}>
                        <Text
                          style={{
                            fontWeight: '700',
                            color: '#515151',
                            fontSize: hp(1.6),
                          }}>
                          Playing Substitute
                        </Text>
                      </View>
                      <View
                        style={{
                          width: wp('35%'),
                          flexDirection: 'row',
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 5,
                        }}>
                        <Text style={{fontWeight: 'bold', color: '#00A000'}}>
                          +4 Pts
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  FilterText: {
    fontSize: 10,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#000',
  },
  FilterContainer: {
    width: wp('100%'),
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pressable1: {
    borderRadius: 3,
    borderWidth: 1,
    width: wp('10%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    borderColor: '#cccc',
  },
  pressable2: {
    borderRadius: 3,
    borderWidth: 1,
    width: wp('23%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    borderColor: '#cccc',
  },
});
