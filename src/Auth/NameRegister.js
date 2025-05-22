import React, {useEffect, useState} from 'react';
import {
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
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {setUserName} from '../Redux/Slice';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {api} from '../envfile/api';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReferalCodePopup from '../Models/ReferalCodePopup';

const NameRegister = () => {
  const navigation = useNavigation();
  const [userName, setuserName] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [referalcode, setReferalcode] = useState('');

  const dispatch = useDispatch();

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

  const [loading, setLoading] = useState(false);
  const checkUsernameAndLogin = async () => {
    Keyboard.dismiss();

    if (!userName) {
      setErrorMessage('Username is required.');
      return;
    }

    setErrorMessage('');
    setLoading(true);
// console.log(referalcode,"referalcode referalcode");
    try {
      const email = await AsyncStorage.getItem('email');
      const body = {name: userName, email: email,referralCode:referalcode};
      // console.log(body, 'name register body');
      const response = await axios.post(
        api + '/admin/email/save-userName',
        body,
      );
      // console.log(response.data, 'response from api');

      setTimeout(() => {
        setLoading(false);
      }, 1000);

      if (response.data.success === true) {
        const userDtoList = response.data.userDtoList;
        const usernameFromResponse = userDtoList?.[0]?.username;

        if (usernameFromResponse) {
          // ✅ Save as a string in AsyncStorage
          await AsyncStorage.setItem(
            'userDetails',
            JSON.stringify(userDtoList),
          );

          navigation.navigate('DrawerNavigation');
        } else {
          setErrorMessage('Something went wrong. Please try again.');
          // console.log('No username found in response.');
        }
      } else {
        setErrorMessage('Invalid username.');
        // console.log('Invalid username');
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage('Failed to register username. Please try again.');
      // console.log(error, 'name register error');
    }
  };

  return (
    <View style={{backgroundColor: '#fff', width: '100%', height: '100%'}}>
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
            <Text
              style={{
                fontSize: hp(2),
                fontWeight: 'bold',
                color: '#fff',
                textAlign: 'start',
              }}>
              Name Register
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
          paddingTop: 15,
          gap: 15,
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
            source={require('../../assets/GetUserNameId.png')}
            style={{height: hp(12), width: wp(35), borderRadius: 10}}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: hp(2.5),
              fontFamily: 'Roboto-Bold',
              color: '#000',
            }}>
            Let's know you better
          </Text>
        </View>

        <View style={{alignItems: 'center', width: '90%'}}>
          <Text
            style={{
              fontSize: hp(2),
              color: '#333333',
              textAlign: 'center',
              width: '100%',
            }}>
            Tell us your name{'\n'}
            so we can generate a Teamname for you
          </Text>
        </View>

        <View
          style={{
            padding: 4,
            backgroundColor: '#E6E6E6',
            borderRadius: 15,
            paddingLeft: 10,
            paddingRight: 10,
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <Ionicons name="information-circle" size={16} color="#898989" />
          </View>
          <Text style={{fontSize: hp(1.5), color: '#000'}}>
            You can change your team name later
          </Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 15,
            marginTop: 10,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <TextInput
              value={userName}
              onChangeText={text => {
                setuserName(text);
                dispatch(setUserName(text));
              }}
              placeholderTextColor="#ababab"
              placeholder="Enter Username"
              style={{
                width: wp('90%'),
                padding: 9,
                borderRadius: 5,
                color: '#333', // Changed text color to make it visible
                fontSize: hp(1.7),
                backgroundColor: '#fff',
                borderWidth: 1, // Border thickness
                borderColor: '#d3d3d3', // Light gray border color
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
                  paddingTop: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Bold',
                    fontSize: hp(1.4),
                    color: '#ed3939',
                    paddingLeft: 1,
                  }}>
                  {errorMessage}
                </Text>
              </View>
            )}
          </View>

          {loading ? (
            <Pressable>
              <LinearGradient
                colors={['#3b53bd', '#243373', '#192451', '#020202']}
                start={{x: 0, y: 0}} // Start from left
                end={{x: 1, y: 0}} // End at right
                style={{
                  width: wp('90%'),
                  padding: 4,
                  borderRadius: 5,
                  alignItems: 'center',
                }}>
                <Text>
                  <ActivityIndicator size="large" color="#fff" />
                </Text>
              </LinearGradient>
            </Pressable>
          ) : (
            <Pressable onPress={checkUsernameAndLogin}>
              <LinearGradient
                colors={['#3b53bd', '#243373', '#192451', '#020202']}
                start={{x: 0, y: 0}} // Start from left
                end={{x: 1, y: 0}} // End at right
                style={{
                  width: wp('90%'),
                  padding: 12,
                  borderRadius: 5,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Bold',
                    fontSize: hp(1.9),
                    color: '#fff',
                  }}>
                  Continue
                </Text>
              </LinearGradient>
            </Pressable>
          )}

          {referalcode ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: wp('90%'),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  // marginLeft: 8,
                  fontSize: hp(1.9),
                  color: '#5CE65C', // Green color for success message
                  fontFamily: 'Roboto-Bold',
                }}>
                ✅ Referral code applied successfully!
              </Text>
            </View>
          ) : (
            <Pressable
              style={{
                width: wp('90%'),
                padding: 12,
                borderRadius: 5,
                alignItems: 'center',
                backgroundColor: '#ADD8E6', // Light Blue Background
              }}
              onPress={() => setIsPopupVisible(true)}>
              <MaskedView
                maskElement={
                  <Text
                    style={{
                      fontFamily: 'Roboto-Bold',
                      fontSize: hp(1.8),
                      color: 'black', // Mask color
                      textAlign: 'center',
                    }}>
                    Have a Referral Code?
                  </Text>
                }>
                <LinearGradient
                  colors={['#3b53bd', '#243373', '#192451', '#020202']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <Text
                    style={{
                      fontSize: hp(1.9),
                      opacity: 0, // Hide original text
                    }}>
                    Have a Referral Code?
                  </Text>
                </LinearGradient>
              </MaskedView>
            </Pressable>
          )}
        </View>
        <ReferalCodePopup
          visible={isPopupVisible}
          setReferalCode={setReferalcode} // ✅ Pass the setter function correctly
          onClose={() => setIsPopupVisible(false)}
          onDiscard={() => {
            setIsPopupVisible(false);
          }}
        />
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
export default NameRegister;
