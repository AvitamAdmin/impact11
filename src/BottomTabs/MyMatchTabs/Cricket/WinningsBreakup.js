// import React from "react";
// import { View,Text, Pressable, Dimensions,Image } from "react-native";
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,o
//   } from 'react-native-responsive-screen';
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import LinearGradient from 'react-native-linear-gradient';

// const WinningsBreakup = () => {  

//     const screenWidth = Dimensions.get('window').width;
  
//     const isTablet = screenWidth >= 768;

//     return (

//         <View style={{flex: 1,}}>
//         <View style={{ backgroundColor: "#2d2d2d",  display: "flex", flexDirection: 'row', padding: 15,height: hp("8%"),  }}>
      
//       <Pressable nPress={() => navigation.goBack()}>
//       <MaterialCommunityIcons
//       name="close"
//       size={23}
//       color="#fff"
//     />      
//             </Pressable>
//             <View style={{ display: "flex", flexDirection: 'column', width: wp("85%") ,gap:5 }}>
//               <Text style={{ fontWeight: "500", color: '#fff', fontSize: hp(1.7),textAlign:"center"  }}>
//               Winnings Breakup
//               </Text>
//               <Text style={{ fontSize: hp(1.4) , color: "#fff",textAlign:"center" }}>
//               CSK vs RCB
//               </Text>
//             </View>
//     </View>


// <View  style={{
//           width: wp("100%"),
//           padding: 15,
//           flexDirection: "column",
//           height: hp("100%"),gap:13 
//         }}>
//     <View
//               style={{
//                width: isTablet ? wp('97%') : wp('93%'),
//                 flexDirection: "column",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}>  
    
//               <View
//                 style={{
//                   width: wp("93%"),
//                   flexDirection: "row",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}>
             
//                 <LinearGradient
//                   style={{
//                     flex: 1,
//                     borderRadius: 10,
//                   }}
//                   colors={["#3951B5", "#2D3F8F", "#1F2B61"]}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}>
    
//               <View
//                     style={{
//                       width: wp("92%"),
//                       flexDirection: "row",
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       padding: 10,}}>
    
//                   <View style={{ flexDirection: "row", gap: 14 }}>
//                       <View>
//                         <Image
//                           source={require("../../../../assets/WinningsTrophy.png")}
//                           style={{ height: 45, width: 45 }}/>
//                       </View>
//                       <View style={{ flexDirection: "column" }}>
//                         <Text style={{ color: "#fff", fontWeight: "bold",fontSize:hp(1.9)}}>
//                           Congratulations !
//                         </Text>
//                         <Text style={{ color: "#fff", fontSize:hp(1.5) }}>You’ve won in 1 Contest</Text>
//                       </View>
//                     </View>
      
//                     <View>
//                       <Text
//                         style={{ color: "#fff", fontWeight: "500", fontSize: hp(2.5) }}>
//                         ₹ 1000
//                       </Text>
//                     </View>
//                   </View>
                  
//                 </LinearGradient>
    
//                 </View>
      
//               </View> 

//               <View style={{gap:8,width: wp("100%")}}> 
//               <Text style= {{color:"#000" , fontWeight:"bold"}}>
//                  Contest Details
//               </Text>
//                <View style={{width: wp("93%"),display:"flex",flexDirection:"column",justifyContent:"center",gap:10,alignItems: "center",borderRadius:10,borderColor:"#BCBCBC",borderBottomWidth:1,borderTopWidth:1}}>
                  
//               <View style={{flexDirection:"column",gap:5,padding:10,width: wp("92%"),}}>
//                    <View style={{flexDirection:"row", width: isTablet ? wp('91%') : wp('87%'),display:"flex",justifyContent:"space-between"}}>
//                         <Text style={{fontSize: hp(1.5),fontWeight:"bold"}}>Prize Pool</Text>
//                         <Text style={{fontWeight:"bold",fontSize: hp(1.5),color:"#000"}}>Sports</Text>
//                         <Text style={{fontSize: hp(1.5),fontWeight:"bold",}}>Entry</Text>
//                    </View>
//                    <View style={{flexDirection:"row", width: isTablet ? wp('90%') : wp('86%'),display:"flex",justifyContent:"space-between"}}>
//                         <Text style={{fontWeight:"bold",fontSize: hp(1.5),color:"#000"}}>₹8 Crores</Text>
//                         <Text style={{fontSize: hp(1.5),color:"#000"}} >28,89,129 posts</Text>
//                         <Text style={{fontWeight:"bold",fontSize: hp(1.5),color:"#000"}}>₹39</Text>
//                    </View>
//                   </View>
//                   </View>
//               </View>

//               <View >
//       {/* Winning from Team Section */}
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding   : 8,
//           borderWidth: 1,
//           borderColor: "#cccccc",width: wp("91%")
          
//         }}
//       >
//         <Text style={{ fontSize: hp(1.6), color: "#000" }}>Winning from Team1</Text>
//         <Text style={{ fontSize: hp(2), fontWeight: "bold", color: "#000" }}>
//           ₹1000
//         </Text>
//       </View>

//       {/* Dashed Line Divider */}
//       <View
//         style={{
//           borderWidth: 1,
//           borderColor: "#cccccc",
//           borderStyle: "dashed",
//           marginVertical: 10,
//           width: wp("91%")
//         }}
//       />

//       {/* Total Contest Winnings Section */}
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: 8,
//           borderBottomWidth: 1,
//           borderColor: "#cccccc",
//         }}
//       >
//         <Text style={{ fontSize: hp(1.6), color: "#000" }}>
//           Total Contest Winnings
//         </Text>
//         <Text style={{ fontSize: hp(2), fontWeight: "bold", color: "#000"}}>
//           ₹1000
//         </Text>
//       </View>


  
//       <View>
//         <Text style={{ fontSize: hp(1.6), color: "#000" }}>
//           Total Contest Winnings
//         </Text>
//         <Text style={{ fontSize: hp(2), fontWeight: "bold", color: "#000"}}>
//           ₹1000
//         </Text>
//       </View>
//       </View>
//     </View>
//               </View>
           
//     )
// }

// export default WinningsBreakup;






import React from "react";
import { View, Text, Pressable, Dimensions, Image, ScrollView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";

const WinningsBreakup = () => {  
    const screenWidth = Dimensions.get('window').width;
    const isTablet = screenWidth >= 768;
     const navigation = useNavigation();

    return (
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        {/* Header Section */}
        <View style={{ backgroundColor: "#2d2d2d", display: "flex", flexDirection: 'row', padding: 15, height: hp("8%") }}>
          <Pressable  onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="close" size={23} color="#fff" />
          </Pressable>
          <View style={{ display: "flex", flexDirection: 'column', width: wp("85%"), gap: 5 }}>
            <Text style={{ fontWeight: "500", color: '#fff', fontSize: hp(1.7), textAlign: "center" }}>
              Winnings Breakup
            </Text>
            <Text style={{ fontSize: hp(1.4), color: "#fff", textAlign: "center" }}>
              CSK vs RCB
            </Text>
          </View>
        </View>

        {/* Main Scrollable Content */}
        <ScrollView contentContainerStyle={{ paddingBottom: hp("15%") }}>
          <View style={{ width: wp("100%"), padding: 15, flexDirection: "column", gap: 13 }}>
            <View style={{ width: isTablet ? wp('97%') : wp('93%'), flexDirection: "column", justifyContent: "center", alignItems: "center" }}>  
              <View style={{ width: wp("93%"), flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <LinearGradient
                  style={{ flex: 1, borderRadius: 10 }}
                  colors={["#3951B5", "#2D3F8F", "#1F2B61"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <View style={{ width: wp("92%"), flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10 }}>
                    <View style={{ flexDirection: "row", gap: 14 }}>
                      <Image source={require("../../../../assets/WinningsTrophy.png")} style={{ height: 45, width: 45 }} />
                      <View style={{ flexDirection: "column" }}>
                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: hp(1.9) }}>
                          Congratulations !
                        </Text>
                        <Text style={{ color: "#fff", fontSize: hp(1.5) }}>You’ve won in 1 Contest</Text>
                      </View>
                    </View>
                    <Text style={{ color: "#fff", fontWeight: "500", fontSize: hp(2.5) }}>
                      ₹1000
                    </Text>
                  </View>
                </LinearGradient>
              </View>
            </View> 

            <View style={{ gap: 8, width: wp("100%") }}> 
              <Text style={{ color: "#000", fontWeight: "bold" }}>
                Contest Details
              </Text>
              <View style={{ width: wp("93%"), flexDirection: "column", justifyContent: "center", gap: 10   , alignItems: "center", borderRadius: 10, borderColor: "#BCBCBC", borderBottomWidth: 1, borderTopWidth: 1 }}>
                <View style={{ flexDirection: "column", gap: 5, padding: 10, width: wp("92%") }}>
                  <View style={{ flexDirection: "row", width: isTablet ? wp('91%') : wp('87%'), justifyContent: "space-between" }}>
                    <Text style={{ fontSize: hp(1.5), fontWeight: "bold" }}>Prize Pool</Text>
                    <Text style={{ fontWeight: "bold", fontSize: hp(1.5), color: "#000" }}>Sports</Text>
                    <Text style={{ fontSize: hp(1.5), fontWeight: "bold" }}>Entry</Text>
                  </View>
                  <View style={{ flexDirection: "row", width: isTablet ? wp('90%') : wp('86%'), justifyContent: "space-between" }}>
                    <Text style={{ fontWeight: "bold", fontSize: hp(1.5), color: "#000" }}>₹8 Crores</Text>
                    <Text style={{ fontSize: hp(1.5), color: "#000" }}>28,89,129 posts</Text>
                    <Text style={{ fontWeight: "bold", fontSize: hp(1.5), color: "#000" }}>₹39</Text>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 7, borderWidth: 1, borderColor: "#cccccc", width: wp("91%") }}>
                <Text style={{ fontSize: hp(1.6), color: "#000" }}>Winning from Team1</Text>
                <Text style={{ fontSize: hp(2), fontWeight: "bold", color: "#000" }}>
                  ₹1000
                </Text>
              </View>

              <View style={{ borderWidth: 1, borderColor: "#cccccc", borderStyle: "dashed", marginVertical: 10, width: wp("91%") }} />

              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 9, borderBottomWidth: 1, borderColor: "#cccccc" }}>
                <Text style={{ fontSize: hp(1.6), color: "#000" }}>Total Contest Winnings</Text>
                <Text style={{ fontSize: hp(2), fontWeight: "bold", color: "#000" }}>
                  ₹1000
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Footer Section */}
        <View style={{ position: "absolute", bottom: 0, width: wp("100%"),padding: 14, borderTopWidth: 1, borderColor: "#cccccc",flexDirection:'row' ,justifyContent:"space-between"}}>
          <Text style={{ fontSize: hp(1.6), color: "#000" }}>Total Contest Winnings</Text>
          <Text style={{ fontSize: hp(2), fontWeight: "bold", color: "#000" }}>
            ₹1000
          </Text>
        </View>
      </View>
    );
};

export default WinningsBreakup;
