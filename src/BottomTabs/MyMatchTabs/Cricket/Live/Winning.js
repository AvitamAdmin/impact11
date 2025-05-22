import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {api} from '../../../../envfile/api';
import {navigationRef} from '../../../../../Navigation';

const Winning = ({setShow, show}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [contestData, setContestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const screenHeight = Dimensions.get('window').height;

  const matchId = useSelector(state => state.fantasy.matchId);

  useEffect(() => {
    ListingContest();
  }, []);

  const ListingContest = async () => {
    try {
      setLoading(true);
      setError('');

      const token = await AsyncStorage.getItem('jwtToken');
      const userId = await AsyncStorage.getItem('userId');

      const body = {matchId, userId};
      const response = await axios.post(
        `${api}/admin/contestJoined/getUserContests`,
        body,
        {headers: {Authorization: `Bearer ${token}`}},
      );

      setContestData(response.data.contestJoinedDtoList);
    } catch (error) {
      setError('Error fetching contest data.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleContestDetailsNavigate = contestId => {
    if (navigationRef.isReady()) {
      navigationRef.navigate('Winning', {contestId});
    }
  };

  const renderPrizeBreakup = data => {
    if (!data?.maxRankPrice) return null;

    return (
      <SafeAreaView style={{}}>
        <View>
          <ScrollView
            style={{
              width: wp('100%'),
              height: hp('100%'),
              paddingBottom: 10,
            }}
            contentContainerStyle={{
              gap: 5,
              paddingBottom: screenHeight * 0.5,
            }}>
            <View style={styles.prizeBreakupContainer}>
              {data.maxRankPrice.map((rankData, idx) => (
                <View key={idx} style={[styles.prizeRow]}>
                  <View style={styles.rankContainer}>
                    {rankData.rank === 1 && (
                      <Image
                        source={require('../../../../../assets/1stRank.png')}
                        style={styles.rankImage}
                      />
                    )}
                    {rankData.rank === 2 && (
                      <Image
                        source={require('../../../../../assets/1stRank.png')}
                        style={styles.rankImage}
                      />
                    )}
                    {rankData.rank === 3 && (
                      <Image
                        source={require('../../../../../assets/1stRank.png')}
                        style={styles.rankImage}
                      />
                    )}
                    {![1, 2, 3].includes(rankData.rank) && (
                      <Text style={styles.rankText}>#{rankData.rank}</Text>
                    )}
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: rankData.rank <= 3 ? hp(2) : hp(1.5),
                        fontWeight: rankData.rank <= 3 ? 'bold' : '700',
                        color: '#000',
                      }}>
                      ₹{rankData.amount}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };

  const renderContestItem = data => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}>
      <Pressable
        key={data.recordId}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          borderWidth: 0.5,
          borderColor: '#c0c0c0',
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            backgroundColor: '#fff',
            width: '100%',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '50%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: hp(1.5), color: '#000'}}>RANK</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '50%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: hp(1.5), color: '#000'}}>WINNINGS</Text>
          </View>
        </View>
      </Pressable>
      {renderPrizeBreakup(data.contestDto)}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : contestData.length > 0 ? (
          <View>{contestData.map(data => renderContestItem(data))}</View>
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No contests available.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  contestItem: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    margin: 10,
    overflow: 'hidden',
  },
  contestHeader: {
    padding: 5,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prizePoolContainer: {
    width: '25%',
    gap: 5,
  },
  spotsContainer: {
    width: '40%',
    alignItems: 'center',
  },
  entryContainer: {
    width: '25%',
    gap: 5,
    padding: 5,
    alignItems: 'flex-end',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  spotsTitle: {
    fontWeight: 'bold',
    color: '#606060',
  },
  spotsValue: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '600',
    color: '#000',
  },
  entryButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    borderRadius: 5,
  },
  contestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#ebebeb',
    width: '100%',
    alignItems: 'center',
  },
  footerLeft: {
    flexDirection: 'row',
    gap: 7,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  rankBadge: {
    borderRadius: 10,
    borderWidth: 1,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankBadgeText: {
    fontSize: hp(1.2),
  },
  footerText: {
    fontSize: hp(1.2),
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  flexibleIcon: {
    width: 18.5,
    height: 17,
  },
  prizeBreakupContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 15,
    paddingVertical: 15,
    padding: 10,
  },
  prizeBreakupHeader: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: wp('91%'),
  },
  prizeBreakupTitle: {
    fontSize: hp(1.5),
  },
  prizeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 5,
  },
  headerText: {
    fontWeight: '500',
    fontSize: hp(1.5),
  },
  prizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 40,
    paddingRight: 70,
    padding: 10,
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: '#c0c0c0',
  },
  rankContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankImage: {
    width: 35,
    height: 35,
  },
  rankText: {
    fontSize: hp(2.5),
    fontWeight: '600',
  },
  amountText: {
    fontSize: hp(2.4),
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: hp(2),
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: hp(2),
    color: '#606060',
  },
});

export default Winning;
