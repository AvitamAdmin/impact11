import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
  } from "react-native";
  import React, { useState } from "react";
  import LinearGradient from 'react-native-linear-gradient';
  import { useNavigation } from "@react-navigation/native";
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import Feather from 'react-native-vector-icons/Feather';
  import CheckBox from "react-native-check-box";
  import axios from "axios";
  import { ActivityIndicator } from "react-native-paper";
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  
  const RegisterPage = () => {
    const navigation = useNavigation();
    const [isSelected, setSelection] = useState(false);
    const [errors, setErrors] = useState({});
    const [indicator, setIndicator] = useState(false);
    const [inputvalue, setInputvalue] = useState({
      username: "",
      mobilenumber: "",
      email: "",
      invitecode: "",
    });
  
    const { username, mobilenumber, email, invitecode } = inputvalue;
  
    const handleInputChange = (name, value) => {
      setInputvalue({ ...inputvalue, [name]: value });
    };
    const validate = (values) => {
      const errors = {};
  
      if (!values.username) {
        errors.username = "Username is required";
      } else if (values.username.length < 2) {
        errors.username = "Username must be at least 2 characters long";
      }
  
      if (!values.mobilenumber) {
        errors.mobilenumber = "Mobile number is required";
      } else if (!/^[0-9]+$/.test(values.mobilenumber)) {
        errors.mobilenumber = "Mobile number must be numeric";
      } else if (values.mobilenumber.length < 10) {
        errors.mobilenumber = "Mobile number must be at least 10 digits long";
      }
  
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Invalid email format";
      }
  
      // Invite code is optional, no validation required
  
      return errors;
    };
  
    const handlechange = async () => {
      const validationErrors = validate(inputvalue);
      setErrors(validationErrors);
  
      if (Object.keys(validationErrors).length === 0) {
        if (username !== "" && mobilenumber !== "" && email !== "") {
          try {
            setIndicator(true);
            const response = await axios.post(
              "http://192.168.0.172:5000/auth/userRegister",
              { username, mobilenumber, email, invitecode }
            );
  
            // console.log(response.data);
            // Handle successful registration, e.g., navigate to another screen
            setInputvalue({
              username: "",
              mobilenumber: "",
              email: "",
              invitecode: "",
            });
            // console.log(inputvalue);
            // Delay navigation by 3 seconds
            setTimeout(() => {
              navigation.navigate("login");
            }, 1000);
          } catch (error) {
            console.error("Registration failed:", error);
            // Handle registration error
          }
        } else {
          console.error("All fields are mandatory");
          // You can use a toast notification library to show this error to the user
        }
      } else {
        console.error("Validation errors:", validationErrors);
        // You can use a toast notification library to show validation errors to the user
      }
    };
  
    return (
      
      <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <LinearGradient
        style={{
          flex: 1,
        }}
        colors={["#020202", "#192451", "#243373", "#3b53bd"]}
      >
      
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: wp("100%"),
              
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                width: wp("100%"),
                height: 100,
                padding: 20,
              }}
            >
              <View style={{ width: wp("30%") }}>
                <Pressable onPress={() => navigation.goBack()} style={styles.back}>
                <Feather name="arrow-left" size={20} color="#fff" />

                </Pressable>
              </View>
            </View>
  
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
                width: wp("90%"),
              }}
            >
              <View
                style={{
                  padding: 10,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: wp("100%"),
                }}
              >
                <Image
                  source={require("../../assets/RegisterPage.png")}
                  style={{ width: 200, height: 160 }}
                />
                <Text style={{ fontSize: hp(2.4), color: "#fff", fontWeight: "bold" }}>
                  Hi! Register and Start Winning
                </Text>
              </View>
  
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: wp("90%"),
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: wp("90%"),
                    gap: 10,
                    paddingLeft: 13,
                  }}
                >
                  <View>
                    <Text style={{ color: "#fff", fontSize: hp(2.0) }}>Name</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width:  wp("88%"),
                      borderBottomWidth: 2,
                      borderColor: "#fff ",
                      gap: 10,
                      paddingLeft: 13,
                    }}
                  >
                    <FontAwesome5 name="user" size={18} color="#fff" />
                    <TextInput
                      style={{ width:  wp("90%"), color: "#fff" }}
                      value={username}
                      onChangeText={(value) =>
                        handleInputChange("username", value)
                      }
                    />
                  </View>
                  {errors.username && (
                    <Text style={{ color: "red", fontWeight: "bold" }}>
                      {errors.username}
                    </Text>
                  )}
                </View>
  
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width:  wp("90%"),
                    gap: 10,
                    paddingLeft: 13,
                  }}
                >
                  <View>
                    <Text style={{ color: "#fff", fontSize: hp(2.0) }}>
                      Mobile Number
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width:  wp("88%"),
                      borderBottomWidth: 2,
                      borderColor: "#fff ",
                      gap: 10,
                      paddingLeft: 13,
                    }}
                  >
                    <AntDesign name="mobile1" size={20} color="#fff" />
                    <TextInput
                      style={{ width:  wp("90%"), color: "#fff" }}
                      keyboardType="number-pad"
                      value={mobilenumber}
                      onChangeText={(value) =>
                        handleInputChange("mobilenumber", value)
                      }
                    />
                  </View>
                  {errors.mobilenumber && (
                    <Text style={{ color: "red", fontWeight: "bold" }}>
                      {errors.mobilenumber}
                    </Text>
                  )}
                </View>
  
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width:  wp("90%"),
                    gap: 10,
                    paddingLeft: 13,
                  }}
                >
                  <View>
                    <Text style={{ color: "#fff", fontSize: hp(2.2)}}>Email</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: wp("88%"),
                      borderBottomWidth: 2,
                      borderColor: "#fff ",
                      gap: 10,
                      paddingLeft: 13,
                    }}
                  >
                    <Feather name="mail" size={20} color="#fff" />
                    <TextInput
                      style={{ width:  wp("90%"), color: "#fff" }}
                      value={email}
                      onChangeText={(value) => handleInputChange("email", value)}
                    />
                  </View>
                  {errors.email && (
                    <Text style={{ color: "red", fontWeight: "bold" }}>
                      {errors.email}
                    </Text>
                  )}
                </View>
              </View>
  
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: wp("90%"),
                  gap: 10,
                  paddingLeft: 13,
                  backgroundColor: "#505b8d",
                  padding: 15,
                  borderRadius: 5,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: wp("80%"),
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: hp(2)}}>
                    Have an Invite code?
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: wp("83%"),
                    borderBottomWidth: 2,
                    borderColor: "#fff ",
                    gap: 10,
                    paddingLeft: 13,
                  }}
                >
                  <Feather name="gift" size={24} color="#fff" />
                  <TextInput
                    style={{ width: wp("100%"), color: "#fff", fontSize: hp(2.5) }}
                    placeholder="Invite code"
                    placeholderTextColor="#ababab"
                    value={invitecode}
                    onChangeText={(value) => handleInputChange("invitecode", value)}
                  />
                </View>
              </View>
  
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: wp("90%"),
                  paddingRight: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <View>
                  {isSelected == true ? (
                    <Pressable onPress={() => setSelection(false)}>
                      <Ionicons name="checkbox" size={24} color="#fff" />
                    </Pressable>
                  ) : (
                    <CheckBox
                      onClick={() => setSelection(true)}
                      checked={isSelected}
                      checkBoxColor="#fff"
                      uncheckedCheckBoxColor="#ababab"
                      containerStyle={styles.checkboxContainer}
                    />
                  )}
                </View>
                <View>
                  <Text style={{ color: "#fff" ,fontSize: hp(1.5)}}>
                    I hereby confirm to be 18 year old and provide my acceptance to
                    Terms & Conditions and Privacy Policy of Impact11
                  </Text>
                </View>
              </View>
  
              {isSelected == true ? (
                <Pressable
                  onPress={handlechange}
                  style={{
                    width: wp("90%"),
                    padding: 10,
                    backgroundColor: "#3757E2",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 8,
                  }}
                >
                  <View style={{}}>
                    {indicator == true ? (
                      <ActivityIndicator size={"small"} color="#fff" />
                    ) : (
                      <Text
                        style={{ fontWeight: "bold", color: "#fff", fontSize: hp(2) }}
                      >
                        CONTINUE
                      </Text>
                    )}
                  </View>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => navigation.navigate("NameRegister")}
                  style={{
                    width: wp("90%"),
                    padding: 10,
                    backgroundColor: "#ababab",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 8,
                  }}
                >
                  <View style={{}}>
                    <Text
                      style={{ fontWeight: "bold", color: "#fff", fontSize: hp(2.2) }}
                    >
                      CONTINUE
                    </Text>
                  </View>
                </Pressable>
              )}
  
              <View style={{ display: "flex", flexDirection: "row", gap: 5,paddingBottom: 30 }}>
                <Text style={{ color: "#fff" }}>Already Have an account?</Text>
                <Pressable onPress={() => navigation.navigate("LoginPhone")}>
                  <Text style={{ color: "#fff" }}>Login</Text>
                </Pressable>
              </View>
            </View>
          </View>
       
      </LinearGradient> 
      </ScrollView>
    );
  };
  
  export default RegisterPage;
  
  const styles = StyleSheet.create({
    checkbox: {
      alignSelf: "center",
      color: "#fff",
    },
  });