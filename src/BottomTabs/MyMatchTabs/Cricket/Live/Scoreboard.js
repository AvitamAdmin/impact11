import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Scoreboard = () => {
  const [dropFirst, setDropFirst] = useState(false);
  const [dropSecond, setDropSecond] = useState(false);

  const [Captain, setCaptain] = useState(true)
  

  return (
    <ScrollView>

<View style={{width:"100%",flexDirection:"column",display:"flex",justifyContent:"center",paddingTop:10}}>
      
      <Pressable  onPress={() => setDropFirst(!dropFirst)} style={{width:"100%",flexDirection:"column",display:"flex",justifyContent:"center",borderRadius:5,borderColor:"#cccccc"}}>
                <View style={{width:"95%",flexDirection:"row",display:"flex",justifyContent:"space-between",padding:10}}>
                       <Text  style={{fontWeight:"400",color:"#000",fontSize: hp(1.8)}}>Chennai Super Kings</Text>
                       <View style={{flexDirection:"row",gap:5,alignItems:"center"}}>
                       <Text style={{fontWeight:"bold",color:"#000",fontSize: hp(1.7)}}>179/9 (20)</Text>
                       <Pressable onPress={() => setDropFirst(!dropFirst)}>
                        {
                          dropFirst ? <AntDesign name="up" size={15} color="black" />:<AntDesign name="down" size={15} color="black" />
                        }
                       </Pressable>
                      
                       </View>
                </View>
                {
                  dropFirst && <View style={{width:wp("100%"),flexDirection:"column",display:"flex",alignItems:"center",gap:15,paddingBottom:5}}>
        <View style={{width:wp("100%"),flexDirection:"column",justifyContent:"center",alignItems:"center",gap:6}}>
        <View style={{width:wp("100%"),flexDirection:"row",paddingLeft:5,paddingRight:5,backgroundColor:"#eeeeee",paddingBottom:8}}>
                <View style={{width: wp("45%")}}>
                   <Text style={{fontSize: hp(1.6),color:"#000"}}>Batter</Text>
                </View>
                <View style={{width:wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize: hp(1.6),color:"#000"}}>R</Text>
                </View>
                <View style={{width:wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize: hp(1.6),color:"#000"}}>B</Text>
                </View>
                <View style={{width:wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize: hp(1.6),color:"#000"}}>4s</Text>
                </View>
                <View style={{width:wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize: hp(1.6),color:"#000"}}>6s</Text>
                </View>
                <View style={{width:wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize: hp(1.6),color:"#000"}}>SR</Text>
                </View> 
                
        </View>

        <View style={{width: wp("100%"),flexDirection:"row",paddingTop:5,display:"flex",alignItems:"center",borderBottomWidth:1,borderColor:"#979797",paddingLeft:5,paddingRight:5,backgroundColor:"#E4E8FF"}}>
                <View style={{width: wp("45%"),flexDirection:"row",gap:5}}>
                    <View >
                       <Image source={require('../../../../../assets/players/ravindra-jadeja.png')} style={{height:50,width:50}}/> 
                    </View>
                    <View style={{flexDirection:"column"}}>
                      <View style={{flexDirection:"row",gap:3}}>
                      <Text style={{fontWeight:"600",color:"#000"}}>R Gaikwad</Text>
                      {
                          Captain && <Text style={{fontWeight:"bold",color:"#000"}}>(C)</Text>
                      }
                      </View>
                      <View>
                        <Text style={{fontSize: hp(1.5)}}>b M Siraj</Text>
                      </View>

                    </View>
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text  style={{fontSize: hp(1.6),color:"#000"}}>40</Text>
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text  style={{fontSize: hp(1.6),color:"#000"}}>24</Text>
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text  style={{fontSize: hp(1.6),color:"#000"}}>3</Text>
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text  style={{fontSize: hp(1.6),color:"#000"}}>2</Text>
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text  style={{fontSize: hp(1.6),color:"#000"}}>180</Text>
                </View> 
                
        </View>

        <View style={{width: wp("100%"),flexDirection:"row",display:"flex",alignItems:"center",borderBottomWidth:1,borderColor:"#979797",paddingLeft:5,paddingRight:5,backgroundColor:"#E4E8FF"}}>
                <View style={{width: wp("45%"),flexDirection:"row",gap:5}}>
                    <View >
                       <Image source={require('../../../../../assets/players/ravindra-jadeja.png')} style={{height:50,width:50}}/> 
                    </View>
                    <View style={{flexDirection:"column"}}>
                      <View style={{flexDirection:"row",gap:3}}>
                      <Text style={{fontWeight:"600",color:"#000"}}>R Gaikwad</Text>
                      {
                          Captain && <Text style={{fontWeight:"bold",color:"#000"}}>(C)</Text>
                      }
                      </View>
                      <View>
                        <Text style={{fontSize: hp(1.5)}}>b M Siraj</Text>
                      </View>

                    </View>
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text  style={{fontSize: hp(1.6),color:"#000"}}>40</Text>
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text  style={{fontSize: hp(1.6),color:"#000"}}>24</Text>
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text  style={{fontSize: hp(1.6),color:"#000"}}>3</Text>
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text  style={{fontSize: hp(1.6),color:"#000"}}>2</Text>
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text  style={{fontSize: hp(1.6),color:"#000"}}>180</Text>
                </View> 
                
        </View>
        </View>
        

        
        <View style={{width: wp("100%"),flexDirection:"row",paddingTop:5,display:"flex",alignItems:"center"}}>
              <View style={{width: wp("50%"),paddingLeft:10}}>
               <Text style={{fontWeight:"bold",color:"#000"}}>Extras</Text>
              </View>
              <View style={{width: wp("15%")}}>
              <Text style={{fontWeight:"bold",color:"#000"}}>11</Text>
              </View>
              <View style={{width: wp("35%")}}>
              <Text style={{fontSize: hp(1.5),color:"#000"}}>B 4, LB 2, W 5, NB 0, P 0</Text>
              </View>
        </View>

        <View style={{width: wp("95%"),flexDirection:"row",paddingTop:5,display:"flex",alignItems:"center"}}>
            <View style={{width: wp("50%")}}>
                  <Text style={{fontWeight:"bold",color:"#000"}}>Total</Text>
            </View>
            <View style={{width: wp("40%"),flexDirection:"row",display:"flex",justifyContent:"flex-end",gap:5}}>
            <Text style={{fontWeight:"bold",color:"#000",fontSize: hp(1.7)}}>175/9</Text>
              <Text style={{fontWeight:"bold",color:"#000",fontSize: hp(1.7)}}>(20)</Text>
            </View>
        </View>

        <View style={{width:"100%",flexDirection:"column",paddingTop:5,display:"flex",alignItems:"center",borderBottomWidth:1.5,borderColor:"#979797"}}>
        <View style={{width:"95%",flexDirection:"row",paddingTop:5,display:"flex",alignItems:"center"}}>
          <Text style={{fontWeight:"bold",color:"#000"}}>Yet to bat</Text>
        </View>

        <View style={{width:"100%",flexDirection:"column",paddingTop:5,display:"flex"}}>
                  <View style={{flexDirection:"row",alignItems:"center"}}>
                  <View>
                       <Image source={require('../../../../../assets/players/ravindra-jadeja.png')} style={{height:50,width:50}}/> 
                    </View>
                    
                      <View >
                      <Text style={{fontWeight:"bold",color:"#000"}}>R Gaikward</Text>
                      </View>
                  </View>
        </View>
        </View>

        <View style={{width:wp("100%"),flexDirection:"column",justifyContent:"center",alignItems:"center",gap:6}}>
        <View style={{width:wp("100%"),flexDirection:"row",paddingLeft:5,paddingRight:5,backgroundColor:"#eeeeee"}}>
                <View style={{width: wp("45%")}}>
                <Text style={{fontSize: hp(1.6),color:"#000"}}>Bowler</Text>
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize: hp(1.6),color:"#000"}}>O</Text>
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize: hp(1.6),color:"#000"}}>M</Text>
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize: hp(1.6),color:"#000"}}>R</Text>
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize: hp(1.6),color:"#000"}}>W</Text>
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize: hp(1.6),color:"#000"}}>ER</Text>
                </View> 
                
        </View>
        <View style={{width: wp("100%"),flexDirection:"row",display:"flex",alignItems:"center",borderBottomWidth:1,borderColor:"#979797",paddingLeft:5,paddingRight:5,backgroundColor:"#E4E8FF"}}>
                <View style={{width: wp("45%"),flexDirection:"row",gap:5}}>
                  <View>
                       <Image source={require('../../../../../assets/players/ravindra-jadeja.png')} style={{height:50,width:50}}/> 
                    </View>
                    
                      <View style={{justifyContent:"center"}}>
                      <Text style={{fontWeight:"bold",color:"#000"}}>R Gaikward</Text>
                      </View>
                  
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize: hp(1.6),color:"#000"}}>4</Text>
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize: hp(1.6),color:"#000"}}>0</Text>
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize: hp(1.6),color:"#000"}}>24</Text>
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize: hp(1.6),color:"#000"}}>2</Text>
                </View>
                <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize: hp(1.6),color:"#000"}}>6</Text>
                </View> 
                
        </View>
        <View style={{width: wp("100%"),flexDirection:"row",display:"flex",alignItems:"center",borderBottomWidth:1,borderColor:"#979797",paddingLeft:5,paddingRight:5,backgroundColor:"#E4E8FF"}}>
        <View style={{width: wp("45%"),flexDirection:"row",gap:5}}>
          <View>
               <Image source={require('../../../../../assets/players/ravindra-jadeja.png')} style={{height:50,width:50}}/> 
            </View>
            
              <View style={{justifyContent:"center"}}>
              <Text style={{fontWeight:"bold",color:"#000"}}>R Gaikward</Text>
              </View>
          
        </View>
        <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize: hp(1.6),color:"#000"}}>4</Text>
        </View>
        <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize: hp(1.6),color:"#000"}}>0</Text>
        </View>
        <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize: hp(1.6),color:"#000"}}>24</Text>
        </View>
        <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize: hp(1.6),color:"#000"}}>2</Text>
        </View>
        <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize: hp(1.6),color:"#000"}}>6</Text>
        </View> 
        
</View>
       </View>

        <View style={{width: wp("95%"),flexDirection:"column"}}>
        <View style={{width: wp("100%"),flexDirection:"row",paddingTop:5,display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#eeeeee"}}>
           <View style={{width: wp("50%")}}>
                <Text style={{fontWeight:"500",fontSize: hp(1.5), color:"#000"}}>Fall of Wickets</Text>
           </View>
           <View style={{width: wp("50%"),flexDirection:"row",display:"flex",justifyContent:"flex-end"}}>
             <View style={{width: wp("20%")}}>
                <Text style={{fontWeight:"400",color:"#000",}}>Score</Text>
             </View>
             <View style={{width:wp("25%"),flexDirection:"row",display:"flex",justifyContent:"center"}}>
             <Text style={{fontWeight:"400",color:"#000"}}>Over</Text>
             </View>
           </View>
        </View>
        <View style={{width:wp("100%"),flexDirection:"row",paddingTop:5,display:"flex",alignItems:"center",justifyContent:"center",paddingLeft:7}}>
           <View style={{width:wp("50%"),}}>
                <Text style={{fontWeight:"500",color:"#000",fontSize: hp(1.5)}}>R Ravindra</Text>
           </View>
           <View style={{width:wp("50%"),flexDirection:"row",display:"flex",justifyContent:"flex-end"}}>
             <View style={{width: wp("20%")}}>
                <Text style={{fontWeight:"500",color:"#000",fontSize: hp(1.5)}}>64/1</Text>
             </View>
             <View style={{width:wp("25%"),flexDirection:"row",display:"flex",justifyContent:"center"}}>
             <Text style={{fontWeight:"500",color:"#000",fontSize: hp(1.5)}}>6.3</Text>
             </View>
           </View>
        </View>

        <View style={{width:wp("100%"),flexDirection:"row",paddingTop:5,display:"flex",alignItems:"center",justifyContent:"center",paddingLeft:7}}>
        <View style={{width:wp("50%"),}}>
             <Text style={{fontWeight:"500",color:"#000",fontSize: hp(1.5)}}>R Ravindra</Text>
        </View>
        <View style={{width:wp("50%"),flexDirection:"row",display:"flex",justifyContent:"flex-end"}}>
          <View style={{width: wp("20%")}}>
             <Text style={{fontWeight:"500",color:"#000",fontSize: hp(1.5)}}>64/1</Text>
          </View>
          <View style={{width:wp("25%"),flexDirection:"row",display:"flex",justifyContent:"center"}}>
          <Text style={{fontWeight:"500",color:"#000",fontSize: hp(1.5)}}>6.3</Text>
          </View>
        </View>
     </View>
        </View>
       </View>
   
      }
      </Pressable>
     
      <Pressable onPress={() => setDropSecond(!dropSecond)} style={{width:"100%",flexDirection:"column",display:"flex",justifyContent:"center",borderWidth:1.5,borderRadius:5,borderColor:"#cccccc",marginTop:4}}>
      <View style={{width:"95%",flexDirection:"row",display:"flex",justifyContent:"space-between",padding:10}}>
             <Text  style={{fontWeight:"400",color:"#000",fontSize: hp(1.8)}}>Chennai Super Kings</Text>
             <View style={{flexDirection:"row",gap:5,alignItems:"center"}}>
             <Text style={{fontWeight:"bold",color:"#000",fontSize: hp(1.7)}}>179/9 (20)</Text>
             <Pressable onPress={() => setDropSecond(!dropSecond)}>
              {
                dropSecond ? <AntDesign name="up" size={16} color="black" />:<AntDesign name="down" size={15} color="black" />
              }
             </Pressable>
            
             </View>
      </View>
      {
        dropSecond && <View style={{width:wp("100%"),flexDirection:"column",display:"flex",alignItems:"center",gap:15,paddingBottom:5}}>
<View style={{width:wp("100%"),flexDirection:"column",justifyContent:"center",alignItems:"center",gap:6}}>
<View style={{width:wp("100%"),flexDirection:"row",paddingLeft:5,paddingRight:5,backgroundColor:"#eeeeee",paddingBottom:8}}>
      <View style={{width: wp("45%")}}>
         <Text style={{fontSize: hp(1.6),color:"#000"}}>Batter</Text>
      </View>
      <View style={{width:wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize: hp(1.6),color:"#000"}}>R</Text>
      </View>
      <View style={{width:wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize: hp(1.6),color:"#000"}}>B</Text>
      </View>
      <View style={{width:wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize: hp(1.6),color:"#000"}}>4s</Text>
      </View>
      <View style={{width:wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize: hp(1.6),color:"#000"}}>6s</Text>
      </View>
      <View style={{width:wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize: hp(1.6),color:"#000"}}>SR</Text>
      </View> 
      
</View>

<View style={{width: wp("100%"),flexDirection:"row",paddingTop:5,display:"flex",alignItems:"center",borderBottomWidth:1,borderColor:"#979797",paddingLeft:5,paddingRight:5,backgroundColor:"#E4E8FF"}}>
      <View style={{width: wp("45%"),flexDirection:"row",gap:5}}>
          <View >
             <Image source={require('../../../../../assets/players/ravindra-jadeja.png')} style={{height:50,width:50}}/> 
          </View>
          <View style={{flexDirection:"column"}}>
            <View style={{flexDirection:"row",gap:3}}>
            <Text style={{fontWeight:"600",color:"#000"}}>R Gaikwad</Text>
            {
                Captain && <Text style={{fontWeight:"bold",color:"#000"}}>(C)</Text>
            }
            </View>
            <View>
              <Text style={{fontSize: hp(1.5)}}>b M Siraj</Text>
            </View>

          </View>
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text  style={{fontSize: hp(1.6),color:"#000"}}>40</Text>
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text  style={{fontSize: hp(1.6),color:"#000"}}>24</Text>
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text  style={{fontSize: hp(1.6),color:"#000"}}>3</Text>
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text  style={{fontSize: hp(1.6),color:"#000"}}>2</Text>
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text  style={{fontSize: hp(1.6),color:"#000"}}>180</Text>
      </View> 
      
</View>

<View style={{width: wp("100%"),flexDirection:"row",display:"flex",alignItems:"center",borderBottomWidth:1,borderColor:"#979797",paddingLeft:5,paddingRight:5,backgroundColor:"#E4E8FF"}}>
      <View style={{width: wp("45%"),flexDirection:"row",gap:5}}>
          <View >
             <Image source={require('../../../../../assets/players/ravindra-jadeja.png')} style={{height:50,width:50}}/> 
          </View>
          <View style={{flexDirection:"column"}}>
            <View style={{flexDirection:"row",gap:3}}>
            <Text style={{fontWeight:"600",color:"#000"}}>R Gaikwad</Text>
            {
                Captain && <Text style={{fontWeight:"bold",color:"#000"}}>(C)</Text>
            }
            </View>
            <View>
              <Text style={{fontSize: hp(1.5)}}>b M Siraj</Text>
            </View>

          </View>
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text  style={{fontSize: hp(1.6),color:"#000"}}>40</Text>
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text  style={{fontSize: hp(1.6),color:"#000"}}>24</Text>
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text  style={{fontSize: hp(1.6),color:"#000"}}>3</Text>
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text  style={{fontSize: hp(1.6),color:"#000"}}>2</Text>
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text  style={{fontSize: hp(1.6),color:"#000"}}>180</Text>
      </View> 
      
</View>
</View>



<View style={{width: wp("100%"),flexDirection:"row",paddingTop:5,display:"flex",alignItems:"center"}}>
    <View style={{width: wp("50%"),paddingLeft:10}}>
     <Text style={{fontWeight:"bold",color:"#000"}}>Extras</Text>
    </View>
    <View style={{width: wp("15%")}}>
    <Text style={{fontWeight:"bold",color:"#000"}}>11</Text>
    </View>
    <View style={{width: wp("35%")}}>
    <Text style={{fontSize: hp(1.5),color:"#000"}}>B 4, LB 2, W 5, NB 0, P 0</Text>
    </View>
</View>

<View style={{width: wp("95%"),flexDirection:"row",paddingTop:5,display:"flex",alignItems:"center"}}>
  <View style={{width: wp("50%")}}>
        <Text style={{fontWeight:"bold",color:"#000"}}>Total</Text>
  </View>
  <View style={{width: wp("40%"),flexDirection:"row",display:"flex",justifyContent:"flex-end",gap:5}}>
  <Text style={{fontWeight:"bold",color:"#000",fontSize: hp(1.7)}}>175/9</Text>
    <Text style={{fontWeight:"bold",color:"#000",fontSize: hp(1.7)}}>(20)</Text>
  </View>
</View>

<View style={{width:"100%",flexDirection:"column",paddingTop:5,display:"flex",alignItems:"center",borderBottomWidth:1.5,borderColor:"#979797"}}>
<View style={{width:"95%",flexDirection:"row",paddingTop:5,display:"flex",alignItems:"center"}}>
<Text style={{fontWeight:"bold",color:"#000"}}>Yet to bat</Text>
</View>

<View style={{width:"100%",flexDirection:"column",paddingTop:5,display:"flex"}}>
        <View style={{flexDirection:"row",alignItems:"center"}}>
        <View>
             <Image source={require('../../../../../assets/players/ravindra-jadeja.png')} style={{height:50,width:50}}/> 
          </View>
          
            <View >
            <Text style={{fontWeight:"bold",color:"#000"}}>R Gaikward</Text>
            </View>
        </View>
</View>
</View>

<View style={{width:wp("100%"),flexDirection:"column",justifyContent:"center",alignItems:"center",gap:6}}>
<View style={{width:wp("100%"),flexDirection:"row",paddingLeft:5,paddingRight:5,backgroundColor:"#eeeeee"}}>
      <View style={{width: wp("45%")}}>
      <Text style={{fontSize: hp(1.6),color:"#000"}}>Bowler</Text>
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize: hp(1.6),color:"#000"}}>O</Text>
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize: hp(1.6),color:"#000"}}>M</Text>
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize: hp(1.6),color:"#000"}}>R</Text>
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize: hp(1.6),color:"#000"}}>W</Text>
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize: hp(1.6),color:"#000"}}>ER</Text>
      </View> 
      
</View>
<View style={{width: wp("100%"),flexDirection:"row",display:"flex",alignItems:"center",borderBottomWidth:1,borderColor:"#979797",paddingLeft:5,paddingRight:5,backgroundColor:"#E4E8FF"}}>
      <View style={{width: wp("45%"),flexDirection:"row",gap:5}}>
        <View>
             <Image source={require('../../../../../assets/players/ravindra-jadeja.png')} style={{height:50,width:50}}/> 
          </View>
          
            <View style={{justifyContent:"center"}}>
            <Text style={{fontWeight:"bold",color:"#000"}}>R Gaikward</Text>
            </View>
        
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize: hp(1.6),color:"#000"}}>4</Text>
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize: hp(1.6),color:"#000"}}>0</Text>
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize: hp(1.6),color:"#000"}}>24</Text>
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize: hp(1.6),color:"#000"}}>2</Text>
      </View>
      <View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize: hp(1.6),color:"#000"}}>6</Text>
      </View> 
      
</View>
<View style={{width: wp("100%"),flexDirection:"row",display:"flex",alignItems:"center",borderBottomWidth:1,borderColor:"#979797",paddingLeft:5,paddingRight:5,backgroundColor:"#E4E8FF"}}>
<View style={{width: wp("45%"),flexDirection:"row",gap:5}}>
<View>
     <Image source={require('../../../../../assets/players/ravindra-jadeja.png')} style={{height:50,width:50}}/> 
  </View>
  
    <View style={{justifyContent:"center"}}>
    <Text style={{fontWeight:"bold",color:"#000"}}>R Gaikward</Text>
    </View>

</View>
<View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
<Text style={{fontSize: hp(1.6),color:"#000"}}>4</Text>
</View>
<View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
<Text style={{fontSize: hp(1.6),color:"#000"}}>0</Text>
</View>
<View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
<Text style={{fontSize: hp(1.6),color:"#000"}}>24</Text>
</View>
<View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
<Text style={{fontSize: hp(1.6),color:"#000"}}>2</Text>
</View>
<View style={{width: wp("10%"),justifyContent:"center",alignItems:"center"}}>
<Text style={{fontSize: hp(1.6),color:"#000"}}>6</Text>
</View> 

</View>
</View>

<View style={{width: wp("95%"),flexDirection:"column"}}>
<View style={{width: wp("100%"),flexDirection:"row",paddingTop:5,display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#eeeeee"}}>
 <View style={{width: wp("50%")}}>
      <Text style={{fontWeight:"500",fontSize: hp(1.5), color:"#000"}}>Fall of Wickets</Text>
 </View>
 <View style={{width: wp("50%"),flexDirection:"row",display:"flex",justifyContent:"flex-end"}}>
   <View style={{width: wp("20%")}}>
      <Text style={{fontWeight:"400",color:"#000",}}>Score</Text>
   </View>
   <View style={{width:wp("25%"),flexDirection:"row",display:"flex",justifyContent:"center"}}>
   <Text style={{fontWeight:"400",color:"#000"}}>Over</Text>
   </View>
 </View>
</View>
<View style={{width:wp("100%"),flexDirection:"row",paddingTop:5,display:"flex",alignItems:"center",justifyContent:"center",paddingLeft:7}}>
 <View style={{width:wp("50%"),}}>
      <Text style={{fontWeight:"500",color:"#000",fontSize: hp(1.5)}}>R Ravindra</Text>
 </View>
 <View style={{width:wp("50%"),flexDirection:"row",display:"flex",justifyContent:"flex-end"}}>
   <View style={{width: wp("20%")}}>
      <Text style={{fontWeight:"500",color:"#000",fontSize: hp(1.5)}}>64/1</Text>
   </View>
   <View style={{width:wp("25%"),flexDirection:"row",display:"flex",justifyContent:"center"}}>
   <Text style={{fontWeight:"500",color:"#000",fontSize: hp(1.5)}}>6.3</Text>
   </View>
 </View>
</View>

<View style={{width:wp("100%"),flexDirection:"row",paddingTop:5,display:"flex",alignItems:"center",justifyContent:"center",paddingLeft:7}}>
<View style={{width:wp("50%"),}}>
   <Text style={{fontWeight:"500",color:"#000",fontSize: hp(1.5)}}>R Ravindra</Text>
</View>
<View style={{width:wp("50%"),flexDirection:"row",display:"flex",justifyContent:"flex-end"}}>
<View style={{width: wp("20%")}}>
   <Text style={{fontWeight:"500",color:"#000",fontSize: hp(1.5)}}>64/1</Text>
</View>
<View style={{width:wp("25%"),flexDirection:"row",display:"flex",justifyContent:"center"}}>
<Text style={{fontWeight:"500",color:"#000",fontSize: hp(1.5)}}>6.3</Text>
</View>
</View>
</View>
</View>
</View>

}
</Pressable>
    </View>


   
    </ScrollView>


    
  )
}

export default Scoreboard

const styles = StyleSheet.create({})