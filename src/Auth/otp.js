import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/core';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {api} from '../envfile/api';
import LinearGradient from 'react-native-linear-gradient';

const Otp = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);
  const [errorMsg, seterrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const [maskedEmail, setMaskedEmail] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('email'); // Await the email
        if (email) {
          setMaskedEmail(maskEmail(email));
        }
      } catch (error) {
        console.error('Error fetching email from AsyncStorage:', error);
      }
    };

    fetchEmail();
  }, []);

  const maskEmail = email => {
    const [name, domain] = email.split('@');
    const maskedName = name.slice(0, 3) + '*'.repeat(name.length - 3); // First 3 characters and mask the rest
    return `${maskedName}@${domain}`;
  };

  const focusNextField = (index, value) => {
    const otpArray = [...otp];

    // If value is empty and focus is moving back, keep the old behavior
    if (value === '' && index > 0) {
      inputs.current[index]?.focus(); // Stay on the current input
    }

    otpArray[index] = value;
    setOtp(otpArray);

    if (value && index < otp.length - 1) {
      inputs.current[index + 1]?.focus(); // Move to the next input
    }
  };

  // Auto-submit OTP when 6 digits are entered
  useEffect(() => {
    if (otp.join('').length === 6) {
      verifyOtp();
    }
  }, [otp]);

  const verifyOtp = async () => {
    Keyboard.dismiss();

    const otpString = otp.join('');

    if (otpString.length !== 6) {
      seterrorMsg('Please enter all 6 digits.');
      return;
    }

    seterrorMsg('');
    setLoading(true);

    try {
      const email = await AsyncStorage.getItem('email');
      if (!email) throw new Error('Email not found in AsyncStorage');

      const body ={emailOTP: otpString, email}

      // console.log('Sending OTP validation request:', body);
      const response = await axios.post(
        api + '/admin/email/validate-otp',
        body,
      );

      // console.log('Response received:', response.data);

      if (!response?.data?.success) {
        seterrorMsg('Invalid OTP. Please try again.');
        setLoading(false);
        return;
      }

      // Ensure userDtoList exists and contains at least one user object
      if (
        !response.data.userDtoList ||
        response.data.userDtoList.length === 0
      ) {
        seterrorMsg('Verification failed. Please try again.');
        setLoading(false);
        return;
      }

      const user = response.data.userDtoList[0]; // Extract user object
      const token = user?.token;
      const recordId = user?.recordId;
      // console.log(recordId,"recordId recordId");

      if (!token) {
        seterrorMsg('Something went wrong. Please log in again.');
        setLoading(false);
        return;
      }

      setSuccessMsg(true);
      await AsyncStorage.setItem('jwtToken', token);       
      await AsyncStorage.setItem("userId",recordId);

     

      // Navigate based on whether the user is new or existing
      if (user.new === true) {
        navigation.navigate('Nameregister');
      } else {   
        navigation.navigate('DrawerNavigation');
      }
    } catch (error) {
      console.error('Verify OTP Error:', error);
      seterrorMsg('Verification Failed.');

   
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const body = {
        email: email
      }
      setLoading(true);
      await axios.post(api + '/admin/email/send-otp', body);
      showMessage({
        message: "Impact11",
        description: "A new OTP has been sent to your email.",
        type: "success",
        backgroundColor: "#4CAF50",
        color: "#FFFFFF",
        duration: 3000,
      });
    
    } catch (error) {
      seterrorMsg('Unable to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      navigation.navigate('NameRegister');
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <View>
      <LinearGradient
        colors={['#3b53bd', '#243373', '#192451', '#020202']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}>
        <SafeAreaView
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between', // Ensure proper spacing
            width: wp('100%'),
            height: Platform.OS === 'ios' ? hp(15) : hp(8), // Reduced to fit properly
            paddingHorizontal: wp(3),
            paddingTop: Platform.OS === 'ios' ? hp(1) : 0, // Extra padding for iOS
          }}>
          {/* Back Icon */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          {/* Header Content */}
          <View
            style={{flex: 1, alignItems: 'start', justifyContent: 'center'}}>
              <FlashMessage position="top" />
              <Text
              style={{
                fontSize: hp(2),
                fontWeight: 'bold',
                color: '#fff',
                textAlign: 'start',
              }}>
              Verification
            </Text>
          </View>

          {/* Right Side Placeholder (to balance layout) */}
          <View style={{width: wp('10%')}} />
        </SafeAreaView>
      </LinearGradient>

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: wp('100%'),
          paddingTop: 30,
          gap: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: wp('100%'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/OTPImage.png')}
            style={{height: hp(21), width: wp(60)}}
          />
        </View>

        <View>
          <Text style={{fontWeight: 'bold', color: '#000'}}>
            Enter Your OTP Code
          </Text>
        </View>
        <View>
          <Text style={{color: '#000', fontSize: hp(1.7)}}>
            A 6-Digit-code has been sent to
          </Text>
        </View>
        <View>
          <Text style={{color: '#000'}}>{maskedEmail}</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.otpInputContainer}>
            {otp.map((data, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                keyboardType="numeric"
                textAlign="center"
                maxLength={1}
                ref={ref => (inputs.current[index] = ref)}
                onChangeText={value => focusNextField(index, value)}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace' && otp[index] === '') {
                    if (index > 0) {
                      inputs.current[index - 1]?.focus();
                      const otpArray = [...otp];
                      otpArray[index - 1] = ''; // Also clear the previous input
                      setOtp(otpArray);
                    }
                  }
                }}
                value={otp[index]}
              />
            ))}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: wp('100%'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{opacity: 0.6, color: '#000'}}>
            Didn't receive the OTP?
          </Text>
          <Pressable onPress={resendOtp}>
            <Text
              style={{
                fontSize: hp(2),
                fontWeight: '600',
                marginLeft: 6,
                color: '#000',
              }}>
              RESEND OTP
            </Text>
          </Pressable>
        </View>

        { successMsg ? (
          <Pressable
            onPress={() => {
              verifyOtp().catch(error => {
                console.error('Error in OTP verification:', error);
              });
            }}
            style={{
              // padding: 10,
              width: wp('100%'),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
            }}>
            <LinearGradient
              style={{
                padding: 10,
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              colors={['#4CAF50', '#2E7D32', '#1B5E20', '#0D3312']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>
                OTP Verified Successfully
              </Text>
            </LinearGradient>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              verifyOtp().catch(error => {
                console.error('Error in OTP verification:', error);
              });
            }}
            style={{
              // padding: 10,
              width: wp('100%'),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
            }}>
            <LinearGradient
              style={{
                padding: 10,
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              colors={['#3b53bd', '#243373', '#192451', '#020202']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>
                {loading ? 'Verifying...' : "LET'S PLAY"}
              </Text>
            </LinearGradient>
          </Pressable>
        )}
        {errorMsg && (
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
                fontSize: hp(1.8),
                color: '#ed3939',
              }}>
              {errorMsg}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: wp('100%'),
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpInput: {
    width: 40,
    height: 40,
    margin: 5,
    fontSize: hp(2),
    borderRadius: 5,
    color: '#000',
    backgroundColor: '#E8E8E8',
  },
});

export default Otp;
