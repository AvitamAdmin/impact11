import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import AnimatedNumbers from "react-native-animated-numbers";
import { api } from "../../envfile/api";

const WalletBalance = () => {
    const [userDetails, setUserDetails] = useState({balance: 0});

    useEffect(() => {
      getReferalCodeData();
    }, []);
  
    const getReferalCodeData = async () => {
      try {
        // console.log('Hitting API...');
        const token = await AsyncStorage.getItem('jwtToken');
        const recordId = await AsyncStorage.getItem('userId');
  
        if (!token) {
          // console.log('No token found in AsyncStorage');
          return;
        }
  
        // console.log('Token:', token);
        const body = {recordId};
  
        const response = await axios.post(`${api}/admin/user/getUserById`, body, {
          headers: {Authorization: `Bearer ${token}`},
        });
  
        // console.log('Full API Response:', response.data);
  
        if (response.data?.userDtoList?.length > 0) {
          setUserDetails(response.data?.userDtoList[0]);
          // console.log(
          //   response.data?.userDtoList[0],
          //   'response.data?.userDtoList[0]',
          // );
        } else {
          // console.log('No referral code found in response');
        }
      } catch (error) {
        // console.log(
        //   'API Error:',
        //   error.response ? error.response.data : error.message,
        // );
      }
    };
  return (
    <View style={{backgroundColor:"#f27",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
      <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "bold", }}>
         <AnimatedNumbers animateToNumber={userDetails.balance || 0} fontStyle={{ fontSize: 14, color: "#FFFFFF" }} />
      </Text>
    </View>
  );
};

export default WalletBalance;
