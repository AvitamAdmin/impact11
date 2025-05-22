import { Modal, Pressable, StyleSheet, Text, View, Image, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch } from "react-redux";
import { navigationRef } from "../../Navigation";
 
const TimeExpiredPopup = ({ visible, onClose, onDiscard, reset }) => {
const navigation = useNavigation();
const dispatch = useDispatch();

useEffect(() => {
  if (!visible) return;

  const backAction = () => {
    onDiscard(); // same as clicking button
    navigation.navigate('DrawerNavigation');
    return true; // prevent default back behavior
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction
  );

  return () => backHandler.remove(); // cleanup
}, [visible]);

  
 
return (
<Modal
// animationType="slide"
transparent={true}
visible={visible}
// onRequestClose={onClose}
 onRequestClose={() => {
    onDiscard();
    navigation.navigate('DrawerNavigation');
  }}
>
<View
style={{
flex: 1,
justifyContent: 'flex-end',
alignItems: 'center',
backgroundColor: 'rgba(0, 0, 0, 0.6)',
}}
onPress={onClose}
>
<Pressable
style={{
width: '100%',
backgroundColor: 'white',
borderTopLeftRadius: 10,
borderTopRightRadius: 10,
padding: 20,
alignItems: 'center',
elevation: 5,
}}
>
<Text style={{
fontSize: hp(2.1),
color: "#000",
marginBottom: 10,
fontWeight: "600"
}}>
Time Expired !
</Text>
<Image source={require('../../assets/Discard.png')} style={{ width: wp('35%'), height: hp("18%") }} resizeMode='contain' />
 
<View style={{ alignItems: 'center', marginBottom: 20 }}>
<Text style={{ fontSize: hp(1.6), fontWeight: "500", color: "#000" }}>You can't create a team and join contests</Text>
</View>
<View style={{ padding: 5 }}>
<LinearGradient
style={{
justifyContent: "center",
alignItems: "center",
borderRadius: 5,
}}
colors={["#3b53bd", "#243373", "#192451"]}
start={{ x: 0, y: 0.5 }}
end={{ x: 1, y: 0.5 }}
>
<Pressable
onPress={() => {
 
onDiscard();

navigation.navigate('DrawerNavigation');
}}
style={{
width: wp('90%'),
padding: 10,
alignItems: 'center',
flexDirection: "row",
justifyContent: "center",
}}
>
<Text style={{ fontWeight: 'bold', fontSize: hp(1.5), color: "#FFF" }}>VIEW UPCOMING MATCHES</Text>
</Pressable>
</LinearGradient>
</View>

</Pressable>
</View>
</Modal>
);
};


export default TimeExpiredPopup;
 
const styles = StyleSheet.create({});