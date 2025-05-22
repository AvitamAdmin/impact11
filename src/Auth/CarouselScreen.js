import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, ImageBackground, ScrollView, Pressable, Dimensions, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const slides = [
  {
    image: require("../../assets/Images-2.png"),
    title: "Join Contests with Just ₹1",
    text: "Get in on the action by joining contests starting at just 1 rupee. Enjoy the excitement without breaking the bank!",
    screenNumber: "Screen1",
  },
  {
    image: require("../../assets/Images-1.png"),
    title: "Complete With Real Players",
    text: "Create your fantasy cricket team and compete with real players. Dive into the action and showcase your cricket knowledge!",
    screenNumber: "Screen2",
  },
  {
    image: require("../../assets/Images.png"),
    title: "Everyone Can Win",
    text: "Whether you're a newbie or a pro, everyone has a chance to win amazing prizes. Join us and see if you have what it takes to rise to the top!",
    screenNumber: "LoginEmail", // Final screen to navigate to
  }
];
const CarouselScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();

  const goToNextSlide = () => {
    if (activeIndex < slides.length - 1) {
      // Move to the next slide
      const nextIndex = activeIndex + 1;
      scrollViewRef.current?.scrollTo({ x: nextIndex * wp("100%"), animated: true });
      setActiveIndex(nextIndex);
    } else {
      // If on the last slide, navigate to the screen
      navigation.navigate(slides[activeIndex].screenNumber);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    {/* Scrollable Content */}
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      scrollEnabled={false} // Disable manual scrolling
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1, width: wp("100%") }}
    >
   {slides.map((slide, index) => (
  <View key={index} style={{ width: wp("100%"), justifyContent: "center", alignItems: "center" }}>
    <ImageBackground 
      source={slide.image} 
      resizeMode="cover" 
      style={{ width: wp("100%"), height: hp("100%") }}
    >
      {/* Text Content at the Bottom */}
      <View style={{ 
        position: "absolute", 
        bottom: hp("14%"), 
        width: "100%", 
        alignItems: "center",
      }}>
        <View style={{width:"90%"}}>
        <Text style={{ fontSize: hp(2.8), fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: 10 }}>
          {slide.title}
        </Text>
        <Text style={{ fontSize: hp(1.7), color: "#fff", textAlign: "center" }}>
          {slide.text}
        </Text>
        </View>
      </View>
    </ImageBackground>
  </View>
))}


    </ScrollView>

    {/* Fixed Button at the Bottom */}
    <View style={{ position: "absolute", bottom: hp("3%"), width: "100%", alignItems: "center" }}>
      <TouchableOpacity onPress={goToNextSlide} style={{ padding: 15, backgroundColor: "#fff", borderRadius: 10, width: "90%", alignItems: "center" }}>
        <Text style={{ color: "#3757e2", fontSize: 16,                        fontFamily: 'Roboto-Bold',
 }}>{activeIndex === slides.length - 1 ? "Get Started" : "Next"}</Text>
      </TouchableOpacity>
    </View>
  </View>

  );
};

export default CarouselScreen;
