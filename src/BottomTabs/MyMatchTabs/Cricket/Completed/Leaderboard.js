import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {api} from '../../../../envfile/api';
import Live_Completed_TeamPreview from '../../../../Models/Live_Completed_TeamPreview';

const Leaderboard = () => {
  const navigation = useNavigation();
  const [isGreen, setIsGreen] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [Players, setPlayers] = useState();

  const [isTeamPreviewVisible, setIsTeamPreviewVisible] = useState(false);
  const [previewData, setPreviewData] = useState();
   

  const screenHeight = Dimensions.get('window').height;

  const matchId = useSelector(state => state.fantasy.matchId);
  const contestId = useSelector(state => state.fantasy.contestId);

  const handlePress = () => {
    setIsGreen(prevState => !prevState);
  };

  useEffect(() => {
    fetchleaderboard();
  }, []);

  const fetchleaderboard = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const body = {
        matchId: matchId,
        contestId: contestId,
      };
      // console.log('body from leaderboard', body);

      const response = await axios.post(
        `${api}/admin/contestJoined/getUserRank`,
        body,
        {headers: {Authorization: `Bearer ${token}`}},
      );
     console.log("Response :",response.data.contestJoinedDtoList);
     
     
      setLeaderboard(response.data.contestJoinedDtoList || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const handleNavigate = (
    players,
    team1Name,
    team2Name,
    username,
    teamPoints,
    team1Count,
    team2Count,
    teamName,
  ) => {
    let data = {
      players,
      team1Name,
      team2Name,
      username,
      teamPoints,
      team1Count,
      team2Count,
      teamName,
    }
    console.log("data:",data);
    
    setPreviewData(data);
    setIsTeamPreviewVisible(true);
   
  };

  const closeTeamPreview = () => {
    setIsTeamPreviewVisible(false);
   
  };


  return (
    <View
      style={{
        padding: 5,
        flexDirection: 'column',
        width: wp('100%'),
        backgroundColor: '#fff',
        //gap: 15,
        height: hp('100%'),
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          // backgroundColor: "#196",
        }}>
        <View
          style={{
            flexDirection: 'row',

            gap: 5,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Feather name="download" size={18} color="black" />
          <Text
            style={{
              color: '#000',
              fontSize: hp(1.5),
            }}>
            Download all teams
          </Text>
        </View>

        <TouchableWithoutFeedback onPress={handlePress}>
          <View
            style={{
              flexDirection: 'row',

              gap: 5,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text style={[styles.compareText, isGreen && {color: '#19c869'}]}>
              Compare
            </Text>
            <MaterialCommunityIcons
              name="select-compare"
              size={18}
              color={isGreen ? '#19c869' : '#000'}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <ScrollView
        style={{
          width: '100%',
          height: hp('100%'),
          paddingBottom: 10,
        }}
        contentContainerStyle={{
          gap: 5,
          paddingBottom: screenHeight * 0.5,
        }}>
          <Live_Completed_TeamPreview
                    visible={isTeamPreviewVisible}
                    onClose={closeTeamPreview}
                    route={{params: {...previewData}}}
                  />
        {leaderboard.map((item, index) => (
          <View
            key={`${item.userDto?.userId || index}`}
            style={{
              padding: 10,
              flexDirection: 'column',
              width: '100%',
              //backgroundColor:"#196",
            }}>
            <Pressable
              onPress={() =>
               {
                
                
                
                handleNavigate(
                  item.userTeamsDto?.players,  
                  item.userTeamsDto?.team1Name,
                  item.userTeamsDto?.team2Name,
               
                  item.userDto?.username,
                  item.userTeamsDto?.points,
                  item.userTeamsDto?.team1Count,
                  item.userTeamsDto?.team1Count,
                  item.userTeamsDto?.teamName,
                );
               }
              }
              style={{
                flexDirection: 'row',
                //width: wp("90%"),
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 2,
                borderColor: '#f0f0f0',
                paddingBottom: 6,
                padding: 5,
              }}>
              <View
                style={{
                  width: '5%',
                }}></View>
              <View
                style={{
                  flexDirection: 'column',
                  gap: 6,
                  //backgroundColor: "#f27",
                  width: '45%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#000',
                    fontSize: hp(1.3),
                  }}>
                  {item.userDto?.username || 'Unknown'}
                </Text>
              {
                item.amountWon > 0 ? (
                  <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                  <Text
                    style={{
                      color: '#19c869',
                      fontSize: hp(1.3),
                    }}>
                    You won {item.amountWon}
                  </Text>
                </View>
                ) : null
              }
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  //width: wp("30%"),
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  //backgroundColor: "#f27",
                  width: '25%',
                }}>
                <View
                  style={{
                    backgroundColor: '#d9d9d9',
                    height: 20,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 3,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#000',
                      fontSize: hp(1.2),
                    }}>
                    {item.userTeamsDto?.teamName || 1}
                  </Text>
                </View>
                <Text
                  style={{
                    fontWeight: 'bold',

                    color: '#000',
                    fontSize: hp(1.5),
                  }}>
                  {item.userTeamsDto?.points || '-'}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  // paddingRight: 10,
                  justifyContent: 'flex-end',
                  alignItems: 'center',

                  width: '20%',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#000',
                  }}>
                  #{item.rank || '-'}
                </Text>
              </View>
              <View
                style={{
                  width: '5%',
                }}></View>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  compareText: {
    color: '#000',
    fontSize: hp(1.5),
  },
});

export default Leaderboard;
