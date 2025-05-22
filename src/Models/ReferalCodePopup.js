import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import { Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { api } from '../envfile/api';

const ReferalCodePopup = ({ visible, onClose, setReferalCode }) => {
  const [inputCode, setInputCode] = useState(''); // Local state for input field
  const [error, setError] = useState(''); // State for error message
  const [loading, setLoading] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setError('');
    }, []),
  );

  const ReferalCodeApply = async () => {
    try {
      Keyboard.dismiss();

      // Validate input
      if (!inputCode.trim()) {
        setError('Referral code is required!'); // Show error message
        return;
      }

      setLoading(true);

      const body = {
        referralCode: inputCode,
      };

      // console.log(body, 'Referral code request payload');

      const response = await axios.post(
        api + '/admin/user/checkReferral',
        body,
      );

      // console.log(response.data, 'Referral code apply API response');

      if (response.data.success) {
        setError(''); // Clear any previous errors
        setReferalCode(inputCode); // Update referral code
        onClose(); // Close modal
      } else {
        setError('Referral code not found, try again');
      }
    } catch (error) {
      console.error('Referral code API error:', error);
      setError('Something went wrong, please try again');
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <Pressable
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',

        }}
        onPress={onClose}>
        <View
          style={{
            width: wp('100%'),
            backgroundColor: '#f2f2f2',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            padding: 15,
            // backgroundColor: 'rgba(0, 0, 0, 0.1)',
          }}>
          {/* Close Button */}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Pressable onPress={onClose}>
              <MaterialCommunityIcons name="close" size={24} color="#000" />
            </Pressable>
          </View>

          {/* Animation */}
          <View style={{ alignItems: 'center', padding: 1 }}>
            <Image
              source={require('../../assets/Refer.png')}
              style={{ height: hp(12), width: wp(22) }}
            />
          </View>

          {/* Title */}
          <Text
            style={{
              fontSize: hp(2.1),
              color: '#000',
              fontFamily: 'Roboto-Bold',
              textAlign: 'center',
              marginBottom: 10,
            }}>
            Enter Referral Code
          </Text>

          {/* Input Field */}
          <View style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: "center", alignItems: "center" }}>
            <TextInput
              value={inputCode}
              onChangeText={text => {
                setInputCode(text);
                setError(''); // Clear error when typing
              }}
              placeholder="Referral Code"
              placeholderTextColor="#999"
              
              style={{
                width: wp(90),
                height: hp(6),
                borderWidth: 1,
                borderColor: error ? '#f00' : '#ccc', // Change border color on error
                borderRadius: 5,
                paddingHorizontal: 12,
                fontSize: hp(1.8),
                color: '#000',
                alignSelf: 'center',
              }}
            />

            {/* Error Message */}
            {error ? (
              <Text style={{ color: '#f00', fontSize: hp(1.6) }}>
                {error}
              </Text>
            ) : null}

            <View style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", width: wp(90) }}>
              <Text
                style={{
                  fontSize: hp(1.5),
                  color: '#000',
                  textAlign: 'left',
                  // paddingLeft: 5,
                }}>
                Not applicable to numbers that are already registered!
              </Text>
            </View>

            {/* Apply Button */}
            {loading ? (

              <Pressable
                style={{
                  width: wp("90%"),
                  padding: 4,
                  backgroundColor: '#3757E2',
                  borderRadius: 5,
                  alignItems: 'center', justifyContent: "center"
                }}>
                <ActivityIndicator size="large" color="#fff" />
              </Pressable>
            ) : (
              <Pressable
                onPress={ReferalCodeApply}
                style={{
                  width: wp("90%"),
                  padding: 12,
                  backgroundColor: '#3757E2',
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: "center"
                }}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Bold',
                    fontSize: hp(1.9),
                    color: '#fff',
                  }}>
                  APPLY
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ReferalCodePopup;
