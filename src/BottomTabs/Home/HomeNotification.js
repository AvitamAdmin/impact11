import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import All from "./All";
import Offers from "./Offer";

 
const HomeNotification = () => {
const Tab = createMaterialTopTabNavigator();
 
return (
<Tab.Navigator
screenOptions={{
tabBarActiveTintColor: "#3385ff",
tabBarInactiveTintColor: "#000",
tabBarLabelStyle: {
fontWeight: "bold",
},
}}
>
<Tab.Screen name="All" component={All} />
<Tab.Screen name="Offers" component={Offers} />
</Tab.Navigator>
);
};
 
export default HomeNotification;
 
const styles = StyleSheet.create({});