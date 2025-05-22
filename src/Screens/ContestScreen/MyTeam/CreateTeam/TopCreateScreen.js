import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useEffect, useState, Suspense} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../../../../envfile/api';
import {useSelector} from 'react-redux';
import ErrorMessage from './ErrorMessage';

const Wicketerscreen = React.lazy(() => import('./Wicketerscreen'));
const BatManScreen = React.lazy(() => import('./BatManScreen'));
const Allrounderscreen = React.lazy(() => import('./Allrounderscreen'));
const Bowlerscreen = React.lazy(() => import('./Bowlerscreen'));

const Tab = createMaterialTopTabNavigator();

const TopCreateScreen = () => {
  const [playersData, setPlayersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tournamentId = useSelector(state => state.fantasy.tournamentId);
  const MatchId = useSelector(state => state.fantasy.matchId);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (!token) {
          setError('Authentication token not found');
          return;
        }

        const response = await axios.post(
          `${api}/admin/matches/getPlayerLineup`,
          {
            recordId: MatchId,
            tournamentId: tournamentId,
          },
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        );

        if (response.data?.playersMap) {
          setPlayersData(response.data.playersMap);
        } else {
          setError('Invalid player data format');
        }
      } catch (err) {
        console.error('API Error:', err);
        setError('Failed to fetch player data');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [MatchId, tournamentId]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!playersData) {
    return (
      <View style={styles.centerContainer}>
        <Text>No player data available</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1 }}>
      <Tab.Navigator tabBar={props => <CustomTabBar {...props}  />}>
        <Tab.Screen name="WK">
          {() => <Wicketerscreen allPlayers={playersData} />}
        </Tab.Screen>
        <Tab.Screen name="BAT">
          {() => <BatManScreen allPlayers={playersData} />}
        </Tab.Screen>
        <Tab.Screen name="AR">
          {() => <Allrounderscreen allPlayers={playersData} />}
        </Tab.Screen>
        <Tab.Screen name="BOWL">
          {() => <Bowlerscreen allPlayers={playersData} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

// 🔸 Custom tab bar as per your design
const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-around',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={index}
            onPress={onPress}
            style={[
              {
                borderRadius: 5,
                paddingVertical: 8,
                width: '23%',
                justifyContent: 'center',
                alignItems: 'center',
              },
              {
                backgroundColor: isFocused ? '#fff' : '#555555',
              },
            ]}>
            <Text
              style={{
                color: isFocused ? '#000' : '#fff',
                fontWeight: '700',
              }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
});

export default TopCreateScreen;
