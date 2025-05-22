import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Image,
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../envfile/api';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import CheckBox from '@react-native-community/checkbox';
import ReferalCodePopup from '../Models/ReferalCodePopup';

const widgetId = '346543686978353039333132';
const tokenAuth = {authToken: '384577TwCDcUNKMXxm6656eba5P1'};

const LoginEmail = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [tabSwitch, setTabSwitch] = useState(true);
  const [isChecked, setIsChecked] = useState(false); // Checkbox state
  const [error, setError] = useState(false); // Default: No error

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // useEffect(() => {
  //   const authtoken = AsyncStorage.getItem('jwtToken');
  //   if (authtoken) {
  //     navigation.navigate('DrawerNavigation');
  //   } else {
  //     navigation.navigate('LoginScreen');
  //   }
  // }, []);

  const [loading, setLoading] = useState(false);
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const checkEmailAndLogin = async () => {
    // console.log('hitting email login');

    Keyboard.dismiss();
    if (!email) {
      setErrorMessage('*Email is required.');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('*Please enter a valid email address.');
      return;
    }
    setErrorMessage('');
    if (!isChecked) {
      setError(true); // ✅ Show error if checkbox is not checked
      return;
    } else {
      setError(false); // ✅ Clear error if checkbox is checked
    }
    setLoading(true);
    try {
      const body = {
        email: email,
        // referralCode: referalcode,
      };
      // console.log(body, 'req body from email login');
      // console.log(api, 'Hitting api');

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };

      const response = await axios.post(api + '/admin/email/send-otp', body, {
        headers,
      });
      // console.log(response.data, 'response from email login');

      setLoading(false);

      if (response?.data?.success === true) {
        showMessage({
          message: 'Impact11',
          description: 'OTP Sent Successfully!',
          type: 'success',
          backgroundColor: '#4CAF50',
          color: '#FFFFFF',
          duration: 3000,
        });

        await AsyncStorage.setItem('email', response.data.userDtoList[0].email);
        setTimeout(
          () => navigation.navigate('Otp'),

          2000,
        );

        // console.log(response.data.message, 'OTP Sent');
      } else {
        setErrorMessage(response.data.message || 'Invalid email');
        // console.log('Invalid email');
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage('Failed to send OTP. Please try again.');
      // console.log('Error sending OTP:', error.message);
    }
  };

  const checkMobileAndLogin = async () => {
    // console.log('hitting mobilenumber login');

    if (!mobile.trim()) {
      setErrorMessage('*Mobile Number is required.');
      return;
    }

    if (mobile.trim().length < 10) {
      setErrorMessage('*Enter a valid Mobile Number');
      return;
    }

    // Clear error if the mobile number is valid
    setErrorMessage('');

    if (!isChecked) {
      setError(true); // ✅ Show error if checkbox is not checked
      return;
    } else {
      setError(false); // ✅ Clear error if checkbox is checked
    }
    setLoading(true);
    try {
      const body = {
        userDtoList: [
          {
            mobile: mobile,
            // referralCode: referalcode,
          },
        ],
      };
      // console.log(body, 'req body from mobile login');
      const response = await axios.post(api + '/admin/mobile/send-otp', body);

      setLoading(false);

      if (response?.data?.success === true) {
        showMessage({
          message: 'Impact11',
          description: 'OTP Sent Successfully!',
          type: 'success',
          backgroundColor: '#4CAF50',
          color: '#FFFFFF',
          duration: 3000,
        });
        await AsyncStorage.setItem(
          'mobile',
          response.data.userDtoList[0].mobile,
        );
        setTimeout(
          () => navigation.navigate('Otp', {mobile: response.data.mobile}),
          2000,
        );

        // console.log(response.data.message, 'OTP Sent');
        // console.log(navigation.getState());
      } else {
        setErrorMessage(response.data.message || 'Invalid mobile');
        // console.log('Invalid mobile');
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage('Failed to send OTP. Please try again.');
      console.error('Error sending OTP:', error.message);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#020202'}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <LinearGradient
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
            }}
            colors={['#020202', '#192451', '#243373', '#3b53bd']}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              keyboardShouldPersistTaps="handled">
              {/* Logo Section */}
              <FlashMessage position="top" />

              <View style={{alignItems: 'center', paddingTop: 50}}>
                <Image
                  source={require('../../assets/LogoFinal.png')}
                  style={{width: wp(35), height: hp(10)}}
                  resizeMode="contain"
                />
              </View>

              {/* Login Fields */}
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  paddingHorizontal: 20,
                  gap: 15,
                }}>
                <Text
                  style={{
                    fontSize: hp(2.5),
                    color: '#fff',
                    fontFamily: 'Roboto-Bold',
                    textAlign: 'left',
                    // backgroundColor:"#f27",
                    width: '100%',
                  }}>
                  Login / Register
                </Text>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    backgroundColor: '#323C67',
                    padding: 6,
                    gap: 5,
                    justifyContent: 'space-between',
                    borderRadius: 5,
                  }}>
                  {/* Phone Tab */}
                  <Pressable
                    onPress={() => {
                      setErrorMessage('');

                      setTabSwitch(true);
                    }}
                    style={{
                      width: '48%',
                      padding: 10,
                      backgroundColor: tabSwitch ? '#fff' : '#323C67', // Highlight active tab
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: hp(2.0),
                        color: tabSwitch ? '#3E57C4' : '#A0A0A0', // Change text color based on active tab
                        fontFamily: 'Roboto-Bold',
                        textAlign: 'center',
                        width: '100%',
                      }}>
                      Phone
                    </Text>
                  </Pressable>

                  {/* Email Tab */}
                  <Pressable
                    onPress={() => {
                      setErrorMessage('');

                      setTabSwitch(false);
                    }}
                    style={{
                      width: '48%',
                      padding: 10,
                      backgroundColor: !tabSwitch ? '#fff' : '#323C67', // Highlight active tab
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: hp(2.0),
                        color: !tabSwitch ? '#3E57C4' : '#A0A0A0', // Change text color based on active tab
                        fontFamily: 'Roboto-Bold',
                        textAlign: 'center',
                        width: '100%',
                      }}>
                      Email
                    </Text>
                  </Pressable>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  {tabSwitch === true ? (
                    <TextInput
                      value={mobile}
                      onChangeText={text => setMobile(text)}
                      placeholderTextColor="#ababab"
                      placeholder="Enter Mobile Number"
                      style={{
                        width: wp('90%'),
                        padding: 12,
                        borderRadius: 5,
                        color: '#fff',
                        fontSize: hp(1.8),
                        backgroundColor: '#323C67',
                      }}
                    />
                  ) : (
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      placeholder="Enter Email Address"
                      placeholderTextColor="#ababab"
                      style={{
                        width: wp('90%'),
                        padding: 12,
                        borderRadius: 5,
                        color: '#fff',
                        fontSize: hp(1.8),
                        backgroundColor: '#323C67',
                      }}
                    />
                  )}

                  {errorMessage && (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Roboto-Bold',
                          fontSize: hp(1.4),
                          color: '#ed3939',
                        }}>
                        {errorMessage}
                      </Text>
                    </View>
                  )}
                </View>
                <Pressable
                  onPress={() => {
                    setIsChecked(!isChecked);
                    setError(false); // Clear error when checked
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%',
                  }}>
                  <CheckBox
                    value={isChecked}
                    onValueChange={() => {
                      setIsChecked(!isChecked);
                      setError(false); // Clear error when checked
                    }}
                    tintColors={{true: '#fff', false: '#fff'}}
                    boxType="square"
                  />

                  <Text
                    style={{
                      marginLeft: 2,
                      fontSize: hp(1.5),
                      color: error ? '#FF0000' : '#fff',
                    }}>
                    I certify that I am above 18 years
                  </Text>
                </Pressable>

                {loading ? (
                  <Pressable
                    style={{
                      width: wp('90%'),
                      padding: 4,
                      backgroundColor: '#3757E2',
                      borderRadius: 5,
                      alignItems: 'center',
                    }}>
                    <ActivityIndicator size="large" color="#fff" />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={
                      tabSwitch ? checkMobileAndLogin : checkEmailAndLogin
                    } // Toggle based on tabSwitch
                    // disabled={!isChecked}
                    style={{
                      width: wp('90%'),
                      padding: 12,
                      backgroundColor: '#3757E2',
                      borderRadius: 5,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Roboto-Bold',
                        fontSize: hp(1.9),
                        color: '#fff',
                      }}>
                      Get OTP
                    </Text>
                  </Pressable>
                )}

                <View>
                  <Text style={{color: '#fff', fontSize: hp(1.5)}}>
                    By continuing, I agree to Impact11’s T&Cs
                  </Text>
                </View>
                {/* {error && (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Roboto-Bold',
                          fontSize: hp(1.4),
                          color: '#ed3939',
                        }}>
                        {error}
                      </Text>
                    </View>
                  )} */}
              </View>

              {/* Anime Image (Moves when Keyboard appears) */}
              <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                  marginTop: keyboardVisible ? 10 : 10,
                }}>
                <Image
                  source={require('../../assets/AnimeImage.png')}
                  style={{width: wp('100%'), height: hp('36%')}}
                  resizeMode="contain"
                />
              </View>
            </ScrollView>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footerText: {
    fontSize: hp(1.8),
    color: '#fff',
  },
});

export default LoginEmail;
