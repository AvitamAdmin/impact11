import React from "react";
import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Video from "react-native-video";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ImpactPlayer = ({ visible, onClose }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      {/* Pressable for the outer area (outside the modal content) */}
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        onPress={onClose} 
      >
        
        <View
          style={{
            width: wp("100%"),
            backgroundColor: "#fff",
            borderRadius: 15,
            alignItems: "center",
            height: hp("70%"),
            gap: 10,
          }}
          onStartShouldSetResponder={() => true} 
        >
        
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: hp("5%"),
              gap: 5,
            }}
          >
            <Text style={{ color: "#000", fontWeight: "700", fontSize: hp(1.8) }}>
              Who is an Impact Player?
            </Text>
          </View>

          {/* Video container */}
          <View
            style={{
              width: wp("90%"),
              height: "25%",
              alignItems: "center",
              borderRadius: 8,
            }}
          >
            <Video
              source={require("../../assets/AnimationVideo1.mp4")}
              style={{ width: "100%", height: "100%", borderRadius: 8 }}
              resizeMode="cover"
              controls={true}
            />
          </View>

          {/* Modal body content */}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: wp("100%"),
              alignItems: "center",
            }}
          >
            {/* Your existing content */}
          </View>

          {/* Divider */}
          <View
            style={{
              width: wp("90%"),
              height: 1,
              backgroundColor: "#000",
              alignSelf: "center",
            }}
          ></View>

          {/* Text content */}
          <View
            style={{
              display: "flex",
              padding: 10,
              backgroundColor: "#f2f2f2",
              gap: 40,
              borderRadius: 8,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
                width: wp("88%"),
              }}
            >
              <Text style={{ color: "#000", fontWeight: "500", fontSize: hp(1.6) }}>
                After the match ends, the fantasy points of all your 11 players are calculated.
              </Text>
            </View>

            <View style={{ width: wp("88%") }}>
              <Text style={{ color: "#000", fontWeight: "500", fontSize: hp(1.6) }}>
                The player with the lowest points in your team will be replaced by your Impact Player.
              </Text>
            </View>
          </View>

          {/* Additional text content */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
              width: "92%",
              padding: 10,
              backgroundColor: "#f2f2f2",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#000", fontWeight: "500", fontSize: hp(1.6) }}>
              The points of the Impact Player will be counted instead of the lowest-performing player.
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
              width: "92%",
              padding: 10,
              backgroundColor: "#f2f2f2",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#000", fontWeight: "500", fontSize: hp(1.6) }}>
              *The Captain and Vice-Captain will not be replaced by the Impact Player, even if they have the lowest points.
            </Text>
          </View>

          {/* Close button */}
          <Pressable
            onPress={onClose}
            style={{
              padding: 3,
              width: wp("100%"),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 7,
            }}
          >
            <LinearGradient
              style={{
                padding: 10,
                width: wp("90%"),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
              colors={["#3b53bd", "#243373", "#192451"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Text style={{ color: "#fff", fontWeight: "800" }}>Ok, Got it</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ImpactPlayer;