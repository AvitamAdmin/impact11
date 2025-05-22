import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/core';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { api } from '../../envfile/api';
import CreateContestPopup from '../../Models/CreateContestPopup';
import TimeExpiredPopup from '../../Models/TimeExpiredPopup';
import { setHasTimeExpiredPopupShown } from '../../Redux/Slice';
import { navigationRef } from '../../../Navigation';

const ContestHeader = () => {
  const [userDetails, setuserDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const UserWalletBalance = useSelector(state => state.fantasy.WalletBalance);
  const isFocused = useIsFocused();
  const teamName = useSelector(state => state.fantasy.matchShortName);
  const hasTimeExpiredPopupShown = useSelector(state => state.fantasy.hasTimeExpiredPopupShown);


  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState('');
  const [Popup, setPopup] = useState(false)
  const [reset, setReset] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const isTablet = screenWidth >= 768;
  const DateAndTime = useSelector(state => state.fantasy.DateAndTime[0]);
  const [walletBalance, setwalletBalance] = useState()

  const dispatch = useDispatch();

  useEffect(
    useCallback(() => {
      getReferalCodeData();
    }, []),
  );


  const getReferalCodeData = async () => {
    try {
      // console.log("Hitting API...");

      // Retrieve Token
      const token = await AsyncStorage.getItem('jwtToken');
      const recordId = await AsyncStorage.getItem('userId');
      if (!token) {
        // console.log("No token found in AsyncStorage");
        return;
      }
      // console.log("Token:", token);

      // Request Bodyr
      const body = { recordId: recordId };

      // Make API Call
      const response = await axios.post(`${api}/admin/user/getUserById`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Check API Response
      // console.log("Full API Response:", response.data);

      if (response.data?.userDtoList?.length > 0) {
        setwalletBalance(response.data?.userDtoList[0].balance);
      } else {
        // console.log("No referral code found in response");
      }
    } catch (error) {
      // console.log("API Error:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (navigationRef.isReady()) {
        if (navigationRef.isReady() && navigationRef.getCurrentRoute()?.name !== 'DrawerNavigation') {
          navigationRef.navigate('DrawerNavigation'); // Navigate to Home screen
        }
        return true; // Prevent default back behavior
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (!DateAndTime || !isFocused) return;

    // console.log('DateAndTime from Redux:', DateAndTime);

    const [datePart, timePart] = DateAndTime.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);

    const targetDate = new Date(year, month - 1, day, hour, minute, second);
    // console.log('Parsed Target Date (Local):', targetDate);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        setTimeLeft(`${hours}hr ${minutes}m left`);
      }
      if (difference <= 0 && isFocused) {
        if (isFocused) {
          setPopup(true);
          // dispatch(setHasTimeExpiredPopupShown(true)); // ✅ prevent double-popup
        }
        clearInterval(interval);
      }

    }, 1000);

    return () => clearInterval(interval);

  }, [DateAndTime, isFocused]);



  return (
    <LinearGradient
      colors={['#3E57C4', '#1E2E74']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <SafeAreaView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              gap: 10,
              padding: 10,
              paddingHorizontal: 15
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                paddingHorizontal: 4,
                alignItems: 'center',
                // backgroundColor:"#196"

              }}>
              <Pressable
                onPress={() => {
                  if (navigation.canGoBack()) { // Check if we can go back
                    navigation.goBack()
                  } else {
                    navigation.navigate('DrawerNavigation'); // Fallback to home
                  }
                }}
              >
                <MaterialCommunityIcons name="arrow-left" size={26} color="#fff" />
              </Pressable>

              <View
                style={{
                  width: isTablet ? wp('45%') : wp('30%'),
                  display: 'flex',
                  flexDirection: 'column',

                  gap: 5,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    fontSize: hp(1.7),
                  }}>
                  {teamName}
                </Text>

                <View
                  style={{
                    width: isTablet ? wp('75%') : wp('50%'),
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: hp(1.5),
                    }}>
                    {timeLeft}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 14,

                // backgroundColor:"#f27"
              }}>
              {/* <Ionicons name="notifications-outline" size={24} color="white" /> */}
              <Pressable onPress={() => setModalVisible(true)}>
                {/* <Ionicons name="trophy-outline" size={24} color="#fff" /> */}
                <Image
                  source={require("../../../assets/MyTeamWon.png")}
                  style={{
                    width: 30,
                    height: 30,
                    // borderRadius: 20,
                    // resizeMode: 'contain',
                  }}
                />
                <CreateContestPopup
                  visible={modalVisible}
                  onClose={() => setModalVisible(false)}
                />
              </Pressable>

              <View>
                <Pressable
                  onPress={() => navigation.navigate('ADD CASH')}
                  style={{
                    borderColor: 'rgb(179, 179, 179)',
                    borderRadius: 4,
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    minWidth: 75,
                    backgroundColor: '#6C77AA',
                    alignItems: 'center',
                    borderWidth: 0.8,
                    paddingLeft: 2,
                    paddingRight: 2,
                    gap: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', marginLeft: 7, fontWeight: 'bold' }}>
                    ₹ {walletBalance} {/* Wallet Balance Displayed Here */}
                  </Text>
                  <Ionicons name="wallet-outline" size={24} color="white" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <TimeExpiredPopup
        visible={Popup}
        reset={reset}
        onClose={() => setPopup(false)}
        onDiscard={() => {
          console.log('Changes Discarded!');
          setPopup(false);
          setReset(false);
        }}
      />
    </LinearGradient>
  );
};
// };

export default ContestHeader;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    justifyContent: 'space-between',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  mainText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: hp(2.1),
  },
  subText: {
    fontSize: hp(1.5),
    color: '#fff',
    paddingLeft: 7,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: wp('20%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
  addCashButton: {
    flexDirection: 'row',
    marginRight: 20,
    alignItems: 'center',
    borderWidth: 2,
    gap: 10,
    borderRadius: 5,
    borderColor: '#fff',
  },
  addCashText: {
    color: '#fff',
    marginLeft: 5,
  },
});
