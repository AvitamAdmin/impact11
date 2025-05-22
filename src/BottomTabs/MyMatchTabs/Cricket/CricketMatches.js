import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CricketLiveMatches from './CricketLiveMatches';
import CricketUpcomingMatches from './CricketUpcomingMatches';
import CricketCompletedMatches from './CricketCompletedMatches';
const Tab = createMaterialTopTabNavigator();

const CricketMatches = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
          tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarItemStyle: styles.tabBarItemStyle,
          tabBarActiveTintColor: '#1a32b4',
          tabBarInactiveTintColor: '#555',
          tabBarIndicatorContainerStyle: styles.tabBarIndicatorContainerStyle,
          swipeEnabled: true,
          lazy: true,
          lazyPreloadDistance: 1,
        }}>
        <Tab.Screen name="Upcoming" component={CricketUpcomingMatches} />
        <Tab.Screen name="Live" component={CricketLiveMatches} />
        <Tab.Screen name="Completed" component={CricketCompletedMatches} />
      </Tab.Navigator>
    </View>
  );
};

export default CricketMatches;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  tabBarStyle: {
    marginLeft: 11,
    marginRight: 11,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    height: 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 1},
  },
  tabBarIndicatorStyle: {
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 4,
    height: 42,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '31%',
  },
  tabBarIndicatorContainerStyle: {
    borderRadius: 16,
    height: '100%',
  },
  tabBarLabelStyle: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'none',
  },
  tabBarItemStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
