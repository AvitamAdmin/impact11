import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { profileImage } = route.params; // Get the image data

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <AntDesign name="close" size={30} color="white" />
      </TouchableOpacity>

      {/* Full-Screen Image */}
      <Image
        source={
          profileImage
            ? { uri: `data:image/jpeg;base64,${profileImage}` }
            : require("../../assets/ProfileImpact.jpg")
        }
        style={styles.fullImage}
        resizeMode="contain"
      />
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "95%",
    height: "80%",
    borderRadius:45
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
});
