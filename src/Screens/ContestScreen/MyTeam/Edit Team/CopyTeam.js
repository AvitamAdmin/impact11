import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  BackHandler,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetFinalPlayerSelected,
  setfinalPlayerSelected,
  setplayerId,
  setPlayerRole,
  setselectedPlayerTeamId,
} from '../../../../Redux/Slice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { api } from '../../../../envfile/api';
import TeamPreview from './EditTeamPreview';
import TopEditScreen from './TopEditScreen';
import DiscardPopup from '../../../../Models/DiscardPopup';
import { TouchableOpacity } from 'react-native';
import HowToPlayPopup from '../../../../Models/HowToPlayPopup';
import TimeExpiredPopup from '../../../../Models/TimeExpiredPopup';
// import Svg, { Polygon } from 'react-native-svg';
import EditTeampreview from '../../../../Models/EditTeampreview';

const CopyTeam = ({ route }) => {
  const { TeamRecordId, editMatchId } = route.params;
  // console.log('edit team teamRecordId received:', TeamRecordId);
  const [EditPlayers, setEditPlayers] = useState();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const MatchId = useSelector(state => state.fantasy.matchId);
  const venue = useSelector(state => state.fantasy.venue);
  const [isTeamPreviewVisible, setIsTeamPreviewVisible] = useState(false);

  const totalDots = 12;

  // const playercount = useSelector(
  //   state => state.fantasy.finalPlayerSelected.length,
  // );

  const DateAndTime = useSelector(state => state.fantasy.DateAndTime[0]);

  const team1count = useSelector(state => state.fantasy.selectedTeam1.length);
  const team2count = useSelector(state => state.fantasy.selectedTeam2.length);
  const playercount = useSelector(
    state => state.fantasy.EditFinalPlayerSelected.length,
  );

  const team1ShortName = useSelector(state => state.fantasy.team1ShortName);
  const team2ShortName = useSelector(state => state.fantasy.team2ShortName);

  const [Team1Image, setTeam1Image] = useState();
  const [Team2Image, setTeam2Image] = useState();
  const [timeLeft, setTimeLeft] = useState('');
  const [reset, setReset] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [Popup, setPopup] = useState(false)

  const handleResetSelection = () => {
    dispatch(resetFinalPlayerSelected());
  };

  const handleNext = () => {
    if (playercount == 12) {
      navigation.navigate('CopyCVCSelection');
    }
  };

  
  const closeTeamPreview = () => {
    setIsTeamPreviewVisible(false);

  };

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

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (token) {
          // await fetchTeam(token);
          // console.log('b4 calling teamRecordId', TeamRecordId);
          // await fetchEditTeam(token, TeamRecordId);
          await fetchMatch(token);
        } else {
          console.error('token not found');
        }
      } catch (error) {
        setError('Unexpected error occurred.');
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (isModalVisible) {
        setIsModalVisible(false); // Close the discard changes modal if it's open
        return true; // Prevent default back behavior
      }

      if (playercount > 0) {
        setIsModalVisible(true); // Show the discard changes modal if players are selected
        return true; // Prevent default back behavior
      }

      navigation.goBack(); // Navigate back if no players are selected
      return true; // Prevent default back behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Cleanup on unmount
  }, [isModalVisible, playercount, navigation]);

  // const fetchEditTeam = async(token,TeamRecordId)=>{
  //   // console.log("Entered edit Team");
  //   // console.log("edit team teamRecordId:",TeamRecordId);

  //   try {
  //     const body = {
  //       userTeamsDtoList:[{
  //         recordId : TeamRecordId
  //       }]
  //     }
  //     const headers = {Authorization: `Bearer ${token}`};
  //     const response = await axios.post(`${api}/admin/userTeams/getedit`, body, {
  //       headers,
  //     });
  //     console.log("ToEdit:",response.data.userTeamsDtoList[0].players.map(item=>item.playerId))

  //     const playersToedit =response.data.userTeamsDtoList[0].players.map(item=>item.playerId)
  //     setEditPlayers(playersToedit);
  //     fetchPlayerLineUp(token,playersToedit);

  //   } catch (error) {
  //     console.error("Error fetching edit Team:",error)
  //   }
  // }

  const fetchMatch = async token => {
    // console.log("Entered MatchId Team");
    // console.log("edit team MatchId:",editMatchId);

    try {
      const body = {
        recordId: editMatchId,
      };
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(
        `${api}/admin/matches/getMatchId`,
        body,
        {
          headers,
        },
      );
      // console.log("match details:",response.data.team1Dto.logoPath);
      setTeam1Image(response.data.team1Dto.logoPath);
      setTeam2Image(response.data.team2Dto.logoPath);
    } catch (error) {
      console.error('Error fetching match details:', error);
    }
  };

  const { width: screenWidth } = Dimensions.get('window');

  const CLOSE_BUTTON_WIDTH = 1;
  const TOTAL_MARGIN = 8 * totalDots; // 1px left & right margin per bar

  const DOT_WIDTH = Math.floor((screenWidth - CLOSE_BUTTON_WIDTH - TOTAL_MARGIN - 1) / totalDots); // 20px padding

  const ParallelogramProgressBar = () => {
    const totalDots = 12;
    // const playercount = 8;

    // const Parallelogram = ({ filled }) => (
    //   // <View style={{ width: 90, height: 12 }}>
    //   <Svg width={DOT_WIDTH} height={12}>
    //     <Polygon
    //       points={`2,0 ${DOT_WIDTH},0 ${DOT_WIDTH - 2},11 0,11`}
    //       fill={filled ? '#00FF66' : '#e3e3e3'}
    //       stroke="#111"
    //       strokeWidth="1"
    //     />
    //   </Svg>
    //   // </View>
    // );

    return (
      <View style={styles.container}>
        <View style={styles.barContainer}>
          {[...Array(totalDots)].map((_, index) => (
            <View key={index} style={styles.parallelogramWrapper}>
              {/* <Parallelogram filled={index < playercount} /> */}
            </View>
          ))}
        </View>
      </View>
    );
  };



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <LinearGradient
          style={{
            height: hp(9),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: wp('100%'),
          }}
          colors={['#000', '#000']}>
            <EditTeampreview
                        visible={isTeamPreviewVisible}
                        onClose={closeTeamPreview}
                      />
          <View
            style={{
              width: wp('95%'),
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => {
                  if (playercount === 0) {
                    navigation.goBack();
                  } else {
                    setIsModalVisible(true);
                  }
                }}>
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={22}
                  color="#fff"
                />
              </Pressable>
              <DiscardPopup
                visible={isModalVisible}
                reset={reset}
                onClose={() => setIsModalVisible(false)}
                onDiscard={() => {
                  console.log('Changes Discarded!');
                  setIsModalVisible(false);
                  setReset(false);
                }}
              />
              <View style={{ flexDirection: 'column' }}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: hp(1.9),
                  }}>
                  Copy Team
                </Text>
                <Text style={{ color: '#fff', fontSize: hp(1.4) }}>
                  {timeLeft}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                gap: 20,
                justifyContent: 'center',
                alignItems: 'center',
                width: '25%',
              }}>
              <View>
                <TouchableOpacity onPress={() => setIsPopupVisible(true)}>
                  <AntDesign name="questioncircleo" size={24} color="#fff" />
                </TouchableOpacity>

                {/* HowToPlayPopup Component */}
                <HowToPlayPopup
                  visible={isPopupVisible}
                  onClose={() => setIsPopupVisible(false)}
                />
              </View>

              {/* FantacyPointsSystems pts  */}
              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('FantacyPointsSystems')}>
                  <Image
                    source={require('../../../../../assets/ptsImg.png')}
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
      <View>
        <LinearGradient colors={['#000', '#000', '#000']}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 5,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                padding: 10,
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    // borderRadius: 30,
                    // borderWidth: 1,
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#c0c0c0',
                  }}>
                  {
                    <Image
                      source={
                        Team1Image
                          ? { uri: Team1Image }
                          : require('../../../../../assets/user-profile.png')
                      }
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: 30,
                        borderColor: '#c0c0c0',
                      }}
                    />
                  }
                </View>
                <View style={{ flexDirection: 'column', gap: 1 }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 5,
                      backgroundColor: '#000',
                      padding: 4,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: hp(1.5),
                      }}>
                      {team1ShortName}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 4,
                    borderRadius: 5,
                    borderWidth: 1,
                    backgroundColor: '#fff',
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: 'bold',
                      fontSize: hp(1.5),
                    }}>
                    {team1count}
                  </Text>
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 4,
                    borderRadius: 5,
                    borderWidth: 1,
                    backgroundColor: '#FF5656',
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: hp(1.5),
                    }}>
                    {team2count}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{ flexDirection: 'column', gap: 1 }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 5,
                      // backgroundColor: '#E8E659',
                      padding: 4,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: hp(1.5),
                      }}>
                      {team2ShortName}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    // borderRadius: 30,
                    // borderWidth: 1,
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#c0c0c0',
                  }}>
                  <Image
                    source={
                      Team2Image
                        ? { uri: Team2Image }
                        : require('../../../../../assets/user-profile.png')
                    }
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 30,
                      borderColor: '#c0c0c0',
                    }}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}>
              <View>
                <Text style={{ fontSize: hp(1.5), color: '#fff' }}>
                  Maximum 7 Players for one team
                </Text>
              </View>
              <View
                style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    gap: 3,
                  }}>
                  <View style={styles.container}>
                    <View style={styles.innerRow}>
                      <ParallelogramProgressBar />
                      {/* <Pressable onPress={handleResetSelection} style={styles.closeButton}> */}
                      {/* <Icon name="close" size={14} color="#fff" /> */}
                      {/* </Pressable> */}
                    </View>
                  </View>

                  <View>
                    <Pressable
                      onPress={handleResetSelection}
                      style={{
                        borderWidth: 1,
                        borderColor: '#FF5656',
                        borderRadius: 4,
                        backgroundColor: '#FF5656',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 7,
                      }}>
                      <Icon name="close" size={14} color="#ffff" />
                    </Pressable>
                  </View>
                </View>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: wp('100%'),
                  // marginTop: 5,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: wp('100%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <MaterialCommunityIcons
                      name="map-marker-outline"
                      size={20}
                      color="white"
                    />
                  </View>
                  <View
                    style={
                      {
                        //padding:5
                      }
                    }>
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: hp(1.5),
                        color: '#fff',
                      }}>
                      {venue}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={{ flex: 1 }}>
        <TopEditScreen TeamRecordId={TeamRecordId} />
      </View>

      <View
        style={{
          width: wp('100%'),
          position: 'absolute',
          bottom: hp('2%'),
          alignSelf: 'center',
          paddingHorizontal: wp('4%'),
          paddingBottom: hp('1%'),
        }}>
        {/* Bottom Buttons Container */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* Preview Button */}
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

          {/* Next Button with Gradient */}
          <LinearGradient
            colors={
              playercount === 12 ? ['#fff', '#fff'] : ['#8c8c8c', '#8c8c8c']
            }
            style={{
              width: wp('45%'),
              height: hp('5%'), // Match preview button height
              borderRadius: wp('1%'),
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <Pressable
              onPress={handleNext}
              disabled={playercount !== 12}
              style={{
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: playercount === 12 ? 1 : 0.7,
                gap: wp('2%'),
                borderWidth: 0.2,
                borderColor: '#e6e6e6',
                borderRadius: 2,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: hp('1.8%'),
                }}>
                NEXT
              </Text>
              <MaterialCommunityIcons
                name="step-forward"
                size={hp('2.8%')}
                color="#000"
              />
            </Pressable>
          </LinearGradient>
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

export default CopyTeam;

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // paddingTop: 100,
    alignItems: 'center',
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 6,
  },
  barContainer: {
    flexDirection: 'row',
  },
  parallelogramWrapper: {
    marginHorizontal: 1,
  },
  closeButton: {
    borderWidth: 1,
    borderColor: '#FF5656',
    borderRadius: 4,
    backgroundColor: '#FF5656',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    height: 22,
  },
});
