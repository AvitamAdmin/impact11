import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../envfile/api';
import axios from 'axios';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const DrawerHeader = props => {
  const {width: screenWidth} = useWindowDimensions();
  const navigation = useNavigation();
  const isTablet = screenWidth >= 768;
  const imageSize = screenWidth * 0.2;
  const [userDetails, setuserDetails] = useState([]);

  useFocusEffect(
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

      // Request Body
      const body = {recordId: recordId};

      // Make API Call
      const response = await axios.post(`${api}/admin/user/getUserById`, body, {
        headers: {Authorization: `Bearer ${token}`},
      });

      // Check API Response
      // console.log("Full API Response:", response.data);

      if (response.data?.userDtoList?.length > 0) {
        setuserDetails(response.data?.userDtoList[0]);
        const walletBalance = response.data?.userDtoList[0].balance.toString();
        await AsyncStorage.setItem('walletBalance', walletBalance);

        // console.log(response.data?.userDtoList[0],"response.data?.userDtoList[0]");
      } else {
        // console.log("No referral code found in response");
      }
    } catch (error) {
      // console.log("API Error:", error.response ? error.response.data : error.message);
    }
  };
  const navigateTo = screen => navigation.navigate(screen);

  return (
    <View style={{flex:1}}>  
      <View style={{width:"100%", height: hp('30%')}}>
        <LinearGradient
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          colors={['#020202', '#192451', '#243373', '#3b53bd']}>
          <View>
            <View style={styles.profileContainer}>
              <View style={styles.profileDetails}>
                <Image
                  source={
                    userDetails.profileImage
                      ? {
                          uri: `data:image/jpeg;base64,${
                            userDetails.profileImage.data ??
                            userDetails.profileImage
                          }`,
                        }
                      : require('../../assets/ProfileImpact.jpg') // Default image
                  }
                  style={[
                    styles.profileImage,
                    {
                      width: imageSize,
                      height: imageSize,
                      borderRadius: imageSize / 2,
                    },
                  ]}
                />
                <View style={{gap: 5}}>
                  <Text style={styles.profileName}>{userDetails.username}</Text>
                  <Text style={styles.profileImpact}>
                    Total Impacts: {userDetails.totalImpactScore || 0}
                  </Text>
                </View>
              </View>
              {/* <Image
            source={require("../../assets/starplace.png")}
            style={styles.starImage}
          /> */}
            </View>

            {/* Wallet Balance */}
            <Pressable
              style={[
                styles.walletContainer,
                {width: isTablet ? wp('69%') : wp('79%')},
              ]}
              onPress={() => navigateTo('My Balance')}>
              <View
                style={[
                  styles.walletHeader,
                  {width: isTablet ? wp('65%') : wp('68%')},
                ]}>
                <View style={styles.walletDetails}>
                  <Ionicons name="wallet-outline" size={25} color="black" />
                  <Text style={styles.walletText}>My Balance</Text>
                </View>

                <Text style={styles.walletAmount}>
                  ₹{userDetails.balance || 0}
                </Text>
              </View>
              <View
                style={[
                  styles.walletActions,
                  {width: isTablet ? wp('70%') : wp('77%')},
                ]}>
                <Pressable
                  style={styles.addCashButton}
                  onPress={() => navigateTo('ADD CASH')}>
                  <Text style={styles.addCashIcon}>+</Text>
                  <Text style={styles.addCashText}>ADD CASH</Text>
                </Pressable>
                <Pressable
                  style={styles.withdrawButton}
                  onPress={() => navigateTo('WITHDRAW')}>
                  <Image
                    source={require('../../assets/Withdraw.png')}
                    style={styles.withdrawIcon}
                  />
                  <Text style={styles.withdrawText}>WITHDRAW</Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
        </LinearGradient>
      </View>

      <DrawerContentScrollView {...props}>
        {/* Drawer Items */}
        <DrawerItemList {...props} />

        {/* <Text style={styles.versionText}>VERSION 1.22.0</Text> */}
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // padding: 8,
    alignItems: 'center',
    backgroundColor: '#f27',
    // height: hp('30%'),
  },
  profileContainer: {
    flexDirection: 'row',
    width: wp('76%'),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"#f27",
  },
  profileDetails: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    // backgroundColor:"#f27",
    width: wp('70%'),
  },
  profileImage: {
    resizeMode: 'cover',
  },
  profileName: {
    fontSize: hp(2.2),
    fontWeight: '700',
    color: '#fff',
  },
  profileImpact: {
    fontSize: hp(1.7),
    fontWeight: '500',
    color: '#fff',
  },
  starImage: {
    height: hp(11),
    width: wp(17),
  },
  walletContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 15,
    
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletDetails: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    width: '50%',
  },
  walletText: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: '#000',
  },
  walletAmount: {
    fontSize: hp(2),
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
    width: '50%',
    textAlign: 'right',
  },
  walletActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  addCashButton: {
    flexDirection: 'row',
    backgroundColor: '#37b469',
    paddingHorizontal: 20,
    padding: 5,
    borderRadius: 4,
    justifyContent: 'center',
    width: '45%',
    alignItems: 'center',
    gap: 10,
  },
  addCashText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp(1.5),
  },
  addCashIcon: {
    fontSize: hp(2.6),
    color: '#fff',
    // backgroundColor:"#f28"
  },
  withdrawButton: {
    flexDirection: 'row',
    backgroundColor: '#37b469',
    paddingHorizontal: 20,
    padding: 5,
    borderRadius: 4,
    justifyContent: 'center',
    width: '45%',
    alignItems: 'center',
    gap: 10,
  },
  withdrawIcon: {
    width: 20,
    height: 20,
  },
  withdrawText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp(1.5),
  },
  versionText: {
    marginTop: 10,
    fontSize: hp(1.5),
    color: 'gray',
  },
});

export default DrawerHeader;
