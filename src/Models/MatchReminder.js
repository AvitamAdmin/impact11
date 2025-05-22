import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Switch } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";

  const MatchReminder = ({ visible, onClose }) => {

    const [Enable , setEnable]  = useState(false); 
    const [twenty , setTwenty]  = useState(false); 
    const [thirty , setThirty]  = useState(false); 

    const toggle = (state)=>{ 
      setEnable(state); 
      
    }
    const toggle2 = (state)=>{ 
      setTwenty(state)
    }
    const toggle3 = (state)=>{ 
      setThirty(state)
    }

    const navigation = useNavigation();
    
    return (
      <Modal animationType="fade"
      transparent={true}
      visible={visible}>

        <Pressable 
        style={{
          width: wp("100%"),
          height: hp("100%"),
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        }}
        onPress={onClose}
      >
        <View
          style={{
            height: hp("42%"),
            backgroundColor: "#fff",
            width: wp("85%"),
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,

          }}
        >
          <View
            style={{
              width: wp("85%"),
              height: hp("100%"),
              justifyContent: "flex-start",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",padding:5

            }}
          >
            <View
              style={{
                width: wp("80%"),
                justifyContent: "space-between",
                alignItems: "flex-start",
                display: "flex",
                flexDirection: "row",
                padding: 4
              }}
            >
              <Ionicons
                name="close"
                size={30}
                color="#fff"
                style={{ opacity: 0 }}
              />
              <View>
                <MaterialCommunityIcons
                  name="bell-circle"
                  size={72}
                  color="#3e57c4"
                />
              </View>
              <Pressable onPress={onClose}>
                <Ionicons name="close" size={25} color="black" />
              </Pressable>
            </View>
            <View
              style={{
                width: wp("100%"),
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "600",color:"#000" }}>
                Match Reminder
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                width: wp("100%"),
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              <View
                style={{
                  width: wp("75%"),
                  justifyContent: "space-between",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row",
                  height: hp("6%"),
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "500",color:"#000" }}>
                  Before 30 Minutes
                </Text>
                <View>
                <Switch 
                trackColor={{ false: "#c0c0c0", true: "#c0c0c0" }} 
                thumbColor={Enable ? "#3e57c4" : "#000"} 
                onValueChange={toggle} 
                value={Enable} 
              />
                </View>
              </View>
              <View
                style={{
                  width: wp("75%"),
                  justifyContent: "space-between",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row",
                  height: hp("5%"),
                }}
              >
              <Text style={{ fontSize: 16, fontWeight: "500",color:"#000" }}>
                  Before 20 Minutes
                </Text>
                <View>
                <Switch 
                trackColor={{ false: "#c0c0c0", true: "#c0c0c0" }} 
                thumbColor={twenty ? "#3e57c4" : "#000"} 
                onValueChange={toggle2} 
                value={twenty} 
              />
                </View>
              </View>
              <View
                style={{
                  width: wp("75%"),
                  justifyContent: "space-between",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row",
                  height: hp("6%"),
                }}
              >
              <Text style={{ fontSize: 16, fontWeight: "500",color:"#000" }}>
                  Before 15 Minutes
                </Text>
                <View>
                <Switch 
                trackColor={{ false: "#c0c0c0", true: "#c0c0c0" }} 
                thumbColor={thirty ? "#3e57c4" : "#000"} 
                onValueChange={toggle3} 
                value={thirty} 
              />
                </View>
              </View>
            </View>

<View style={{padding:15}}>
            <Pressable
              style={{
                width: wp("75%"),
                padding: 8,
                backgroundColor: "#3e57c4",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}>
                Set Reminder
              </Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
      </Modal>
    );
  };

  export default MatchReminder;

  const styles = StyleSheet.create({});