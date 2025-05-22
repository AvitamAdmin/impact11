import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Platform,
  UIManager,
  LayoutAnimation,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation, useRoute} from '@react-navigation/core';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import { api } from '../envfile/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AddCash = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const walletBalance = useSelector(state => state.fantasy.WalletBalance);
  const [userDetails, setUserDetails] = useState({balance: 0});

  // Add default values for walletBalance and entryFee
  const entryFee = route.params?.entryFee || 0;

  const [amount, setAmount] = useState(10);
  const [walletDropdown, setWalletDropdown] = useState(false);

  useEffect(() => {
    // Calculate the required amount
    const requiredAmount = entryFee - walletBalance;
    setAmount(requiredAmount > 0 ? requiredAmount.toString() : '0');
  }, [walletBalance, entryFee]);

  const handleAmountChange = newAmount => {
    setAmount(newAmount);
  };

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setWalletDropdown(!walletDropdown);
  };
  useEffect(() => {
    getReferalCodeData();
  }, []);
   const getReferalCodeData = async () => {
    try {
      // console.log('Hitting API...');
      const token = await AsyncStorage.getItem('jwtToken');
      const recordId = await AsyncStorage.getItem('userId');

      if (!token) {
        // console.log('No token found in AsyncStorage');
        return;
      }

      // console.log('Token:', token);
      const body = {recordId};
      console.log('boduy from ', body);

      const response = await axios.post(`${api}/admin/user/getUserById`, body, {
        headers: {Authorization: `Bearer ${token}`},
      });

      // console.log('Full API Response:', response.data);

      if (response.data?.userDtoList?.length > 0) {
        setUserDetails(response.data?.userDtoList[0]);
       
        // console.log(
        // response.data?.userDtoList[0],
        // 'response.data?.userDtoList[0]',
        // );
      } else {
        // console.log('No referral code found in response');
      }
    } catch (error) {
      // console.log(
      // 'API Error:',
      // error.response ? error.response.data : error.message,
      // );
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: "#f0f8ff"}}>
        <LinearGradient
          style={{
            width: '100%',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
          colors={['#3b53bd', '#243373', '#192451']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}>
          <View
            style={{
              padding: 10,
              alignItems: 'center',
              borderBottomEndRadius: 15,
              borderBottomStartRadius: 15,
            }}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <View>
                <Ionicons name="wallet-outline" size={24} color="#fff" />
              </View>
              <View>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: hp(2),
                    fontWeight: '600',
                  }}>
                  My Balance
                </Text>
              </View>
            </View>
            <Pressable
              onPress={toggleDropdown}
              style={{
                flexDirection: 'row',
                gap: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: hp(3.4),
                    fontWeight: 'bold',
                    marginVertical: 10,
                  }}>
                  ₹ {walletBalance || 0} {/* Display walletBalance */}
                </Text>
              </View>

              <View>
                {walletDropdown === true ? (
                  <Entypo name="chevron-up" size={24} color="#fff" />
                ) : (
                  <Entypo name="chevron-down" size={24} color="#fff" />
                )}
              </View>
            </Pressable>
            {walletDropdown && (
              <View style={{width: '50%'}}>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#FFFFFF', fontSize: 14}}>
                      Amount unutilised :
                    </Text>
                    <Text style={{color: '#FFFFFF', fontSize: 14}}>₹ {userDetails.balance || 0}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#FFFFFF', fontSize: 14}}>
                      Winnings :
                    </Text>
                    <Text style={{color: '#FFFFFF', fontSize: 14}}>₹ {userDetails.balance || 0}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#FFFFFF', fontSize: 14}}>
                      Discount :
                    </Text>
                    <Text style={{color: '#FFFFFF', fontSize: 14}}>₹ {userDetails.bonus || 0}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </LinearGradient>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            padding: 10,
            margin: 15,
            marginVertical: 20,
            alignItems: 'center',
            borderRadius: 8,
          }}>
          <View
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100%',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: hp(2),
                marginBottom: 10,
                fontWeight: '600',
                color: '#000',
              }}>
              Add cash
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '34%',
                borderWidth: 2,
                borderColor: '#50C878',
                borderRadius: 5,
                alignItems: 'center',
              }}>
              <View style={{width: '16%'}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '400',
                    color: '#000',
                    paddingLeft: 5,
                  }}>
                  ₹
                </Text>
              </View>
              <TextInput
                style={{
                  width: '65%',
                  fontSize: hp(2.5),
                  color: '#000',
                }}
                value={amount}
                onChangeText={handleAmountChange}
                keyboardType="numeric"
              />
              <View style={{width: '23%'}}>
                <Pressable onPress={() => handleAmountChange('')}>
                  <AntDesign name="closecircleo" size={17} color="black" />
                </Pressable>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              width: '100%',
              marginTop: 5,
              gap: 5,
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <View>
              <Text style={{color: '#000'}}>Choose amount:</Text>
            </View>
            <Pressable
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-around',
                color: '#000',
              }}>
              {['200', '300', '500', '1000'].map(option => (
                <TouchableOpacity
                  key={option}
                  style={{
                    width: '20%',
                    backgroundColor: '#FFFFFF',
                    padding: 5,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#000',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => handleAmountChange(option)}>
                  <View style={{width: '15%'}}>
                    <Text
                      style={{fontSize: 14, fontWeight: '400', color: '#000'}}>
                      ₹{' '}
                    </Text>
                  </View>
                  <Text style={{color: '#000'}}>{option}</Text>
                </TouchableOpacity>
              ))}
            </Pressable>
          </View>
        </View>

        <Pressable
  style={{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 30,
  }}
onPress={() => {
  if (!amount || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  const options = {
    description: 'Loan EMI Payment',
    image: 'https://your-logo-url.com/logo.png',
    currency: 'INR',
    key: 'rzp_test_0B36Zy3jnDmxiV',
    amount: amount * 100, // Convert to paise
    name: 'Payment Option',
    prefill: {
      email: 'gokulanand2508@gmail.com',
      contact: '9500593141',
      name: 'Gokulanand',
    },
    theme: { color: '#1383F1' },
  };

  RazorpayCheckout.open(options)
   .then((data) => {
  // data.razorpay_payment_id, data.razorpay_order_id, data.razorpay_signature

  // Send this data to your backend for verification
  fetch('https://your-server.com/api/verify-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      razorpay_payment_id: data.razorpay_payment_id,
      razorpay_order_id: data.razorpay_order_id,
      razorpay_signature: data.razorpay_signature,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.verified) {
        alert(`Payment successful: ${data.razorpay_payment_id}`);
      } else {
        alert('Payment verification failed.');
      }
    })
    .catch((err) => {
      console.error(err);
      alert('Error verifying payment');
    });
})

    .catch((error) => {
      console.error('Payment Error:', error);
      if (error.description === 'Payment cancelled') {
        alert('Payment was cancelled by user');
      } else {
        alert(`Error: ${error.description || 'Payment failed'}`);
      }
    });
}}

>
          <LinearGradient
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '92%',
              borderRadius: 6,
            }}
            colors={['#3b53bd', '#243373', '#192451']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}>
            <Pressable
              
              style={{
                padding: 10,
                // width: "95%",
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderRadius: 8,
              }}>
              <Text
                style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
                ADD ₹ {amount}
              </Text>
            </Pressable>
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddCash;
