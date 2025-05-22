import { Modal, Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch } from "react-redux";
import { resetFinalPlayerSelected } from "../Redux/Slice";
 
const DiscardPopup = ({ visible, onClose, onDiscard, reset }) => {
const navigation = useNavigation();
const dispatch = useDispatch();
 
return (
<Modal
animationType="slide"
transparent={true}
visible={visible}
onRequestClose={onClose}
>
<Pressable
style={{
flex: 1,
justifyContent: 'flex-end',
alignItems: 'center',
backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
Go Back ?
</Text>
<Image source={require('../../assets/Discard.png')} style={{ width: wp('35%'), height: hp("18%") }} resizeMode='contain' />
 
<View style={{ alignItems: 'center', marginBottom: 20 }}>
<Text style={{ fontSize: hp(1.6), fontWeight: "500", color: "#000" }}>This team will not be saved!</Text>
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
  dispatch(resetFinalPlayerSelected());
onDiscard();

navigation.goBack();
}}
style={{
width: wp('90%'),
padding: 10,
alignItems: 'center',
flexDirection: "row",
justifyContent: "center",
}}
>
<Text style={{ fontWeight: 'bold', fontSize: hp(1.5), color: "#FFF" }}>DISCARD TEAM</Text>
</Pressable>
</LinearGradient>
</View>
<View style={{ padding: 8 }}>
<Pressable
onPress={onClose} // Close the modal when pressed
style={{
width: wp('90%'),
borderColor: "#D8DDF3",
padding: 10,
alignItems: 'center',
borderRadius: 5,
borderWidth: 1,
flexDirection: "row",
justifyContent: "center",
backgroundColor: "#D8DDF3",
}}
>
<Text style={{ fontWeight: 'bold', fontSize: hp(1.5), color: "#3e57c4" }}>
CONTINUE EDITING
</Text>
</Pressable>
</View>
</Pressable>
</Pressable>
</Modal>
);
};


export default DiscardPopup;
 
const styles = StyleSheet.create({});