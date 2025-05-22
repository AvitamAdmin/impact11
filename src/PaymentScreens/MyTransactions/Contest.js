import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {api} from '../../envfile/api';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Contest = () => {
  const [contestdata, setcontestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ListingContest();
  }, []);

  const formatDate = timestamp => {
    const date = new Date(timestamp);
    const options = {day: 'numeric', month: 'long', year: 'numeric'};
    return date.toLocaleDateString('en-GB', options);
  };

  const formatTime = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const ListingContest = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem('jwtToken');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId) throw new Error('Missing required data');

      const body = {userId};
      const response = await axios.post(
        `${api}/admin/contestJoined/getContestTransaction`,
        body,
        {headers: {Authorization: `Bearer ${token}`}},
      );

      if (response.data?.contestJoinedDtoList) {
        setcontestData(response.data.contestJoinedDtoList);
      } else {
        setcontestData([]);
      }
    } catch (error) {
      console.error('Error in ListingContest:', error);
      setError(error.message || 'Failed to load contests');
      setcontestData([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Error: {error}</Text>
      </View>
    );
  }
  const groupByDate = (data) => {
    const grouped = {};
    data.forEach(item => {
      const dateKey = formatDate(item.creationTime);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(item);
    });
    return grouped;
  };
  

  const groupedContests = groupByDate(contestdata);
  return (
    <View>
    <View style={{padding: 10}}>
      <Text style={{color: '#000'}}>
        Transactions may take up to 10 minutes to show here
      </Text>
    </View>
    <ScrollView contentContainerStyle={{paddingBottom: 50}}>
      {Object.keys(groupedContests).length > 0 ? (
        Object.keys(groupedContests).map((date, dateIndex) => (
          <View key={dateIndex}>
            {/* Date Header - appears once per date */}
            <View style={{padding: 5, backgroundColor: '#d0d0d0'}}>
              <Text style={{color: '#000'}}>{date}</Text>
            </View>
            
            {/* All transactions for this date */}
            {groupedContests[date].map((item, index) => (
              <Pressable 
                key={index} 
                style={{padding: 10, gap: 2, backgroundColor: '#fff', marginBottom: 2}}
              >
                <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
                  <View>
                    <Ionicons name="card-outline" size={24} color="black" />
                  </View>
                  <View style={{flex: 1}}>
                    {item.hasAmountWon && (
                      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontWeight: '500', color: '#000'}}>Winnings</Text>
                        <Text style={{fontWeight: '500', color: 'green'}}>
                          + {item.amountWon?.toFixed(2) || '0.00'}
                        </Text>
                      </View>
                    )}

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text style={{fontWeight: '500', color: '#000'}}>Entry Paid</Text>
                      <Text style={{fontWeight: '500', color: '#000'}}>
                        - {item.entryFee || '0'}
                      </Text>
                    </View>

                    <Text style={{color: '#000'}}>
                      {formatTime(item.creationTime)} | {item.matchesDto?.identifier}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        ))
      ) : (
        <View style={{padding: 20, alignItems: 'center'}}>
          <Text>No contest data available</Text>
        </View>
      )}
    </ScrollView>
  </View>
  );
};

export default Contest;

const styles = StyleSheet.create({});
