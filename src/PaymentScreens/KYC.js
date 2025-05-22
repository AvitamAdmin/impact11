import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Email } from '@mui/icons-material';
import axios from 'axios';
import { api } from '../envfile/api';

const KYC = () => {
  const navigation = useNavigation();

  const [verifyEmail, setverifyEmail] = useState(false);
  const [verifyMobile, setverifyMobile] = useState(false);

  useEffect(() => {
    
  verifyemail();
    
  }, [])
  

  const verifyemail = async() =>{
    try {
      const token = await AsyncStorage.getItem('jwtToken');

      const userId = await AsyncStorage.getItem('userId');
      console.log("userId:",userId);
      
      const body={
        recordId : userId
      }
       const response = await axios.post(
        `${api}/admin/user/getUserById`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const userDetails = response.data.userDtoList
     console.log("details:",response.data.userDtoList);
     
      if(userDetails[0].isEmail){
        setverifyEmail(true)
      }
      if(userDetails[0].isMobile){
        setverifyMobile(true)
      }
  
    } catch (error) {
      
    }
  }
   

  
  return (
    <View style={{padding:10,flexDirection:"column",gap:10}}>
      <Pressable 
      onPress={()=>{
        !verifyMobile && navigation.navigate("VerifyMobileNumber")
      }}
      style={{display:"flex",
                    flexDirection:"row",
                    width:"100%",
                    justifyContent:"space-between",
                    padding:10,
                    alignItems:"center",
                    backgroundColor:"#fff",
                    borderWidth:1,
                    borderRadius:5,
                    borderColor:"#949494"}}>
        <View style={{display:"flex",flexDirection:"row",gap:15,alignItems:"center"}}>
        <View>
        <FontAwesome5 name="mobile-alt" size={25} color="black" />
        </View>
        <View style={{paddingLeft:20}}>
          <Text style={{color:"#000",fontWeight:"bold"}}>Mobile Number</Text>
          <Text style={{fontSize:hp(1.5),fontWeight:"bold"}}>9874561230</Text>
        </View>
        </View>
        <View>
          {
            verifyMobile ?  <Pressable style={{padding:5,backgroundColor:"#c4ebd4",borderRadius:5,paddingLeft:15,paddingRight:15}}>
          <Text style={{color:"#37b469"}}>Verifed</Text>
          </Pressable> :  <View style={{padding:5,backgroundColor:"#37b469",borderRadius:5,paddingLeft:20,paddingRight:20}}>
          <Text style={{color:"#fff"}}>Verify</Text>
          </View>
          }
        </View>
      </Pressable>

      <Pressable
       onPress={()=>{
        !verifyEmail && navigation.navigate("VerifyEmail")
       }}
       style={{display:"flex",
                    flexDirection:"row",
                    width:"100%",
                    justifyContent:"space-between",
                    padding:10,
                    alignItems:"center",
                    backgroundColor:"#fff",
                    borderWidth:1,
                    borderRadius:5,
                    borderColor:"#949494"}}>
        <View style={{display:"flex",flexDirection:"row",gap:25,alignItems:"center"}}>
        <View>
        <Fontisto name="email" size={22} color="black" />
        </View>
        <View style={{paddingLeft:7}}>
          <Text style={{color:"#000",fontWeight:"bold"}}>Email Address</Text>
          <Text style={{fontSize:hp(1.5),fontWeight:"bold"}}>example@gmail.com</Text>
        </View>
        </View>
        <View>
          {
            verifyEmail ?  <Pressable style={{padding:5,backgroundColor:"#c4ebd4",borderRadius:5,paddingLeft:15,paddingRight:15}}>
          <Text style={{color:"#37b469"}}>Verifed</Text>
          </Pressable> :  <View style={{padding:5,backgroundColor:"#37b469",borderRadius:5,paddingLeft:15,paddingRight:15}}>
          <Text style={{color:"#fff"}}>Verify</Text>
          </View>
          }
         
        </View>
      </Pressable>

      <View style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"space-between",padding:10,alignItems:"center",backgroundColor:"#fff",borderWidth:1,borderRadius:5,borderColor:"#949494"}}>
        <View style={{display:"flex",flexDirection:"row",gap:25,alignItems:"center"}}>
        <View>
        <FontAwesome5 name="address-card" size={24} color="black" />
        </View>
        <View style={{padding:1}}>
          <Text style={{color:"#000",fontWeight:"bold"}}>PAN Card</Text>
          <Text  style={{fontSize:hp(1.5),fontWeight:"bold",color:"#000"}}>OD*******8E</Text>
        </View>
        </View>
        <View>
          <Pressable 
            onPress={() => navigation.navigate("Verify PAN Card")}
            style={{padding:5,backgroundColor:"#37b469",borderRadius:5,paddingLeft:20,paddingRight:20}}>
            <Text style={{color:"#fff"}}>Verify</Text>
          </Pressable>
        </View>
      </View>

      <View style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"space-between",padding:10,alignItems:"center",backgroundColor:"#fff",borderWidth:1,borderRadius:5,borderColor:"#949494"}}>
        <View style={{display:"flex",flexDirection:"row",gap:25,alignItems:"center"}}>
        <View>
        <MaterialCommunityIcons name="bank-outline" size={24} color="black" />
        </View>
        <View>
          <Text style={{color:"#000",fontWeight:"bold"}}>Bank Account</Text>
          <Text  style={{fontSize:hp(1.5),fontWeight:"bold"}}>*********8135</Text>
        </View>
        </View>
        <View>
          <Pressable 
          onPress={() => navigation.navigate("Verify Bank Account")}
          style={{padding:5,backgroundColor:"#37b469",borderRadius:5,paddingLeft:20,paddingRight:20}}>
            <Text style={{color:"#fff"}}>Verify</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default KYC

const styles = StyleSheet.create({})
