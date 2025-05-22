import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Entypo from "react-native-vector-icons/Entypo";

const EditPhoneNumber = () => {
  return (
    <View
    style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      justifyContent: 'center',
      alignItems:"center"
    }}
  >
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "flex-start",
        padding:10,
        paddingLeft:17
      }}
    >
      <Text style={{color:"#000"}}>Enter your new Mobile Number</Text>
    </View>
    <View style={{display:"flex",flexDirection: 'row',width:"90%",justifyContent:"flex-start",alignItems:"center",borderBottomWidth:2,gap:5}}>
    <Entypo name="mobile" size={18} color="black" />
      <View style={{display:"flex",flexDirection: 'column',width:"100%",}}>
      <TextInput style={{width:"100%"}} />
      </View>
      
    </View>
    <View style={{display:"flex",width:"100%",justifyContent: 'center',alignItems:"center",borderRadius:5,paddingTop:20}}>
    <Pressable style={{display:"flex",width:"90%",backgroundColor:"#3e57c4",justifyContent: 'center',alignItems:"center",borderRadius:5,padding:10}}>
    <Text style={{color:"#fff",fontWeight:"bold"}}>Get OTP</Text>
    </Pressable>
    </View>
  </View>
  )
}

export default EditPhoneNumber

const styles = StyleSheet.create({})