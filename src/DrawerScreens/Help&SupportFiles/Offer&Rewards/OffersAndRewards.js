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

const OffersAndRewards = () => {
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
                <View>
                  <Entypo name="back-in-time" size={24} color="#fff" />
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
            paddingTop: 35,
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
                Offers & Rewards
              </Text>
            </View>
            <View style={{flexDirection: 'column', gap: 10}}>
              <Pressable onPress={() => navigation.navigate('InviteFriends')}>
                <Text style={{color: '#6F6F6F'}}>
                  How to Invite my friends?
                </Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('Earn')}>
                <Text style={{color: '#6F6F6F'}}>
                  How will I Earn via Refer & Earn?
                </Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('MaximumInvite')}>
                <Text style={{color: '#6F6F6F'}}>
                  What is the Maximum number of Invite I can send?
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OffersAndRewards;

const styles = StyleSheet.create({});
