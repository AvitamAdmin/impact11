import React from 'react';
import { Modal, Pressable, Text, View, StyleSheet, TouchableWithoutFeedback, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';



const CreateContestPopup = ({ visible, onClose }) => {
    const navigation = useNavigation();
  
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}

        
      >
        <TouchableWithoutFeedback onPress={onClose} >
        <View style={{ flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'rgba(7, 7, 7, 0.3)',
                        }}>
          <TouchableWithoutFeedback>
            <View style={{ width: wp('100%'),
                            backgroundColor: 'white',
                            padding:10,}}>
              <View style={{ paddingTop: 25 }}>
                <View style={{  width: wp('95%'),
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'row',
                                borderWidth: 1,
                                borderRadius: 5,
                                borderColor: '#808080',}}>
                  <View style={{ width: wp('50%') }}>
                    <TextInput placeholder="Enter Contest Code" placeholderTextColor="#6E6E6E" style={{   fontWeight: '700', 
                        color: '#4D4D4D'}}/>
                  </View>
                  <View style={{width: wp('30%'), backgroundColor: '#3E57C4',borderRadius: 7,marginRight:10}}>
                    <Pressable>
                      <Text style={{color: '#fff',fontWeight: '900', textAlign: 'center',padding: 8,}}>JOIN</Text>
                    </Pressable>
                  </View>
                </View>
              </View>


              <View style={{width: wp('95%'),
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: 15,
                        }}>
                           <LinearGradient 
                                     style={{
                                        // padding: 10,
                                        // width: "90%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 5,}}
                                      colors={["#3b53bd", "#243373", "#192451", ]}
                                      start={{ x: 0, y: 0.5 }} 
                                      end={{ x: 1, y: 0.5 }} >
                <View style={{width: wp('95%'),
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'row',
                                // backgroundColor: '#3E57C4',
                                padding: 9,
                                borderRadius: 6,}}>
                  <View style={{ width: wp('9%'), }}>
                    <Feather name="plus-circle" size={23} color="white" />
                  </View>
                  <View>
                 
                    <Pressable
                      onPress={() => {
                        navigation.navigate('CreateContest');
                      }}>
                       
                      <Text style={{ color: '#fff',
                        fontWeight: '700',}}>Create New Contest</Text>
                         </Pressable>
                   
                         </View>
                  </View>
                  </LinearGradient>
                
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}


export default CreateContestPopup;

