import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CricketMatches from './Cricket/CricketMatches';
import FootballMatches from './Football/FootballMatches';
import AllMatches from './All/AllMatches';
import {useFocusEffect} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const MyMatchTab = () => {
  const [selectedSport, setSelectedSport] = useState('All');
  const navigationRef = useRef();

  const tabIndex =
    selectedSport === 'All' ? 0 : selectedSport === 'Cricket' ? 1 : 2;

  useEffect(() => {
    if (navigationRef.current) {
      const routeName = selectedSport === 'All' ? 'AllMatches' : selectedSport;
      navigationRef.current.navigate(routeName);
    }
  }, [selectedSport]);
  useFocusEffect(
    React.useCallback(() => {
      setSelectedSport('All');
    }, []),
  );

  const CustomTabBar = ({state, descriptors, navigation}) => {
    navigationRef.current = navigation;

    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 10,
          justifyContent: 'space-around',
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;
          const isFocused = state.index === index;

          let iconSource;
          if (route.name === 'AllMatches') {
            iconSource = require('../../../assets/all.png');
          } else if (route.name === 'Cricket') {
            iconSource = require('../../../assets/cricket5.png');
          } else {
            iconSource = require('../../../assets/Football.png');
          }

          const onPress = () => {
            const selected = route.name === 'AllMatches' ? 'All' : route.name;
            setSelectedSport(selected);
          };

          return (
            <Pressable
  key={route.key}
  onPress={onPress}
  style={[
    {
      borderRadius: 5,
      paddingVertical: 8,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#000',
    },
    {
      backgroundColor: isFocused ? '#000' : '#fff',
      width: route.name === 'AllMatches' ? '20%' : '38%', 
     
    },
  ]}
>

              <Image
                source={iconSource}
                style={[
                  {
                    width: 22,
                    height: 22,
                    marginRight: 8,
                    
                  },
                  {tintColor: isFocused ? '#fff' : '#000'},
                ]}
              />
              <Text
                style={{color: isFocused ? '#fff' : '#000', fontWeight: '700'}}>
                {route.name === 'AllMatches' ? 'ALL' : label.toUpperCase()}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="AllMatches"
      screenOptions={{swipeEnabled: false}}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="AllMatches"
        component={AllMatches}
        options={{title: 'All'}}
      />
      <Tab.Screen name="Cricket" component={CricketMatches} />
      <Tab.Screen name="Football" component={FootballMatches} />
    </Tab.Navigator>
  );
};

export default MyMatchTab;
