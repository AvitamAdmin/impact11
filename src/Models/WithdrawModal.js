import { Modal, Pressable, Text, View } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const WithdrawModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        onPress={onClose}
      >
        <Pressable
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 20,
            alignItems: 'center',
            elevation: 5,
          }}
          onPress={() => { }}
        >
          <Text style={{
            fontSize: hp(2),
            color: "#000",
            marginBottom: 10,
            fontWeight: "500"
          }}>
            Withdrawal amount
          </Text>
          <Text style={{
            fontSize: hp(3.3),
            color: "#29a329",
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
            ₹100
          </Text>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 40 }}>🏦</Text>
            </View>
            <Text style={{ fontSize: 18, color: 'black' }}>AXIS BANK</Text>
            <Text style={{ fontSize: 16, color: 'gray' }}>xxxxxxxxxxxx9876</Text>
          </View>
          <View style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            gap: 10
          }}>
            <View style={{
              width: '100%',
            }}>
              <LinearGradient
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                }}
                colors={['#3b53bd', '#243373', '#192451']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}>
                <Pressable style={{
                  
                  padding: 10,
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>CONFIRM</Text>
                </Pressable>
              </LinearGradient>
            </View>
            {/* <Pressable style={{
              backgroundColor: "#f0f8ff",
              width: '100%',
              borderWidth: 1,
              borderColor: "#f0f8ff",
              padding: 10,
              alignItems: 'center',
              borderRadius: 5,
            }} onPress={onClose}>
              <Text style={{  fontWeight: 'bold' }}>EDIT PAYMENT</Text>
            </Pressable> */}
            <Pressable style={{
              backgroundColor: "#D8DDF3",
              width: '100%',
              borderWidth: 1,
              borderColor: "#f0f8ff",
              padding: 10,
              alignItems: 'center',
              borderRadius: 5,
            }} onPress={onClose}>
             <MaskedView
            maskElement={
              <Text
                style={{
                  fontFamily: 'Roboto-Bold',
                  fontSize: hp(1.8),
                  color: 'black',
                  textAlign: 'center',
                }}>
                EDIT PAYMENT
              </Text>
            }>
            <LinearGradient
                colors={['#3b53bd', '#243373', '#192451', '#020202']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text
                style={{
                  fontSize: hp(1.8),
                  // opacity: 0,
                  fontFamily: 'Roboto-Bold',
                }}>
                EDIT PAYMENT
              </Text>
            </LinearGradient>
          </MaskedView>
          </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default WithdrawModal;
