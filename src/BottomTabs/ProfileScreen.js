import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSport } from '../SportContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { api } from '../envfile/api';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  setDateAndTime,
  setMatchesTeam1Id,
  setMatchesTeam2Id,
  setmatchId,
  setMatchShortName,
  setteam1ShortName,
  setteam2ShortName,
  setTournamentId,
} from '../Redux/Slice';
import { useDispatch } from 'react-redux';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState();
  const [profileimg, setProfileimg] = useState('');
  const [userDetails, setuserDetails] = useState([]);
  const [userPlayed, setuserPlayed] = useState([]);

  const [careerStats, setCareerStats] = useState({});
  const { setTabName, TabName } = useSport();
  const [recentlyPlayedMatch, setRecentlyPlayedMatch] = useState(null); // ← NEW

  useEffect(() => {
    const backAction = () => {
      if (TabName !== 'home') {
        navigation.navigate('Home');
        setTabName('home');
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [TabName]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setProfileimg(result);

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const { Tier, setTier } = useSport();
  const { ImpactScore } = useSport();

  useEffect(() => {
    if (ImpactScore >= 0 && ImpactScore <= 200) {
      setTier('BRONZE');
    } else if (ImpactScore >= 201 && ImpactScore <= 300) {
      setTier('SILVER');
    } else if (ImpactScore >= 301 && ImpactScore <= 400) {
      setTier('GOLD');
    } else if (ImpactScore >= 401 && ImpactScore <= 500) {
      setTier('DIAMOND');
    } else if (ImpactScore >= 501 && ImpactScore <= 800) {
      setTier('THE STAR');
    } else if (ImpactScore >= 801 && ImpactScore <= 1000) {
      setTier('LEGEND');
    }
  }, [ImpactScore]);

  useFocusEffect(
    useCallback(() => {
      getReferalCodeData();
    }, []),
  );
  const getReferalCodeData = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const userId = await AsyncStorage.getItem('userId');
      const profImage = await AsyncStorage.getItem('profileImage');
      // console.log("profileImage",profImage);
      
      setProfileimg(profImage)
      if (!token || !userId) {
        console.log('Token or UserId missing');
        return;
      }

      const body = { recordId: userId };
      const body1 = { userId: userId };
      const headers = { Authorization: `Bearer ${token}` };

      const [userDetails, userPlayed] = await Promise.all([
        axios.post(`${api}/admin/user/getUserById`, body, { headers }),
        axios.post(`${api}/admin/matches/getUserMatches`, body1, { headers }),
      ]);

      if (userDetails.data?.userDtoList?.length > 0) {
        setuserDetails(userDetails.data.userDtoList[0]);
      }

      if (userPlayed.data?.matchesDtoList && userPlayed.data?.userDto) {
        // Sort matches by matchTime in descending order
        const sortedMatches = userPlayed.data.matchesDtoList.sort((a, b) => {
          const dateA = new Date(a.matchTime);
          const dateB = new Date(b.matchTime);
          return dateB - dateA; // descending
        });

        setuserPlayed(sortedMatches);
        setCareerStats(userPlayed.data.userDto);
      }
    } catch (error) {
      console.log(
        'API Error:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  const StatBox = ({ icon, value, label }) => (
    <View style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#EFEFEF',
      borderRadius: 8,
      backgroundColor: '#fff',
      elevation: 5,
      height: hp(13),
      justifyContent: 'space-evenly',
      padding: 10
    }}>
      <Image source={icon} style={{ width: 50, height: 40 }} />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>{value}</Text>
        <Text style={{ color: '#999', fontSize: 15 }}>{label}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: '#fff' }}>

        <LinearGradient
         colors={['#000', '#192451', '#243373', '#3b53bd']}
          style={{
            paddingBottom: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,

          }}>
          {/* Image */}
          <View
            style={{
              // padding: 10,
              width: "100%",
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              // paddingVertical: 10,
              paddingHorizontal: 15,
              // gap: 10,
              // backgroundColor: '#f5f',
            }}>
            <View
              style={{
                width: '80%',
                alignItems: 'center',
                justifyContent: 'flex-start',
                // backgroundColor: '#129',
                // paddingLeft: 10,
                height: wp('30%'),
                flexDirection: 'row',
                gap: 10,
                // justifyContent: 'space-around',
              }}>
              <Pressable
                onPress={() =>
                  navigation.navigate('UserProfileScreen', {
                    profileImage: userDetails.profileImage,
                  })
                }
              //   style=
              // {{backgroundColor:"#f5f"}}
                >
                {/* <Image
                  source={
                    userDetails.profileImage
                      ? {
                        uri: `data:image/jpeg;base64,${userDetails.profileImage.data ??
                          userDetails.profileImage
                          }`,
                      }
                      : require('../../assets/ProfileImpact.jpg')
                  }
                  style={{
                    width: wp(20),
                    height: wp(20),
                    borderWidth: 2,
                    // borderColor: '#FFFFFF',
                    borderRadius: 50,
                    overflow: 'hidden',
                  }}
                /> */}
                 <Image
                  source={
                 { uri: `data:image/jpeg;base64,${profileimg}`}
                  }
                  style={{
                    width: wp(20),
                    height: wp(20),
                    borderWidth: 2,
                    // borderColor: '#FFFFFF',
                    borderRadius: 50,
                    overflow: 'hidden',
                  }}
                />
              </Pressable>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  // width: wp('70%'),
                  gap: 5,
                  // backgroundColor: '#fff',
                  paddingLeft: 10,
                }}>
                <View style={{ width: '100%' }}>
                  <Text
                    style={{
                      fontSize: hp(2.2),
                      fontWeight: 'bold',
                      color: '#fff',
                    }}>
                    {userDetails.username}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                  }}>
                  <Text style={{ fontSize: hp(1.7), color: '#999' }}>
                    {userDetails.name}
                  </Text>
                </View>
              </View>
            </View>


            <View style={{ alignItems: 'center', justifyContent: 'center', width: '20%' }}>
              <Pressable style={{ backgroundColor: '#495279', borderRadius: 10, padding: 8 }} onPress={() => navigation.navigate('MyinfoAndSettings')}>
                <MaterialCommunityIcons
                  name="pencil"
                  size={20}
                  color="#fff"
                />
              </Pressable>
            </View>
          </View>

          {/* Impact score */}
          <View
            style={{
              width: wp('100%'),
              display: 'flex',
              flexDirection: 'row',
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
              // height: hp('20%'),
            }}>
            <View
              style={{
                // width: wp('90%'),
                borderColor: '#FFFFFF',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
                // gap:10,
                borderRadius: 8,
                padding: 5,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20%',
                }}>
                <Image
                  source={require('../../assets/ScoreLogo.png')}
                  style={{ width: 45, height: 35, borderWidth: 2 }}
                  resizeMode="cover"
                />
              </View>

              <View
                style={{
                  width: wp('70%'),
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 5,
                  padding: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: wp('65%'),
                    display: 'flex',
                    // gap: 5,
                    // backgroundColor:"#f4f"
                  }}>
                  <Text
                    style={{
                      fontSize: hp(1.5),
                      fontWeight: 'bold',
                      color: '#000',
                    }}>
                    Impact Score
                  </Text>
                  <View
                    style={{
                      width: wp('20%'),
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: hp(2.2),
                        fontWeight: 'bold',
                        color: '#000',
                      }}>
                      {careerStats.filledPoints || 0}
                    </Text>
                  </View>
                </View>
                {/* </View> */}

                {/* line */}
                <View
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <Progress.Bar
                    progress={careerStats.totalImpactScore}
                    // progress={0.8}
                    width={wp('65%')}
                    height={4}
                    borderWidth={0.2}
                    backgroundColor="#ababab"
                    color="#3E57C4"
                  />
                </View>
                {/* text */}
                <View
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    width: '100%',
                    // backgroundColor: '#f5f',
                    // paddingVertical: 5,
                    paddingHorizontal: 5,
                  }}>
                  <Text style={{ color: '#00000099', fontSize: hp(1.1) }}>
                    Impact score is calculated based on your performance
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Career stats */}
        {careerStats && (
          <View style={{ width: '100%', padding: 10, alignItems: 'center' }}>
            <View style={{ width: '100%', paddingVertical: 10 }}>
              <View style={{ width: '100%', alignItems: 'flex-start' }}>
                <Text style={{ fontWeight: 'bold', fontSize: hp(1.9), color: '#000' }}>
                  Career Stats
                </Text>
              </View>

              <View style={{ width: '100%', alignItems: 'center' }}>
                {/* Row 1 */}
                <View style={{ flexDirection: 'row', gap: 10, padding: 10, width: '100%' }}>
                  <StatBox
                    icon={require('../../assets/Arena.png')}
                    value={careerStats.matches}
                    label="Matches"
                  />
                  <StatBox
                    icon={require('../../assets/Contest.png')}
                    value={careerStats.contests}
                    label="Contest"
                  />
                </View>

                {/* Row 2 */}
                <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 10, width: '100%' }}>
                  <StatBox
                    icon={require('../../assets/ContestWon.png')}
                    value={careerStats.contestWon || 0}
                    label="Contest Won"
                  />
                  <StatBox
                    icon={require('../../assets/Win.png')}
                    value={`${careerStats.winRate}%`}
                    label="Win Rate"
                  />
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Recently played */}
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            width: wp('100%'),
            alignItems: 'center',
            height: hp(40),
            // paddingVertical: 15,
            gap: 15,
            // backgroundColor:"#f5f",

          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: wp('100%'),
              paddingHorizontal: 15,
            }}>
            <Text
              style={{ fontWeight: 'bold', fontSize: hp(1.8), color: '#000' }}>
              Recently Played
            </Text>
            <View>
              <Pressable
                onPress={() => navigation.navigate('Recently Played')}
                style={{
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                }}>
                <Text
                  style={{
                    fontSize: hp(1.5),
                    color: '#000',
                    // textDecorationLine: 'underline',
                    fontWeight: '600',
                  }}>
                  View All
                </Text>
              </Pressable>
            </View>
          </View>

          {/* completed matches */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                paddingBottom: 20,
              }}>
              {userPlayed.slice(-2).map((item, index) => {
                const cardWidth = userPlayed.length > 1 ? wp('90%') : wp('95%');

                const team1Data = {
                  shortName: item.team1Dto?.shortName || 'Unknown',
                  logoPath: item.team1Dto?.logoPath,
                  identifier: item.team1Dto?.identifier || 'Team 1'
                };
                const team2Data = {
                  shortName: item.team2Dto?.shortName || 'Unknown',
                  logoPath: item.team2Dto?.logoPath,
                  identifier: item.team2Dto?.identifier || 'Team 2'
                };

                return (
                  <View
                    key={index}
                    style={{
                      gap: 10,
                    }}>
                    <View
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Pressable
                        onPress={() => {
                          dispatch(setTournamentId(item.tournamentId));
                          dispatch(setMatchShortName(item.identifier));
                          dispatch(setMatchesTeam1Id(item.team1Id));
                          dispatch(setMatchesTeam2Id(item.team2Id));
                          dispatch(setmatchId(item.recordId));
                          dispatch(setteam1ShortName(team1Data.shortName));
                          dispatch(setteam2ShortName(team2Data.shortName));
                          dispatch(setDateAndTime(item.matchTime));

                          if (item.eventStatus === 'Live') {
                            navigation.navigate('CricketLive', {
                              matchId: item.recordId,
                            });
                          } else if (item.eventStatus === 'Completed') {
                            navigation.navigate('CricketCompleted', {
                              matchId: item.recordId,
                            });
                          } else {
                            handleMatchNavigate(item.recordId);
                          }
                        }}
                        style={{
                          borderRadius: 8,
                          overflow: 'hidden',
                          width: cardWidth,
                          backgroundColor: '#fff',
                          flexDirection: 'column',
                          borderWidth: 0.9,
                          borderColor: '#cccccc',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          ...Platform.select({
                            ios: {
                              shadowColor: 'red',
                              shadowOpacity: 0.8,
                              shadowOffset: { width: 20, height: 10 },
                            },
                          }),
                        }}>
                        {(item?.amountWon || 0) > 0 ? (
                          <LinearGradient
                            colors={[
                              '#fff',
                              '#fff',
                              '#fff',
                              '#fff',
                              '#fff',
                              '#fff',
                              '#d4f8d4',
                            ]}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                              }}>
                              {/* Match Details */}
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  width: '100%',
                                }}>
                                <View
                                  style={{
                                    width: wp('60%'),
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderBottomRightRadius: 50,
                                    position: 'relative',
                                    paddingHorizontal: 8,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: hp(1.4),
                                      padding: 10,
                                      color: '#000',
                                      fontWeight: 'bold',
                                      width: '80%',
                                      justifyContent: 'flex-end',
                                      alignItems: 'flex-end',
                                    }}>
                                    {item.matchTime
                                      ? new Date(item.matchTime).toLocaleDateString()
                                      : 'Date not available'}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    backgroundColor: '#595959',
                                    borderRadius: 10,
                                    padding: 2,
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    marginRight: 10,
                                    paddingHorizontal: 10,
                                  }}>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      color: '#fff',
                                      fontSize: hp(1.2),
                                    }}>
                                    {item.sportType || 'Cricket'}
                                  </Text>
                                </View>
                              </View>

                              <View>
                                <View
                                  style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <View
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      width: '22%',
                                    }}>
                                    <View style={{ padding: 2 }}>
                                      {team1Data.logoPath ? (
                                        <Image
                                          source={{
                                            uri: team1Data.logoPath,
                                            cache: 'force-cache',
                                          }}
                                          style={{
                                            width: 60,
                                            height: 60,
                                          }}
                                        />
                                      ) : (
                                        <View
                                          style={{
                                            width: 40,
                                            height: 40,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                          }}>
                                          <Text style={{ fontSize: hp(1.5) }}>No Logo</Text>
                                        </View>
                                      )}
                                    </View>
                                  </View>

                                  <View
                                    style={{
                                      width: '50%',
                                      flexDirection: 'column',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 10,
                                        width: '100%',
                                      }}>
                                      <View
                                        style={{
                                          width: '30%',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          display: 'flex',
                                        }}>
                                        <View>
                                          <Text
                                            style={{
                                              fontWeight: 'bold',
                                              fontFamily: 'Roboto-Bold',
                                              color: '#000',
                                              fontStyle: 'italic',
                                              fontSize: hp(2),
                                            }}>
                                            {team1Data.shortName}
                                          </Text>
                                        </View>
                                      </View>

                                      <View>
                                        <Text
                                          style={{
                                            color: '#fff',
                                            fontWeight: 'bold',
                                            fontSize: hp(1.5),
                                            backgroundColor: '#dfe1ec',
                                            width: 25,
                                            height: 25,
                                            textAlign: 'center',
                                            textAlignVertical: 'center',
                                            borderRadius: 17.5,
                                          }}>
                                          VS
                                        </Text>
                                      </View>

                                      <View
                                        style={{
                                          width: '25%',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          display: 'flex',
                                        }}>
                                        <View>
                                          <Text
                                            style={{
                                              fontWeight: 'bold',
                                              fontFamily: 'Roboto-Bold',
                                              color: '#000',
                                              fontStyle: 'italic',
                                              fontSize: hp(2),
                                            }}>
                                            {team2Data.shortName}
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                      }}>
                                      <View
                                        style={{
                                          width: '40%',
                                          justifyContent: 'flex-end',
                                          alignItems: 'flex-end',
                                          display: 'flex',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 10,
                                            color: '#000',
                                          }}
                                          numberOfLines={1}>
                                          {team1Data.identifier}
                                        </Text>
                                      </View>

                                      <View
                                        style={{
                                          width: '40%',
                                          justifyContent: 'flex-start',
                                          alignItems: 'flex-start',
                                          display: 'flex',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 10,
                                            color: '#000',
                                            textAlign: 'center',
                                          }}
                                          numberOfLines={1}>
                                          {team2Data.identifier}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                  <View
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      width: '25%',
                                    }}>
                                    <View style={{ padding: 2 }}>
                                      {team2Data.logoPath ? (
                                        <Image
                                          source={{
                                            uri: team2Data.logoPath,
                                            cache: 'force-cache',
                                          }}
                                          style={{
                                            width: 60,
                                            height: 60,
                                          }}
                                        />
                                      ) : (
                                        <View
                                          style={{
                                            width: 40,
                                            height: 40,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                          }}>
                                          <Text style={{ fontSize: hp(1.5) }}>No Logo</Text>
                                        </View>
                                      )}
                                    </View>
                                  </View>
                                </View>
                              </View>

                              {/* Status Section */}
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  width: '100%',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <View
                                  style={{
                                    padding: 5,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: hp(1.5),
                                      color: item.eventStatus === 'Completed' ? '#35b267' : 'red',
                                      textAlign: 'center',
                                      fontWeight: 'bold',
                                    }}>
                                    {item.eventStatus || 'Completed'}
                                  </Text>
                                </View>

                              </View>

                              <View
                                style={{
                                  padding: 5,
                                  width: '95%',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  borderColor: '#cccccc',
                                  paddingLeft: 10,
                                }}>
                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 7,
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      borderRadius: 15,
                                      color: '#000',
                                      padding: 1,
                                      fontSize: hp(1.2),
                                    }}>
                                    {item.teamCount || 0} Teams created
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 5,
                                  }}>
                                  <Image
                                    source={require('../../assets/YouWon.png')}
                                    style={{
                                      width: 20,
                                      height: 20,
                                      resizeMode: 'contain',
                                    }}
                                  />
                                  <Text
                                    style={{
                                      fontWeight: '600',
                                      fontSize: hp(1.3),
                                      color: '#35b267',
                                    }}>
                                    You won: ₹{item.amountWon || 0}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </LinearGradient>
                        ) : (
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              width: '100%',
                            }}>
                            {/* Match Details */}
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                              }}>
                              <View
                                style={{
                                  width: wp('60%'),
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  borderBottomRightRadius: 50,
                                  position: 'relative',
                                  paddingHorizontal: 8,
                                }}>
                                <Text
                                  style={{
                                    fontSize: hp(1.4),
                                    padding: 10,
                                    color: '#000',
                                    fontWeight: 'bold',
                                    width: '80%',
                                    justifyContent: 'flex-end',
                                    alignItems: 'flex-end',
                                  }}>
                                  {item.matchTime
                                    ? new Date(item.matchTime).toLocaleDateString()
                                    : 'Date not available'}
                                </Text>
                              </View>
                              <View
                                style={{
                                  backgroundColor: '#595959',
                                  borderRadius: 10,
                                  padding: 2,
                                  justifyContent: 'flex-end',
                                  alignItems: 'center',
                                  marginRight: 10,
                                  paddingHorizontal: 10,
                                }}>
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    fontSize: hp(1.2),
                                  }}>
                                  {item.sportType || 'Cricket'}
                                </Text>
                              </View>
                            </View>

                            <View>
                              <View
                                style={{
                                  width: '100%',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '22%',
                                  }}>
                                  <View style={{ padding: 2 }}>
                                    {team1Data.logoPath ? (
                                      <Image
                                        source={{
                                          uri: team1Data.logoPath,
                                          cache: 'force-cache',
                                        }}
                                        style={{
                                          width: 60,
                                          height: 60,
                                        }}
                                      />
                                    ) : (
                                      <View
                                        style={{
                                          width: 40,
                                          height: 40,
                                          display: 'flex',
                                          flexDirection: 'row',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                        }}>
                                        <Text style={{ fontSize: hp(1.5) }}>No Logo</Text>
                                      </View>
                                    )}
                                  </View>
                                </View>

                                <View
                                  style={{
                                    width: '50%',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      gap: 10,
                                      width: '100%',
                                    }}>
                                    <View
                                      style={{
                                        width: '30%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        display: 'flex',
                                      }}>
                                      <View>
                                        <Text
                                          style={{
                                            fontWeight: 'bold',
                                            fontFamily: 'Roboto-Bold',
                                            color: '#000',
                                            fontStyle: 'italic',
                                            fontSize: hp(2),
                                          }}>
                                          {team1Data.shortName}
                                        </Text>
                                      </View>
                                    </View>

                                    <View>
                                      <Text
                                        style={{
                                          color: '#fff',
                                          fontWeight: 'bold',
                                          fontSize: hp(1.5),
                                          backgroundColor: '#dfe1ec',
                                          width: 25,
                                          height: 25,
                                          textAlign: 'center',
                                          textAlignVertical: 'center',
                                          borderRadius: 17.5,
                                        }}>
                                        VS
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        width: '25%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        display: 'flex',
                                      }}>
                                      <View>
                                        <Text
                                          style={{
                                            fontWeight: 'bold',
                                            fontFamily: 'Roboto-Bold',
                                            color: '#000',
                                            fontStyle: 'italic',
                                            fontSize: hp(2),
                                          }}>
                                          {team2Data.shortName}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      width: '100%',
                                    }}>
                                    <View
                                      style={{
                                        width: '40%',
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                        display: 'flex',
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 10,
                                          color: '#000',
                                        }}
                                        numberOfLines={1}>
                                        {team1Data.identifier}
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        width: '40%',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        display: 'flex',
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 10,
                                          color: '#000',
                                          textAlign: 'center',
                                        }}
                                        numberOfLines={1}>
                                        {team2Data.identifier}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '25%',
                                  }}>
                                  <View style={{ padding: 2 }}>
                                    {team2Data.logoPath ? (
                                      <Image
                                        source={{
                                          uri: team2Data.logoPath,
                                          cache: 'force-cache',
                                        }}
                                        style={{
                                          width: 60,
                                          height: 60,
                                        }}
                                      />
                                    ) : (
                                      <View
                                        style={{
                                          width: 40,
                                          height: 40,
                                          display: 'flex',
                                          flexDirection: 'row',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                        }}>
                                        <Text style={{ fontSize: hp(1.5) }}>No Logo</Text>
                                      </View>
                                    )}
                                  </View>
                                </View>
                              </View>
                            </View>

                            {/* Status Section */}
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <View
                                style={{
                                  padding: 5,
                                }}>
                                <Text
                                  style={{
                                    fontSize: hp(1.5),
                                    color: item.eventStatus === 'Completed' ? '#35b267' : 'red',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                  }}>
                                  {item.eventStatus || 'Completed'}
                                </Text>
                              </View>

                            </View>

                            <View
                              style={{
                                padding: 5,
                                width: '95%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderColor: '#cccccc',
                                paddingLeft: 10,
                              }}>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: 7,
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    borderRadius: 15,
                                    color: '#000',
                                    padding: 1,
                                    fontSize: hp(1.2),
                                  }}>
                                  {item.teamCount || 0} Teams created
                                </Text>
                              </View>

                            </View>
                          </View>
                        )}
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  iconBackground: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  profbox: {
    flex: 1,
    display: 'flex',
    width: '90%',
    alignItems: 'center',
    padding: 70,
    position: 'relative',
    top: 20,
    backgroundColor: '#196',
    gap: 30,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  profileText: {
    flex: 1,
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  followBox: {
    flex: 1,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    width: '85%',
    alignItems: 'center',
  },
  followers: {
    display: 'flex',
    flexDirection: 'column',
  },
  following: {
    flexDirection: 'column',
  },
  result: {
    justifyContent: 'center',
    width: wp('85%'),
    flexDirection: 'row',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('80%'),
    paddingHorizontal: 3,
  },
});

