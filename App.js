import "react-native-gesture-handler"; // Ensure this is at the top
import React from "react";
import {useEffect, useState} from 'react';

import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from "./Navigation";

// Prevent font scaling globally
import { Text,StyleSheet,View} from "react-native";
import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./src/Redux/Slice";
import { Provider } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import LottieView from "lottie-react-native";
import Orientation from "react-native-orientation-locker";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // If using react-native-vector-icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import FlashMessage from "react-native-flash-message";


Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const store = configureStore({
  reducer: {
    fantasy: useReducer
  }
});

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashVisible(false); // Hide splash screen after 3 seconds
    }, 3000);
  }, []);

  useEffect(() => {
    Orientation.lockToPortrait(); // Locks the app to portrait mode
  }, []);

   useEffect(() => {
    MaterialCommunityIcons.loadFont(); 
    AntDesign.loadFont(); 
    MaterialIcons.loadFont();
    Ionicons.loadFont();
    Octicons.loadFont();
    Entypo.loadFont();
    Feather.loadFont(); 
    }, []);
    
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        {isSplashVisible ? (
          <LinearGradient
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              display:"flex",
              flexDirection:"column",
              justifyContent:"center"
            }}
            colors={['#020202', '#192451', '#243373', '#3b53bd']}>
            <View style={styles.splashContainer}>
              <LottieView
                source={require("./assets/SplashScreenAnimation.json")}
                autoPlay
                loop={false}
                style={styles.lottie}
              />
            </View>
          </LinearGradient>
        ) : (
          <>
            <Navigation />
            {/* Add FlashMessage here at the root level */}
            <FlashMessage 
              position="top" 
              floating={true}
              duration={3000}
              statusBarHeight={30} // Adjust if needed
            />
          </>
        )}
      </Provider>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  splashContainer: {
    
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#fff", // Change background color if needed
  },
  lottie: {
    width: 500,
    height: 500, // Adjust size as needed
  },
});
export default App;  
