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
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const AddCashMyBalance = () => {
  const navigation = useNavigation();
  const [Like, setLike] = useState(false);
  const [Dislike, setDislike] = useState(false);

  const handleLike = () => {
    return (
      <>
        {setLike(!Like)}
        {setDislike(false)}
      </>
    );
  };
  const handleDisLike = () => {
    return (
      <>
        {setDislike(!Dislike)}
        {setLike(false)}
      </>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{height: hp('100%'), width: wp('100%')}}>
        <View
          style={{height: hp('15%'), width: wp('100%'), position: 'relative'}}>
          <LinearGradient
            style={{
              flex: 1,
            }}
            colors={['#101632', '#2A3A83', '#374DAD']}>
            <View
              style={{
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'center',
                width: wp('100%'),
                alignItems: 'center',
                padding: 25,
                gap: 20,
              }}>
              <View
                style={{
                  width: wp('90%'),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  display: 'flex',
                }}>
                <Pressable onPress={() => navigation.goBack()}>
                  <AntDesign name="arrowleft" size={24} color="#fff" />
                </Pressable>
                <View>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: hp(2.2),
                    }}>
                    Help & Support
                  </Text>
                </View>
                <View></View>
              </View>

              <View
                style={{
                  width: wp('90%'),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  display: 'flex',
                }}>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <Image
                    source={require('../../../../assets/IMPACT11LogoExtended.png')}
                    style={{height: 15, width: 80}}
                  />
                  <Text
                    style={{fontWeight: 'bold', color: '#fff', fontSize: 28}}>
                    |
                  </Text>
                  <Text style={{color: '#fff'}}>Help Center</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        <ScrollView>
          <View
            style={{
              width: wp('100%'),
              flexDirection: 'column',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              paddingTop: 20,
              gap: 15,
            }}>
            <View
              style={{
                width: wp('90%'),
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#fff',
                padding: 15,
                gap: 15,
              }}>
              <View style={{flexDirection: 'row', gap: 5}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: hp(2.4),
                    color: '#000',
                  }}>
                  My Balance
                </Text>
                <Text style={{color: '#6F6F6F'}}>/ deposit</Text>
              </View>
              <View style={{flexDirection: 'column', gap: 40}}>
                <View style={{flexDirection: 'column', gap: 15}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: hp(2.4),
                      color: '#000',
                    }}>
                    How do I add cash to my Impact11 account?
                  </Text>
                  <Text style={{color: '#000'}}>
                    You can add cash through either of the following two
                    options:
                  </Text>
                  <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Entypo name="dot-single" size={24} color="black" />
                      <Text style={{color: '#000'}}>
                        Click on Side Navigation menu and go the Add (or)
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Entypo name="dot-single" size={24} color="black" />
                      <Text style={{color: '#000'}}>
                        Wallet icon on the top right hand side corner
                      </Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{color: '#000'}}>Next,</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 1,
                      }}>
                      <Text style={{color: '#000'}}>1.</Text>
                      <Text style={{color: '#000'}}>Click on Add Cash</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 1,
                      }}>
                      <Text style={{color: '#000'}}>2.</Text>
                      <Text style={{color: '#000'}}>
                        Enter the 'Amount to add'
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 1,
                      }}>
                      <Text style={{color: '#000'}}>3.</Text>
                      <Text style={{color: '#000'}}>
                        Select your preferred payment method.
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', gap: 1}}>
                      <Text style={{color: '#000'}}>4.</Text>
                      <Text style={{color: '#000'}}>
                        Follow the on-screen instructions to complete your
                        payment and done!
                      </Text>
                    </View>
                  </View>
                  <Text style={{color: '#000'}}>
                    The deposit can take a maximum of 24 hours and can be
                    checked in the "My Recent Transactions" section.
                  </Text>

                  <View style={{flexDirection: 'column', width: wp('75%')}}>
                    <Text style={{color: '#000'}}>PS:</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Entypo name="dot-single" size={24} color="black" />
                      <Text style={{color: '#000'}}>
                        If the cash hasn’t been added to your account within 24
                        hours, the amount will be auto-refunded to the source
                        account
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Entypo name="dot-single" size={24} color="black" />
                      <Text style={{color: '#000'}}>
                        Effective 1 October 2023, GST will be calculated at the
                        rate of 28% on amount deposited in your Impact11 account
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Entypo name="dot-single" size={24} color="black" />
                      <Text style={{color: '#000'}}>
                        To enhance user experience, Discount Points will also be
                        awarded to you
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{flexDirection: 'column', gap: 15}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: hp(2.4),
                      color: '#000',
                    }}>
                    Was this article helpful
                  </Text>
                  <View style={{flexDirection: 'row', gap: 20}}>
                    <Pressable onPress={() => handleLike()}>
                      {Like ? (
                        <AntDesign name="like1" size={24} color="#3E57C4" />
                      ) : (
                        <AntDesign name="like2" size={24} color="#000" />
                      )}
                    </Pressable>
                    <Pressable onPress={() => handleDisLike()}>
                      {Dislike ? (
                        <AntDesign name="dislike1" size={24} color="#3E57C4" />
                      ) : (
                        <AntDesign name="dislike2" size={24} color="#000" />
                      )}
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: wp('90%'),
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', color: '#000'}}>
                Can't find what you are looking for?
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: wp('90%'),
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingBottom: 30,
              }}>
              <LinearGradient
                style={{
                  flex: 1,
                  borderRadius: 10,
                }}
                colors={['#101632', '#2A3A83', '#374DAD']}>
                <View
                  style={{
                    width: wp('100%'),
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: wp('100%'),
                      flexDirection: 'row',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        gap: 15,
                        alignItems: 'center',
                        width: wp('54%'),
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: '#fff',
                          fontSize: hp(2.1),
                        }}>
                        We are here to help!
                      </Text>

                      <Pressable
                      onPress={() => navigation.navigate('WriteToUs')} 
                        style={{
                          borderRadius: 5,
                          borderColor: '#fff',
                          borderWidth: 1,
                          alignItems: 'center',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          width: wp(32),
                          padding: 3,
                        }}>
                        <Image
                          source={require('../../../../assets/WriteToUsLogo.png')}
                          style={{height: hp(3), width: wp(6)}}
                        />

                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: '#fff',
                            fontSize: hp(1.6),
                          }}>
                          Write to us
                        </Text>
                      </Pressable>
                    </View>

                    <View style={{width: wp('42%')}}>
                      <Image
                        source={require('../../../../assets/WriteToUs.png')}
                        style={{width: wp(34), height: hp(16)}}
                        // resizeMode='contain'
                      />
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddCashMyBalance;

const styles = StyleSheet.create({});
