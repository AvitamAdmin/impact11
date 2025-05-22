import { StyleSheet, View, LogBox } from 'react-native';
import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DetailScreen from './DetailScreen';
import LeaderBoard from './LeaderBoard';

const Tab = createMaterialTopTabNavigator();

const ContestTabNavigator = () => {
  // Ignore specific warnings that might be causing crashes
  useEffect(() => {
    LogBox.ignoreLogs([
      'Sending `onAnimatedValueUpdate` with no listeners registered',
      'VirtualizedLists should never be nested',
    ]);
  }, []);

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
        <Tab.Screen name="Details" component={DetailScreen} />
        <Tab.Screen
          name="Leaderboard"
          component={LeaderBoard}
          options={{
            lazy: false, // Force LeaderBoard to load immediately
          }}
        />
        
      </Tab.Navigator>
    </View>
  );
};

export default ContestTabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBarStyle: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    borderWidth: 1,
    borderColor: '#ccc',
    shadowRadius: 5,
  },
  tabBarIndicatorStyle: {
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 3,
    height: 42,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '48%',
    alignSelf: 'center',
  },
  tabBarIndicatorContainerStyle: {
    borderRadius: 16,
    height: '100%',
  },
  tabBarLabelStyle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'none',
  },
  tabBarItemStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
