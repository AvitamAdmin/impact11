import { StyleSheet, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Contest from './Contest';
import Withdrawals from './Withdrawals';
import Deposits from './Deposits';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Tab = createMaterialTopTabNavigator();

const MyTransactions = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Contest"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: hp(1.6),
            fontWeight: '700',
            textTransform: 'capitalize',
            color: '#000',
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#3b53bd', // optional: changes indicator color
          },
        }}
      >
        <Tab.Screen name="Contest" component={Contest} />
        <Tab.Screen name="Withdrawals" component={Withdrawals} />
        <Tab.Screen name="Deposits" component={Deposits} />
      </Tab.Navigator>
    </View>
  );
};

export default MyTransactions;

const styles = StyleSheet.create({});
