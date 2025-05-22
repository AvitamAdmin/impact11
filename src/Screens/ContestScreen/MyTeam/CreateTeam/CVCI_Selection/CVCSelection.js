import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
// import { Ionicons, FontAwesome5, Feather, AntDesign } from "@expo/vector-icons";
// import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
// import { Entypo } from '@expo/vector-icons';
import {
  setcaptain,
  setViceCaptain,
  setcaptainTeam,
  setViceCaptainTeam,
  setImpactPlayerTeam,
  resetcaptainTeam,
  resetViceCaptainTeam,
  setTeams,
  setTeamName,
  setplayerListwithStatus,
  setCreatedTeam,
  resetFinalPlayerSelected,
  setCaptainImage,
  setViceCaptainImage,
  setimpactPlayer,
  setimpactPlayerImage,
  setuserTeamId,
} from '../../../../../Redux/Slice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../../../../../envfile/api';
import axios from 'axios';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImpactPlayer from '../../../../../Models/ImpactPlayer';
import JoinContestPopup from '../../../../../Models/JoinContestPopup';
import { showMessage } from 'react-native-flash-message';
import TimeExpiredPopup from '../../../../../Models/TimeExpiredPopup';
import Selection_TeamPreview from '../../../../../Models/Selection_TeamPreview';

const CVCSelection = () => {
  const route = useRoute();
  const entryFee = route.params?.entryFee;

  //console.log('Entry Fee:', entryFee);
  const isFocused = useIsFocused();
  const [lengthOfExistingTeams, setLengthOfExistingTeams] = useState(0);
  const [selectedEntryFee, setSelectedEntryFee] = useState(null);
  const [isTeamPreviewVisible, setIsTeamPreviewVisible] = useState(false);

  const WicketKeepersId = useSelector(state => state.fantasy.WicketKeepers);
  const BowlersId = useSelector(state => state.fantasy.Bowlers);
  const BatsmanId = useSelector(state => state.fantasy.Batsman);
  const AllRoundersId = useSelector(state => state.fantasy.AllRounders);

  const playerList = useSelector(state => state.fantasy.finalPlayerSelected);

  const ViceCaptain = useSelector(state => state.fantasy.ViceCaptain);
  const Captain = useSelector(state => state.fantasy.captain);

  const matchId = useSelector(state => state.fantasy.matchId);
  const teamLength = useSelector(state => state.fantasy.CreatedTeam.length);
  const team1Count = useSelector(state => state.fantasy.selectedTeam1.length);
  const team2Count = useSelector(state => state.fantasy.selectedTeam2.length);
  const team1Name = useSelector(state => state.fantasy.team1ShortName);
  const team2Name = useSelector(state => state.fantasy.team2ShortName);

  const ImpactPlayerImage = useSelector(
    state => state.fantasy.impactPlayerImage,
  );
  const captainImage = useSelector(state => state.fantasy.captainImage);
  const vcImage = useSelector(state => state.fantasy.ViceCaptainImage);
  const wicketKeeperCount = useSelector(
    state => state.fantasy.WicketKeepers.length,
  );
  const BowlersCount = useSelector(state => state.fantasy.Bowlers.length);
  const BatsmanCount = useSelector(state => state.fantasy.Batsman.length);
  const allRounderCount = useSelector(
    state => state.fantasy.AllRounders.length,
  );

  const PlayersforDto = useSelector(
    state => state.fantasy.playerListwithStatus,
  );
  //  console.log('PlayersforDto from cvc top', PlayersforDto);

  const contestId = useSelector(state => state.fantasy.contestId);
  const impactPlayer = useSelector(state => state.fantasy.impactPlayer);

  const [WicketKeepers, setWicketKeepers] = useState([]);
  const [Bowlers, setBowlers] = useState([]);
  const [Batsman, setBatsman] = useState([]);
  const [AllRounders, setAllrounders] = useState([]);
  const [timeLeft, setTimeLeft] = useState('');
  const [Popup, setPopup] = useState(false)
  const [reset, setReset] = useState(false);
  // const [CaptainImage, setCaptainImage] = useState({});
  // const [ViceCaptainImage, setViceCaptainImage] = useState({});

  const CaptainTeamName = useSelector(state => state.fantasy.captainTeam);
  const ViceCaptainTeamName = useSelector(
    state => state.fantasy.ViceCaptainTeam,
  );
  const ImpactPlayerTeamName = useSelector(
    state => state.fantasy.ImpactPlayerTeam,
  );
  const DateAndTime = useSelector(state => state.fantasy.DateAndTime[0]);

  useEffect(() => {
    if (!DateAndTime || !isFocused) return;

    // console.log('DateAndTime from Redux:', DateAndTime);

    const [datePart, timePart] = DateAndTime.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);

    const targetDate = new Date(year, month - 1, day, hour, minute, second);
    // console.log('Parsed Target Date (Local):', targetDate);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        setTimeLeft(`${hours}hr ${minutes}m left`);
      }
      if (difference <= 0 && isFocused) {
        if (isFocused) {
          setPopup(true);
          // dispatch(setHasTimeExpiredPopupShown(true)); // ✅ prevent double-popup
        }
        clearInterval(interval);
      }

    }, 1000);

    return () => clearInterval(interval);

  }, [DateAndTime, isFocused]);

  const [Token, setToken] = useState('');

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isImpactVisibile, setImpactVisible] = useState(false);

  useEffect(() => {
    // console.log('Updated Captain Team Name:', CaptainTeamName);
  }, [CaptainTeamName]);

  useEffect(() => {
    // console.log('Updated Vice Captain Team Name:', ViceCaptainTeamName);
  }, [ViceCaptainTeamName]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');

        setToken(token);
        if (!token) {
          console.error('No token found in AsyncStorage. Did you set it?');
        }
        if (token) {
          await fetchPlayerList(token);
          await ListingTeam(token);
        } else {
          console.error('token not found');
        }
      } catch (error) {
        setError('Unexpected error occurred.');
      }
    };

    fetchToken();
  }, []);

  const fetchPlayerList = async token => {
    try {
      const body = {
        playerDtoList: playerList.map(id => ({
          recordId: id,
        })),
      };

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(`${api}/admin/player/getedit`, body, {
        headers,
      });

      const filteredPlayers = response.data.playerDtoList;

      const WicketKeeper = filteredPlayers.filter(item =>
        WicketKeepersId.includes(item.recordId),
      );
      setWicketKeepers(WicketKeeper);
      // console.log('wicketKeepers from CVC screen', WicketKeeper);

      const bowler = filteredPlayers.filter(item =>
        BowlersId.includes(item.recordId),
      );
      setBowlers(bowler);
      const batsman = filteredPlayers.filter(item =>
        BatsmanId.includes(item.recordId),
      );
      setBatsman(batsman);
      const allRounder = filteredPlayers.filter(item =>
        AllRoundersId.includes(item.recordId),
      );
      setAllrounders(allRounder);
    } catch (error) {
      console.error('Error fetching ImpactPlayer data:', error);
      setError('Error fetching Impactplayer data.');
    }
  };

  const save = () => {
    if (isSaved) return; // Prevents multiple API calls

    dispatch(setplayerListwithStatus(playerList));

    // console.log('Pressed save, updating players:', playerList);

    setIsSaved(true);
  };

  useEffect(() => {
    if (isSaved && PlayersforDto.length > 0) {
      // console.log('Players updated in Redux:', PlayersforDto);
      handleSave(Token);
    }
  }, [PlayersforDto]);

  const handleSave = async token => {
    // console.log('Came in handleSave');

    if (contestId) {
      const walletBalance = await AsyncStorage.getItem('walletBalance');
      if (parseFloat(walletBalance) < parseFloat(entryFee)) {
        console.error('Insufficient wallet balance.');
        showMessage({
          message: 'Error',
          description: 'Insufficient wallet balance. Please add cash.',
          type: 'danger',
          backgroundColor: '#f44336',
          color: '#FFFFFF',
          duration: 3000,
        });
        setIsSaved(false);
        navigation.navigate('ADD CASH', {
          walletBalance: walletBalance,
          entryFee: entryFee,
        });

        return;
      } else {
        setIsPopupVisible(true);
      }
    }

    const teams = [
      {
        matchId: matchId,
        players: PlayersforDto,
        teamName: `T${teamLength + 1}`,
        contestId: contestId,
        team1Name: team1Name,
        team2Name: team2Name,
        team1Count: team1Count,
        team2Count: team2Count,
        wicketKeeper: wicketKeeperCount,
        bowler: BowlersCount,
        batsman: BatsmanCount,
        allRounder: allRounderCount,
      },
    ];

    dispatch(setCreatedTeam(teams));

    try {
      const userId = await AsyncStorage.getItem('userId');
      const body = {
        userTeamsDtoList: [
          {
            userId: userId,
            matchId: matchId,
            players: PlayersforDto,
            teamName: `T${lengthOfExistingTeams + 1}`,
            // contestId: contestId,
          },
        ],
      };

      // console.log('Sending request with body:', JSON.stringify(body, null, 2));
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(`${api}/admin/userTeams/edit`, body, {
        headers,
      });

      // console.log('API response:', response.data);

      if (response.data.success === true) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'ContestScreen' }], // Clear the stack
        });

        dispatch(resetFinalPlayerSelected());
        dispatch(setuserTeamId(response.data.userTeamsDtoList[0].recordId));
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setIsSaved(false); // ✅ Reset isSaved so the API can be called again
    }
  };

  const ListingTeam = async token => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      //  console.log('userId :', userId);
      //console.log('matchId', matchId);

      const body = {
        matchId: matchId,
        userId: userId,
      };
      const response = await axios.post(
        `${api}/admin/userTeams/getUserTeamsDetails`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const teams = response.data.userTeamsDtoList || [];

      // console.log(' user Teams length:', teams.length);

      setLengthOfExistingTeams(teams.length);
    } catch (error) {
      console.error('Error fetching listing teams in cvc:', error);
    }
  };

  const handleSelectCaptain = (playerRecordId, image, team) => {
    dispatch(setcaptain(playerRecordId));
    dispatch(setCaptainImage(image));
    dispatch(setcaptainTeam(team));
  };
  const handleSelectViceCaptain = (playerRecordId, image, team) => {
    dispatch(setViceCaptain(playerRecordId));
    dispatch(setViceCaptainImage(image));
    dispatch(setViceCaptainTeam(team));
  };
  const handleSelectImpactPlayer = (playerRecordId, image, team) => {
    dispatch(setimpactPlayer(playerRecordId));
    dispatch(setimpactPlayerImage(image));
    dispatch(setImpactPlayerTeam(team));
  };

  const closeTeamPreview = () => {
    setIsTeamPreviewVisible(false);

  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <View style={{height: hp('30%'), flexDirection: 'column'}}> */}
      <LinearGradient
        colors={['#000', '#000', '#000', '#18224e', '#3d56c2']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
       <Selection_TeamPreview
                  visible={isTeamPreviewVisible}
                  onClose={closeTeamPreview}
                  navigation={navigation}
                />
      <View
        style={{
          flexDirection: 'column',
          gap: 15,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            padding: 5,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '70%',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
              padding: 5,
            }}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              style={{ width: '10%' }}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </Pressable>
            <View style={{ flexDirection: 'column', width: '60%' }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: hp(1.9),
                }}>
                Create Team 1
              </Text>
              <Text style={{ color: '#fff', fontSize: hp(1.2), padding: 2 }}>
                {timeLeft}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: '25%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
            }}>
            <View>
              <AntDesign name="questioncircleo" size={24} color="#fff" />
            </View>

            <View>
              <Image
                source={require('../../../../../../assets/ptsImg.png')}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
          }}>
          {/* Captain View */}
          <View
            style={{
              height: hp(15),
              width: wp(28),
              borderWidth: 2,
              borderColor: '#fff',
              borderRadius: 5,
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            {Captain.length > 0 ? (
              <Image
                source={{ uri: captainImage }}
                style={{
                  width: '70%',
                  height: '60%',
                  borderRadius: 40,
                  resizeMode: 'contain',
                  borderWidth: 2,
                  borderColor: '#c0c0c0',
                }}
              />
            ) : (
              <View style={{ width: '95%', height: '85%' }}></View>
            )}
            <View
              style={{
                position: 'absolute',
                top: 3,
                backgroundColor: '#000',
                borderRadius: 20,
                paddingLeft: 12,
                paddingRight: 12,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                // padding: 2,
                left: 3,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#fff',
                  fontSize: hp(1.8),
                }}>
                C
              </Text>
            </View>
            {Captain.length === 0 && (
              <View
                style={{
                  position: 'absolute',
                  borderRadius: 40,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '70%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 2,
                  height: '60%',
                  borderColor: '#c0c0c0',
                }}>
                <View
                  style={{
                    position: 'absolute',
                    borderRadius: 20,
                    paddingLeft: 5,
                    paddingRight: 5,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    padding: 2,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#C0c0c0',
                      fontSize: hp(1.8),
                    }}>
                    C
                  </Text>
                </View>
              </View>
            )}
            <View
              style={{
                position: 'absolute',
                bottom: 5,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: hp(1.2),
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                Gets 2X Points
              </Text>
            </View>
          </View>

          {/* ViceCaptain View */}
          <View
            style={{
              height: hp(15),
              width: wp(28),
              borderWidth: 2,
              borderColor: '#fff',
              borderRadius: 5,
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            {ViceCaptain.length > 0 ? (
              <Image
                source={{ uri: vcImage }}
                style={{
                  width: '70%',
                  height: '60%',
                  borderRadius: 40,
                  resizeMode: 'contain',
                  borderWidth: 2,
                  borderColor: '#c0c0c0',
                }}
              />
            ) : (
              <View style={{ width: '90%', height: '85%' }}></View>
            )}
            <View
              style={{
                position: 'absolute',
                top: 3,
                backgroundColor: '#000',
                borderRadius: 20,
                paddingLeft: 10,
                paddingRight: 10,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                // padding: 2,
                left: 3,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#fff',
                  fontSize: hp(1.8),
                }}>
                VC
              </Text>
            </View>
            {ViceCaptain.length === 0 && (
              <View
                style={{
                  position: 'absolute',
                  borderRadius: 40,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '70%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 2,
                  height: '60%',
                  borderColor: '#c0c0c0',
                }}>
                <View
                  style={{
                    position: 'absolute',
                    borderRadius: 40,
                    paddingLeft: 5,
                    paddingRight: 5,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    padding: 2,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#c0c0c0',
                      fontSize: hp(1.8),
                    }}>
                    VC
                  </Text>
                </View>
              </View>
            )}
            <View
              style={{
                position: 'absolute',
                bottom: 5,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: hp(1.2),
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                Gets 1.5X Points
              </Text>
            </View>
          </View>

          {/* ImpactPlayer View */}
          <View
            style={{
              height: hp(15),
              width: wp(28),
              borderWidth: 2,
              borderColor: '#fff',
              borderRadius: 5,
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            {impactPlayer.length > 0 ? (
              <Image
                source={{ uri: ImpactPlayerImage }}
                style={{
                  width: '70%',
                  height: '60%',
                  borderRadius: 40,
                  resizeMode: 'contain',
                  borderWidth: 2,
                  borderColor: '#c0c0c0',
                  padding: 5,
                }}
              />
            ) : (
              <View style={{ width: '90%', height: '85%' }}></View>
            )}
            <View
              style={{
                position: 'absolute',
                top: 3,
                backgroundColor: '#000',
                borderRadius: 20,
                paddingLeft: 5,
                paddingRight: 5,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                // padding: 2,
                left: 3,
              }}>
              <View
                style={{
                  alignItems: 'center',

                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../../../../assets/ImpactPreviewNotSelected.png')}
                  style={{ width: 22, height: 23, color: '#000' }}
                />
              </View>
            </View>
            {impactPlayer.length === 0 && (
              <View
                style={{
                  position: 'absolute',
                  borderRadius: 40,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '70%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 2,
                  height: '60%',
                  borderColor: '#c0c0c0',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    // backgroundColor: '#000',
                    borderRadius: 6,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../../../../assets/IconAbout.png')}
                    style={{ width: 22, height: 23, color: '#000' }}
                  />
                </View>
              </View>
            )}
            <View
              style={{
                position: 'absolute',
                bottom: 5,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: hp(1.2),
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                IMPACT PLAYER
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => {
            setImpactVisible(true);
          }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '94%',
            backgroundColor: '#333333',
            padding: 5,
            borderRadius: 20,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            gap: 10,

          }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#000',
              borderRadius: 20,
              justifyContent: 'flex-start',

              alignItems: 'center',
            }}>
            <Image
              source={require('../../../../../../assets/ImpactPreviewNotSelected.png')}
              style={{ width: 25, height: 25 }}
            />
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',

              alignItems: 'center',
            }}>
            <Text
              style={{
                display: 'flex',
                fontSize: hp(1.2),
                // fontWeight: 'bold',
                color: '#fff',
              }}>
              Impact Player will replace the player with least points in your
              team
            </Text>
          </View>
        </Pressable>
      </View>
      {/* </LinearGradient> */}
      {/* </View> */}

      <View
        style={{
          width: '100%',
          display: 'flex',
          // justifyContent: 'space-around',
          flexDirection: 'row',
          gap: 5,
          padding: 5,
          paddingTop: 10,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '20%',
            backgroundColor: '#000',
          }}>
          <Text style={{ color: '#fff', fontSize: hp(1.4) }}>Sort by :</Text>
        </View>

        <View style={{ width: '20%' }}>
          <View
            style={{
              width: '  100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
              display: 'flex',

              backgroundColor: '#333333',
              padding: 2,
              borderRadius: 20,
            }}>
            <Text style={{ fontSize: hp(1.4), color: '#fff' }}>TEAM</Text>
            <Text style={{ fontSize: hp(1.5), color: '#fff', fontWeight: '900' }}>
              ↑↓
            </Text>
          </View>
        </View>
        <View style={{ width: '20%' }}>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
              display: 'flex',

              backgroundColor: '#333333',
              padding: 2,
              borderRadius: 20,
            }}>
            <Text style={{ fontSize: hp(1.4), color: '#fff' }}>POINTS</Text>
            <Text style={{ fontSize: hp(1.5), color: '#fff', fontWeight: '900' }}>
              ↑↓
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={{
          width: wp('100%'),
          height: hp('100%'),
          padding: 15,
          // gap: 5,
          display: 'flex',
          flexDirection: 'column',
        }}
        contentContainerStyle={{
          paddingBottom: 50,
        }}>
        <View
          style={{
            height: '60%',
            paddingBottom: 90,
            position: 'relative',
            flexDirection: 'column',
            // gap: 5,
          }}>
          <View
            style={{
              flexDirection: 'column',
              gap: 5,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}>
              <Text style={{ color: '#fff', fontSize: hp(1.5) }}>
                Wicket-Keeper
              </Text>
            </View>

            {WicketKeepers.map((player, id) => (
              <View
                key={id}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  // paddingBottom: 10,
                  backgroundColor: '#1A1A1A',
                  padding: 8,
                  borderRadius: 2,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '60%',
                  }}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('PlayerInfo');
                      dispatch(getplayerProfileInfo(player));
                    }}
                    style={{
                      width: wp('15%'),
                      display: 'flex',

                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      // backgroundColor:'#f3f',
                    }}>
                    <Image
                      source={{ uri: player.playerImagePath }}
                      style={{
                        height: 45,
                        width: 45,
                        borderRadius: 25,
                        position: 'relative',
                        backgroundColor: '#000',
                        borderColor: '#000',
                        borderWidth: 1,
                      }}
                    />
                  </Pressable>
                  <View style={{ flexDirection: 'row', width: '60%', gap: 6 }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                      <View
                        style={{
                          // width: wp('100%'),
                          justifyContent: 'center',
                          gap: 3,
                        }}>
                        <Text
                          style={{
                            fontSize: hp(1.4),
                            fontWeight: 'bold',
                            color: '#fff',
                            width: '100%',
                            overflow: 'hidden',
                          }}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {player.shortName}
                        </Text>
                        <Text style={{ fontSize: hp(1.4), color: '#fff' }}>
                          {player.points || 0} Points
                        </Text>
                      </View>
                    </View>

                    <View style={{}}>
                      <View
                        style={{
                          backgroundColor: player.teamDto?.teamColor || '#000',
                          borderRadius: 10,
                          top: 10,
                          width: wp('10%'),
                          display: 'flex',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: player.teamDto?.textColor || '#fff',
                            fontSize: hp(1.1),
                          }}>
                          {player.teamDto?.shortName || 'N/A'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '40%',
                    gap: 24,
                    justifyContent: 'center',
                    padding: 2,
                  }}>
                  <View
                    style={{
                      width: '13.5%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Pressable
                      onPress={() => {
                        // console.log('Pressed Player ID:', player.recordId); // Debugging
                        // console.log('Current Captain ID:', Captain); // Debugging

                        if (Captain === player.recordId) {
                          // Deselect the captain
                          handleSelectCaptain(null, '', '');
                        } else {
                          // Select the player as captain
                          handleSelectCaptain(
                            player.recordId,
                            player.playerImagePath,
                            player.teamDto?.shortName || 'N/A',
                          );
                        }
                      }}>
                      {Captain.includes(player.recordId) ? (
                        <View>
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: hp(1.5),
                              backgroundColor: '#32cd32', // Green when included
                              width: 35,
                              height: 35,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              borderRadius: 17.5,
                              paddingVertical: 5,
                            }}>
                            C
                          </Text>
                        </View>
                      ) : (
                        <View>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: hp(1.5),
                              width: 35,
                              height: 35,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              borderRadius: 17.5,
                              paddingVertical: 5,
                              backgroundColor: '#000', // White background when NOT included
                              borderWidth: 1, // Add black border
                              borderColor: '#c0c0c0',
                            }}>
                            C
                          </Text>
                        </View>
                      )}
                    </Pressable>
                  </View>

                  <View
                    style={{
                      width: '13.5%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Pressable
                      onPress={() => {
                        if (ViceCaptain === player.recordId) {
                          // If the player is already the captain, deselect them
                          handleSelectViceCaptain(null, '', '');
                        } else {
                          handleSelectViceCaptain(
                            player.recordId,
                            player.playerImagePath,
                            player.teamDto?.shortName || 'N/A',
                          );
                        }
                      }}>
                      {ViceCaptain.includes(player.recordId) ? (
                        <View>
                          <Text
                            style={{
                              color: '#000',
                              fontWeight: 'bold',
                              fontSize: hp(1.5),
                              backgroundColor: '#fff', // Green when included
                              width: 35,
                              height: 35,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              borderRadius: 17.5,
                              paddingVertical: 5,
                            }}>
                            VC
                          </Text>
                        </View>
                      ) : (
                        <View>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: hp(1.5),
                              width: 35,
                              height: 35,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              borderRadius: 17.5,
                              paddingVertical: 5,
                              backgroundColor: '#000', // White background when NOT included
                              borderWidth: 1, // Add black border
                              borderColor: '#c0c0c0',
                            }}>
                            VC
                          </Text>
                        </View>
                      )}
                    </Pressable>
                  </View>

                  <View
                    style={{
                      width: '13.5%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Pressable
                      onPress={() => {
                        if (impactPlayer === player.recordId) {
                          // If the player is already the captain, deselect them
                          handleSelectImpactPlayer(null, '', '');
                        } else {
                          handleSelectImpactPlayer(
                            player.recordId,
                            player.playerImagePath,
                            player.teamDto?.shortName || 'N/A',
                          );
                        }
                      }}>
                      {impactPlayer.includes(player.recordId) ? (
                        <View
                          style={{
                            backgroundColor: '#3E57C4', // Blue background
                            width: 35,
                            height: 35,
                            borderRadius: 17.5,
                            justifyContent: 'center', // Center vertically
                            alignItems: 'center', // Center horizontally
                          }}>
                          <Image
                            source={require('../../../../../../assets/ImpactPreviewNotSelected.png')}
                            style={{
                              width: 28,
                              height: 25,
                              resizeMode: 'contain', // Ensures image scales properly
                            }}
                          />
                        </View>
                      ) : (
                        <View
                          style={{
                            backgroundColor: '#000', // Blue background
                            width: 35,
                            height: 35,
                            borderRadius: 17.5,
                            justifyContent: 'center', // Center vertically
                            alignItems: 'center', // Center horizontally
                            borderWidth: 1, // Add black border
                            borderColor: '#c0c0c0',
                            borderRadius: 17.5,
                            paddingVertical: 5,
                          }}>
                          <Image
                            source={require('../../../../../../assets/ImpactPreviewNotSelected.png')}
                            style={{
                              width: 28,
                              height: 25,
                              resizeMode: 'contain', // Ensures image scales properly
                              tintColor: '#fff', // Set to black
                            }}
                          />
                        </View>
                      )}
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
          {/* <View
              style={{
                padding: 5,
                flexDirection: 'row',
                width: wp('100%'),
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: '#e3e3e3',
              }}></View> */}
          <View
            style={{
              flexDirection: 'column',
              gap: 5,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: 3,
              }}>
              <Text style={{ color: '#fff', fontSize: hp(1.5) }}>Batter</Text>
            </View>

            {Batsman.map((player, id) => (
              <View
                key={id}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',

                  paddingBottom: 10,
                  backgroundColor: '#1A1A1A',
                  padding: 8,
                  borderRadius: 2,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '60%',
                  }}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('PlayerInfo');
                      dispatch(getplayerProfileInfo(player));
                    }}
                    style={{
                      width: wp('15%'),
                      display: 'flex',

                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={{ uri: player.playerImagePath }}
                      style={{
                        height: 45,
                        width: 45,
                        borderRadius: 25,
                        position: 'relative',
                        backgroundColor: '#000',
                        borderColor: '#000',
                        borderWidth: 1,
                      }}
                    />
                  </Pressable>
                  <View style={{ flexDirection: 'row', width: '60%', gap: 6 }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                      <View
                        style={{
                          // width: wp('100%'),
                          justifyContent: 'center',
                          gap: 3,
                        }}>
                        <Text
                          style={{
                            fontSize: hp(1.4),
                            fontWeight: 'bold',
                            color: '#fff',
                            width: '100%',
                            overflow: 'hidden',
                          }}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {player.shortName}
                        </Text>
                        <Text style={{ fontSize: hp(1.4), color: '#fff' }}>
                          {player.points || 0} Points
                        </Text>
                      </View>
                    </View>

                    <View>
                      <View
                        style={{
                          borderRadius: 10,
                          top: 10,
                          backgroundColor: player.teamDto?.teamColor || '#000',
                          width: wp('10%'),
                          display: 'flex',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: player.teamDto?.textColor || '#fff',
                            fontSize: hp(1.1),
                          }}>
                          {player.teamDto?.shortName || 'N/A'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '40%',
                    gap: 24,
                    justifyContent: 'center',
                    padding: 2,
                  }}>
                  <View
                    style={{
                      width: '13.5%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Pressable
                      onPress={() => {
                        // console.log('Pressed Player ID:', player.recordId); // Debugging
                        // console.log('Current Captain ID:', Captain); // Debugging

                        if (Captain === player.recordId) {
                          handleSelectCaptain(null, '', '');
                        } else {
                          handleSelectCaptain(
                            player.recordId,
                            player.playerImagePath,
                            player.teamDto?.shortName || 'N/A',
                          );
                        }
                      }}>
                      {Captain.includes(player.recordId) ? (
                        <View>
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: hp(1.5),
                              backgroundColor: '#32cd32', // Green when included
                              width: 35,
                              height: 35,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              borderRadius: 17.5,
                              paddingVertical: 5,
                            }}>
                            C
                          </Text>
                        </View>
                      ) : (
                        <View>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: hp(1.5),
                              width: 35,
                              height: 35,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              borderRadius: 17.5,
                              paddingVertical: 5,
                              backgroundColor: '#000', // White background when NOT included
                              borderWidth: 1, // Add black border
                              borderColor: '#c0c0c0',
                            }}>
                            C
                          </Text>
                        </View>
                      )}
                    </Pressable>
                  </View>

                  <View
                    style={{
                      width: '13.5%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Pressable
                      onPress={() => {
                        if (ViceCaptain === player.recordId) {
                          handleSelectViceCaptain(null, '', '');
                        } else {
                          handleSelectViceCaptain(
                            player.recordId,
                            player.playerImagePath,
                            player.teamDto?.shortName || 'N/A',
                          );
                        }
                      }}>
                      {ViceCaptain.includes(player.recordId) ? (
                        <View>
                          <Text
                            style={{
                              color: '#000',
                              fontWeight: 'bold',
                              fontSize: hp(1.5),
                              backgroundColor: '#fff', // Green when included
                              width: 35,
                              height: 35,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              borderRadius: 17.5,
                              paddingVertical: 5,
                            }}>
                            VC
                          </Text>
                        </View>
                      ) : (
                        <View>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: hp(1.5),
                              width: 35,
                              height: 35,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              borderRadius: 17.5,
                              paddingVertical: 5,
                              backgroundColor: '#000', // White background when NOT included
                              borderWidth: 1, // Add black border
                              borderColor: '#c0c0c0',
                            }}>
                            VC
                          </Text>
                        </View>
                      )}
                    </Pressable>
                  </View>

                  <View
                    style={{
                      width: '13.5%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Pressable
                      onPress={() => {
                        if (impactPlayer === player.recordId) {
                          handleSelectImpactPlayer(null, '', '');
                        } else {
                          handleSelectImpactPlayer(
                            player.recordId,
                            player.playerImagePath,
                            player.teamDto?.shortName || 'N/A',
                          );
                        }
                      }}>
                      {impactPlayer.includes(player.recordId) ? (
                        <View
                          style={{
                            backgroundColor: '#3E57C4', // Blue background
                            width: 35,
                            height: 35,
                            borderRadius: 17.5,
                            justifyContent: 'center', // Center vertically
                            alignItems: 'center', // Center horizontally
                          }}>
                          <Image
                            source={require('../../../../../../assets/ImpactPreviewNotSelected.png')}
                            style={{
                              width: 28,
                              height: 25,
                              resizeMode: 'contain', // Ensures image scales properly
                            }}
                          />
                        </View>
                      ) : (
                        <View
                          style={{
                            backgroundColor: '#000', // Blue background
                            width: 35,
                            height: 35,
                            borderRadius: 17.5,
                            justifyContent: 'center', // Center vertically
                            alignItems: 'center', // Center horizontally
                            borderWidth: 1, // Add black border
                            borderColor: '#c0c0c0',
                            borderRadius: 17.5,
                            paddingVertical: 5,
                          }}>
                          <Image
                            source={require('../../../../../../assets/ImpactPreviewNotSelected.png')}
                            style={{
                              width: 28,
                              height: 25,
                              resizeMode: 'contain', // Ensures image scales properly
                              tintColor: '#fff', // Set to black
                            }}
                          />
                        </View>
                      )}
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* <View
              style={{
                padding: 5,
                flexDirection: 'row',
                width: wp('100%'),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#e3e3e3',
              }}></View> */}
          <View
            style={{
              flexDirection: 'column',
              gap: 5,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: 5,
              }}>
              <Text style={{ color: '#fff', fontSize: hp(1.5) }}>
                All-Rounder
              </Text>
            </View>
            {AllRounders.map((player, id) => (
              <View
                key={id}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  backgroundColor: '#1A1A1A',
                  padding: 8,
                  borderRadius: 2,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '60%',
                  }}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('PlayerInfo');
                      dispatch(getplayerProfileInfo(player));
                    }}
                    style={{
                      width: wp('15%'),
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={{ uri: player.playerImagePath }}
                      style={{
                        height: 45,
                        width: 45,
                        borderRadius: 25,
                        position: 'relative',
                        backgroundColor: '#000',
                        borderColor: '#000',
                        borderWidth: 1,
                      }}
                    />
                  </Pressable>
                  <View style={{ flexDirection: 'row', width: '60%', gap: 6 }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                      <View
                        style={{
                          // width: wp('100%'),
                          justifyContent: 'center',
                          gap: 3,
                        }}>
                        <Text
                          style={{
                            fontSize: hp(1.4),
                            fontWeight: 'bold',
                            color: '#fff',
                            overflow: 'hidden',
                          }}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {player.shortName}
                        </Text>
                        <Text style={{ fontSize: hp(1.4), color: '#fff' }}>
                          {player.points || 0} Points
                        </Text>
                      </View>
                    </View>

                    <View style={{}}>
                      <View
                        style={{
                          borderRadius: 10,
                          top: 10,
                          backgroundColor: player.teamDto?.teamColor || '#000',
                          width: wp('10%'),
                          display: 'flex',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        {/* <Text style={{color: '#fff', fontSize: hp(1.5),color:"#000"}}>
                         {item.team_short_form}
                       </Text> */}
                        <Text
                          style={{
                            color: player.teamDto?.textColor || '#fff',
                            fontSize: hp(1.1),
                          }}>
                          {player.teamDto?.shortName || 'N/A'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '40%',
                    gap: 24,
                    justifyContent: 'center',
                    padding: 2,
                  }}>
                  <View
                    style={{
                      width: '13.5%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Pressable
                      onPress={() => {
                        // console.log('Pressed Player ID:', player.recordId); // Debugging
                        // console.log('Current Captain ID:', Captain); // Debugging

                        if (Captain === player.recordId) {
                          handleSelectCaptain(null, '', '');
                        } else {
                          handleSelectCaptain(
                            player.recordId,
                            player.playerImagePath,
                            player.teamDto?.shortName || 'N/A',
                          );
                        }
                      }}>
                      {Captain.includes(player.recordId) ? (
                        <View>
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: hp(1.5),
                              backgroundColor: '#32cd32', // Green when included
                              width: 35,
                              height: 35,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              borderRadius: 17.5,
                              paddingVertical: 5,
                            }}>
                            C
                          </Text>
                        </View>
                      ) : (
                        <View>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: hp(1.5),
                              width: 35,
                              height: 35,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              borderRadius: 17.5,
                              paddingVertical: 5,
                              backgroundColor: '#000', // White background when NOT included
                              borderWidth: 1, // Add black border
                              borderColor: '#c0c0c0',
                            }}>
                            C
                          </Text>
                        </View>
                      )}
                    </Pressable>
                  </View>

                  <View
                    style={{
                      width: '13.5%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Pressable
                      onPress={() => {
                        if (ViceCaptain === player.recordId) {
                          handleSelectViceCaptain(null, '', '');
                        } else {
                          handleSelectViceCaptain(
                            player.recordId,
                            player.playerImagePath,
                            player.teamDto?.shortName || 'N/A',
                          );
                        }
                      }}>
                      {ViceCaptain.includes(player.recordId) ? (
                        <View>
                          <Text
                            style={{
                              color: '#000',
                              fontWeight: 'bold',
                              fontSize: hp(1.5),
                              backgroundColor: '#fff', // Green when included
                              width: 35,
                              height: 35,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              borderRadius: 17.5,
                              paddingVertical: 5,
                            }}>
                            VC
                          </Text>
                        </View>
                      ) : (
                        <View>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: hp(1.5),
                              width: 35,
                              height: 35,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              borderRadius: 17.5,
                              paddingVertical: 5,
                              backgroundColor: '#000', // White background when NOT included
                              borderWidth: 1, // Add black border
                              borderColor: '#c0c0c0',
                            }}>
                            VC
                          </Text>
                        </View>
                      )}
                    </Pressable>
                  </View>

                  <View
                    style={{
                      width: '13.5%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Pressable
                      onPress={() => {
                        if (impactPlayer === player.recordId) {
                          handleSelectImpactPlayer(null, '', '');
                        } else {
                          handleSelectImpactPlayer(
                            player.recordId,
                            player.playerImagePath,
                            player.teamDto?.shortName || 'N/A',
                          );
                        }
                      }}>
                      {impactPlayer.includes(player.recordId) ? (
                        <View
                          style={{
                            backgroundColor: '#3E57C4', // Blue background
                            width: 35,
                            height: 35,
                            borderRadius: 17.5,
                            justifyContent: 'center', // Center vertically
                            alignItems: 'center', // Center horizontally
                          }}>
                          <Image
                            source={require('../../../../../../assets/ImpactPreviewNotSelected.png')}
                            style={{
                              width: 28,
                              height: 25,
                              resizeMode: 'contain', // Ensures image scales properly
                            }}
                          />
                        </View>
                      ) : (
                        <View
                          style={{
                            backgroundColor: '#000', // Blue background
                            width: 35,
                            height: 35,
                            borderRadius: 17.5,
                            justifyContent: 'center', // Center vertically
                            alignItems: 'center', // Center horizontally
                            borderWidth: 1, // Add black border
                            borderColor: '#c0c0c0',
                            borderRadius: 17.5,
                            paddingVertical: 5,
                          }}>
                          <Image
                            source={require('../../../../../../assets/ImpactPreviewNotSelected.png')}
                            style={{
                              width: 28,
                              height: 25,
                              resizeMode: 'contain', // Ensures image scales properly
                              tintColor: '#fff', // Set to black
                            }}
                          />
                        </View>
                      )}
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View
            style={{
              flexDirection: 'column',
              gap: 5,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: 5,
              }}>
              <Text style={{ color: '#fff', fontSize: hp(1.5) }}>Bowler</Text>
            </View>
            {Bowlers.map((player, id) => (
              <View
                key={id}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  backgroundColor: '#1A1A1A',
                  borderRadius: 2,
                  padding: 8,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '60%',
                  }}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('PlayerInfo');
                      dispatch(getplayerProfileInfo(player));
                    }}
                    style={{
                      width: wp('15%'),
                      display: 'flex',

                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={{ uri: player.playerImagePath }}
                      style={{
                        height: 45,
                        width: 45,
                        borderRadius: 25,
                        position: 'relative',
                        backgroundColor: '#000',
                        borderColor: '#000',
                        borderWidth: 1,
                      }}
                    />
                  </Pressable>
                  <View style={{ flexDirection: 'row', width: '60%', gap: 6 }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                      <View
                        style={{
                          // width: wp('100%'),
                          justifyContent: 'center',
                          gap: 3,
                        }}>
                        <Text
                          style={{
                            fontSize: hp(1.4),
                            fontWeight: 'bold',
                            color: '#fff',
                            width: '100%',
                            overflow: 'hidden',
                          }}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {player.shortName}
                        </Text>
                        <Text style={{ fontSize: hp(1.4), color: '#fff' }}>
                          {player.points || 0} Points
                        </Text>
                      </View>
                    </View>

                    <View style={{}}>
                      <View
                        style={{
                          backgroundColor: player.teamDto?.teamColor || '#000',
                          borderRadius: 10,
                          top: 10,
                          width: wp('10%'),
                          display: 'flex',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: player.teamDto?.textColor || '#fff',
                            fontSize: hp(1.1),
                          }}>
                          {player.teamDto?.shortName || 'N/A'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '40%',
                    gap: 24,
                    justifyContent: 'center',
                    padding: 2,
                  }}>
                  <View
                    style={{
                      width: '13.5%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Pressable
                      onPress={() => {
                        // console.log('Pressed Player ID:', player.recordId); // Debugging
                        // console.log('Current Captain ID:', Captain); // Debugging

                        if (Captain === player.recordId) {
                          handleSelectCaptain(null, '', '');
                        } else {
                          handleSelectCaptain(
                            player.recordId,
                            player.playerImagePath,
                            player.teamDto?.shortName || 'N/A',
                          );
                        }
                      }}>
                      {Captain.includes(player.recordId) ? (
                        <View>
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: hp(1.5),
                              backgroundColor: '#32cd32', // Green when included
                              width: 35,
                              height: 35,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              borderRadius: 17.5,
                              paddingVertical: 5,
                            }}>
                            C
                          </Text>
                        </View>
                      ) : (
                        <View>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: hp(1.5),
                              width: 35,
                              height: 35,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              borderRadius: 17.5,
                              paddingVertical: 5,
                              backgroundColor: '#000', // White background when NOT included
                              borderWidth: 1, // Add black border
                              borderColor: '#c0c0c0',
                            }}>
                            C
                          </Text>
                        </View>
                      )}
                    </Pressable>
                  </View>

                  <View
                    style={{
                      width: '13.5%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Pressable
                      onPress={() => {
                        if (ViceCaptain === player.recordId) {
                          handleSelectViceCaptain(null, '', '');
                        } else {
                          handleSelectViceCaptain(
                            player.recordId,
                            player.playerImagePath,
                            player.teamDto?.shortName || 'N/A',
                          );
                        }
                      }}>
                      {ViceCaptain.includes(player.recordId) ? (
                        <View>
                          <Text
                            style={{
                              color: '#000',
                              fontWeight: 'bold',
                              fontSize: hp(1.5),
                              backgroundColor: '#fff', // Green when included
                              width: 35,
                              height: 35,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              borderRadius: 17.5,
                              paddingVertical: 5,
                            }}>
                            VC
                          </Text>
                        </View>
                      ) : (
                        <View>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: hp(1.5),
                              width: 35,
                              height: 35,
                              textAlign: 'center',
                              textAlignVertical: 'center',
                              borderRadius: 17.5,
                              paddingVertical: 5,
                              backgroundColor: '#000', // White background when NOT included
                              borderWidth: 1, // Add black border
                              borderColor: '#c0c0c0',
                            }}>
                            VC
                          </Text>
                        </View>
                      )}
                    </Pressable>
                  </View>

                  <View
                    style={{
                      width: '13.5%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Pressable
                      onPress={() => {
                        if (impactPlayer === player.recordId) {
                          handleSelectImpactPlayer(null, '', '');
                        } else {
                          handleSelectImpactPlayer(
                            player.recordId,
                            player.playerImagePath,
                            player.teamDto?.shortName || 'N/A',
                          );
                        }
                      }}>
                      {impactPlayer.includes(player.recordId) ? (
                        <View
                          style={{
                            backgroundColor: '#3E57C4', // Blue background
                            width: 35,
                            height: 35,
                            borderRadius: 17.5,
                            justifyContent: 'center', // Center vertically
                            alignItems: 'center', // Center horizontally
                          }}>
                          <Image
                            source={require('../../../../../../assets/ImpactPreviewNotSelected.png')}
                            style={{
                              width: 28,
                              height: 25,
                              resizeMode: 'contain', // Ensures image scales properly
                            }}
                          />
                        </View>
                      ) : (
                        <View
                          style={{
                            backgroundColor: '#000', // Blue background
                            width: 35,
                            height: 35,
                            borderRadius: 17.5,
                            justifyContent: 'center', // Center vertically
                            alignItems: 'center', // Center horizontally
                            borderWidth: 1, // Add black border
                            borderColor: '#c0c0c0',
                            borderRadius: 17.5,
                            paddingVertical: 5,
                          }}>
                          <Image
                            source={require('../../../../../../assets/ImpactPreviewNotSelected.png')}
                            style={{
                              width: 28,
                              height: 25,
                              resizeMode: 'contain', // Ensures image scales properly
                              tintColor: '#fff', // Set to black
                            }}
                          />
                        </View>
                      )}
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      {/* </View> */}

      <View
        style={{
          width: wp('100%'),
          position: 'absolute',
          bottom: hp('2%'),
          alignSelf: 'center',
          paddingHorizontal: wp('4%'),
          paddingBottom: hp('1%'),
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => setIsTeamPreviewVisible(true)}
            style={{
              backgroundColor: '#000',
              width: wp('45%'),
              height: hp('5%'),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              // paddingVertical: hp('1%'),
              // shadowColor: '#000',
              // shadowOffset: {width: 0, height: 2},
              // shadowOpacity: 0.3,
              // shadowRadius: 4,
              // elevation: 5,
              gap: wp('2%'),
              borderWidth: 0.9,
              borderColor: '#fff',
            }}>
            <AntDesign name="eyeo" size={hp('2.5%')} color="#fff" />
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: hp('1.8%'),
              }}>
              PREVIEW
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              if (
                Captain.length > 0 &&
                ViceCaptain.length > 0 &&
                impactPlayer.length > 0
              ) {
                save();
              }
            }}
            disabled={
              Captain.length === 0 ||
              ViceCaptain.length === 0 ||
              impactPlayer.length === 0
            }
            style={{
              width: wp('45%'),
              height: hp('5%'),
              borderRadius: wp('1%'),
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <LinearGradient
              colors={
                Captain.length > 0 &&
                  ViceCaptain.length > 0 &&
                  impactPlayer.length > 0
                  ? ['#fff', '#fff'] : ['#8c8c8c', '#8c8c8c']
              }
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: wp('2%'),
              }}>
              <Text
                style={{
                  color:
                    Captain.length > 0 &&
                      ViceCaptain.length > 0 &&
                      impactPlayer.length > 0
                      ? "#000" : "#fff"
                  ,
                  fontWeight: 'bold',
                  fontSize: hp('1.8%'),
                }}>
                SAVE
              </Text>
              <MaterialCommunityIcons
                name="check-all"
                size={hp('2.8%')}
                color={Captain.length > 0 &&
                  ViceCaptain.length > 0 &&
                  impactPlayer.length > 0
                  ? "#000" : "#fff"}
              />
            </LinearGradient>
          </Pressable>
        </View>
      </View>
      <TimeExpiredPopup
        visible={Popup}
        reset={reset}
        onClose={() => setPopup(false)}
        onDiscard={() => {

          setPopup(false);
          setReset(false);
        }}
      />
    </SafeAreaView>
  );
};

export default CVCSelection;

const styles = StyleSheet.create({});
