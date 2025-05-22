import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from 'react-native-vector-icons/AntDesign';

const ContestFilter = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      
    >
      <View style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      justifyContent: 'flex-end',
      height:"100%",
      }}>
      <View
        style={{
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        justifyContent: 'flex-end',
        height:"75%",
          paddingBottom:20,
          paddingRight:20
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <Pressable onPress={onClose}
          style={{paddingLeft:12}}
          >
            <AntDesign
              name="close"
              size={20}
              color="black"
              style={{ opacity: 0.5 }}
            />
          </Pressable>
          <View>
            <Text style={{ fontWeight: "bold" }}>Filter</Text>
          </View>
          <Pressable 
          style={{paddingRight:12}}
          >
            <Text>CLEAR</Text>
          </Pressable>
        </View>

        <View style={{ padding: 15, gap: 20 }}>
          <View
            style={{
              gap: 10,
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <View>
              <Text style={{ fontWeight: "700" }}>Entry</Text>
            </View>
            <View
              style={{
                gap: 15,
                display: "flex",
                flexDirection: "row",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <Pressable style={{ backgroundColor: "#e6ebff", padding: 5 }}>
                <Text>₹1 to ₹50</Text>
              </Pressable>
              <Pressable style={{ backgroundColor: "#e6ebff", padding: 5 }}>
                <Text>₹51 to ₹100</Text>
              </Pressable>
              <Pressable style={{ backgroundColor: "#e6ebff", padding: 5 }}>
                <Text>₹101 to ₹500</Text>
              </Pressable>
              <Pressable style={{ backgroundColor: "#e6ebff", padding: 5 }}>
                <Text>₹501 to ₹1000</Text>
              </Pressable>
              <Pressable style={{ backgroundColor: "#e6ebff", padding: 5 }}>
                <Text>₹1000 & Above</Text>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              gap: 10,
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <View>
              <Text style={{ fontWeight: "700" }}>Number of teams</Text>
            </View>
            <View
              style={{
                gap: 15,
                display: "flex",
                flexDirection: "row",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <Pressable style={{ backgroundColor: "#e6ebff", padding: 5 }}>
                <Text>2</Text>
              </Pressable>
              <Pressable style={{ backgroundColor: "#e6ebff", padding: 5 }}>
                <Text>3 - 10</Text>
              </Pressable>
              <Pressable style={{ backgroundColor: "#e6ebff", padding: 5 }}>
                <Text>11 - 101</Text>
              </Pressable>
              <Pressable style={{ backgroundColor: "#e6ebff", padding: 5 }}>
                <Text>101 - 1000</Text>
              </Pressable>
              <Pressable style={{ backgroundColor: "#e6ebff", padding: 5 }}>
                <Text>1001 & Above</Text>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              gap: 10,
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <View>
              <Text style={{ fontWeight: "700" }}>Prize pool</Text>
            </View>
            <View
              style={{
                gap: 15,
                display: "flex",
                flexDirection: "row",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <Pressable style={{ backgroundColor: "#e6ebff", padding: 5 }}>
                <Text>₹1 to ₹10000</Text>
              </Pressable>
              <Pressable style={{ backgroundColor: "#e6ebff", padding: 5 }}>
                <Text>₹10001 to ₹1 lakh</Text>
              </Pressable>
              <Pressable style={{ backgroundColor: "#e6ebff", padding: 5 }}>
                <Text>₹1 lakh to ₹10 lakh</Text>
              </Pressable>
              <Pressable style={{ backgroundColor: "#e6ebff", padding: 5 }}>
                <Text>₹10 lakh to ₹25 lakh</Text>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              gap: 10,
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <View>
              <Text style={{ fontWeight: "700" }}>Contest Type</Text>
            </View>
            <View
              style={{
                gap: 15,
                display: "flex",
                flexDirection: "row",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <Pressable style={{ backgroundColor: "#e6ebff", padding: 5 }}>
                <Text>Single Entry</Text>
              </Pressable>
              <Pressable style={{ backgroundColor: "#e6ebff", padding: 5 }}>
                <Text>Multi Entry</Text>
              </Pressable>
              <Pressable style={{ backgroundColor: "#e6ebff", padding: 5 }}>
                <Text>Single Winner</Text>
              </Pressable>
              <Pressable style={{ backgroundColor: "#e6ebff", padding: 5 }}>
                <Text>Multi Winner</Text>
              </Pressable>
              <Pressable style={{ backgroundColor: "#e6ebff", padding: 5 }}>
                <Text>₹1000 & Above</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <Pressable
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              width: "95%",
              backgroundColor: "#3f58c5",
              color: "#fff",
              fontWeight: "700",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              padding: 10,
              borderRadius: 7,
              textAlign:"center"
            }}
          >
            APPLY
          </Text>
        </Pressable>
      </View>
      </View>
    </Modal>
  );
};

export default ContestFilter;

const styles = StyleSheet.create({});
