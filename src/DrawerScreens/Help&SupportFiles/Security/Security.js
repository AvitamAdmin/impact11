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

const Security = () => {
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
                Security
              </Text>
            </View>
            <View style={{flexDirection: 'column', gap: 10}}>
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: hp(2.2),
                    color: '#000',
                  }}>
                  Account security:
                </Text>
              </View>
              <Pressable onPress={() => navigation.navigate('AccountSecurity')}>
                <Text style={{color: '#6F6F6F'}}>
                  I think someone else is using my account, what should I do?
                </Text>
              </Pressable>
            </View>

            <View>
              <Text
                style={{fontWeight: 'bold', fontSize: hp(2.2), color: '#000'}}>
                Responsible Play:
              </Text>
            </View>
            <View style={{flexDirection: 'column', gap: 10}}>
              <Pressable onPress={() => navigation.navigate('Ensure')}>
                <Text style={{color: '#6F6F6F'}}>Ensure responsible play</Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate('Guide')}>
                <Text style={{color: '#6F6F6F'}}>
                  Guide to Responsible Play
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Security;

const styles = StyleSheet.create({});
