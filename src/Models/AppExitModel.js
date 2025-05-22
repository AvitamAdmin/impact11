import React, { useEffect, useRef } from "react";
import { Modal, View, Text, TouchableOpacity, Animated, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const AppExitModal = ({ visible, onCancel, onExit }) => {
  const slideAnim = useRef(new Animated.Value(height)).current; // Start off-screen

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0, // Bring it up
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height, // Move it back down
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.2)" }}>
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
            backgroundColor: "#fff",
            padding: 20,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            alignItems: "center",
            width: "100%",
            position: "absolute",
            bottom: 0,
          }}
        >
          {/* Handle Bar */}
          <View style={{ width: 50, height: 5, backgroundColor: "#ccc", borderRadius: 10, marginBottom: 10 }} />

          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Exit App?</Text>
          <Text style={{ fontSize: 16, color: "gray", textAlign: "center" }}>
            Are you sure you want to exit the application?
          </Text>

          {/* Buttons */}
          <View style={{ flexDirection: "row", marginTop: 20, width: "100%", justifyContent: "space-between" }}>
            <TouchableOpacity
              onPress={onCancel}
              style={{ backgroundColor: "#ddd", padding: 12, borderRadius: 8, width: "45%", alignItems: "center" }}
            >
              <Text style={{ fontSize: 16, color: "#333" }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onExit}
              style={{ backgroundColor: "#ff5252", padding: 12, borderRadius: 8, width: "45%", alignItems: "center" }}
            >
              <Text style={{ fontSize: 16, color: "#fff" }}>Exit</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default AppExitModal;
