import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {
  setSelectedTeamsId,
  resetFinalPlayerSelected,
} from '../../../Redux/Slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../../../envfile/api';
import axios from 'axios';
import ContestHeader from '../ContestHeader';
import JoinContestPopup from '../../../Models/JoinContestPopup';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Check} from '@mui/icons-material';
import CheckBox from 'react-native-check-box';

const SelectTeam = ({navigation, route}) => {
  const {entryFee} = route.params;
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedUserTeamId, setSelectedUserTeamId] = useState(null);
  const navigations = useNavigation();
  const dispatch = useDispatch();
  const [Token, setToken] = useState();
  
  const [DisplayingTeams, setDisplayingTeams] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedTeamNames, setSelectedTeamNames] = useState([]);

  const UserName = useSelector(state => state.fantasy.UserName);

  const matchId = useSelector(state => state.fantasy.matchId);

  // const screenWidth = Dimensions.get('window').width;

  // const isTablet = screenWidth >= 768;

  const screenWidth = Dimensions.get('window').width;

  const {height} = Dimensions.get('window');

  const [C, setC] = useState([]);
  const [Vc, setVc] = useState([]);
  const [I, setI] = useState([]);

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
      const allTeams = DisplayingTeams.map(item => ({
        recordId: item.recordId,
        teamName: item.teamName,
      }));
  
      const allTeamIds = allTeams.map(team => team.recordId);
      const allTeamNames = allTeams.map(team => team.teamName);
  
      setSelectedTeams(allTeams);
      setSelectedUserTeamId(allTeamIds);
      dispatch(setSelectedTeamsId(allTeamIds));
      setSelectedTeamNames(allTeamNames);
    }
  
    console.log('Selected Team Count:', selectAll ? 0 : DisplayingTeams.length);
  
    setSelectAll(prev => !prev); // Toggle the select all state
  };

  const toggleTeamSelection = (recordId, teamName) => {
    setSelectedTeams(prevSelectedTeams => {
      let updatedTeams = [];
      let updatedTeamNames = [];
  
      if (prevSelectedTeams.some(team => team.recordId === recordId)) {
        // Remove the team if already selected
        updatedTeams = prevSelectedTeams.filter(team => team.recordId !== recordId);
      } else {
        // Add new selection
        updatedTeams = [...prevSelectedTeams, { recordId, teamName }];
      }
  
      updatedTeamNames = updatedTeams.map(team => team.teamName);
  
      dispatch(setSelectedTeamsId(updatedTeams.map(team => team.recordId)));
      setSelectedUserTeamId(updatedTeams.map(team => team.recordId));
  
      console.log('Currently Selected Teams:', updatedTeams);
      console.log('Currently Selected Team Names:', updatedTeamNames);
  
      setSelectedTeamNames(updatedTeamNames); // Update state for team names
  
      return updatedTeams;
    });
  };

  useEffect(() => {
    console.log('Updated selectedTeams:', selectedTeams);
  }, [selectedTeams]);

  const handleJoin = (selectedTeams) => {

    const selectedTeamIds = selectedTeams.map(team => team.recordId);
    setSelectedUserTeamId(selectedTeamIds); 
    setIsPopupVisible(true);
    console.log("log from select team",selectedTeamIds);
    
  };

  const handleModalClose = () => {
    setIsPopupVisible(false);
    navigation.navigate('ContestScreen');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ContestHeader />
      <View
        style={{
          flex: 1, // ✅ This ensures proper spacing
          flexDirection: 'column',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            borderBottomWidth: 1,
            borderColor: '#c0c0c0',
          }}>
          <View>
            <Text style={{color: '#000', fontSize: hp(1.6)}}>
              You can join up to 11 teams{' '}
            </Text>
          </View>
          <View
  style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  }}>
  <Text style={{ color: '#000', fontWeight: '800' }}>SELECT ALL</Text>
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    }}>
    <Pressable onPress={toggleSelectAll}>
      <View
        style={{
          borderColor: '#3E57C4',
          backgroundColor: '#f0f0f0',
        }}>
        <Icon
          name={selectAll ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={24}
          color="#3E57C4"
        />
      </View>
    </Pressable>
  </View>
</View>
        </View>
        <ScrollView
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 10,
            width: '100%',
          }}
          contentContainerStyle={{flexGrow: 1}} // ✅ This ensures scrolling does not block the last view
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                paddingBottom: 20,
                width: '100%',
              }}>
              {DisplayingTeams.length > 0
                ? DisplayingTeams.map((item, id) => {
                    const captainDetails = C[id] || {}; // Match by index
                    const ViceCaptainDetails = Vc[id] || {};
                    const ImpactPlayerDetails = I[id] || {};

                    return (
                      <Pressable
                        key={id}
                        onPress={() => navigation.navigate('TeamPreview')}
                        style={{
                          width: '90%',
                          height: height * 0.23,
                          alignItems: 'center',
                          borderRadius: 10,
                          // overflow:"hidden",
                          backgroundColor: '#fff',
                          elevation: 5,
                          display: 'flex',
                          flexDirection: 'row',
                          padding: 4,
                          gap: 15,
                        }}>
                        <ImageBackground
                          source={require('../../../../assets/CreateTeamPreview.png')}
                          resizeMode="cover"
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 5,
                            overflow: 'hidden',
                            // gap:2
                          }}>
                          <View
                            style={{
                              display: 'flex',
                              width: '100%',
                              flexDirection: 'row',
                              padding: 5,
                              justifyContent: 'space-between',
                              backgroundColor: '#0101013d',
                              borderTopLeftRadius: 8,
                              borderTopRightRadius: 8,
                            }}>
                            <View
                              style={{
                                display: 'flex',
                                width: screenWidth * 0.2,
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                              }}>
                              <Text style={{fontWeight: 'bold', color: '#fff'}}>
                                {UserName || 'sandy'}
                              </Text>
                              <Text style={{fontWeight: 'bold', color: '#fff'}}>
                                {item.teamName}
                              </Text>
                            </View>
                          </View>

                          <View
                            style={{
                              display: 'flex',
                              width: '100%',
                              flexDirection: 'row',
                              padding: 5,
                              //backgroundColor: '#f5f',
                            }}>
                            <View
                              style={{
                                display: 'flex',
                                width: '60%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                //  backgroundColor:"#196",
                                gap: 5,
                              }}>
                              {captainDetails && (
                                <View
                                  //key={id}
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                    // backgroundColor: "#f5f",
                                    width: '50%',
                                  }}>
                                  <View
                                    style={[
                                      {
                                        position: 'absolute',
                                        top: 0,
                                        backgroundColor: '#000',
                                        borderRadius: 20,
                                        paddingLeft: 5,
                                        paddingRight: 5,
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        padding: 2,
                                        right: screenWidth * 0.19,
                                      },
                                      // screenWidth ? {right: 80} : {left: 0}, // Conditional styling
                                    ]}>
                                    <Text
                                      style={{
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        fontSize: hp(1.5),
                                      }}>
                                      C
                                    </Text>
                                  </View>
                                  <Image
                                    source={{
                                      uri: captainDetails.playerImagePath,
                                    }}
                                    style={{
                                      height: height * 0.08,
                                      width: screenWidth * 0.17,
                                    }}
                                  />
                                  <View
                                    style={{
                                      width: '60%',
                                      backgroundColor:
                                        captainDetails.teamDto?.teamColor,
                                      borderRadius: 2,
                                      padding: 0,
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        color: '#fff',
                                        alignItems: 'center',
                                        fontSize: hp(1.2),
                                        fontWeight: 'bold',
                                      }}
                                      numberOfLines={1}>
                                      {captainDetails.shortName}
                                    </Text>
                                  </View>
                                </View>
                              )}
                              {ViceCaptainDetails && (
                                <View
                                  //key={id}
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                    //  backgroundColor: "#f5f",
                                    width: '50%',
                                  }}>
                                  <View
                                    style={[
                                      {
                                        position: 'absolute',
                                        top: 0,
                                        backgroundColor: '#000',
                                        borderRadius: 30,
                                        //paddingLeft: 5,
                                        //paddingRight: 5,
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        padding: 4,
                                        right: screenWidth * 0.19,
                                      },
                                      // screenWidth ? {right: 80} : {left: 0}, // Conditional styling
                                    ]}>
                                    <Text
                                      style={{
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        fontSize: hp(1.2),
                                      }}>
                                      VC
                                    </Text>
                                  </View>
                                  <Image
                                    source={{
                                      uri: ViceCaptainDetails.playerImagePath,
                                    }}
                                    style={{
                                      height: height * 0.08,
                                      width: screenWidth * 0.17,
                                    }}
                                  />
                                  <View
                                    style={{
                                      width: '60%',
                                      backgroundColor:
                                        ViceCaptainDetails.teamDto?.teamColor,

                                      borderRadius: 2,
                                      padding: 0,
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        color: '#fff',
                                        alignItems: 'center',
                                        fontSize: hp(1.2),
                                        fontWeight: 'bold',
                                      }}
                                      numberOfLines={1}>
                                      {ViceCaptainDetails.shortName}
                                    </Text>
                                  </View>
                                </View>
                              )}
                            </View>

                            <View
                              style={{
                                display: 'flex',
                                width: '40%',
                                //  backgroundColor: '#f27',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                              }}>
                              {ImpactPlayerDetails && (
                                <View
                                  //key={id}
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                    // backgroundColor: "#f5f",
                                    width: '70%',
                                  }}>
                                  <View
                                    style={{
                                      position: 'absolute',
                                      top: 0,
                                      backgroundColor: '#000',
                                      borderRadius: 20,

                                      justifyContent: 'flex-start',
                                      alignItems: 'flex-start',
                                      right: screenWidth * 0.18,
                                      padding: 3,
                                    }}>
                                    <View>
                                      <Image
                                        source={require('../../../../assets/ImpactPreviewNotSelected.png')}
                                        style={{width: 15, height: 15}}
                                      />
                                    </View>
                                  </View>
                                  <Image
                                    source={{
                                      uri: ImpactPlayerDetails.playerImagePath,
                                    }}
                                    style={{
                                      height: height * 0.08,
                                      width: screenWidth * 0.17,
                                    }}
                                  />
                                  <View
                                    style={{
                                      width: '60%',
                                      backgroundColor:
                                        ImpactPlayerDetails.teamDto?.teamColor,
                                      borderRadius: 2,
                                      padding: 0,
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        color: '#fff',
                                        alignItems: 'center',
                                        fontSize: hp(1.2),
                                        fontWeight: 'bold',
                                      }}
                                      numberOfLines={1}>
                                      {ImpactPlayerDetails.shortName}
                                    </Text>
                                  </View>
                                </View>
                              )}
                            </View>
                          </View>

                          <View
                            style={{
                              display: 'flex',
                              width: '100%',
                              flexDirection: 'row',
                              // padding: 5,
                              justifyContent: 'space-evenly',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{
                                display: 'flex',
                                width: '35%',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                backgroundColor: '#0101013d',
                                padding: 3,
                                borderRadius: 5,
                              }}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color: '#fff',
                                  fontSize: hp(1.6),
                                }}>
                                {item.team1Name}
                              </Text>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color: '#fff',
                                  fontSize: hp(1.6),
                                }}>
                                {item.team1Count}
                              </Text>
                            </View>
                            <View
                              style={{
                                display: 'flex',
                                width: '35%',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                backgroundColor: '#0101013d',
                                padding: 3,
                                borderRadius: 5,
                              }}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color: '#fff',
                                  fontSize: hp(1.6),
                                }}>
                                {item.team2Name}
                              </Text>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color: '#fff',
                                  fontSize: hp(1.6),
                                }}>
                                {item.team2Count}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              display: 'flex',
                              width: '100%',
                              flexDirection: 'row',
                              justifyContent: 'space-around',
                              alignItems: 'center',
                              paddingTop: 8,
                            }}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                fontSize: hp(1.6),
                              }}>
                              WK {item.wicketKeeperCount}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                fontSize: hp(1.6),
                              }}>
                              BAT {item.batsManCount}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                fontSize: hp(1.6),
                              }}>
                              AR {item.allRounderCount}
                            </Text>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                fontSize: hp(1.6),
                              }}>
                              BOWL {item.bowlerCount}
                            </Text>
                          </View>
                        </ImageBackground>
                        <View
                          key={item.recordId}
                          style={{
                            width: '8%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: '#3E57C4',
                          }}>
                          <CheckBox 
                          
                            isChecked={selectedTeams.some(
                              team => team.recordId === item.recordId,
                            )} // ✅ Properly check selection
                            onClick={() =>
                              toggleTeamSelection(item.recordId, item.teamName)
                            }
                            checkBoxColor={
                              selectedTeams.some(
                                team => team.recordId === item.recordId,
                              )
                                ? '#3E57C4'
                                : '#3E57C4'
                            } // ✅ Dynamic color
                            size={24}
                            style={{borderColor: '#3E57C4'}}
                          />
                        </View>
                      </Pressable>
                    );
                  })
                : null}
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 10,
          }}>
          <Pressable
            onPress={() => {
              dispatch(resetFinalPlayerSelected());
              navigation.navigate('CreateTeam');
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              width: '50%',
              backgroundColor: '#383838',
              padding: 15,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={20}
              color="#fff"
            />
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: hp(1.7),
                fontWeight: '600',
              }}>
              CREATE TEAM
            </Text>
          </Pressable>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            padding: 15,
            alignItems: 'center',
          }}>
          <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            width: '50%',
          }}>
          <Text style={{ color: '#000' }}>Join with</Text>
          {selectedTeamNames.length === DisplayingTeams.length && selectedTeamNames.length > 0 ? (
            <Text style={{ color: '#000', fontWeight: '600', }}>
               {DisplayingTeams.length} Teams
            </Text>
          ) : selectedTeamNames.length > 0 ? (
            <Text style={{ color: '#000', fontWeight: '600', }}>
            Selected Team {selectedTeamNames.join(', ')}
            </Text>
          ) : (
            <Text style={{ color: '#000' }}>No team selected</Text>
          )}
        </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              // backgroundColor: '#f4f',
              width: '50%',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            {selectedTeams.length > 0 ? (
              <LinearGradient
                colors={['#3b53bd', '#243373', '#192451']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={{
                  padding: 15,
                  width: '50%',
                  borderRadius: 8,
                }}>
                <Pressable
                  onPress={() => handleJoin(selectedTeams)}
                  style={{
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#fff', fontWeight: 800}}>JOIN</Text>
                </Pressable>
              </LinearGradient>
            ) : (
              <Pressable
                disabled
                style={{
                  backgroundColor: '#c0c0c0',
                  padding: 15,
                  width: '50%',
                  borderRadius: 8,
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff', fontWeight: 800}}>JOIN</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>

      <JoinContestPopup
        visible={isPopupVisible}
        onClose={handleModalClose}
        entryFee={entryFee}
        userTeamId={selectedUserTeamId} // Pass userTeamId
      />
    </SafeAreaView>
  );
};

export default SelectTeam;
