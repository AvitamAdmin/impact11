import {
  Dimensions,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../envfile/api';
import axios from 'axios';
import {setSelectedTeamsId, triggerReloadApi} from '../Redux/Slice';
import JoinContestPopup from './JoinContestPopup';
import {showMessage} from 'react-native-flash-message';

const SelectTeam = ({visible, onClose, entryFee, onSuccess,isSingleSelection}) => {
  // console.log("isSingleSelection",isSingleSelection);
  
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedUserTeamId, setSelectedUserTeamId] = useState([]);
  const navigations = useNavigation();
  const dispatch = useDispatch();
  const [Token, setToken] = useState();

  const [DisplayingTeams, setDisplayingTeams] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedTeamNames, setSelectedTeamNames] = useState([]);
  const [isJoining, setIsJoining] = useState(false);
  const [joinClicked, setJoinClicked] = useState(false);

  const UserName = useSelector(state => state.fantasy.UserName);

  const matchId = useSelector(state => state.fantasy.matchId);
  const contestId = useSelector(state => state.fantasy.contestId);

  const joincontest = async () => {
    if (joinClicked) return;

    setJoinClicked(true);
    setIsJoining(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('jwtToken');
      console.log('token:', token);

      if (!selectedTeams || selectedTeams.length === 0) {
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
        contestJoinedDtoList: [
          {
            matchId: matchId,
            userId: userId,
            contestId: contestId,
            userTeamsIds: selectedTeams,
            entryFee: entryFee,
          },
        ],
      };

      console.log('Request body:', JSON.stringify(body, null, 2));

      const response = await axios.post(
        `${api}/admin/contestJoined/edit`,
        body,
        {headers: {Authorization: `Bearer ${token}`}},
      );

      if (response.data.success === true) {
        dispatch(triggerReloadApi());
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (error) {
      // showMessage({
      //   message: 'Error',
      //   description: error.message || 'Network error',
      //   type: 'danger',
      //   backgroundColor: '#f44336',
      //   color: '#FFFFFF',
      //   duration: 3000,
      // });
      console.error('error:', error);
    } finally {
      setIsJoining(false);
      setJoinClicked(false);
    }
  };

  // const screenWidth = Dimensions.get('window').width;

  // const isTablet = screenWidth >= 768;

  const {height} = Dimensions.get('window');

  const [C, setC] = useState([]);
  const [Vc, setVc] = useState([]);
  const [I, setI] = useState([]);

  useEffect(() => {
    if (visible) {
      // Reset selections when modal is opened
      setSelectedTeams([]);
      setSelectedUserTeamId([]);
      dispatch(setSelectedTeamsId([]));
      setSelectAll(false);
    }
  }, [visible]);

  useEffect(() => {
    if (
      selectedTeams.length === DisplayingTeams.length &&
      DisplayingTeams.length !== 0
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedTeams, DisplayingTeams]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');

        setToken(token);
        if (!token) {
        }
        if (token) {
          await ListingTeam(token);
        } else {
        }
      } catch (error) {
        setError('Unexpected error occurred.');
      }
    };

    fetchToken();
  }, []);

  const ListingTeam = async token => {
    try {
      const userId = await AsyncStorage.getItem('userId');

      const body = {
        matchId: matchId,
        userId: userId,
      };

      const response = await axios.post(
        `${api}/admin/userTeams/getUserTeamsDetails`,
        body,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      // console.log('Listing teams:', response.data.userTeamsDtoList);

      const filterPlayers = response.data.userTeamsDtoList.flatMap(
        item => item.players,
      );

      const captainsExist = await getCaptain(token, filterPlayers);
      const viceCaptainExist = await getViceCaptain(token, filterPlayers);
      const impactPlayerExist = await getImpactPlayer(token, filterPlayers);
      if (captainsExist) {
        setDisplayingTeams(response.data.userTeamsDtoList);
      }
    } catch (error) {
      console.error('Error fetching listing teams:', error);
    }
  };

  const getCaptain = async (token, players) => {
    try {
      const headers = {Authorization: `Bearer ${token}`};
      // Filter only captains
      const captains = players.filter(player => player.captain === true);

      // Construct request body with correct recordId mapping
      const body = {
        playerDtoList: captains.map(player => ({
          recordId: player.playerId, // Ensure correct ID mapping
        })),
      };

      const response = await axios.post(`${api}/admin/player/getedit`, body, {
        headers,
      });

      setC(response.data.playerDtoList);
      return true;
    } catch (error) {
      console.error('Error fetching captain:', error);
      return false;
    }
  };
  const getViceCaptain = async (token, players) => {
    try {
      const headers = {Authorization: `Bearer ${token}`};
      // Filter only captains
      const captains = players.filter(player => player.viceCaptain === true);

      // Construct request body with correct recordId mapping
      const body = {
        playerDtoList: captains.map(player => ({
          recordId: player.playerId, // Ensure correct ID mapping
        })),
      };

      const response = await axios.post(`${api}/admin/player/getedit`, body, {
        headers,
      });

      setVc(response.data.playerDtoList);
      return true;
    } catch (error) {
      console.error('Error fetching captain:', error);
      return false;
    }
  };
  const getImpactPlayer = async (token, players) => {
    try {
      const headers = {Authorization: `Bearer ${token}`};
      // Filter only captains
      const captains = players.filter(player => player.impactPlayer === true);

      // Construct request body with correct recordId mapping
      const body = {
        playerDtoList: captains.map(player => ({
          recordId: player.playerId, // Ensure correct ID mapping
        })),
      };

      const response = await axios.post(`${api}/admin/player/getedit`, body, {
        headers,
      });

      setI(response.data.playerDtoList);
      return true;
    } catch (error) {
      console.error('Error fetching captain:', error);
      return false;
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      // Deselect All
      setSelectedTeams([]);
      setSelectedUserTeamId([]);
      dispatch(setSelectedTeamsId([]));
      setSelectedTeamNames([]);
    } else {
      // Select All
      const allTeams = DisplayingTeams.map(item => item.recordId);

      const allTeamIds = allTeams.map(team => team.recordId);
      // const allTeamNames = allTeams.map(team => team.teamName);

      setSelectedTeams(allTeams);
      setSelectedUserTeamId(allTeamIds);
      dispatch(setSelectedTeamsId(allTeamIds));
      // setSelectedTeamNames(allTeamNames);
    }

    console.log('Selected Team Count:', selectAll ? 0 : DisplayingTeams.length);

    setSelectAll(prev => !prev); // Toggle the select all state
  };

  // const toggleTeamSelection = (recordId) => {
  //   if (isSingleSelection > 1) {
  //     setSelectedTeams([recordId]); // Only one selection allowed
  //   } else {
  //     if (selectedTeams.includes(recordId)) {
  //       setSelectedTeams(prev => prev.filter(id => id !== recordId));
  //     } else {
  //       setSelectedTeams(prev => [...prev, recordId]);
  //     }
  //   }
  // };

  const toggleTeamSelection = (recordId) => {
    const isSelected = selectedTeams.includes(recordId);
  
    if (isSelected) {
      // Deselect if already selected
      setSelectedTeams(prev => prev.filter(id => id !== recordId));
    } else {
      // Check if we can select more
      if (selectedTeams.length < isSingleSelection) {
        setSelectedTeams(prev => [...prev, recordId]);
      } else {
        // Optionally alert or ignore if limit reached
        console.warn(`You can select only up to ${isSingleSelection} teams.`);
      }
    }
  };
  
  

  useEffect(() => {
    console.log('Updated selectedTeams:', selectedTeams);
  }, [selectedTeams]);

  const handleJoin = selectedTeams => {
    const selectedTeamIds = selectedTeams.map(team => team.recordId);
    setSelectedUserTeamId(selectedTeamIds);
    setIsPopupVisible(true);
    console.log('log from select team', selectedTeamIds);
  };

  const handleModalClose = () => {
    setIsPopupVisible(false);
    navigation.navigate('ContestScreen');
  };
  return (
    <Modal 
  isVisible={visible}
  onSwipeComplete={handleModalClose}
  onBackdropPress={handleModalClose}
  swipeDirection="down"
  style={{ justifyContent: 'flex-end', margin: 0 }}
  
  backdropColor="#000"
  backdropOpacity={0.4}

  animationIn="fadeInUp"
  animationOut="fadeOutDown"

  animationInTiming={200}
  animationOutTiming={200}

  backdropTransitionInTiming={0}
  backdropTransitionOutTiming={0}

  useNativeDriver={true}
  useNativeDriverForBackdrop={true}
  hideModalContentWhileAnimating={true}
  propagateSwipe={true}
>

  
  
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 15,
            alignItems: 'center',
            paddingBottom: 10,
            flexDirection: 'column',
            gap: 10,
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              display: 'flex',
              backgroundColor: '#000',
            }}>
            <View style={{width: '10%', alignItems: 'flex-end'}}>
              <Pressable onPress={onClose}>
                <MaterialCommunityIcons name="close" size={24} color="#fff" />
              </Pressable>
            </View>

            <View
              style={{
                width: '80%',
                alignItems: 'center',
                justifyContent: 'center',
                height: hp('8%'),
                gap: 5,
              }}>
              <Text
                style={{color: '#fff', fontWeight: '700', fontSize: hp(1.8)}}>
                SELECT TEAMS
              </Text>
              <Text
                style={{color: '#fff', fontWeight: '400', fontSize: hp(1.5)}}>
                Entry : {entryFee}
              </Text>
            </View>

            <View style={{width: '10%'}}></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '95%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 5,
              gap: 10,
            }}>
            <View>
              <Text style={{color: '#000'}}>
                {DisplayingTeams.length} Teams
              </Text>
            </View>
            <Pressable onPress={toggleSelectAll}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <View
                  style={{
                    height: 14,
                    width: 14,
                    borderRadius: 7,
                    borderWidth: 2,
                    borderColor: selectAll ? '#3E57C4' : '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0, // ✅ Important: No padding
                    margin: 0,
                  }}>
                  {selectAll && (
                    <View
                      style={{
                        height: 6,
                        width: 6,
                        borderRadius: 3,
                        backgroundColor: '#3E57C4',
                      }}
                    />
                  )}
                </View>
                <Text style={{color: selectAll ? '#3E57C4' : '#000'}}>
                  Select All
                </Text>
              </View>
            </Pressable>
          </View>
          <View style={{maxHeight: '70%', width: '100%'}}>
            <ScrollView
              style={{width: '100%'}}
              contentContainerStyle={{
                alignItems: 'center',
                paddingBottom: 20,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '95%',
                  display: 'flex',
                  justifyContent: 'space-center',
                  alignItems: 'center',
                  gap: 5,
                }}>
                {DisplayingTeams.length > 0
                  ? DisplayingTeams.map((item, index) => {
                      const captainDetails = C[index] || {}; // Match by index
                      const ViceCaptainDetails = Vc[index] || {};
                      const ImpactPlayerDetails = I[index] || {};
                      return (
                        <Pressable
                          onPress={() => toggleTeamSelection(item.recordId)}
                          disabled={
                            !selectedTeams.includes(item.recordId) &&
                            selectedTeams.length >= isSingleSelection
                          }
                          android_ripple={{color: 'transparent'}}
                          key={index}
                          style={{
                            flexDirection: 'column',
                            width: '95%',
                            display: 'flex',
                            justifyContent: 'space-center',
                            alignItems: 'flex-start',
                            borderRadius: 5,
                            borderWidth: selectedTeams.includes(item.recordId)
                              ? 1
                              : 1,
                            borderColor: selectedTeams.includes(item.recordId)
                              ? '#3E57C4'
                              : '#F5F5F5',
                            padding: 12,
                            backgroundColor: '#F5F5F5',
                            gap: 10,
                            opacity:
                            !selectedTeams.includes(item.recordId) &&
                            selectedTeams.length >= isSingleSelection
                              ? 0.5
                              : 1,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 5,
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'flex-start',
                            }}>
                            <View
                              style={{
                                height: 14,
                                width: 14,
                                borderRadius: 7,
                                borderWidth: 2,
                                borderColor: selectedTeams.includes(
                                  item.recordId,
                                )
                                  ? '#3E57C4'
                                  : '#000000B3',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 0, // ✅ Important: No padding
                                margin: 0,
                              }}>
                              {selectedTeams.includes(item.recordId) && (
                                <View
                                  style={{
                                    height: 6, // Slightly smaller helps visually center
                                    width: 6,
                                    borderRadius: 3,
                                    backgroundColor: '#3E57C4',
                                  }}
                                />
                              )}
                            </View>

                            <View>
                              <Text
                                style={{
                                  color: selectedTeams.includes(item.recordId)
                                    ? '#3E57C4'
                                    : '#000000B3',
                                  fontWeight: '700',
                                  fontSize: 13,
                                }}>
                                Team {index + 1}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              width: '100%',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '95%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                // backgroundColor:"#f5f"
                              }}>
                              <View
                                style={{
                                  width: '25%',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 5,
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                  }}>
                                  <View
                                    style={{
                                      width: 18,
                                      height: 18,
                                      borderRadius: 9,
                                      backgroundColor: '#000',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      padding: 0,
                                    }}>
                                    <Text
                                      style={{
                                        color: '#fff',
                                        fontWeight: '700',
                                        fontSize: 10,
                                        textAlign: 'center',
                                      }}>
                                      C
                                    </Text>
                                  </View>

                                  <View>
                                    <Text
                                      style={{
                                        color: '#000',
                                        fontWeight: '700',
                                        fontSize: 10,
                                        width: '70%',
                                      }}
                                      numberOfLines={1}>
                                      {captainDetails.shortName}
                                    </Text>
                                  </View>
                                </View>
                                <View>
                                  <Image
                                    source={{
                                      uri: captainDetails.playerImagePath,
                                    }}
                                    style={{
                                      height: height * 0.06,
                                      width: screenWidth * 0.12,
                                    }}
                                  />
                                </View>
                              </View>
                              <View
                                style={{
                                  width: '25%',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 5,
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                  }}>
                                  <View
                                    style={[
                                      {
                                        backgroundColor: '#000',
                                        borderRadius: 20,
                                        paddingLeft: 5,
                                        paddingRight: 5,
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        padding: 2,
                                        // right: screenWidth * 0.11,
                                      },
                                      // screenWidth ? {right: 80} : {left: 0}, // Conditional styling
                                    ]}>
                                    <Text
                                      style={{
                                        color: '#fff',
                                        fontWeight: '700',
                                        fontSize: 10,
                                      }}>
                                      VC
                                    </Text>
                                  </View>
                                  <View>
                                    <Text
                                      style={{
                                        color: '#000',
                                        fontWeight: '700',
                                        fontSize: 10,
                                        width: '70%',
                                      }}
                                      numberOfLines={1}>
                                      {ViceCaptainDetails.shortName}
                                    </Text>
                                  </View>
                                </View>
                                <View>
                                  <Image
                                    source={{
                                      uri: ViceCaptainDetails.playerImagePath,
                                    }}
                                    style={{
                                      height: height * 0.06,
                                      width: screenWidth * 0.12,
                                    }}
                                  />
                                </View>
                              </View>
                              <View
                                style={{
                                  width: '25%',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 5,
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                  }}>
                                  <View
                                    style={[
                                      {
                                        backgroundColor: '#000',
                                        borderRadius: 20,
                                        paddingLeft: 5,
                                        paddingRight: 5,
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        padding: 2,
                                        // right: screenWidth * 0.11,
                                      },
                                      // screenWidth ? {right: 80} : {left: 0}, // Conditional styling
                                    ]}>
                                    <Image
                                      source={require('../../assets/ImpactPreviewNotSelected.png')}
                                      style={{width: 15, height: 15}}
                                    />
                                  </View>
                                  <View>
                                    <Text
                                      style={{
                                        color: '#000',
                                        fontWeight: '700',
                                        fontSize: 10,
                                        width: '70%',
                                      }}
                                      numberOfLines={1}>
                                      {ImpactPlayerDetails.shortName}
                                    </Text>
                                  </View>
                                </View>
                                <View>
                                  <Image
                                    source={{
                                      uri: ImpactPlayerDetails.playerImagePath,
                                    }}
                                    style={{
                                      height: height * 0.06,
                                      width: screenWidth * 0.12,
                                    }}
                                  />
                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'column',
                                  alignItems: 'flex-end',
                                  gap: 6,
                                  width: '25%',
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    padding: 3,
                                    borderRadius: 3,
                                    width: '80%',
                                    backgroundColor: '#fff',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    backgroundColor: '#fff',
                                  }}>
                                  <View style={{width: '60%'}}>
                                    <Text
                                      style={{
                                        color: '#000',
                                        fontWeight: '700',
                                        fontSize: 13,
                                      }}>
                                      {' '}
                                      {item.team1Name}
                                    </Text>
                                  </View>
                                  <View style={{width: '40%'}}>
                                    <Text
                                      style={{
                                        color: '#000',
                                        fontWeight: '700',
                                        fontSize: 13,
                                      }}>
                                      {' '}
                                      {item.team1Count}
                                    </Text>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    padding: 3,
                                    borderRadius: 3,
                                    backgroundColor: '#fff',
                                    width: '80%',
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    backgroundColor: '#000',
                                  }}>
                                  <View
                                    style={{
                                      width: '60%',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        color: '#fff',
                                        fontWeight: '700',
                                        fontSize: 13,
                                      }}>
                                      {' '}
                                      {item.team2Name}
                                    </Text>
                                  </View>
                                  <View style={{width: '40%'}}>
                                    <Text
                                      style={{
                                        color: '#fff',
                                        fontWeight: '700',
                                        fontSize: 13,
                                      }}>
                                      {' '}
                                      {item.team2Count}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        </Pressable>
                      );
                    })
                  : null}
              </View>
            </ScrollView>
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
              flexDirection: 'column',
              display: 'flex',
              width: '95%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '95%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{color: '#000', fontWeight: '500', fontSize: 13.5}}>
                  TO PAY
                </Text>
              </View>
              <View>
                <Text style={{color: '#000', fontWeight: '800', fontSize: 15}}>
                  ₹{selectedTeams.length * entryFee}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15,
                width: '95%',
                display: 'flex',
                justifyContent: 'flex-start',
              }}>
              <View>
                <Text style={{color: '#000', fontWeight: '400', fontSize: 10}}>
                  I agree with the
                </Text>
              </View>
              <Pressable>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '500',
                    fontSize: 10,
                    textDecorationLine: 'underline',
                  }}>
                  T&C
                </Text>
              </Pressable>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}>
            {selectedTeams.length > 0 ? (
              <LinearGradient
                colors={['#3E57C4', '#1E2A5E']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{
                  padding: 15,
                  width: '90%',
                  borderRadius: 8,
                }}>
                <Pressable
                  onPress={joincontest}
                  style={{
                    alignItems: 'center',
                  }}>
                  {selectedTeams.length == 1 ? (
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: '800',
                        fontSize: 13.5,
                      }}>
                      Join with 1 team
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: '800',
                        fontSize: 13.5,
                      }}>
                      Join with {selectedTeams.length} teams{' '}
                    </Text>
                  )}
                </Pressable>
              </LinearGradient>
            ) : (
              <Pressable
                disabled
                style={{
                  backgroundColor: '#c0c0c0',
                  padding: 15,
                  width: '90%',
                  borderRadius: 8,
                  alignItems: 'center',
                }}>
                <Text
                  style={{color: '#fff', fontWeight: '800', fontSize: 13.5}}>
                  Join
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SelectTeam;

const styles = StyleSheet.create({});
