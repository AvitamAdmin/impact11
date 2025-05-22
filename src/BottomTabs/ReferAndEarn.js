import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Linking,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Share} from 'react-native'; // Correct import
import ReferalInstruction from '../Models/ReferalInstruction';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSport} from '../SportContext';
import {BackHandler, Alert} from 'react-native';

const ReferAndEarn = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const Referalcode = useSelector(state => state.fantasy.Referalcode);
  const url = 'https://www.whatsapp.com/';
  const code = '123QWER';

  const {setTabName, TabName} = useSport();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this fantasy app! https://yourapp.link', // Replace with your URL or message
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // console.log('Shared with activity type: ', result.activityType);
        } else {
          // console.log('Shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        // console.log('Share dismissed.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (TabName !== 'home') {
        navigation.navigate('Home'); // Switch to Home tab
        setTabName('home');
        return true; // Prevent default back behavior
      }

      // If already on Home tab, confirm before exiting app
      // Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
      //   {
      //     text: 'Cancel',
      //     onPress: () => null,
      //     style: 'cancel',
      //   },
      //   {text: 'YES', onPress: () => BackHandler.exitApp()},
      // ]);
      // return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Cleanup on unmount
  }, [TabName]);

  const shareToWhatsApp = () => {
    const message = 'Check out this fantasy app! https://www.whatsapp.com/';
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;

    Linking.openURL(whatsappUrl).catch(() => {
      alert('WhatsApp is not installed on your device.');
    });
  };

  // Function to copy to clipboard
  const copyToClipboard = () => {
    Clipboard.setString(Referalcode);
    ToastAndroid.show('Code copied to clipboard!', ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView>
      <View>
        {/* Header Section */}
        <LinearGradient
          colors={['#000', '#192451', '#243373', '#3b53bd']}
          style={{
            paddingBottom: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            width: wp('100%'),
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            
          }}>
          {/* <Pressable onPress={() => setModalVisible(true)}> */}
          {/* <Feather name="info" size={24} color="#fff" /> */}

          {/* <ReferalInstruction
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
              /> */}

          {/* Referral Code Section */}
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              width: wp('100%'),
              justifyContent: 'center',
              // backgroundColor:"#f4f"
            }}>
            <View>
              <Image
                source={require('../../assets/Refern-Earn.png')}
                resizeMode="contain"
                style={{width: wp(70), height: hp(36)}}
              />
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: hp(3.5),
                }}>
                Earn{' '}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: hp(4.5),
                }}>
                ₹25
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: hp(1.5),
                }}>
                /FRIEND
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              width: wp('100%'),
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                // width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                padding: 10,
                //  backgroundColor:"#f3f"
              }}>
              <Pressable
                onPress={copyToClipboard}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 5,
                  justifyContent: 'center',
                  padding: 10,
                  paddingHorizontal: 22,
                  backgroundColor: '#C1C7E1',
                }}>
                <View
                  style={{
                    width: '75%',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: hp(2.5),
                      fontWeight: 'bold',
                      alignItems: 'center',
                      color: '#000',
                      // paddingLeft: 10,
                      textAlign: 'center',
                    }}
                    numberOfLines={1}>
                    {Referalcode}
                  </Text>
                </View>
                
                <View
                  style={{
                    width: '25%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#3E57C4', fontWeight: '500'}}>
                    Copy Code
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* Share Buttons */}
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              paddingHorizontal: 12,
              // backgroundColor: '#f5f',
            }}>
            <View>
              <Pressable
                onPress={shareToWhatsApp}
                style={{
                  padding: 10,
                  backgroundColor: '#25D366',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  borderRadius: 5,
                  width: wp('42%'),
                }}>
                <Ionicons name="logo-whatsapp" size={23} color="#fff" />
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: hp(1.8),
                  }}>
                  INVITE NOW
                </Text>
              </Pressable>
            </View>

            <View>
              <Pressable
                onPress={onShare}
                style={{
                  padding: 10,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  borderRadius: 5,
                  width: wp('45%'),
                }}>
                <Ionicons name="share-social-outline" size={21} color="black" />
                <Text
                  style={{
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: hp(1.7),
                  }}>
                  OTHER OPTIONS
                </Text>
              </Pressable>
            </View>
          </View>
          {/* </View> */}
        </LinearGradient>

        {/* How It Works Section */}
        <View
          style={{
            flexDirection: 'column',
            width: wp('100%'),
            // height: hp('27%'),
            justifyContent: 'space-around',
            // backgroundColor: '#fff',
            padding: 20,
            gap: 10,
          }}>
          <Text
            style={{
              fontSize: hp(1.8),
              fontWeight: '600',
              textAlign: 'center',
              color: '#000',
            }}>
            HOW IT WORKS
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
              alignItems: 'center',
              gap: 10,
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}>
              <Image
                source={require('../../assets/HandShake.png')}
                style={{width: wp(20), height: hp(10), resizeMode: 'contain'}}
              />
              <Text
                style={{
                  fontSize: hp(1.6),
                  color: '#000',
                  width: wp('20%'),
                  textAlign: 'center',
                }}>
                Invite your friends
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}>
              <Image
                source={require('../../assets/Friends.png')}
                style={{width: wp(20), height: hp(10), resizeMode: 'contain'}}
              />
              <Text
                style={{
                  fontSize: hp(1.6),
                  color: '#000',
                  width: wp('20%'),
                  textAlign: 'center',
                }}>
                Friends join and play
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}>
              <Image
                source={require('../../assets/Wallets.png')}
                style={{width: wp(20), height: hp(10), resizeMode: 'contain'}}
              />
              <Text
                style={{
                  fontSize: hp(1.6),
                  color: '#000',
                  width: wp('20%'),
                  textAlign: 'center',
                }}>
                You earn Rewards
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReferAndEarn;

const styles = StyleSheet.create({
  button: {},
  buttonText: {},
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // paddingBottom: 5,
  },
  card: {
    // alignItems: 'center',
  },
  image: {
    width: wp(20),
    height: hp(10),
    resizeMode: 'contain',
  },
  text: {
    fontSize: hp(1.6),
    color: '#000',
    width: wp('20%'),
    textAlign: 'center',
  },
});
