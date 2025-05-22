import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  Keyboard,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CommonActions, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaskedView from '@react-native-masked-view/masked-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from '../envfile/api';
import axios from 'axios';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'; // For filled icon
import ProfileFieldUpdatePopup from '../Models/ProfileFieldUpdatePopup';
import {useAuth} from '../../Navigation';
import RNFS from 'react-native-fs';
import LottieView from 'lottie-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import for outline icon

const MyInfoAndSettings = () => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState();
  const [selectGender, setSelectGender] = useState('Male');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [labelName, setLabelName] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [fieldInputName, setFieldInputName] = useState('');
  const [loading, setLoading] = useState(true);
  const [recordId, setRecordId] = useState(null);


  const [userDetails, setUserDetails] = useState({
    username: '',
    name: '',
    email: '',
    mobileNumber: '',
    gender: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
    country: '',
    profileImage: null, // Store the multipart file
  });
  // console.log(userDetails, 'userDetails details');
  const openFieldModal = (field, label) => {
    setSelectedField(field);
    setLabelName(label);
    setFieldInputName(userDetails[field]);
    setIsPopupVisible(true);
  };
  const updateFieldValue = () => {
    Keyboard.dismiss();
    setUserDetails(prev => ({
      ...prev,
      [selectedField]: fieldInputName,
    }));
    setIsPopupVisible(false);
  };

  const [formValues, setFormValues] = useState({
    playerImage: null,
  });

  const [errors, setErrors] = useState({
    playerImage: '',
  });

  // Function to pick an image from the gallery

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, async response => {
      if (
        !response.didCancel &&
        response.assets &&
        response.assets.length > 0
      ) {
        const image = response.assets[0];

        // Validate image format (Only JPEG & PNG allowed)
        const isValidFormat = ['image/jpeg', 'image/png'].includes(image.type);
        if (!isValidFormat) {
          setErrors(prevErrors => ({
            ...prevErrors,
            profileImage: 'Only JPEG and PNG formats are allowed.',
          }));
          return;
        }

        // Clear previous errors
        setErrors(prevErrors => ({...prevErrors, profileImage: ''}));

        // Convert image to Base64
        try {
          const base64Data = await RNFS.readFile(
            Platform.OS === 'android'
              ? image.uri
              : image.uri.replace('file://', ''),
            'base64',
          );

          // Store base64 string in formValues
          // setFormValues((prevValues) => ({
          //   ...prevValues,
          //   playerImage: base64Data, // Store as base64
          // }));
          setUserDetails(prevDetails => ({
            ...prevDetails,
            profileImage: base64Data, // Store the file object
          }));
          
           setProfileImage(base64Data);

        } catch (error) {
          console.error('Error converting image to base64:', error);
        }
      }
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    try {
      // console.log('Hitting API...');

      // Retrieve Token & User ID
      const token = await AsyncStorage.getItem('jwtToken');
      const recordId = await AsyncStorage.getItem('userId');

      if (!token) {
        // console.log('No token found in AsyncStorage');
        return;
      }
      // console.log('Token:', token);

      // API Request
      const body = {recordId: recordId};
      const response = await axios.post(`${api}/admin/user/getUserById`, body, {
        headers: {Authorization: `Bearer ${token}`},
      });

      // console.log('Full API Response:', response.data);

      if (response.data?.userDtoList?.length > 0) {
        const userData = response.data.userDtoList[0];

        // Ensure all required fields are present with a fallback value
        const formattedUserDetails = {
          username: userData.username || '',
          name: userData.name || '',
          email: userData.email || '',
          mobile: userData.mobileNumber || '', // Ensure mobile is correctly mapped
          address: userData.address || '',
          city: userData.city || '',
          state: userData.state || '',
          country: userData.country || '',
          pincode: userData.pinCode || '',
          profileImage: userData.profileImage || '',
          dateOfBirth: userData.dateOfBirth || '',
          // gender: selectGender,
          recordId: userData.recordId,
        };
        setRecordId(userData.recordId);
        setSelectGender(userData.gender);

        if (userData.profileImage) {
          setFormValues({
            playerImage: {
              uri: `data:image/jpeg;base64,${userData.profileImage}`,
            },
          });
        } else {
          setFormValues({playerImage: null}); // Handle empty image case
        }
        setUserDetails(formattedUserDetails);
      } else {
        // console.log('No user details found in response');
      }
    } catch (error) {
      // console.log(
      //   'API Error:',
      //   error.response ? error.response.data : error.message,
      // );
    } finally {
      setLoading(false);
    }
  };
  const {isAuthenticated, setIsAuthenticated} = useAuth(); // ✅ Get from context

  const handleLogout = async () => {
    try {
      // console.log('Logout button triggered');

      await AsyncStorage.removeItem('jwtToken');
      // console.log('Token removed from AsyncStorage');

      setIsAuthenticated(false);
      // console.log('Auth state updated: isAuthenticated -> false');

      setTimeout(() => {
        // console.log('🔄 Current auth state after update:', isAuthenticated);
      }, 1000);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'CarouselScreen'}],
        }),
      );

      // console.log('✅ Hard reset to LoginEmail');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateUserProfile = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('jwtToken');
      // console.log("profileImage",profileImage);
      
      await AsyncStorage.setItem('profileImage', profileImage);
      const body = {
        username: userDetails.username || '',
        name: userDetails.name || '',
        email: userDetails.email || '',
        mobileNumber: userDetails.mobileNumber || '',
        gender: selectGender || '',
        address: userDetails.address || '',
        city: userDetails.city || '',
        pinCode: userDetails.pincode || '',
        state: userDetails.state || '',
        country: userDetails.country || '',
        recordId: userDetails.recordId || '',
        dateOfBirth: userDetails.dateOfBirth || '',
        profileImage: userDetails.profileImage || '',
      };
      // Send API request
      const response = await axios.post(`${api}/admin/user/edit`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data,"update profile details");
      // Handle API response
      // if (response.data.success) {
      //   toast.success(response.data.message, { className: "text-sm" });
      //   setTimeout(() => {
      //     router.push("/fantasy/play/player");
      //   }, 2000);
      // } else {
      //   toast.error(response.data.message, { className: "text-sm" });
      // }
      navigation.goBack();
    } catch (error) {
      console.error(
        'Error during API call:',
        error.response?.data || error.message,
      );
      // toast.error("Error updating user profile", { className: "text-sm" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#fff'}}
      edges={['top', 'left', 'right']}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <LottieView
            source={require('../../assets/loadingAnimation.json')}
            autoPlay
            loop={true}
            style={{width: 130, height: 130}}
          />
        </View>
      )}
      {/* Fixed Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          paddingTop: Platform.OS === 'ios' ? 10 : 0, // Add extra padding for iOS
          padding: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
          width: '100%',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '30%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 7,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{padding: 5}}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {/* Back Button with Gradient */}

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '40%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaskedView
            maskElement={
              <Text
                style={{
                  fontFamily: 'Roboto-Bold',
                  fontSize: hp(2),
                  color: 'black',
                  textAlign: 'center',
                }}>
                Your Account
              </Text>
            }>
            <LinearGradient
              colors={['#3E57C4', '#1E2E74']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text
                style={{
                  fontSize: hp(2),
                  opacity: 0,
                  fontFamily: 'Roboto-Bold',
                }}>
                Your Account
              </Text>
            </LinearGradient>
          </MaskedView>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '30%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: 5,
          }}>
          {/* Update Button with Gradient */}
          <TouchableOpacity
            onPress={() => updateUserProfile()}
            style={{borderRadius: 5, overflow: 'hidden'}}>
            <LinearGradient
              colors={['#3E57C4', '#1E2E74']}
              style={{
                paddingVertical: 7,
                paddingHorizontal: 16,
                borderRadius: 5,
              }}>
              <Text
                style={{fontSize: hp(1.5), color: '#fff', fontWeight: 'bold'}}>
                UPDATE
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={{paddingTop: 30, paddingHorizontal: 16}}>
        {/* Profile Image Section */}
        <View style={{alignItems: 'center', marginBottom: 10}}>
          <View style={{position: 'relative'}}>
            <Image
              source={
                userDetails.profileImage
                  ? {
                      uri: `data:image/jpeg;base64,${
                        userDetails.profileImage.data ??
                        userDetails.profileImage
                      }`,
                    }
                  : require('../../assets/ProfileImpact.jpg') // Default image
              }
              style={{
                height: hp(15),
                width: wp(30),
                borderRadius: 10,
                borderWidth: userDetails.profileImage ? 2 : 0,
                borderColor: userDetails.profileImage
                  ? '#3E57C4'
                  : 'transparent',
              }}
            />

            {/* Transparent Overlay */}
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust the alpha (0.4 for 40% transparency)
                borderRadius: 10, // Match image borderRadius
              }}
            />
          </View>

          <TouchableOpacity
            onPress={pickImage}
            style={{
              position: 'absolute',
              borderRadius: 20,
              padding: 6,
              justifyContent: 'center',
              alignItems: 'center',
              top: 40,
            }}>
            <MaterialCommunityIcons
              name="camera-outline"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => {
              setUserDetails(prevDetails => ({
                ...prevDetails,
                profileImage: '', // Store the file object
              }));
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#ffdcdc',
              padding: 5,
              paddingHorizontal: 7,
              borderRadius: 25,
            }}>
            <View>
              <MaterialCommunityIcons
                name="delete-outline"
                size={21}
                color="#FF5151"
              />
            </View>
            <View>
              <Text
                style={{
                  color: '#FF5151',
                  fontFamily: 'Roboto-Bold',
                  fontSize: hp(1.7),
                }}>
                Remove Profile Picture
              </Text>
            </View>
          </Pressable>
        </View>

        <View style={{paddingTop: 10}}>
          {[{label: 'Username', field: 'username'}].map((item, index) => (
            <Pressable
              key={index}
              // onPress={() => openFieldModal(item.field, item.label)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 30,
                width: '100%',
              }}>
              <View
                style={{display: 'flex', flexDirection: 'row', width: '40%'}}>
                <Text
                  style={{
                    fontSize: hp(2),
                    fontFamily: 'Roboto-Bold',
                    color: '#000',
                  }}>
                  {item.label}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                  width: '60%',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 14, color: '#666'}}>
                  {userDetails[item.field]?.trim()
                    ? userDetails[item.field]
                    : `Enter ${item.label}`}
                </Text>
                <Feather name="chevron-right" size={20} color="#fff" />
              </View>
            </Pressable>
          ))}
          {[
            {label: 'Name', field: 'name'},
            {label: 'Email', field: 'email'},
            {label: 'Mobile', field: 'mobileNumber'},
          ].map((item, index) => (
            <Pressable
              key={index}
              onPress={() => openFieldModal(item.field, item.label)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 30,
                width: '100%',
              }}>
              <View
                style={{display: 'flex', flexDirection: 'row', width: '40%'}}>
                <Text
                  style={{
                    fontSize: hp(2),
                    fontFamily: 'Roboto-Bold',
                    color: '#000',
                  }}>
                  {item.label}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                  width: '60%',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 14, color: '#666'}}>
                  {userDetails[item.field]?.trim()
                    ? userDetails[item.field]
                    : `Enter ${item.label}`}
                </Text>
                <Feather name="chevron-right" size={20} color="black" />
              </View>
            </Pressable>
          ))}

          {/* Gender Field */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 30,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '40%',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: hp(2),
                  fontFamily: 'Roboto-Bold',
                  color: '#000',
                }}>
                Gender
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '60%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                gap: 5,
              }}>
              {['Male', 'Female', 'Others'].map(gender => (
                <Pressable
                  key={gender}
                  onPress={() => {
                    setSelectGender(gender);
                    setUserDetails(prev => ({
                      ...prev,
                      gender: gender,
                    }));
                  }}
                  style={{
                    borderWidth: 2,
                    borderColor:
                      selectGender === gender ? '#3E57C4' : '#d3d3d3',
                    borderRadius: 15,
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}>
                  {selectGender === gender ? (
                    <MaskedView
                      maskElement={
                        <Text
                          style={{
                            fontFamily: 'Roboto-Bold',
                            fontSize: hp(1.8),
                            color: 'black',
                            textAlign: 'center',
                            padding: 2,
                          }}>
                          {gender}
                        </Text>
                      }>
                      <LinearGradient
                        colors={['#3E57C4', '#1E2E74']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}>
                        <Text
                          style={{
                            fontSize: hp(1.8),
                            opacity: 0,
                            fontFamily: 'Roboto-Bold',
                            padding: 2,
                          }}>
                          {gender}
                        </Text>
                      </LinearGradient>
                    </MaskedView>
                  ) : (
                    <Text
                      style={{
                        fontSize: hp(1.8),
                        color: '#d3d3d3',
                        fontFamily: 'Roboto-Bold',
                        padding: 2,
                      }}>
                      {gender}
                    </Text>
                  )}
                </Pressable>
              ))}
            </View>
          </View>

          {[
            {label: 'Date of Birth', field: 'dateOfBirth'},
            {label: 'Address', field: 'address'},
            {label: 'City', field: 'city'},
            {label: 'Pincode', field: 'pincode'},
            {label: 'State', field: 'state'},
            {label: 'Country', field: 'country'},
          ].map((item, index) => (
            <Pressable
              key={index}
              onPress={() => openFieldModal(item.field, item.label)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 30,
                width: '100%',
              }}>
              <View
                style={{display: 'flex', flexDirection: 'row', width: '40%'}}>
                <Text
                  style={{
                    fontSize: hp(2),
                    fontFamily: 'Roboto-Bold',
                    color: '#000',
                  }}>
                  {item.label}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 10,
                  width: '60%',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 14, color: '#666'}}>
                  {userDetails[item.field]?.trim()
                    ? userDetails[item.field]
                    : `Enter ${item.label}`}
                </Text>
                <Feather name="chevron-right" size={20} color="black" />
              </View>
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={() => {
            navigation.navigate('PermissionSetting');
          }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#eeeeee',
            borderRadius: 8,
          }}>
          <View>
            <Text
              style={{
                fontSize: hp(2),
                fontFamily: 'Roboto-Bold',
                color: '#000',
              }}>
              Permission Settings
            </Text>
          </View>
          <Icon name="settings" size={25} color="#484848" />
        </Pressable>
        <Pressable
          onPress={() => handleLogout()}
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            marginBottom: 25,
            backgroundColor: '#CD1C18',
            marginTop: 25,
            borderRadius: 8,
            gap: 5,
          }}>
          <MaterialIcon name="power-settings-new" size={20} color="#fff" />

          <Text
            style={{
              fontSize: hp(2),
              fontFamily: 'Roboto-Bold',
              color: '#fff',
            }}>
            Log Out
          </Text>
        </Pressable>
        <ProfileFieldUpdatePopup
          visible={isPopupVisible}
          onClose={() => {
            setIsPopupVisible(false);
          }}
          fieldInputName={fieldInputName}
          setFieldInputName={setFieldInputName}
          labelName={labelName}
          updateFieldValue={updateFieldValue}
          recordId={recordId}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Ensure contrast for visibility
  },
  maskedText: {
    fontSize: 44,
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
  },
  gradientBackground: {
    height: 50, // Match the text height
    width: '100%', // Cover the text width
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default MyInfoAndSettings;
