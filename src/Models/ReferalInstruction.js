import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ReferalInstruction = ({visible, onClose}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={onClose}>
          <LinearGradient
            colors={['#020202', '#1B2656', '#3247A0']}
            style={{
              flex: 1,
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              width: wp('100%'),
            }}>
            <View style={{paddingBottom: 40}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: wp('100%'),
                  justifyContent: 'space-between',
                  padding: 10,
                }}>
                <Text
                  style={{color: '#fff', fontWeight: 'bold', fontSize: hp(2)}}>
                  How it Works?
                </Text>
                <Pressable onPress={onClose}>
                  <AntDesign name="close" size={20} color="#fff" />
                </Pressable>
              </View>
              <ScrollView>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: wp('100%'),
                    justifyContent: 'center',
                    padding: 10,
                  }}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    Referral Bonus
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: wp('100%'),
                      justifyContent: 'center',
                      padding: 10,
                    }}>
                    <Text style={{color: '#fff'}}>
                      Join the realm of,
                      <Text style={{fontWeight: 'bold', color: '#fff'}}>
                        Impact11
                      </Text>
                      and uncover a world where every referral brings forth real
                      cash rewards! Our referral program offers you the key to
                      unlock exciting bonuses for every friend you introduce to
                      the exhilarating world of cash gaming.
                    </Text>
                  </View>
                  <Text
                    style={{color: '#fff', fontWeight: 'bold', paddingTop: 9}}>
                    Referral Bonus Structure:
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: wp('95%'),
                      justifyContent: 'center',
                      padding: 10,
                    }}>
                    <View style={{padding: 5}}>
                      <View style={{flexDirection: 'row'}}>
                        <Entypo name="dot-single" size={24} color="#fff" />
                        <Text
                          style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            textAlign: 'justify',
                          }}>
                          Enjoy an instant reward of Rs. 51 when your friend
                          plays their inaugural cash game on Impact11.
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Entypo name="dot-single" size={24} color="#fff" />
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>
                          For every Rs. 40 that your friend plays beyond their
                          first game, you earn an addition Rs. 4 in bonus cash.
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Entypo name="dot-single" size={24} color="#fff" />
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>
                          Accumulate a maximum bonus of Rs. 551 per friend,
                          comprised of Rs. 51 instant cash and Rs. 500 in bonus
                          chunks.
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    Referral Terms:{' '}
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: wp('95%'),
                      justifyContent: 'center',
                      padding: 10,
                    }}>
                    <View style={{padding: 5}}>
                      <View style={{flexDirection: 'row'}}>
                        <Entypo name="dot-single" size={24} color="#fff" />
                        <Text style={{color: '#fff'}}>
                          Your referred friend's membership hinges upon
                          fulfilling all applicable eligibility and verification
                          procedures.
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Entypo name="dot-single" size={24} color="#fff" />
                        <Text style={{color: '#fff'}}>
                          The referral bonus remains valid for 90 days from the
                          date of your friend's initial deposit. After this
                          period, no further bonuses will be issued.
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Entypo name="dot-single" size={24} color="#fff" />
                        <Text style={{color: '#fff'}}>
                          Confirm that your referred friends are acquaintances
                          and have not opted out of receiving promotional
                          communication from you
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Entypo name="dot-single" size={24} color="#fff" />
                        <Text style={{color: '#fff'}}>
                          Avoid sending invitations to unknown individuals or
                          engaging in bulk email ("SPAM") to solicit
                          registrations.
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Entypo name="dot-single" size={24} color="#fff" />
                        <Text style={{color: '#fff'}}>
                          Acknowledge and consent to the use of your address
                          book by third-party websites for invitation purposes,
                          agreeing to indemnify Impact11 for any breaches of
                          privacy policies.
                        </Text>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <Entypo name="dot-single" size={24} color="#fff" />
                        <Text style={{color: '#fff'}}>
                          Referral bonuses for referees registering from an
                          Apple device are temporarily suspended due to the iOS
                          14.5 software upgrade. We are actively working on a
                          resolution and will reinstate referral bonuses for
                          Apple referees soon.
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </LinearGradient>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReferalInstruction;

const styles = StyleSheet.create({});
