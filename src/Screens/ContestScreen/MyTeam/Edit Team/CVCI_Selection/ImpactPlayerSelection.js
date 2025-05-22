import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
//   import { Ionicons, FontAwesome5, Feather, AntDesign } from "@expo/vector-icons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
//   import { MaterialIcons } from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import {
  setimpactPlayer,
  resetimpactPlayer,
  setImpactPlayerTeamId,
  setImpactPlayerTeam,
  resetFinalPlayerSelected,
  DateAndTime,
  setimpactPlayerImage
} from '../../../../../Redux/Slice';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {api} from '../../../../../envfile/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


const ImpactPlayerSelection = () => {
  
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [impactPlayerLists, setimpactPlayerLists] = useState([]);
  const [Token, setToken] = useState();
  const [image, setImage] = useState({});
const [timeLeft, setTimeLeft] = useState('');
  const ImpactPlayers = useSelector(state => state.fantasy.finalPlayerSelected);
  const impactPlayer = useSelector(state => state.fantasy.impactPlayer);
  const ImpactPlayerImage = useSelector(state=> state.fantasy.impactPlayerImage);

    const DateAndTime = useSelector((state) => state.fantasy.DateAndTime[0]);
  
    useEffect(() => {
      if (DateAndTime) {
        // console.log("DateAndTime from Redux:", DateAndTime);
    
        
        const [datePart, timePart] = DateAndTime.split(" "); 
        const [year, month, day] = datePart.split("-").map(Number); 
        const [hour, minute, second] = timePart.split(":").map(Number); 
    
       
        const targetDate = new Date(year, month - 1, day, hour, minute, second);
        // console.log("Parsed Target Date (Local):", targetDate);
    
        const interval = setInterval(() => {
          const now = new Date();
          const difference = targetDate.getTime() - now.getTime(); 
    
          if (difference > 0) {
            const hours = Math.floor(difference / (1000 * 60 * 60)); 
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)); 
            setTimeLeft(`${hours}hr ${minutes}m left`);
          } else {
            setTimeLeft('Time expired');
            clearInterval(interval);
          }
        }, 1000);
    
        return () => clearInterval(interval);
      }
    }, [DateAndTime]);
  useEffect(() => {
    // console.log('useEffect triggered in impact screen');
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        // console.log('Retrieved token in impact screen:', token);
        setToken(token);
        if (!token) {
          console.error('No token found in AsyncStorage. Did you set it?');
        }
        if (token) {
          await fetchPlayerList(token);
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
    // console.log('fetchPlayerList called with token in impact screen:', token);
    try {
      const body = {
        playerDtoList: ImpactPlayers.map(id => ({
          recordId: id,
        })),
      };

      const headers = {Authorization: `Bearer ${token}`};
      const response = await axios.post(`${api}/admin/player/getedit`, body, {
        headers,
      });

      const filteredPlayers = response.data.playerDtoList;

      // console.log('ImpactPlayersList', filteredPlayers);

      setimpactPlayerLists(filteredPlayers || []);
    } catch (error) {
      console.error('Error fetching ImpactPlayer data:', error);
      setError('Error fetching Impactplayer data.');
    }
  };

  const fetchImpactPlayerTeam = async (token, ImpactPlayerTeamId) => {
    // console.log(
    //   'fetchPlayerList called with token in ImpactPlayer screen:',
    //   token,
    // );
    try {
      // console.log(
      //   'ImpactPlayerTeamId from api fetchImpactPlayerTeam:',
      //   ImpactPlayerTeamId,
      // );

      const body = {
        teamDtoList: [
          {
            recordId: ImpactPlayerTeamId,
          },
        ],
      };

      const headers = {Authorization: `Bearer ${token}`};
      const response = await axios.post(`${api}/admin/team/getedit`, body, {
        headers,
      });
      const team = response.data.teamDtoList;
      const teamShortName = team[0]?.shortName || 'Unknown';
      // console.log("Impact player team from ImpactPlayer Screen :",teamShortName);
      dispatch(setImpactPlayerTeam(teamShortName));

      // console.log('From Myteam - ImpactPlayer :', team);
    } catch (error) {
      console.error('Error fetching ImpactPlayer data:', error);
      setError('Error fetching Impactplayer data.');
    }
  };




  return (
    <View style={{display:"flex",flexDirection:"column",width: "100%",height:"100%"}}>
      <SafeAreaView style={{ flex: 1 }}>
  <View style={{ flex: 1 }}>
    <LinearGradient
      colors={['#3247A0', '#1B2656', '#020202']}
      style={{ flex: 1 }} // Use flex instead of percentage
    >
      <View
        style={{
          flexDirection: 'row',
          padding: 4,
          width: wp('100%'),
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', gap: 17, width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', gap: 15, padding: 5 }}>
            <Pressable
              onPress={() => {
                navigation.navigate('ContestScreen');
                dispatch(resetFinalPlayerSelected());
              }}
              style={styles.back}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </Pressable>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: hp(1.5) }}>
                Choose your impact player
              </Text>
              <Text style={{ color: '#fff', fontSize: hp(1.2) }}>{timeLeft}</Text>
            </View>
          </View>
          <View style={{ width: '20%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesome5Icon name="question-circle" size={24} color="#fff" />
          </View>
        </View>
      </View>

      {/* Logo Row */}
      <View style={{ flexDirection: 'column', width: '100%',height:"100%" }}>
      
        <View style={{ flexDirection: 'row', width: '100%', padding: 5 ,height:"65%",justifyContent:"space-between"}}>
          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center',height:"100%",width: "25%", }}>
            <Image
              source={require('../../../../../../assets/Logo.png')}
              style={{ height: 40, width: wp('22%'), opacity: 0.2 }}
            />
          </View>

          <View
                              style={{
                                width: wp('35%'),
                                height:"100%",
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 10,
                                //backgroundColor:"#196"
                              }}>
                              <Image
                                source={require('../../../../../../assets/ImpactArrowUp.png')}
                                style={{height: 27, width: wp('25%')}}
                              />
                                {
                                impactPlayer.length > 0 ? (
                                  <Image                 
                                  // source={{ uri: `data:image/png;base64,${ImpactPlayerImage}` }}
                                  source={{ uri: ImpactPlayerImage }}
                                  style={{
                                    height: hp(17),
                                    width: wp(25),
                                    borderWidth: 2,
                                    borderColor: '#fff',
                                    borderRadius: 10,
                                    padding: 5,
                                  }}
                                />
                                ) : (null)
                               } 
                              <Image
                                source={require('../../../../../../assets/ImpactArrowDown.png')}
                                style={{height: 28, width: '70%'}}
                              />
                            </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',height:"100%",width: "25%", }}>
            <Image
              source={require('../../../../../../assets/Logo.png')}
              style={{ height: 40, width: wp('22%'), opacity: 0.2 }}
            />
          </View>

        </View>
       
        <View
                          style={{
                            width: wp('100%'),
                            justifyContent: 'flex-start',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding:5,
                            height:"20%",
                            //backgroundColor: "#196",
                          }}>
                          <View
                            style={{
                              width: wp('90%'),
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              gap: 10,
                              alignItems:"center"
                            }}>
                            <Ionicons
                                name="information-circle-outline"
                                size={17}
                                color="#fff"
                              />
                            <Text style={{color: '#fff', fontSize: hp(1.5)}}>
                              Impact Player will replace the player with least points in your
                              Team
                            </Text>
                          </View>
                        </View>
         
      </View>
    </LinearGradient>
  </View>
</SafeAreaView>

      <View style={{height:'55%',paddingBottom:55,position:'relative'}}>
        <View
          style={{
            backgroundColor: '#fff',
            width: wp('100%'),
            flexDirection: 'row',
            padding:7,
            borderWidth:2,
            borderColor:"#c0c0c0",
            justifyContent: 'space-between',
            gap:10
          }}>
          
              <View
              style={{width: "15%",}}
              >
                
              </View>
              <View style={{width: "35%",}}>
                <Text style={{fontSize: hp(1.2),}}>PLAYER</Text>
              </View>

              <View style={{width: "15%",}}>
                <Text style={{fontSize: hp(1.2),}}>POINTS</Text>
              </View>

              <View style={{width: "30%",}}>
                <Text style={{fontSize: hp(1.2),}}>SELECTED BY%</Text>
              </View>
            

           
         
        </View>
        <ScrollView>
          {impactPlayerLists.map((item, id) => (
            <Pressable
              key={id}
              onPress={() => {
                dispatch(setimpactPlayer(item.recordId));
                // console.log('ImpactPlayer team id dispatching:', item.teamId);
                dispatch(setimpactPlayerImage(item.playerImagePath));
                setImage(item.playerImage);
                dispatch(setImpactPlayerTeamId(item.teamId));
                fetchImpactPlayerTeam(Token, item.teamId);
              }}
              style={{
                width: wp('100%'),
                flexDirection: 'row',
                padding: 10,
                borderColor: '#000',
                borderBottomWidth: 1,
                backgroundColor: impactPlayer.includes(item.recordId)
                  ? '#ccd6ff'
                  : '#fff',
                  gap:5
              }}>
                
              <View
                style={{
                  width: wp('15%'),
                  display: 'flex',
                  //justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>

{item.playerImagePath ? (
                                                              <Image
                                                                source={{ uri: item.playerImagePath }}
                                                                                               style={{
                                                                  height: 50,
                                                                  width: 50,
                                                                  borderRadius: 25,
                                                                  position: 'relative',
                                                              backgroundColor: "#fff",
                                                              borderColor:"#000",
                                                              borderWidth:1
                                            
                                                                }}
                                                              />
                                                            ) : null}
               
                  {/* <Image
                    source={{ uri: `data:image/png;base64,${item.playerImagePath}` }}
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 25,
                      position: 'relative',
                  backgroundColor: "#fff",
                  borderColor:"#000",
                  borderWidth:1

                    }}
                  /> */}
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: 'grey',
                      borderRadius: 10,
                      bottom: 0,
                      
                      width: wp('12%'),
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {/* <Text style={{color: '#fff', fontSize: hp(1.5),color:"#000"}}>
                      {item.team_short_form}
                    </Text> */}
                    <Text style={{color: '#fff', fontSize: hp(1.1),}}>
                    {item.teamDto?.shortName || 'N/A'}
                    </Text>
                  </View>
               
               
              </View>
              <View
                  style={{
                    width: wp('35%'),
                    flexDirection: 'column',
                    
                    alignItems:"flex-start",
                    justifyContent:"center",
                    display:"flex"
                  }}>
                  <Text style={{fontWeight: 'bold',color:"#000",fontSize: hp(1.4)}}>{item.identifier}</Text>
                  <Text style={{fontSize: hp(1.2), color: 'blue'}}>
                    Played Last Match
                  </Text>
                </View>
              <View
                style={{
                  width: wp('15%'),
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                 
                }}>
                 {/* <Text style={{fontWeight: 'bold',color:"#000"}}>{item.points}</Text> */}
                 <Text style={{fontWeight: 'bold',color:"#000",fontSize: hp(1.2)}}>100</Text>
              </View>
              <View
                style={{
                  width: wp('15%'),
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  //justifyContent: 'space-evenly',
                  alignItems: 'center',
                
                }}>
                <Text style={{fontWeight: 'bold',color:"#000",fontSize: hp(1.2)}}>20%</Text>
               
              </View>

              <View
                style={{
                  width: wp('15%'),
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  //justifyContent: 'space-evenly',
                  alignItems: 'center',
                
                }}>
            
                {impactPlayer.includes(item.recordId) ? (
                  <Text style={{color: 'red',fontSize: hp(1.2)}}>Del</Text>
                ) : (
                  <Text style={{color: 'green',fontSize: hp(1.2)}}>Add</Text>
                )}
              </View>
            </Pressable>
          ))}
        </ScrollView>
        
      </View>
      <View
style={{
width: wp('100%'),
position: 'absolute', // Floating effect
bottom: 20, // Adjust from bottom
alignSelf: 'center',
display: 'flex',
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
paddingHorizontal: wp('4%'),
paddingBottom: 30,
}}>
{/* Background Container with Blur Effect */}
<View
style={{
position: 'absolute',
width: wp('100%'),
alignSelf: 'center',
}}
/>
 
{/* Preview Button */}
<Pressable
onPress={() => navigation.navigate('TeamPreview')}
style={{
backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black
width: wp('45%'),
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
borderRadius: 5,
paddingVertical: 10,
backdropFilter: 'blur(10px)',
elevation: 5, // Android shadow
shadowColor: '#000', // iOS shadow
shadowOffset: {width: 0, height: 2},
shadowOpacity: 0.3,
shadowRadius: 4,
}}>
<View style={{opacity: 2}}>
<AntDesign name="eyeo" size={24} color="#fff" />
</View>
<Text style={{color: '#fff', fontWeight: 'bold', marginLeft: 5}}>
PREVIEW

</Text>
</Pressable>
 
{/* Next Button */}
<LinearGradient
colors={['#3E57C4', '#1E2E74']} 
style={{ 
  
  justifyContent: "center", 
  alignItems: "center", 
  
  borderRadius: 5 
}}
>
<Pressable
onPress={() => navigation.navigate('CVCSelection')}
style={{

width: wp('45%'),
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
backdropFilter: 'blur(10px)', // Blur effect
borderRadius: 5,
paddingVertical: 10,
elevation: 5,
shadowColor: '#000',
shadowOffset: {width: 0, height: 2},
shadowOpacity: 0.3,
shadowRadius: 4,
}}>
<Text
style={{
color: '#fff',
fontWeight: 'bold',
fontSize: hp(1.7),
marginRight: 5,
}}>
NEXT
</Text>
<View style={{}}>
<MaterialIcons name="skip-next" size={24} color="#fff" />
</View>
</Pressable>
</LinearGradient>
</View>
    </View>
  );
};

export default ImpactPlayerSelection;

const styles = StyleSheet.create({
  belowcontainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    //backgroundColor: 'transparent',
    flex: 1,
    
  },
  button: {
    backgroundColor: '#000',
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    width: wp('44%'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 50,
    backgroundColor: 'black',
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});
