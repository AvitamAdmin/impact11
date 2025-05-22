import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ProfileAndVerification = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={{height: hp('100%'), width: wp('100%')}}>
        <View
          style={{height: hp('15%'), width: wp('100%'), position: 'relative'}}>
          <LinearGradient
            style={{
              flex: 1,
            }}
            colors={['#101632', '#2A3A83', '#374DAD']}>
            <View
              style={{
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'center',
                width: wp('100%'),
                alignItems: 'center',
                padding: 25,
                gap: 20,
              }}>
              <View
                style={{
                  width: wp('90%'),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  display: 'flex',
                }}>
                <Pressable onPress={() => navigation.goBack()}>
                  <AntDesign name="arrowleft" size={24} color="#fff" />
                </Pressable>
                <View>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: hp(2.2),
                    }}>
                    Help & Support
                  </Text>
                </View>
                <View></View>
              </View>

              <View
                style={{
                  width: wp('90%'),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  display: 'flex',
                }}>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <Image
                    source={require('../../../../assets/IMPACT11LogoExtended.png')}
                    style={{height: 15, width: 80}}
                  />
                  <Text
                    style={{fontWeight: 'bold', color: '#fff', fontSize: 28}}>
                    |
                  </Text>
                  <Text style={{color: '#fff'}}>Help Center</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View
          style={{
            width: wp('100%'),
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            paddingTop: 20,
          }}>
          <View
            style={{
              width: wp('90%'),
              flexDirection: 'column',
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: '#fff',
              padding: 15,
              gap: 15,
            }}>
            <View>
              <Text
                style={{fontWeight: 'bold', fontSize: hp(2.4), color: '#000'}}>
                Profile & Verification
              </Text>
            </View>
            <View style={{flexDirection: 'column', gap: 10}}>
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: hp(2.3),
                    color: '#000',
                  }}>
                  Managing my profile:
                </Text>
              </View>
              <Pressable
                onPress={() => navigation.navigate('ChangeMobileNumber')}>
                <Text style={{color: '#6F6F6F'}}>
                  How to change my mobile number?
                </Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('ChangeMailId')}>
                <Text style={{color: '#6F6F6F'}}>
                  How to change my email id?
                </Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('ChangeTeamName')}>
                <Text style={{color: '#6F6F6F'}}>
                  Can I change my team name?
                </Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('ChangeState')}>
                <Text style={{color: '#6F6F6F'}}>How to change my state?</Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('Calculate')}>
                <Text style={{color: '#6F6F6F'}}>
                  How are My Matches and Contests calculated?
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('NotReceivingMail')}>
                <Text style={{color: '#6F6F6F'}}>
                  Why am I not receiving mails from Impact11?
                </Text>
              </Pressable>
            </View>

            <View>
              <Text
                style={{fontWeight: 'bold', fontSize: hp(2.4), color: '#000'}}>
                Verify my account:
              </Text>
            </View>
            <View style={{flexDirection: 'column', gap: 10}}>
              <Pressable
                onPress={() => navigation.navigate('VerifyImapact11P')}>
                <Text style={{color: '#6F6F6F'}}>
                  How to verify my Impact11 account?
                </Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('PanVerify')}>
                <Text style={{color: '#6F6F6F'}}>
                  Is PAN and bank verification mandatory?
                </Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('AadharVerifyWhy')}>
                <Text style={{color: '#6F6F6F'}}>
                  Why do I need to verify my Aadhar?
                </Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('PanReject')}>
                <Text style={{color: '#6F6F6F'}}>
                  Why is my PAN verification getting rejected?
                </Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('BankAccReject')}>
                <Text style={{color: '#6F6F6F'}}>
                  Why is my Bank account verification getting rejected?
                </Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('ChangePan')}>
                <Text style={{color: '#6F6F6F'}}>
                  Can I change the verified PAN card?
                </Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('BankAccChange')}>
                <Text style={{color: '#6F6F6F'}}>
                  Can I change the verified Bank account?
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('CompleteVerification')}>
                <Text style={{color: '#6F6F6F'}}>
                  I don’t have an Aadhar. How to complete my verification?
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileAndVerification;

const styles = StyleSheet.create({});
