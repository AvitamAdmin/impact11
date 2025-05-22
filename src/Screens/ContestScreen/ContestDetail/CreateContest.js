import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import DashedLine from 'react-native-dashed-line';
// import { Switch } from '@rneui/themed';
// import {ScrollView, Switch} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaskedView from '@react-native-masked-view/masked-view';

// const SwitchComponent = () => {
//     const [checked, setChecked] = useState(false);

//     return (
//       <View style={styles.switchView}>
//         <Switch
//     value={checked}
//     onValueChange={() => setChecked(!checked)}
//     thumbColor={checked ?  "#3b53bd" : '#f4f3f4'}
//     trackColor={{ false: '#767577', true: '#81b0ff' }}
//   />
//       </View>
//     );
//   };

// export default function CreateContest({ }){

//     const navigation = useNavigation();
//     const screenWidth = Dimensions.get('window').width;
//     const isTablet = screenWidth >= 768;
//     return(

//         <View>

//              <LinearGradient
//                style={{
//                  display:"flex",
//                  alignItems:"center",
//                  justifyContent:"center",
//                  flexDirection:"row",
//                  width: wp("100%"),
//                  height: hp(9),
//                  gap:10,
//                }}
//                colors={["#3b53bd", "#243373", "#192451"]}
//                start={{ x: 0, y: 0.5 }}
//                end={{ x: 1, y: 0.5 }}
//               >

//                <View style={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"flex-start", alignItems:"center"}}>
//                 <Pressable onPress={() => navigation.goBack()} style={{display:"flex", flexDirection:"row", width:"15%", justifyContent:"center", alignItems:"center"}}>
//                 <AntDesign name="arrowleft" size={24} color="#fff" />
//                 </Pressable>
//                  <View style={[styles.header, {width: isTablet ? wp('75%') : wp('100%')}]}>
//                    <View
//                      style={{
//                        display: 'flex',
//                flexDirection: 'row',
//                gap: 15,
//                width: wp("50%")}}>
//                      <View style={{display: 'flex', flexDirection: 'column'}}>
//                        <Text style={{fontWeight: 'bold',
//                color: '#fff',
//                fontSize: hp(2.1),}}>CSK vs RCB</Text>
//                        <Text style={{fontSize: hp(1.5),
//                color: '#fff',alignItems:"center"
//               }}>21M 30s left</Text>
//                      </View>
//                      </View>
//                    </View>

//                  </View>

//                </LinearGradient>
//             <ScrollView stye={{}}>
//                 <View >

//             <View style={{backgroundColor:'#DEDEDE',justifyContent:'space-between',alignItems:'center',display:'flex',flexDirection:'row', width:wp('100%'),  }}>
//                 <View style={{width:wp('85%'),padding:15,}}>
//                 <Text style={{color:'#6B6B6B',fontSize:hp(1.8)}}>
//                         Contest Name
//                     </Text>
//                     <Text style={{color:'#000',fontSize:hp(2),fontWeight:'bold'}}>
//                        Shivam's Contest
//                     </Text>

//                 </View>
//                 <View style={{width:wp('14%')}}>
//                 <MaterialCommunityIcons name="pencil-outline" size={30} color='#6B6B6B' />
//                 </View>
//             </View>

//             <View style={{width:'100%', display:'flex',justifyContent:'center',alignItems:'center',paddingTop:10}}>
//                 <Pressable style={styles.btn}>
//                     <View style={{width:wp('100%'),display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
//                     <Text style={{color:'#6B6B6B',width:wp('50%'),fontSize:hp(1.9)}}>
//                         Entry Fee
//                     </Text>
//                     <Text style={{width:wp('20%'),fontWeight:'800',fontSize:23,color:"#000",paddingLeft:30}} >₹</Text>
//                     <View  style={{justifyContent:'center',alignItems:'center',width:'100%',}} >
//                     <Text style={{width:wp('100%'),fontWeight:'800',fontSize:hp(3.2),textDecorationLine:'underline',color:"#000"}}>100</Text>
//                     </View>

//                     </View>

//                 </Pressable>

//             </View>

//             <View style={{display:'flex',flexDirection:'row',width:wp('100%'),justifyContent:'center',alignItems:'center',rowGap:2}}>
//                 <View style={{width:wp('45%'),padding:8}}>
//                 <Pressable style={styles.button}>
//                     <View style={{width:wp('32%'),display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
//                     <Text style={{color:'#6B6B6B',width:wp('25%'),fontWeight:'500',fontSize:hp(1.9)}}>
//                         Spots
//                     </Text>
//                     <Text style={{width:wp('55%'),fontWeight:'800',fontSize:23,textDecorationLine:'underline',color:"#000"}}>10</Text>
//                     </View>

//                 </Pressable>
//                 </View>
//                 <View style={{width:wp('3%')}}>

//                 </View>

//                 <View style={{width:wp('45%'),padding:8}}>
//                 <Pressable style={styles.button}>
//                     <View style={{width:wp('30%'),display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
//                     <Text style={{color:'#6B6B6B',width:wp('28%'),fontWeight:'500',fontSize:hp(1.9)}}>
//                         Winners
//                     </Text>
//                     <Text style={{width:wp('55%'), fontWeight:'800',fontSize:23,textDecorationLine:'underline',color:"#000"}}>5</Text>
//                     </View>

//                 </Pressable>
//                 </View>

//             </View>

//             <View style={{display:'flex',width:wp('100%'), justifyContent:'center',alignItems:'center',flexDirection:'row',}}>
//                 <View style={{width:wp('75%'),justifyContent:'center', alignItems:'flex-start'}}>
//                     <Text style={{fontWeight:'600',fontSize:hp(1.8),color:'#6B6B6B',}}>
//                         Allow players to join with multiple teams
//                     </Text>
//                 </View>

//                 <View>
//                     <SwitchComponent />
//                 </View>
//             </View>

//             <View style={{ padding: 16,  width:wp('98%') }}>

//             <DashedLine dashLength={8} dashThickness={2} dashColor='#D3D3D3' dashGap={9} />
//             </View>

//             <View style={{display:'flex',flexDirection:'row', justifyContent:'center',alignItems:'center',width:wp('100%'),paddingTop:18,}}>
//             <View style={{width:wp('35%'),display:'flex',flexDirection:'row', justifyContent:"center",alignItems:'center'}}>
//             <Text style={{fontSize:hp(2.2), fontWeight:'bold',color:"#000"}}>
//                   Max Prize Pool
//             </Text>
//             </View>
//             <View style={{width:wp('55%'),display:'flex', justifyContent:"center",alignItems:'flex-end'}}>
//             <Text style={{color:'#4D4D4D',fontSize:hp(2.5),fontWeight:'800'}}>
//                     ₹840
//             </Text>
//             </View>
//             </View>

//            <View style={{width:wp('100%'),display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',paddingTop:15,}}>
//             <View style={{width:wp('90%'), borderWidth:1, borderColor:'#CCCCCC',flexDirection:'column', borderRadius:5, }}>

//             <View style={{display:'flex', flexDirection:'row',width:wp('90%'),borderBottomWidth:1,borderBottomColor:"#CCCCCC",padding:8}}>
//                   <View style={{width:wp('37%'),display:'flex', flexDirection:'row',justifyContent:'flex-start'}}>
//                         <Text style={{color:'#6B6B6B',fontWeight:"500"}}>
//                            Rank
//                         </Text>
//                   </View>
//                   <View style={{width:wp('50%'),display:'flex', flexDirection:'row',justifyContent:'flex-end'}}>
//                         <Text style={{color:'#6B6B6B',fontWeight:"500"}}>Winnings</Text>
//                   </View>
//                 </View>

//                 <View style={{display:'flex', flexDirection:'row',width:wp('90%'),borderBottomWidth:1,borderBottomColor:"#CCCCCC",padding:8}}>
//                   <View style={{width:wp('38%'),display:'flex', flexDirection:'row',justifyContent:'flex-start'}}>
//                         <Text style={{fontWeight:'700',fontSize:hp(2.3),color:"#000"}}>
//                             #1
//                         </Text>
//                   </View>
//                   <View style={{width:wp('48%'),display:'flex', flexDirection:'row',justifyContent:'flex-end'}}>
//                         <Text  style={{fontWeight:'700',fontSize:hp(2.3),color:"#000"}}>₹336</Text>
//                   </View>
//                 </View>

//                 <View style={{display:'flex', flexDirection:'row',width:wp('90%'),borderBottomWidth:1,borderBottomColor:"#CCCCCC",padding:8}}>
//                   <View style={{width:wp('38%'),display:'flex', flexDirection:'row',justifyContent:'flex-start'}}>
//                         <Text  style={{fontWeight:'700',fontSize:hp(2.3),color:"#000"}}>
//                             #2
//                         </Text>
//                   </View>
//                   <View style={{width:wp('48%'),display:'flex', flexDirection:'row',justifyContent:'flex-end'}}>
//                         <Text  style={{fontWeight:'700',fontSize:hp(2.3),color:"#000"}}>₹193</Text>
//                   </View>
//                 </View>

//                 <View style={{display:'flex', flexDirection:'row',width:wp('90%'),borderBottomWidth:1,borderBottomColor:"#CCCCCC",padding:8}}>
//                   <View style={{width:wp("38%"),display:'flex', flexDirection:'row',justifyContent:'flex-start'}}>
//                         <Text  style={{fontWeight:'700',fontSize:hp(2.3),color:"#000"}}>
//                             #3
//                         </Text>
//                   </View>
//                   <View style={{width:wp('48%'),display:'flex', flexDirection:'row',justifyContent:'flex-end'}}>
//                         <Text  style={{fontWeight:'700',fontSize:hp(2.3),color:"#000"}}>₹126</Text>
//                   </View>

//                 </View>

//                 <View style={{display:'flex', flexDirection:'row',width:wp('90%'),borderBottomWidth:1,borderBottomColor:"#CCCCCC",padding:8}}>
//                   <View style={{width:wp('38%'),display:'flex', flexDirection:'row',justifyContent:'flex-start'}}>
//                         <Text  style={{fontWeight:'700',fontSize:hp(2.3),color:"#000"}}>
//                             #4-5
//                         </Text>
//                   </View>
//                   <View style={{width:wp('48%'),display:'flex', flexDirection:'row',justifyContent:'flex-end'}}>
//                         <Text  style={{fontWeight:'700',fontSize:hp(2.3),color:"#000"}}>₹92</Text>
//                   </View>

//                 </View>

//             </View>
//            </View>

//            <View style={{width:wp('100%'), justifyContent:'center',alignItems:'center', display:'flex',flexDirection:'column'}}>
//             <View style={{width:wp('90%'), justifyContent:'center',alignItems:'center',paddingTop:40 }}>
//                 <Text style={{fontSize:hp(1.7),backgroundColor:'#EAEEFE', padding:4,fontWeight:'400',color:"#000"}}>There will be fewer winner if less than 10 teams joined</Text>
//             </View>
//            </View>

//            <View style={{width:wp('100%'),display:'flex',flexDirection:'row', justifyContent:'center',alignItems:'center', padding:20,}}>
//             <View style={{width:wp('40%'), justifyContent:'space-evenly',alignItems:'center',backgroundColor:'#EAEEFE',display:'flex',flexDirection:'row', padding:2,gap:10}}>
//             <View style={{width:wp('10%'),backgroundColor:'#EAEEFE',padding:5}}>
//             <Image
//                 source={require("../../../../assets/Flexible.png")}
//                style={{
//                   width: wp("5%"),
//                   height: 18,
//                   resizeMode:'contain',
//                 }}/>
//            </View>
//             <View style={{width:wp('40%')}}>

//             <Text style={{fontSize:hp(1.7) ,fontWeight:'400',color:"#000"}}>This is flexible contest</Text>
//             </View>
//             </View>

//            </View>

//             <View style={{width:wp('100%'), justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column', paddingTop:50,marginBottom:80}}>
//             <LinearGradient style={{borderRadius: 7,padding:2}}
//                colors={["#3b53bd", "#243373", "#192451"]}
//                start={{ x: 0, y: 0.5 }}
//                end={{ x: 1, y: 0.5 }}
//               >
//             <Pressable style={{width:wp('90%'), justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',padding:10,}}>
//                 <Text style={{color:'#fff',fontWeight:'bold'}}> Create New Contest </Text>
//             </Pressable>
//             </LinearGradient>
//             </View>
//             </View>
//             </ScrollView>
//         </View>

//     );
// }

// const styles = StyleSheet.create({

//     btn: {
//         padding:10,
//         width:'90%',
//         borderWidth:1,
//         borderRadius: 5,
//         borderColor:'#CCCCCC'
//     },
//     button:{
//         padding:10,
//         borderWidth:1,
//         borderRadius: 5,
//         borderColor:'#CCCCCC'
//     },

// })

const CreateContest = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const isTablet = screenWidth >= 768;
  return (
    <View>
      <LinearGradient
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: wp('100%'),
          height: hp(9),
          //   gap: 10,
        }}
        colors={['#3b53bd', '#243373', '#192451', '#000']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: isTablet ? wp('75%') : wp('100%'),
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: '5  00',
                color: '#fff',
                fontSize: hp(2.1),
              }}>
              Create contest
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={{width: '100%'}}>
        {/* Teams  */}
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <View
            style={{
              width: '95%',
              //    height: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#E3E3E3',
              borderRadius: 10,
              padding: 15,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../../../assets/csk.png')}
                style={{
                  width: 60,
                  height: 60,
                }}
              />
            </View>

            <View
              style={{
                width: '50%',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 5,
                flexDirection: 'column',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                }}>
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontFamily: 'Roboto-Bold',
                      color: '#000',
                      fontStyle: 'italic',
                      fontSize: hp(2.2),
                    }}>
                    CSK
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: hp(1.5),
                      backgroundColor: '#CDD2E8',
                      width: 25,
                      height: 25,
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      borderRadius: 17.5,
                    }}>
                    VS
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontFamily: 'Roboto-Bold',
                      color: '#000',
                      fontStyle: 'italic',
                      fontSize: hp(2.2),
                    }}>
                    RCB
                  </Text>
                </View>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  //   gap: 10,
                }}>
                <View style={{}}>
                  <Text
                    style={{
                      color: 'red',
                      fontWeight: '700',
                      fontSize: hp(1.8),
                    }}>
                    {' '}
                    1h 30m
                  </Text>
                </View>

                <View style={{paddingTop: 20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: wp('45%'),
                      borderRadius: 5,
                      borderColor: '#000',
                      borderWidth: 1,
                      padding: 5,
                    }}>
                    <View style={{}}>
                      <Text
                        style={{color: '#000', fontSize: 12, fontWeight: '500'}}
                        numberOfLines={1}>
                        Contest by Mahirat
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="pencil"
                        size={20}
                        color="#000"
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                width: '20%',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Image
                source={require('../../../../assets/TeamB.png')}
                style={{
                  width: 60,
                  height: 60,
                }}
              />
            </View>
          </View>
        </View>

        {/* Select contest */}

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: 10,
            gap: 10,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
              paddingLeft: 10,
            }}>
            <Text style={{color: '#000', fontSize: 14, fontWeight: '500'}}>
              Select contest to play with your friends
            </Text>
          </View>

          {/* select 1*/}
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}>
            <View
              style={{
                width: '95%',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 5,
                borderColor: '#CCCCCC',
                borderWidth: 1,
                gap: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  padding: 10,
                }}>
                <View
                  style={{
                    width: '31%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#E3E3E3',
                    borderRadius: 4,
                    padding: 6,
                  }}>
                  <View>
                    <Text
                      style={{color: '#000', fontWeight: '600', fontSize: 14}}>
                      First Prize
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MaskedView
                      maskElement={
                        <Text
                          style={{
                            fontFamily: 'Roboto-Bold',
                            // fontStyle: 'italic',
                            fontSize: 20,
                            fontWeight: '700',
                          }}>
                          ₹34
                        </Text>
                      }>
                      <LinearGradient
                        colors={['#3E57C4', '#1E2A5E']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Bold',
                            //   fontStyle: 'italic',
                            fontSize: 22,
                            opacity: 0, // Required for masking effect
                          }}>
                          ₹34
                        </Text>
                      </LinearGradient>
                    </MaskedView>
                  </View>
                </View>

                <View
                  style={{
                    width: '31%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#E3E3E3',
                    borderRadius: 4,
                    padding: 6,
                  }}>
                  <View>
                    <Text
                      style={{color: '#000', fontWeight: '600', fontSize: 14}}>
                      Spots
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MaskedView
                      maskElement={
                        <Text
                          style={{
                            fontFamily: 'Roboto-Bold',
                            // fontStyle: 'italic',
                            fontSize: 20,
                            fontWeight: '700',
                          }}>
                          10
                        </Text>
                      }>
                      <LinearGradient
                        colors={['#3E57C4', '#1E2A5E']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Bold',
                            //   fontStyle: 'italic',
                            fontSize: 22,
                            opacity: 0, // Required for masking effect
                          }}>
                          10
                        </Text>
                      </LinearGradient>
                    </MaskedView>
                  </View>
                </View>

                <View
                  style={{
                    width: '31%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#E3E3E3',
                    borderRadius: 4,
                    padding: 6,
                  }}>
                  <View>
                    <Text
                      style={{color: '#000', fontWeight: '600', fontSize: 14}}>
                      Entry
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MaskedView
                      maskElement={
                        <Text
                          style={{
                            fontFamily: 'Roboto-Bold',
                            // fontStyle: 'italic',
                            fontSize: 20,
                            fontWeight: '700',
                          }}>
                          ₹10
                        </Text>
                      }>
                      <LinearGradient
                        colors={['#3E57C4', '#1E2A5E']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Bold',
                            //   fontStyle: 'italic',
                            fontSize: 22,
                            opacity: 0, // Required for masking effect
                          }}>
                          ₹10
                        </Text>
                      </LinearGradient>
                    </MaskedView>
                  </View>
                </View>
              </View>

              {/* NO.OF */}
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '90%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <View
                    style={{
                      width: '50%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 12,
                    }}>
                    <View style={{}}>
                      <Text
                        style={{
                          color: '#4D4D4D',
                          fontWeight: '500',
                          fontSize: 14,
                        }}>
                        No.of winners
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '700',
                          fontSize: 17,
                        }}>
                        5
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '40%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 12,
                    }}>
                    <View>
                      <Text
                        style={{
                          color: '#4D4D4D',
                          fontWeight: '500',
                          fontSize: 14,
                        }}>
                        Prize pool
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '700',
                          fontSize: 17,
                        }}>
                        ₹84
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* Select btn */}
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <LinearGradient
                  colors={['#3E57C4', '#1E2A5E', '#171F42']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{
                    padding: 10,
                    width: '95%',
                    borderRadius: 5,
                  }}>
                  <Pressable
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: '700',
                        fontSize: 14,
                      }}>
                      Select
                    </Text>
                  </Pressable>
                </LinearGradient>
              </View>
            </View>
          </View>

          {/* Select 2 */}

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}>
            <View
              style={{
                width: '95%',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 5,
                borderColor: '#CCCCCC',
                borderWidth: 1,
                gap: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  padding: 10,
                }}>
                <View
                  style={{
                    width: '31%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#E3E3E3',
                    borderRadius: 4,
                    padding: 6,
                  }}>
                  <View>
                    <Text
                      style={{color: '#000', fontWeight: '600', fontSize: 14}}>
                      First Prize
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MaskedView
                      maskElement={
                        <Text
                          style={{
                            fontFamily: 'Roboto-Bold',
                            // fontStyle: 'italic',
                            fontSize: 20,
                            fontWeight: '700',
                          }}>
                          ₹17
                        </Text>
                      }>
                      <LinearGradient
                        colors={['#3E57C4', '#1E2A5E']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Bold',
                            //   fontStyle: 'italic',
                            fontSize: 22,
                            opacity: 0, // Required for masking effect
                          }}>
                          ₹17
                        </Text>
                      </LinearGradient>
                    </MaskedView>
                  </View>
                </View>

                <View
                  style={{
                    width: '31%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#E3E3E3',
                    borderRadius: 4,
                    padding: 6,
                  }}>
                  <View>
                    <Text
                      style={{color: '#000', fontWeight: '600', fontSize: 14}}>
                      Spots
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MaskedView
                      maskElement={
                        <Text
                          style={{
                            fontFamily: 'Roboto-Bold',
                            // fontStyle: 'italic',
                            fontSize: 20,
                            fontWeight: '700',
                          }}>
                          10
                        </Text>
                      }>
                      <LinearGradient
                        colors={['#3E57C4', '#1E2A5E']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Bold',
                            //   fontStyle: 'italic',
                            fontSize: 22,
                            opacity: 0, // Required for masking effect
                          }}>
                          10
                        </Text>
                      </LinearGradient>
                    </MaskedView>
                  </View>
                </View>

                <View
                  style={{
                    width: '31%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#E3E3E3',
                    borderRadius: 4,
                    padding: 6,
                  }}>
                  <View>
                    <Text
                      style={{color: '#000', fontWeight: '600', fontSize: 14}}>
                      Entry
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MaskedView
                      maskElement={
                        <Text
                          style={{
                            fontFamily: 'Roboto-Bold',
                            // fontStyle: 'italic',
                            fontSize: 20,
                            fontWeight: '700',
                          }}>
                          ₹5
                        </Text>
                      }>
                      <LinearGradient
                        colors={['#3E57C4', '#1E2A5E']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}>
                        <Text
                          style={{
                            fontFamily: 'Roboto-Bold',
                            //   fontStyle: 'italic',
                            fontSize: 22,
                            opacity: 0, // Required for masking effect
                          }}>
                          ₹5
                        </Text>
                      </LinearGradient>
                    </MaskedView>
                  </View>
                </View>
              </View>

              {/* NO.OF */}
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '90%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <View
                    style={{
                      width: '50%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 12,
                    }}>
                    <View style={{}}>
                      <Text
                        style={{
                          color: '#4D4D4D',
                          fontWeight: '500',
                          fontSize: 14,
                        }}>
                        No.of winners
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '700',
                          fontSize: 17,
                        }}>
                        5
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '40%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 12,
                    }}>
                    <View>
                      <Text
                        style={{
                          color: '#4D4D4D',
                          fontWeight: '500',
                          fontSize: 14,
                        }}>
                        Prize pool
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '700',
                          fontSize: 17,
                        }}>
                        ₹42
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* Select btn */}
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <LinearGradient
                  colors={['#3E57C4', '#1E2A5E', '#171F42']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{
                    padding: 10,
                    width: '95%',
                    borderRadius: 5,
                  }}>
                  <Pressable
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: '700',
                        fontSize: 14,
                      }}>
                      Select
                    </Text>
                  </Pressable>
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            width: wp('100%'),
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            padding: 5,
          }}>
          <View
            style={{
              width: wp('70%'),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#EAEEFE',
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: '#000',
                padding: 4,
              }}>
              There will be fewer winner if less teams joined
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CreateContest;
