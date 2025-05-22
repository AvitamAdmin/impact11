import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Modal, Pressable, TextInput, Keyboard} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {api} from '../envfile/api';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {ActivityIndicator} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';

const ProfileFieldUpdatePopup = ({
  visible,
  onClose,
  fieldInputName,
  setFieldInputName,
  labelName,
  updateFieldValue,
  recordId
}) => {
  const inputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [verifyOTP, setverifyOTP] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [successMsg, setSuccessMsg] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    if (visible && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [visible]);

  const handleClose = () => {
    Keyboard.dismiss();
    setTimeout(onClose, 50);
    setErrorMessage('');

  };

  const handleSave = () => {
    if (!fieldInputName) {
      setErrorMessage(`${labelName} is required`);
    } else {
      setErrorMessage('');
      updateFieldValue();
    }
  };

  const [loading, setLoading] = useState(false);

  const generateOtpForMobile = async () => {
    setErrorMessage("");

    // console.log('Generating OTP for Mobile');

    if (!fieldInputName) {
      setErrorMessage(`${labelName} is required`);
      return;
    }

    try {
      setLoading(true); // Start loading
      const body = {mobile: fieldInputName};
      const response = await axios.post(api + '/admin/email/send-otp', body);

      // console.log(body, 'req body from mobile login');
      // console.log(response.data, 'response body from mobile login');

      if (response?.data?.success) {
        showMessage({
          message: 'Impact11',
          description: 'OTP Sent Successfully!',
          type: 'success',
          backgroundColor: '#4CAF50',
          color: '#FFFFFF',
          duration: 3000,
        });
        setverifyOTP(true);

        // console.log(response.data.message, 'OTP Sent');
      } else {
        setErrorMessage(response.data.message || 'Invalid mobile number');
        // console.log('Invalid mobile number');
      }
    } catch (error) {
      // console.error('Error sending OTP:', error);
      setErrorMessage('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const generateOtpForEmail = async () => {
    // console.log('Generating OTP for Email');
    setErrorMessage("");
    if (!fieldInputName) {
      setErrorMessage(`${labelName} is required`);
      return;
    }
  
    // Validate email format
    if (!emailRegex.test(fieldInputName)) {
      setErrorMessage('Invalid email format');
      return;
    }
  
    try {
      setLoading(true); // Start loading
      const body = { email: fieldInputName };
      const response = await axios.post(api + '/admin/email/send-otp', body);
  
      // console.log(body, 'req body from email login');
      // console.log(response.data, 'response body from email login');
  
      if (response?.data?.success) {
        showMessage({
          message: 'Impact11',
          description: 'OTP Sent Successfully!',
          type: 'success',
          backgroundColor: '#4CAF50',
          color: '#FFFFFF',
          duration: 3000,
        });
        setverifyOTP(true);
        // console.log(response.data.message, 'OTP Sent');
      } else {
        setErrorMessage(response.data.message || 'Invalid email');
        // console.log('Invalid email');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setErrorMessage('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };
  

  const handlePress = () => {
    if (labelName === 'Mobile') {
      generateOtpForMobile();
    } else if (labelName === 'Email') {
      generateOtpForEmail();
    } else {
      handleSave();
    }
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

  useEffect(() => {
    if (otp.join('').length === 6) {
      verifyOtp();
    }
  }, [otp]);

  const verifyOtp = async () => {
    Keyboard.dismiss();
  
    const otpString = otp.join('');
    setErrorMessage('');
  
    if (otpString.length !== 6) {
      setErrorMessage('Please enter all 6 digits.');
      return;
    }
  
    setLoading(true);
  
    try {
      const body = { emailOTP: otpString, email: fieldInputName,recordId:recordId };
  
      // console.log('Sending OTP validation request:', body);
      const response = await axios.post(api + '/admin/email/validate-otp', body);
  
      // console.log('Response received:', response.data);
  
      // Check if success is false
      if (!response?.data?.success) {
        setErrorMessage('Invalid OTP. Please try again.');
        setLoading(false);
        return;
      }
  
      // Ensure userDtoList exists and contains at least one user object
      if (!response.data.userDtoList || response.data.userDtoList.length === 0) {
        setErrorMessage('Verification failed. Please try again.');
        setLoading(false);
        return;
      }
      const user = response.data.userDtoList[0]; // Extract user object
      const token = user?.token;
      await AsyncStorage.setItem('jwtToken', token);
  
      setSuccessMsg(true);
      setErrorMessage('');
      
      setTimeout(() => {
        updateFieldValue();
        setverifyOTP(false);
        setSuccessMsg(false);
      }, 2000);
      
    } catch (error) {
      console.error('Verify OTP Error:', error);
      setErrorMessage('Verification Failed.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleVerify = () => {
    if (labelName === 'Mobile') {
      verifyOtp();
    } else {
      verifyOtp();
    }
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <Pressable
        style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}
        onPress={handleClose}>
        <FlashMessage position="top" />

        <View
          style={{
            width: '100%',
            backgroundColor: '#f2f2f2',
            padding: 20,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}>
          {/* Header */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {verifyOTP === true ? (      
           <Pressable onPress={()=>{ setErrorMessage("");setverifyOTP(false)}} style={{display:"flex",flexDirection:"row",gap:5,justifyContent:"center",alignItems:"center"}}>
              <Feather name="chevron-left" size={20} color="black" />
              <Text style={{fontSize: 16, fontWeight: '400',color:"black"}}>Edit</Text>
           </Pressable>
):(            <Text style={{fontSize: 16, fontWeight: '400',color:"black"}}>{labelName}</Text>
)}
            <Pressable onPress={handleClose}>
              <MaterialCommunityIcons name="close" size={24} color="#000" />
            </Pressable>
          </View>

          {/* Input Field */}

          {verifyOTP === true ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {otp.map((data, index) => (
                <TextInput
                  key={index}
                  style={{
                    width: 40,
                    height: 50,
                    marginVertical: 10,

                    margin: 5,
                    fontSize: hp(2),
                    borderRadius: 5,
                    color: '#000',
                    backgroundColor: '#E8E8E8',
                  }}
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
          ) : (
            <TextInput
              ref={inputRef}
              value={fieldInputName}
              onChangeText={text => {
                setFieldInputName(text);
                setErrorMessage(''); // Clear error when typing
              }}
              placeholder={`Enter ${labelName}`}
              placeholderTextColor="#000"
              style={{
                borderWidth: 1,
                padding: 10,
                marginVertical: 10,
                borderRadius: 5,
                borderColor: errorMessage ? 'red' : '#ccc', // Highlight border if error
                color: '#000',
              }}
            />
          )}
          {/* Error Message */}
          {errorMessage ? (
            <Text style={{color: 'red', marginBottom: 10}}>{errorMessage}</Text>
          ) : (
            <Text>{null}</Text>
          )}

          {/* Save Button */}

          {verifyOTP === true ? (
            successMsg ? (
              <Pressable
                // onPress={() => {
                //   handleVerify();
                // }}
                style={{
                  // padding: 10,
                //   width: wp('100%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 7,
                }}>
                <LinearGradient
                  style={{
                    padding: 10,
                    width: '100%',
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
                onPress={()=>handleVerify()
                }
                style={{
                  backgroundColor: '#3E57C4',
                  padding: 10,
                  borderRadius: 5,
                  alignItems: 'center',
                }}>
                {loading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={{color: '#fff', fontWeight: 'bold', padding: 2}}>
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </Text>
                )}
              </Pressable>
            )
          ) : (
            <Pressable
              onPress={handlePress}
              style={{
                backgroundColor: '#3E57C4',
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={{color: '#fff', fontWeight: 'bold', padding: 2}}>
                  {labelName === 'Mobile' || labelName === 'Email'
                    ? 'Get OTP'
                    : 'Save'}
                </Text>
              )}
            </Pressable>
          )}
        </View>
      </Pressable>
    </Modal>
  );
};

export default ProfileFieldUpdatePopup;
