import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import React, { useEffect } from 'react';
import Cricket from './Cricket';
import Football from './Football';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


const FantacyPointsSystems = ({ onClose }) => {
  const Tab = createMaterialTopTabNavigator();

  const navigation = useNavigation();

  function CustomTabBarIcon({ source, style }) {
    return <Image source={source} style={[styles.tabBarIcon, style]} />;
  }

  useEffect(() => {
    const backAction = () => {
      if (navigation.goBack()) {
        onClose(); // Close the popup
        navigation.goBack();
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ display: 'flex', flexDirection: 'column', width: wp('100%') }}>
          <LinearGradient
            colors={['#3A4CD6', '#000000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                padding: 15,
              }}>
              <View style={{ width: wp('10%') }}>
                <Pressable onPress={() => navigation.goBack()}>
                  <AntDesign name="arrowleft" size={24} color="white" />
                </Pressable>
              </View>
              <View style={{ width: wp('80%') }}>
                <Text
                  style={{ fontSize: hp(1.9), color: '#fff', fontWeight: '500' }}>
                  Fantasy Point System
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              textTransform: 'capitalize',
              flexDirection: 'row',
            },
            tabBarIndicatorStyle: { backgroundColor: '#3A4CD6', height: 3 }, // Active indicator color
          }}>
          <Tab.Screen
            name="Cricket"
            component={Cricket}
            options={{
              tabBarLabel: ({ focused }) => (
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Image
                    source={require('../../assets/Cricket.png')}
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 10,
                      tintColor: focused ? '#3A4CD6' : 'black',
                    }}
                  />

                  <Text
                    style={[
                      styles.tabBarLabel,
                      focused && styles.activeTabLabel,
                    ]}>
                    Cricket
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Football"
            component={Football}
            options={{
              tabBarLabel: ({ focused }) => (
                <View
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Image
                    source={require('../../assets/Football.png')}
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 10,
                      tintColor: focused ? '#3A4CD6' : 'black',
                      marginRight: 5,
                    }}
                  />
                  <Text
                    style={[
                      styles.tabBarLabel,
                      focused && styles.activeTabLabel,
                    ]}>
                    Football
                  </Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
}

export default FantacyPointsSystems;

const styles = StyleSheet.create({
  tabBarIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  tabBarLabel: {
    color: '#000',
  },
  activeTabIcon: {
    backgroundColor: '#3A4CD6', // Highlighted color for the active icon
  },
  activeTabLabel: {
    color: '#3A4CD6', // Highlighted text color for the active tab
    fontWeight: 'bold',
  },
});
