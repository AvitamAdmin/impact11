import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState, useMemo} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {api} from '../../../../envfile/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // If using react-native-vector-icons

const Stats = () => {
  const navigation = useNavigation();
  const [statsData, setStatsData] = useState([]);
  const [userTeams, setUserTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    
  const matchId = useSelector(state => state.fantasy.matchId);

  const [sortConfig, setSortConfig] = useState({
    key: 'points',
    direction: 'descending',
  });

  const requestSort = key => {
    if (sortConfig.key !== key) {
      setSortConfig({key, direction: 'descending'});
    } else {
      setSortConfig({
        key,
        direction:
          sortConfig.direction === 'descending' ? 'ascending' : 'descending',
      });
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    PlayerStats();
  };

  

  useEffect(() => {
    PlayerStats();
  }, []);

  const sortedData = [...statsData].sort((a, b) => {
    const aValue = parseFloat(a[sortConfig.key]) || 0;
    const bValue = parseFloat(b[sortConfig.key]) || 0;

    return sortConfig.direction === 'descending'
      ? bValue - aValue
      : aValue - bValue;
  });

  const PlayerStats = async () => {
    const userId = await AsyncStorage.getItem('userId');

    try {
     
      const token = await AsyncStorage.getItem('jwtToken');

      const body = {
        userId: userId,
        matchId: matchId,
      };
      const response = await axios.post(`${api}/getPlayersStats`, body, {
        headers: {Authorization: `Bearer ${token}`},
      });

      setStatsData(response.data.userTeamsDtoList[0].playerDtos || []);
      setUserTeams(response.data.userTeamsDtoList || []);

      // Set the first team as selected by default
      if (response.data.userTeamsDtoList.length > 0) {
        setSelectedTeam(response.data.userTeamsDtoList[0]);
      }
    } catch (error) {
      console.log('Error fetching data', error);
    }
    finally{
     
      setRefreshing(false);
    }
  };

  const renderSortArrow = key => {
    if (sortConfig.key !== key) return null;

    return sortConfig.direction === 'descending' ? (
      <MaterialIcons name="arrow-downward" size={13} color="#787878" />
    ) : (
      <MaterialIcons name="arrow-upward" size={13} color="#787878" />
    );
  };

  // Check if player is selected in the current team
  const isPlayerSelected = playerId => {
    if (!selectedTeam) return false;
    return selectedTeam.players.some(
      player => player.playerId === playerId && player.isSelected,
    );
  };

  const toggleTeamDropdown = () => {
    setShowTeamDropdown(!showTeamDropdown);
  };

  const selectTeam = team => {
    setSelectedTeam(team);
    setShowTeamDropdown(false);
  };

  return (
    <View
      style={{
        width: wp('100%'),
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
       >
      
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          position: 'relative',
        }}>
        <View style={{padding: 10}}>
          <Text
            style={{
              paddingTop: 5,
              fontSize: hp(1.5),
              color: '#000',
              fontWeight: '500',
            }}>
            Showing Player stats for this Match
          </Text>
        </View>

        {userTeams.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              gap: 5,
            }}>
            <Text style={{fontSize: hp(1.5), color: '#000', fontWeight: '500'}}>
              Highlight
            </Text>

            <View style={{position: 'relative'}}>
              <Pressable
                onPress={userTeams.length > 1 ? toggleTeamDropdown : null}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#E0E0E0',
                  paddingVertical: 3,
                  paddingHorizontal: 14,
                  borderRadius: 6,
                  minWidth: 20,
                }}>
                <Text
                  style={{fontSize: hp(1.2), color: '#000', fontWeight: '500'}}>
                  {selectedTeam ? selectedTeam.teamName : 'Select'}
                </Text>
                {userTeams.length > 1 && (
                  <Text
                    style={{fontSize: hp(1.6), color: '#000', marginLeft: 5}}>
                    ▼
                  </Text>
                )}
              </Pressable>

              {showTeamDropdown && userTeams.length > 1 && (
                <View
                  style={{
                    position: 'absolute',
                    top: 45,
                    right: 0,
                    backgroundColor: '#fff',
                    width: 120,
                    borderRadius: 6,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    zIndex: 1000,
                  }}>
                  {userTeams.map((team, index) => (
                    <Pressable
                      key={team.recordId || index}
                      style={{
                        paddingVertical: 10,
                        paddingHorizontal: 12,
                        borderBottomWidth: index < userTeams.length - 1 ? 1 : 0,
                        borderBottomColor: '#ddd',
                      }}
                      onPress={() => selectTeam(team)}>
                      <Text style={{color: '#000', fontSize: hp(1.6)}}>
                        {team.teamName}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
        }}>
        <View
          style={{
            width: '40%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '55%',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Text
              style={{color: '#8c8c8c', fontSize: hp(1.6), fontWeight: 'bold'}}>
              PLAYER
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '60%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Pressable
            style={{width: '30%'}}
            onPress={() => requestSort('points')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#8c8c8c',
                  fontSize: hp(1.6),
                  fontWeight: 'bold',
                }}>
                POINTS
              </Text>
              {renderSortArrow('points')}
            </View>
          </Pressable>

          <Pressable
            style={{width: '20%'}}
            onPress={() => requestSort('selectedBy')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#8c8c8c',
                  fontSize: hp(1.6),
                  fontWeight: 'bold',
                }}>
                SB%
              </Text>
              {renderSortArrow('selectedBy')}
            </View>
          </Pressable>

          <Pressable
            style={{width: '15%'}}
            onPress={() => requestSort('captainBy')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#8c8c8c',
                  fontSize: hp(1.6),
                  fontWeight: 'bold',
                }}>
                C%
              </Text>
              {renderSortArrow('captainBy')}
            </View>
          </Pressable>

          <Pressable
            style={{width: '20%'}}
            onPress={() => requestSort('viceCaptainBy')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#8c8c8c',
                  fontSize: hp(1.6),
                  fontWeight: 'bold',
                }}>
                VC%
              </Text>
              {renderSortArrow('viceCaptainBy')}
            </View>
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={{width: wp('100%')}}
        contentContainerStyle={{paddingBottom: 150}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
        <View style={{height: '100%'}}>
          {sortedData.map((item, index) => (
            <Pressable key={item.recordId || index}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: isPlayerSelected(item.recordId)
                    ? '#fffee7'
                    : '#fff',
                  padding: 5,
                }}>
                <View
                  style={{
                    width: '40%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      width: '40%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{uri: item.playerImagePath}}
                      style={{height: 45, width: 45}}
                    />
                  </View>
                  <View style={{width: '60%', justifyContent: 'center'}}>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontWeight: 'bold',
                        fontSize: hp(1.6),
                        color: '#000',
                      }}>
                      {item.shortName}
                    </Text>
                    <Text
                      style={{
                        fontSize: hp(1.2),
                        fontWeight: '300',
                        color: '#000',
                      }}>
                      {item.teamDto?.shortName} - {item.playerRole}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: '60%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      width: '25%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor:"#f5f"
                    }}>
                    <Text style={{fontSize: hp(1.5), color: '#000'}}>
                      {item.points}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '15%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: hp(1.5), color: '#000'}}>
                      {item.selectedBy}%
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '20%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: hp(1.5), color: '#000'}}>
                      {item.captainBy}%
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '20%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: hp(1.5), color: '#000'}}>
                      {item.viceCaptainBy}%
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

})

export default Stats;
