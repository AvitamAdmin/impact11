import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  PanResponder,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect, useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { api } from '../envfile/api';

const { height } = Dimensions.get('window');

const PlayerInfo = ({ visible, onCancel, playerId }) => {
  const slideAnim = useRef(new Animated.Value(height)).current; // Start off-screen

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0, // Bring it up
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height, // Move it back down
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const [isMounted, setIsMounted] = useState(false);
  const [bgColor, setBgColor] = useState(new Animated.Value(0));
  const panY = useRef(new Animated.Value(0)).current;
  const bgOpacity = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [player, setPlayer] = useState([]);

  const backgroundColor = bgOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)'],
  });

  // const panY = useRef(new Animated.Value(0)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeAnim = Animated.parallel([
    Animated.timing(panY, {
      toValue: Dimensions.get('window').height,
      duration: 300,
      useNativeDriver: true,
    }),
    Animated.timing(bgOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }),
  ]);

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
          // Update background opacity based on drag position
          const ratio = Math.min(gestureState.dy / 200, 1);
          bgOpacity.setValue(ratio);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          closeModal();
        } else {
          resetPositionAnim.start();
          // Reset background opacity
          Animated.timing(bgOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const closeModal = () => {
    closeAnim.start(() => {
      onCancel();
    });
  };

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      setIsMounted(true);
      panY.setValue(0);
      Animated.timing(bgOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      setModalVisible(false); // Optional cleanup
    }
  }, [visible]);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        const body = { recordId: playerId };
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.post(`${api}/admin/player/getPlayerData`, body, { headers });
        setPlayer(response.data.playerDtoList[0]); // Changed from playerDto to playerDtoList[0]
        console.log('response from playerinfo', response.data.playerDtoList[0]);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    if (playerId) {
      fetchPlayer();
    }
  }, [playerId]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={closeModal}
    >
      <Pressable
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
        onPress={closeModal}
      >
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: translateY }],
              backgroundColor: '#000',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              maxHeight: '85%',
              borderColor:"#fff",
              borderWidth:1,
              borderLeftWidth:0.2,
              borderBottomWidth:0,
              borderRightWidth:0.2
            }
          ]}
          {...panResponders.panHandlers}
        >
          {/* Drag handle */}
          <View style={{ width: "100%", alignItems: "center", paddingBottom: 10 }}>
            <View style={{
              width: 60,
              height: 5,
              borderRadius: 5,
              backgroundColor: "#555"
            }} />
          </View>

          {player ? (  // Changed to conditional rendering
            <View style={{ width: "100%" }}>
              {/* Player info row */}
              <View style={{
                width: "100%",
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                {/* Player image */}
                <View style={{ padding: 10 }}>
                  <Image
                    source={{
                      uri: player.playerImagePath || 'https://cdn.sportmonks.com/images/cricket/placeholder.png',
                    }}
                    style={{
                      width: 80,
                      height: 80,
                      resizeMode: "cover"
                    }}
                  />
                </View>

                {/* Player details */}
                <View style={{ flex: 1, padding: 10 }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: '#fff',
                      marginBottom: 4,
                    }}
                  >
                    {player.shortName || 'Player Name'}
                  </Text>

                  <Text style={{
                    fontWeight: '600',
                    fontSize: 14,
                    color: '#fff',
                    marginBottom: 4,
                  }}>
                    {player.playerRole || 'Player Role'}
                  </Text>

                  <Text style={{
                    fontWeight: '500',
                    fontSize: 14,
                    color: '#ccc',
                    marginBottom: 4,
                  }}>
                    Born: {player.dob || 'DD/MM/YYYY'}
                  </Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                      name="fiber-manual-record"
                      size={10}
                      color="#B7C6FF"
                      style={{ marginRight: 5 }}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        fontWeight: '500',
                        fontSize: 14,
                        color: '#B7C6FF',
                      }}
                    >
                      {player.nationality || 'Nationality'}
                    </Text>
                  </View>
                </View>

                {/* Team logo */}
                <View style={{ height: "100%" }}>
                  <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      source={{
                        uri: player.teamDto?.logoPath 
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        resizeMode: 'contain', // Ensures the logo fits properly
                      }}
                    />
                  </View>
                </View>
              </View>

              {/* Recent points section */}
              <View style={{
                padding: 10,
                marginBottom: 20,
              }}>
                <Text style={{
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginBottom: 15,
                }}>
                  Recent Points
                </Text>

                <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                  <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <View
                      style={{
                        backgroundColor: '#383838',
                        borderRadius: 8,
                        height: 40,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}
                      >
                        {player.matchesDtos?.[0]?.highestPoints || '0'}
                      </Text>
                    </View>

                    <View>
                      <Text style={{ color: '#ccc', fontSize: 14 }}>
                        vs {player.matchesDtos?.[0]?.team2Dto?.shortName || 'RR'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <Text style={{ color: '#fff' }}>Loading player data...</Text>
          )}

          {/* Add to team button */}
          <View style={{
            width: "100%", alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Pressable
              style={{
                width: '50%',
                padding: 10,
                backgroundColor: '#35B267',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => { }}
            >
              <Text style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: '600',
              }}>
                ADD TO MY TEAM
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default PlayerInfo;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#000',
    // height: hp(50),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: "#fff",
    // borderTopColor:"#fff",


  },

});
