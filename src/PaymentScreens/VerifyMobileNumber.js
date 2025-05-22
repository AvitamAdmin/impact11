import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

const VerifyMobileNumber = () => {
  
  const [mobile, setmobile] = useState()
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}>
        <View style={{width: '100%'}}>
          <TextInput
            value={mobile}
            onChangeText={setmobile}
            keyboardType='number-pad'
            placeholder="Mobile Number"
            placeholderTextColor="#ababab"
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 5,
              color: '#000',
              fontSize: 16,
              fontWeight: '500',
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#ababab',
              
            }}
          />
        </View>
        <View style={{width: '100%'}}>
          <LinearGradient
            style={{
              borderRadius: 5,
            }}
            colors={['#3E57C4', '#1E2A5E']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}>
            <Pressable
              style={{
                width: '100%',
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                display: 'flex',
              }}>
              <Text style={{fontWeight: '600', fontSize: 14, color: '#FFF'}}>
                SEND OTP
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default VerifyMobileNumber;

const styles = StyleSheet.create({});
