import {Keyboard, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { api } from '../envfile/api';
import { useNavigation } from '@react-navigation/native';

const VerifyEmail = () => {
  const [email, setemail] = useState('');
  const [ErrorMessage, setErrorMessage] = useState();
  const navigation = useNavigation();
 const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const checkEmailAndLogin = async () => {
     console.log("hyhy");
     
    Keyboard.dismiss();
    if (!email) {
         console.log("no");
      setErrorMessage('*Email is required.');
      return;
    }
    if (!validateEmail(email)) {
        console.log("noyes");
      setErrorMessage('*Please enter a valid email address.');
      return;
    }
   
 console.log("Validation passed, proceeding with API call...");
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
 console.log("API response:", response.data);

      if (response?.data?.success === true) {
         console.log("success");
         navigation.navigate('VerifyEmailOtp')
        showMessage({
          message: 'Impact11',
          description: 'OTP Sent Successfully!',
          type: 'success',
          backgroundColor: '#4CAF50',
          color: '#FFFFFF',
          duration: 3000,
        });

        await AsyncStorage.setItem('email', response.data.userDtoList[0].email);
        
        // setTimeout(
        //   () => navigation.navigate('Otp'),

        //   2000,
        // );

        // console.log(response.data.message, 'OTP Sent');
      } else {
        setErrorMessage(response.data.message || 'Invalid email');
        // console.log('Invalid email');
      }
    } catch (error) {
    //   setLoading(false);
      setErrorMessage('Failed to send OTP. Please try again.');
    }
  };
  

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}>
        <View style={{width: '100%'}}>
          <TextInput
            value={email}
            onChangeText={setemail}
            placeholder="Email"
            keyboardType='email-address'
            placeholderTextColor="#ababab"
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 5,
              color: '#000',
              fontSize: 16,
              fontWeight: '500',
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#ababab',
              
            }}
          />
        </View>
        <View style={{width: '100%'}}>
          <LinearGradient
            style={{
              borderRadius: 5,
            }}
            colors={['#3E57C4', '#1E2A5E']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}>
            <Pressable
            onPress={checkEmailAndLogin}
              style={{
                width: '100%',
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                display: 'flex',
              }}>
              <Text style={{fontWeight: '600', fontSize: 14, color: '#FFF'}}>
                SEND OTP
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({});
