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

const VerifyImapact11P = () => {
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
    <SafeAreaView>
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
                  Profile & Verification
                </Text>
                <Text style={{color: '#6F6F6F'}}>/ Verify my account</Text>
              </View>
              <View style={{flexDirection: 'column', gap: 40}}>
                <View style={{flexDirection: 'column', gap: 15}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: hp(2.3),
                      color: '#000',
                    }}>
                    How to verify my Impact11 account?
                  </Text>
                  <Text style={{color: '#000'}}>
                    To verify your account, Go to My balance from side
                    Navigation menu and click on “My KYC Details” Mobile number
                    and email address will be verified while Signup to Impact11.
                    . You will need to verify PAN and Bank account
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: hp(2.1),
                      color: '#000',
                    }}>
                    To Verify PAN card:
                  </Text>
                  <View style={{flexDirection: 'column', width: '98%'}}>
                    <Text style={{color: '#000'}}>
                      Click on Verify next to PAN card
                    </Text>
                    <Text style={{color: '#000'}}>
                      Enter your name, PAN card number, date of birth and state
                      exactly as mentioned on your PAN Card
                    </Text>
                    <Text style={{color: '#000'}}>
                      Upload a clear image of your PAN card and tap on 'Submit
                      Details'
                    </Text>
                  </View>
                  <Text style={{color: '#000'}}>
                    And That’s it you are done
                  </Text>
                  <Text style={{color: '#000'}}>
                    PS: Once verified, a PAN card can’t be used on any other
                    Impact11 account. It also can't be unlinked from your
                    Impact11 account.
                  </Text>
                  <Text style={{color: '#000'}}>Note:</Text>
                  <View style={{flexDirection: 'column', width: wp('98%')}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Entypo name="dot-single" size={24} color="black" />
                      <Text style={{color: '#000'}}>
                        Full name on PAN card must match:
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Entypo name="dot-single" size={24} color="black" />
                      <Text style={{color: '#000'}}>
                        Full name on previously verified KYC document
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Entypo name="dot-single" size={24} color="black" />
                      <Text style={{color: '#000'}}>
                        Full name on bank account to be verified
                      </Text>
                    </View>
                  </View>
                  <Text style={{color: '#000'}}>
                    The verification will be completed in a maximum of 1 working
                    day.
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: hp(2.2),
                      color: '#000',
                    }}>
                    To Verify Bank Account:
                  </Text>
                  <Text style={{color: '#000'}}>
                    Click on Verify next to Bank account
                  </Text>
                  <Text style={{color: '#000'}}>
                    Enter the bank account number that’s linked to your PAN card
                    along with the IFSC code, Bank name and, Branch name, add
                    your state and upload a clear image of your bank document.
                  </Text>
                  <Text style={{color: '#000'}}>
                    The verification will be completed in a maximum of 1 working
                    day.
                  </Text>
                  <View style={{flexDirection: 'column', width: wp('78%')}}>
                    <Text style={{fontWeight: 'bold', color: '#000'}}>
                      Note:
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Entypo name="dot-single" size={24} color="black" />
                      <Text style={{color: '#000'}}>
                        Accepted documents - bank passbook, cheque or bank
                        statement which has your name, bank account number, IFSC
                        and branch details
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Entypo name="dot-single" size={24} color="black" />
                      <Text style={{color: '#000'}}>
                        Password-protected files will be rejected
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Entypo name="dot-single" size={24} color="black" />
                      <Text style={{color: '#000'}}>
                        An email confirmation will be sent once your bank
                        details are verified.
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Entypo name="dot-single" size={24} color="black" />
                      <Text style={{color: '#000'}}>
                        A PAN or bank account verified on a Impact11 account
                        cannot be verified on any other Impact11 account
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Entypo name="dot-single" size={24} color="black" />
                      <Text style={{color: '#000'}}>
                        Users aren't permitted to verify NRE bank accounts
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Entypo name="dot-single" size={24} color="black" />
                      <Text style={{color: '#000'}}>
                        You can also verify payment bank accounts. However,
                        wallets cannot be verified
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
                paddingBottom: 20,
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

export default VerifyImapact11P;

const styles = StyleSheet.create({});
