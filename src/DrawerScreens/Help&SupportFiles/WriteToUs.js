import React , {useState} from 'react';
import {SafeAreaView, TextInput} from 'react-native';
import {Image, Pressable, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
// import DocumentPicker from 'react-native-document-picker';

const WriteToUs = () => {
    const navigation = useNavigation();


    // ✅ State Declaration
   const [userDetails, setUserDetails] = useState({
     documentFile: '',
   });
 
   const [errors, setErrors] = useState({
     documentFile: '',
   });

  //  const pickDocument = async () => {
  //   try {
  //     const result = await DocumentPicker.pick({
  //       type: [
  //         DocumentPicker.types.pdf,
  //         DocumentPicker.types.doc,
  //         DocumentPicker.types.docx,
  //       ],
  //     });

  //     if (result && result.length > 0) {
  //       const document = result[0];

  //       // ✅ Validate document format (Only PDF, DOC, and DOCX allowed)
  //       const isValidFormat = [
  //         'application/pdf',
  //         'application/msword',
  //         'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  //       ].includes(document.type);

  //       if (!isValidFormat) {
  //         setErrors(prevErrors => ({
  //           ...prevErrors,
  //           documentFile: 'Only PDF, DOC, and DOCX formats are allowed.',
  //         }));
  //         return;
  //       }

  //       // ✅ Clear previous errors
  //       setErrors(prevErrors => ({...prevErrors, documentFile: ''}));

  //       // ✅ Set Document URI or name in state
  //       setUserDetails(prevDetails => ({
  //         ...prevDetails,
  //         documentFile: document.uri, // Store document URI directly
  //       }));

  //       console.log('Document Selected Successfully:', document.uri);
  //     }
  //   } catch (error) {
  //     if (DocumentPicker.isCancel(error)) {
  //       console.log('Document selection cancelled');
  //     } else {
  //       console.error('Error picking document:', error);
  //     }
  //   }
  // };

  return (
    <SafeAreaView>
      <View style={{width: '100%'}}>
        <View
          style={{
            height: hp('16%'),
            width: wp('100%'),
            position: 'relative',
            // backgroundColor: '#f66f',
          }}>
          <LinearGradient
            style={{
              flex: 1,
            }}
            colors={['#101632', '#2A3A83', '#374DAD']}>
            <View
              style={{
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                alignItems: 'center',
                gap: 20,
                padding: 25,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  display: 'flex',
                }}>
                <Pressable onPress={()=> navigation.goBack()}>
                  <AntDesign name="arrowleft" size={24} color="#fff" />
                </Pressable>
                <View>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: hp(2.2),
                    }}>
                    Help & Support
                  </Text>
                </View>
                <View></View>
              </View>

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  display: 'flex',
                }}>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <Image
                    source={require('../../../assets/IMPACT11LogoExtended.png')}
                    style={{height: 15, width: 80}}
                  />
                  <Text
                    style={{fontWeight: 'bold', color: '#fff', fontSize: 28}}>
                    |
                  </Text>
                  <Text style={{fontWeight: 'bold', color: '#fff'}}>
                    Help Center
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={{height: hp('100%'), width: wp('100%')}}>
          <View
            style={{
              width: '100%',
              height: hp('75%'),
              flexDirection: 'column',
              justifyContent: 'flex-start',
              display: 'flex',
              alignItems: 'center',
              padding: 10,
            //   backgroundColor: '#f66f',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                width: '95%',
                height: '80%',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 3,
                gap: 10,
              }}>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  height: '25%',
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: hp(1.9),
                  }}>
                  Write to us{' '}
                </Text>

                <Text style={{color: '#6E6E6E'}}>Subject *</Text>
                <TextInput
                  placeholderTextColor="#ababab"
                  style={{
                    width: wp('80%'),
                    padding: 5,
                    borderRadius: 3,
                    color: '#000',
                    fontSize: hp(1.8),
                    borderColor: '#6E6E6E',
                    borderWidth: 1,
                  }}
                />
              </View>

              <View
                style={{
                  width: '90%',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 8,
                  height: '30%',
                }}>
                <Text style={{color: '#6E6E6E'}}>Description *</Text>
                <TextInput
                  placeholderTextColor="#ababab"
                  multiline={true} // Enable multiline input
                  numberOfLines={4} // Set initial height to 4 lines
                  textAlignVertical="top" // Align text to top
                  style={{
                    width: '100%',
                    height: '77%', // Adjust height if needed
                    borderRadius: 3,
                    borderColor: '#6E6E6E',
                    borderWidth: 1,
                    padding: 10, // Add padding for better UI
                    color: '#000',
                    fontSize: hp(2),
                  }}
                />
              </View>

              <View
                style={{
                  width: '90%',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 8,
                  height: '20%',
                }}>
                <Text style={{color: '#6E6E6E'}}>Attachments</Text>
                <Pressable
                //  onPress={pickDocument}
                  style={{
                    width: wp('80%'),
                    padding: 10,
                    borderRadius: 3,
                    color: '#000',
                    fontSize: hp(1.8),
                    borderColor: '#6E6E6E',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 6,
                  }}>
                  <MaterialCommunityIcons
                    name="file-upload-outline"
                    size={20}
                    color="black"
                  />

                  <Text style={{color: '#000', fontSize: hp(1.7)}}>
                    Add file or drop files here
                  </Text>
                </Pressable>
              </View>

              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Ionicons
                  name="information-circle-outline"
                  size={25}
                  color="#000"
                />
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 5,
                  }}>
                  <Text style={{fontSize: hp(1.6), color: '#000'}}>
                    An acknowledgment email is sent after raising the
                    request.Please check your inbox.
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              width: wp('100%'),
              height:hp("10%"),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            
            }}>
            <LinearGradient
              colors={['#3b53bd', '#243373', '#192451']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Pressable
                style={{
                  width: wp('90%'),
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  padding: 10,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: hp(1.7),
                  }}>
                  SUBMIT
                </Text>
              </Pressable>
            </LinearGradient>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WriteToUs;
