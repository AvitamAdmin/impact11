import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {api} from '../envfile/api';

const MyBalance = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState({balance: 0});

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        const recordId = await AsyncStorage.getItem('userId');

        if (!token || !recordId) return;

        const body = {recordId};

        const response = await axios.post(
          `${api}/admin/user/getUserById`,
          body,
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        );

        if (response.data?.userDtoList?.length > 0 && isMounted) {
          setUserDetails(response.data.userDtoList[0]);
        }
      } catch (error) {
        console.error(
          'API Error:',
          error.response ? error.response.data : error.message,
        );
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        width: wp('100%'),
        padding: 15,
        gap: 15,
        alignItems: 'center',
      }}>
      <Pressable
        style={{
          flexDirection: 'row',
          width: wp('95%'),
          borderWidth: 1,
          borderColor: '#949494',
          backgroundColor: '#fff',
          borderRadius: 5,
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}>
        <View style={{flexDirection: 'column'}}>
          <Text style={{color: '#000'}}>Current Balance</Text>
          <Text style={{fontWeight: 'bold', fontSize: 17, color: '#000'}}>
            ₹{userDetails.balance ?? 0}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            style={{
              padding: 5,
              backgroundColor: '#37b469',
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate('ADD CASH')}>
            <Text
              style={{
                color: '#fff',
                fontSize: 12,
              }}>
              ADD CASH
            </Text>
          </Pressable>
        </View>
      </Pressable>

      <Pressable
        style={{
          flexDirection: 'row',
          width: wp('95%'),
          borderWidth: 1,
          borderColor: '#949494',
          backgroundColor: '#fff',
          borderRadius: 5,
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}>
        <View style={{flexDirection: 'column', gap: 10}}>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
              }}>
              <Text style={{color: '#000'}}>Amount Unutilised</Text>
              <Ionicons
                name="information-circle-outline"
                size={15}
                color="black"
              />
            </View>
            <Text style={{fontWeight: 'bold', fontSize: 17, color: '#000'}}>
              ₹0
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
              }}>
              <Text style={{color: '#000'}}>Winnings</Text>
              <Ionicons
                name="information-circle-outline"
                size={15}
                color="black"
              />
            </View>
            <Text style={{fontWeight: 'bold', fontSize: 17, color: '#000'}}>
              ₹{userDetails.balance ?? 0}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
              }}>
              <Text style={{color: '#000'}}>Winning Bonus</Text>
              <Ionicons
                name="information-circle-outline"
                size={15}
                color="black"
              />
            </View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 17,
                color: '#000',
              }}>
              ₹0
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            style={{
              padding: 5,
              backgroundColor: '#37b469',
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate('WITHDRAW')}>
            <Text
              style={{
                color: '#fff',
                fontSize: 12,
              }}>
              WITHDRAW
            </Text>
          </Pressable>
        </View>
      </Pressable>

      <Pressable

onPress={() => navigation.navigate('My Transactions')}
        style={{
          flexDirection: 'row',
          width: wp('95%'),
          elevation: 5,
          backgroundColor: '#fff',
          borderRadius: 5,
          alignItems: 'center',
          padding: 10,
          gap: 15,
        }}>
        <Entypo name="back-in-time" size={24} color="black" />
        <Text
          style={{
            fontWeight: 'bold',
            color: '#000',
          }}>
          My Transactions
        </Text>
      </Pressable>

      <Pressable
        style={{
          flexDirection: 'column',
          width: wp('95%'),
          elevation: 5,
          backgroundColor: '#fff',
          borderRadius: 5,
          padding: 10,
          gap: 2,
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 15,
            alignItems: 'center',
          }}>
          <View>
          <Ionicons name="card-outline" size={24} color="black" />
          </View>
          <View
          style={{display:"flex",flexDirection: 'column',
            gap: 3,

          }}
          >
            <View>
            <Text
            style={{
              fontWeight: 'bold',
              color: '#000',
            }}>
            Manage Payment
          </Text>
            </View>
          <View style={{}}>
          <Text style={{color: '#000'}}>Add/Remove cards, Wallets, etc</Text>
        </View>
        
          </View>
        </View>
       
      </Pressable>

      <Pressable

onPress={() => navigation.navigate('Verify Account')}
        style={{
          flexDirection: 'column',
          width: wp('95%'),
          elevation: 5,
          backgroundColor: '#fff',
          borderRadius: 5,
          padding: 10,
          gap: 2,
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 15,
            alignItems: 'center',
          }}>
          <View>
          <FontAwesome5 name="address-card" size={21} color="black" />
          </View>
          <View
          style={{display:"flex",flexDirection: 'column',
            gap: 3,

          }}
          >
            <View>
            <Text
            style={{
              fontWeight: 'bold',
              color: '#000',
            }}>
              My KYC Details
          </Text>
            </View>
          <View style={{}}>
          <Text style={{color: '#000'}}>Verify Mobile, Email, PAN & Bank Account</Text>
        </View>
        
          </View>
        </View>
       
      </Pressable>
    </View>
  );
};

export default MyBalance;

const styles = StyleSheet.create({});
