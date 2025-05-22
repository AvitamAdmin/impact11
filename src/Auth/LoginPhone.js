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
} from 'react-native';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
/**import { OTPWidget } from "@msg91comm/sendotp-react-native"; */
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {api} from '../envfile/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const widgetId = '346543686978353039333132';
const tokenAuth = {authToken: '384577TwCDcUNKMXxm6656eba5P1'};

const LoginPhone = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const checkMobileAndLogin = async () => {
    if (!mobile) {
      setErrorMessage('*Mobile Number is required.');
      return;
    }

    setLoading(true);
    try {
      const body = {
        userDtoList: [
          {
            mobile: mobile,
          },
        ],
      };
      const response = await axios.post(api + '/admin/mobile/send-otp', body);

      setLoading(false);

      if (response?.data?.success === true) {
       
        showMessage({
          message: "Impact11",
          description: "OTP Sent Successfully!",
          type: "success",
          backgroundColor: "#4CAF50",
          color: "#FFFFFF",
          duration: 3000
        });
        await AsyncStorage.setItem(
          'mobile',
          response.data.userDtoList[0].mobile,
        );
        setTimeout(() =>  navigation.navigate('Otp', {mobile: response.data.mobile})
        , 2000);
       
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
                  style={{width: wp(45), height: hp(13)}}
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
                }}>
                <Text
                  style={{
                    fontSize: hp(2.5),
                    color: '#fff',
                    fontFamily: 'Roboto-Bold',
                    marginBottom: 20,
                  }}>
                  Login / Register
                </Text>
                <View
                  style={{
                    marginBottom: 15,
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <TextInput
                    value={mobile}
                    onChangeText={text => setMobile(text)}
                    placeholderTextColor="#ababab"
                    placeholder="Enter Mobile Number"
                    style={{
                      width: wp('90%'),
                      padding: 9,
                      borderRadius: 5,
                      color: '#fff',
                      fontSize: hp(1.7),
                      backgroundColor: '#323C67',
                    }}
                  />
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
                    onPress={checkMobileAndLogin}
                    style={{
                      width: wp('90%'),
                      padding: 12,
                      backgroundColor: '#3757E2',
                      borderRadius: 5,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: hp(1.9),
                        color: '#fff',
                      }}>
                      Get OTP
                    </Text>
                  </Pressable>
                )}
                <View style={{alignItems: 'center', padding: 5, marginTop: 5}}>
                  <Pressable onPress={() => navigation.replace('LoginEmail')}>
                    <Text style={{fontSize: hp(1.8), color: '#fff'}}>
                      Login With Email
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                  marginTop: keyboardVisible ? 20 : 50,
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
    fontSize: hp(1.6),
    color: '#fff',
  },
});

export default LoginPhone;
