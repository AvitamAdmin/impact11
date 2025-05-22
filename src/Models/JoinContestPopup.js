import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
 
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {api} from '../envfile/api';
import axios from 'axios';
import { triggerReloadApi } from '../Redux/Slice';
import { showMessage } from 'react-native-flash-message';

const JoinContestPopup = ({visible, onClose, entryFee, userTeamId,onSuccess}) => {
  const dispatch = useDispatch();
  const matchId = useSelector(state => state.fantasy.matchId);
  const contestId = useSelector(state => state.fantasy.contestId);
  const [isJoining, setIsJoining] = useState(false);
  const [joinClicked, setJoinClicked] = useState(false);
  const joincontest = async () => {
    if (joinClicked) return; 
    
    setJoinClicked(true);
    setIsJoining(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('jwtToken');
  
      if (!userTeamId || userTeamId.length === 0) {
        showMessage({
          message: 'Error',
          description: 'No team selected',
          type: 'danger',
          backgroundColor: '#f44336',
          color: '#FFFFFF',
          duration: 3000,
        });
        setIsJoining(false);
        setJoinClicked(false);
        return;
      }
     // const teamIdsString = userTeamId.join(',');
      const body = {
        contestJoinedDtoList: [{
          matchId: matchId,
          userId: userId,
          contestId: contestId,
          userTeamsIds: userTeamId,
          entryFee: entryFee,
        }],
      };
  
      console.log("Request body:", JSON.stringify(body, null, 2));
  
      const response = await axios.post(
        `${api}/admin/contestJoined/edit`,
        body,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response?.data?.success === true) {
        dispatch(triggerReloadApi());
        onClose();
        
        showMessage({
          message: 'Success',
          description: 'Contest joined successfully!',
          type: 'success',
          backgroundColor: '#4CAF50',
          color: '#FFFFFF',
          duration: 3000, 
        });
        
        if (onSuccess) onSuccess();
      } else {
        showMessage({
          message: 'Error',
          description: response.data.message || 'Something went wrong',
          type: 'danger',
          backgroundColor: '#f44336',
          color: '#FFFFFF',
          duration: 3000,
        });
      }
    } catch (error) {
      showMessage({
        message: 'Error',
        description: error.message || 'Network error',
        type: 'danger',
        backgroundColor: '#f44336',
        color: '#FFFFFF',
        duration: 3000,
      });
    } finally {
      setIsJoining(false);
      setJoinClicked(false);
    }
  };

  return (
<Modal transparent={true} visible={visible} animationType="none">
<Pressable
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        onPress={onClose}>
       

        <View
          style={{
            width: wp('100%'),
            backgroundColor: '#fff',
            borderRadius: 15,
            alignItems: 'center',
            height: hp('33%'),
          }}>
          <View
            style={{
              width: wp('100%'),
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              display: 'flex',
            }}>
            <View style={{width: wp('10%'), alignItems: 'flex-end'}}>
              <Pressable onPress={onClose}>
                <MaterialCommunityIcons name="close" size={24} color="#000" />
              </Pressable>
            </View>

            <View
              style={{
                width: wp('80%'),
                alignItems: 'center',
                justifyContent: 'center',
                height: hp('8%'),
                gap: 5,
              }}>
              <Text
                style={{color: '#000', fontWeight: '700', fontSize: hp(1.8)}}>
                CONFIRMATION
              </Text>
              <Text
                style={{color: '#000', fontWeight: '400', fontSize: hp(1.5)}}>
                Your balance: ₹100
              </Text>
            </View>

            <View style={{width: wp('10%')}}></View>
          </View>

          <View
            style={{
              width: wp('90%'),
              height: 1,
              backgroundColor: '#ddd',
              alignSelf: 'center',
            }}></View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: wp('100%'),
              alignItems: 'center',
              gap: 10,
              padding: 10,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: wp('88%'),
              }}>
              <Text
                style={{color: '#000', fontWeight: '400', fontSize: hp(1.8)}}>
                Entry
              </Text>
              <Text
                style={{color: '#000', fontWeight: 'bold', fontSize: hp(1.8)}}>
                ₹{userTeamId.length*entryFee}
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: wp('88%'),
              }}>
              <Text
                style={{color: '#000', fontWeight: '400', fontSize: hp(1.8)}}>
                Usable discount
              </Text>
              <Text
                style={{color: '#000', fontWeight: 'bold', fontSize: hp(1.8)}}>
                ₹0
              </Text>
            </View>
          </View>

          <View
            style={{
              width: wp('90%'),
              height: 1,
              backgroundColor: '#ddd',
              alignSelf: 'center',
            }}></View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: wp('100%'),
              alignItems: 'center',
              gap: 10,
              padding: 10,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                width: wp('88%'),
              }}>
              <Text style={{color: '#000', fontWeight: '600', fontSize: hp(2)}}>
                To Pay
              </Text>
              <Text
                style={{color: '#000', fontWeight: 'bold', fontSize: hp(1.8)}}>
                     ₹{userTeamId.length*entryFee}
              </Text>
            </View>

            <View style={{width: wp('88%')}}>
              <Text
                style={{color: '#000', fontWeight: '400', fontSize: hp(1.6)}}>
                I agree with the{' '}
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    textDecorationColor: '#000',
                    color: '#000',
                    fontWeight: '400',
                    fontSize: hp(1.6),
                  }}>
                  T&C
                </Text>
              </Text>
            </View>
          </View>

          <Pressable
        onPress={joincontest}
        disabled={joinClicked}
        style={{
          padding: 3,
          width: wp('100%'),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 7,
          opacity: joinClicked ? 0.6 : 1,
        }}
      >
        <LinearGradient
          colors={joinClicked ? ['#c0c0c0', '#c0c0c0'] : ['#3b53bd', '#1E2E74']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={{
            padding: 10,
            width: wp('90%'),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
        >
          <Text style={{color: '#fff', fontWeight: '800'}}>
            {isJoining ? 'Joining...' : 'JOIN CONTEST'}
          </Text>
        </LinearGradient>
      </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default JoinContestPopup;
