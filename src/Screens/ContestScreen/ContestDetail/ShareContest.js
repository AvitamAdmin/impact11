import React, {useState} from 'react';
import {View, Text, Pressable, Image, Dimensions} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const ShareContest = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const isTablet = screenWidth >= 768;
  return (
    <>
      <LinearGradient
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: wp('100%'),
          height: hp(9),
          gap: 10,
        }}
        colors={['#3b53bd', '#243373', '#192451', '#000']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="close" size={24} color="#fff" />
          </Pressable>
          <View style={{width: isTablet ? wp('75%') : wp('100%')}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 15,
                width: wp('50%'),
              }}>
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    fontSize: hp(2.1),
                  }}>
                  Share Contest
                </Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={{width: '100%'}}>
        {/* Teams  */}
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 10,
            paddingBottom: 15,
            // backgroundColor: "#f3f",
          }}>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#E3E3E3',
              borderRadius: 10,
              padding: 15,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../../../assets/csk.png')}
                style={{
                  width: 60,
                  height: 60,
                }}
              />
            </View>

            <View
              style={{
                width: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                flexDirection: 'column',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  // backgroundColor:"#f3f"
                }}>
                <View
                  style={
                    {
                      // width: '20%',
                      //   justifyContent: 'center',
                      //   alignItems: 'center',
                      //   display: 'flex',
                      // backgroundColor: "#f3f",
                    }
                  }>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontFamily: 'Roboto-Bold',
                      color: '#000',
                      fontStyle: 'italic',
                      fontSize: hp(2.2),
                    }}>
                    CSK
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: hp(1.5),
                      // backgroundColor: '#f3f',
                      backgroundColor: '#CDD2E8',
                      width: 25,
                      height: 25,
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      borderRadius: 17.5,
                      // paddingVertical: 5,
                    }}>
                    VS
                  </Text>
                </View>

                <View
                  style={
                    {
                      // width: '25%',
                      //   justifyContent: 'center',
                      //   alignItems: 'center',
                      //   display: 'flex',
                    }
                  }>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontFamily: 'Roboto-Bold',
                      color: '#000',
                      fontStyle: 'italic',
                      fontSize: hp(2.2),
                    }}>
                    RCB
                  </Text>
                </View>
              </View>

              <View style={{}}>
                <Text
                  style={{color: 'red', fontWeight: '700', fontSize: hp(1.8)}}>
                  {' '}
                  1h 30m
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../../../assets/TeamB.png')}
                style={{
                  width: 60,
                  height: 60,
                }}
              />
            </View>
          </View>
        </View>

        {/* Contest points */}

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
          }}>
          <View
            style={{
              // backgroundColor: "#0f7",
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '90%',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#000',
                fontWeight: '600',
                fontSize: hp(1.9),
              }}>
              Contest by Mahirat
            </Text>
          </View>

          <View
            style={{
              width: '90%',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#E3E3E3',
              borderRadius: 10,
              padding: 10,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: '30%',
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: 5,
                gap: 8,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  display: 'flex',
                }}>
                <Text
                  style={{
                    color: '#484848',
                    fontWeight: '500',
                    fontSize: hp(1.7),
                  }}>
                  Prize Pool
                </Text>
              </View>
              <View>
                <Text
                  style={{color: '#000', fontWeight: '500', fontSize: hp(2)}}>
                  ₹84
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '30%',
                gap: 8,
                padding: 5,
                justifyContent: 'flex-end',
                alignItems: 'center',
                display: 'flex',
              }}>
              <View>
                <Text
                  style={{
                    color: '#484848',
                    fontWeight: '500',
                    fontSize: hp(1.7),
                  }}>
                  Spots
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  display: 'flex',
                }}>
                <Text
                  style={{color: '#000', fontWeight: '500', fontSize: hp(2)}}>
                  10
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '30%',
                padding: 5,
                gap: 8,
                justifyContent: 'center',
                alignItems: 'flex-end',
                display: 'flex',
              }}>
              <View style={{}}>
                <Text
                  style={{
                    color: '#484848',
                    fontWeight: '500',
                    fontSize: hp(1.7),
                  }}>
                  Entry
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  display: 'flex',
                }}>
                <Text
                  style={{color: '#000', fontWeight: '500', fontSize: hp(2)}}>
                  ₹0
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Rank */}

        <View
          style={{
            width: wp('100%'),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <View
            style={{
              width: wp('90%'),
              borderColor: '#CCCCCC',
              flexDirection: 'column',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: wp('90%'),
                borderBottomWidth: 1,
                borderBottomColor: '#CCCCCC',
                padding: 8,
              }}>
              <View
                style={{
                  width: wp('37%'),
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                <Text style={{color: '#666666', fontWeight: '500'}}>Rank</Text>
              </View>
              <View
                style={{
                  width: wp('50%'),
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Text style={{color: '#666666', fontWeight: '500'}}>
                  Max Winnings
                </Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: wp('90%'),
                borderBottomWidth: 1,
                borderBottomColor: '#CCCCCC',
                padding: 10,
              }}>
              <View
                style={{
                  width: wp('38%'),
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                <Text
                  style={{fontWeight: '700', fontSize: hp(2.2), color: '#000'}}>
                  #1
                </Text>
              </View>
              <View
                style={{
                  width: wp('48%'),
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{fontWeight: '600', fontSize: hp(2.2), color: '#000'}}>
                  ₹34
                </Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: wp('90%'),
                borderBottomWidth: 1,
                borderBottomColor: '#CCCCCC',
                padding: 10,
              }}>
              <View
                style={{
                  width: wp('38%'),
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                <Text
                  style={{fontWeight: '600', fontSize: hp(2.2), color: '#000'}}>
                  #2
                </Text>
              </View>
              <View
                style={{
                  width: wp('48%'),
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{fontWeight: '600', fontSize: hp(2.2), color: '#000'}}>
                  ₹19
                </Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: wp('90%'),
                borderBottomWidth: 1,
                borderBottomColor: '#CCCCCC',
                padding: 10,
              }}>
              <View
                style={{
                  width: wp('38%'),
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                <Text
                  style={{fontWeight: '600', fontSize: hp(2.2), color: '#000'}}>
                  #3
                </Text>
              </View>
              <View
                style={{
                  width: wp('48%'),
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{fontWeight: '600', fontSize: hp(2.2), color: '#000'}}>
                  ₹13
                </Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: wp('90%'),
                borderBottomWidth: 1,
                borderBottomColor: '#CCCCCC',
                padding: 10,
              }}>
              <View
                style={{
                  width: wp('38%'),
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                <Text
                  style={{fontWeight: '600', fontSize: hp(2.2), color: '#000'}}>
                  #4-5
                </Text>
              </View>
              <View
                style={{
                  width: wp('48%'),
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  style={{fontWeight: '600', fontSize: hp(2.2), color: '#000'}}>
                  ₹9
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Whatsapp button */}

        <View style={{gap: 10, width: '100%'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Pressable
              style={{
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                padding: 10,

                gap: 10,
                backgroundColor: '#25D366',
              }}>
              <View>
                <Ionicons name="logo-whatsapp" size={24} color="#fff" />
              </View>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '500',
                  fontSize: hp(1.8),
                }}>
                Share via WhatsApp
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Pressable
              style={{
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                padding: 8,

                gap: 10,

                borderWidth: 1,
                borderColor: '4E4E4E',
              }}>
              <View>
                <MaterialCommunityIcons
                  name="content-copy"
                  size={24}
                  color="#4E4E4E"
                />
              </View>
              <Text
                style={{
                  color: '#4E4E4E',
                  fontWeight: '500',
                  fontSize: hp(1.8),
                }}>
                Copy Contest link
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default ShareContest;
