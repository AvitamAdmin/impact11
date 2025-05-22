import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Switch} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

export default function PermissionSetting({visible, onclose}) {
  const navigation = useNavigation();
  const [Sms, setSms] = useState(false);
  const [WhatsApp, setWhatsApp] = useState(false);
  const [Name, setName] = useState(false);
  const [Teams, setTeams] = useState(false);

  const toggle = state => {
    setSms(state);
  };
  const toggle2 = state => {
    setWhatsApp(state);
  };
  const toggle3 = state => {
    setName(state);
  };
  const toggle4 = state => {
    setTeams(state);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{display: 'flex', flexDirection: 'column', width: wp('100%')}}>
        <LinearGradient colors={['#3247A0', '#1B2656']}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: 20,
              alignItems: 'center',
              width: '100%',
              paddingLeft: 13,
            }}>
            <View style={{width: wp('9%')}}>
              <Pressable onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={22} color="white" />
              </Pressable>
            </View>
            <View style={{width: wp('50%')}}>
              <Text
                style={{fontSize: hp(2), color: '#fff', fontWeight: 'bold'}}>
                Settings
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
      {/*  first*/}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: wp('100%'),
          padding: 15,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View style={{width: wp('83%')}}>
          <Text style={{color: '#383838', fontWeight: '600'}}>
            SMS Notification
          </Text>
        </View>
        <View style={{width: wp('15%')}}>
          <Switch
            trackColor={{false: '#d9d9d9', true: '#81b0ff'}} // iOS style track color
            thumbColor={Sms ? '#ffffff' : '#f4f3f4'} // White thumb for iOS look
            ios_backgroundColor="#d9d9d9" // Background color for iOS when false
            onValueChange={toggle}
            value={Sms}
          />
        </View>
      </View>

      {/*  second*/}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: wp('100%'),
          padding: 15,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View style={{width: wp('83%')}}>
          <Text style={{color: '#383838', fontWeight: '600'}}>
            WhatsApp Notification
          </Text>
        </View>
        <View style={{width: wp('15%')}}>
          <Switch
            trackColor={{false: '#d9d9d9', true: '#81b0ff'}} // iOS style track color
            thumbColor={WhatsApp ? '#ffffff' : '#f4f3f4'} // White thumb for iOS look
            ios_backgroundColor="#d9d9d9" // Background color for iOS when false
            onValueChange={toggle2}
            value={WhatsApp}
          />
        </View>
      </View>

      {/*  third*/}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: wp('100%'),
          padding: 15,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View style={{width: wp('83%')}}>
          <Text style={{color: '#383838', fontWeight: '600'}}>
            Display Full name on Profile
          </Text>
          <Text style={{fontSize: hp(1.7)}}>
            Your full name will be visible ro everyone who views your profile
          </Text>
        </View>
        <View style={{width: wp('15%')}}>
          <Switch
            trackColor={{false: '#d9d9d9', true: '#81b0ff'}} // iOS style track color
            thumbColor={Name ? '#ffffff' : '#f4f3f4'} // White thumb for iOS look
            ios_backgroundColor="#d9d9d9" // Background color for iOS when false
            onValueChange={toggle3}
            value={Name}
          />
        </View>
      </View>
      {/*  four*/}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: wp('100%'),
          padding: 15,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View style={{width: wp('83%')}}>
          <Text style={{color: '#383838', fontWeight: '600'}}>
            Show my Previous teams
          </Text>
          <Text style={{fontSize: hp(1.7)}}>
            People who view your profile will be able to see your team for
            completed matches
          </Text>
        </View>
        <View style={{width: wp('15%')}}>
          <Switch
            trackColor={{false: '#d9d9d9', true: '#81b0ff'}} // iOS style track color
            thumbColor={Teams ? '#ffffff' : '#f4f3f4'} // White thumb for iOS look
            ios_backgroundColor="#d9d9d9" // Background color for iOS when false
            onValueChange={toggle4}
            value={Teams}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
