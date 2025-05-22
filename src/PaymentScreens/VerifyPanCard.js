import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, SafeAreaView, Alert,
  ActivityIndicator, StyleSheet
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { api } from '../envfile/api';
import UploadPanProof from '../Models/UploadPanProof';
import { showMessage } from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import UploadBankAcc from '../Models/UploadBanAcc';

const VerifyPanCard = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isPanProofUploaded, setIsPanProofUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [pan, setPan] = useState('');
  const [dob, setDob] = useState('');
  const [panProof, setPanProof] = useState(null);
  const [bankProof, setBankProof] = useState(null)

  const formatDOB = (text) => {
    let cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 6) {
      cleaned = cleaned.slice(0, 2) + '-' + cleaned.slice(2, 4) + '-' + cleaned.slice(4, 8);
    } else if (cleaned.length > 4) {
      cleaned = cleaned.slice(0, 2) + '-' + cleaned.slice(2, 4) + '-' + cleaned.slice(4);
    } else if (cleaned.length > 2) {
      cleaned = cleaned.slice(0, 2) + '-' + cleaned.slice(2);
    }
    setDob(cleaned);
  };

  const CheckNameAndPan = async () => {
    if (!name || !pan || !dob || !bankProof) {
      showMessage({
        message: 'Error',
        description: "Please fill all fields and upload PAN proof",
        type: 'danger',
        backgroundColor: '#f44336',
        color: '#FFFFFF',
        duration: 3000,
      });

      return;
    }

    const validatePan = (pan) => {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      return panRegex.test(pan);
    };

    if (!validatePan(pan)) {
      showMessage({
        message: 'Error',
        description: "Invalid PAN format. Please enter a valid PAN.",
        type: 'danger',
        backgroundColor: '#f44336',
        color: '#FFFFFF',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    const token = await AsyncStorage.getItem('jwtToken');
    if (!token) {
      showMessage({
        message: 'Error',
        description: "No token found. Please login first.",
        type: 'danger',
        backgroundColor: '#f44336',
        color: '#FFFFFF',
        duration: 3000,
      });
      setIsLoading(false);
      return;
    }

    try {
      // Structure the request body with kycDtoList
      const body = {
        kycDtoList: [
          {
            userName: name.trim(),
            panNumber: pan.toUpperCase(),
            dateOfBirth: dob,
            panImage: bankProof.base64,
          },
        ],
      };
      console.log(body, "req body");

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Make the POST request instead of GET if you are sending data
      const response = await axios.post(`${api}/admin/kyc/edit`, body, { headers });

      // console.log("API Response:", response.data);

      if (response.data.success) {
        showMessage({
          message: 'Success',
          description: "PAN verification details submitted successfully.",
          type: 'success',
          backgroundColor: '#4CAF50',
          color: '#FFFFFF',
          duration: 3000,
        });
      } else {
        showMessage({
          message: 'Error',
          description: response.data.message || 'Something went wrong',
          type: 'danger',
          backgroundColor: '#f44336',
          color: '#FFFFFF',
          duration: 3000,
        });
      }

    } catch (error) {
      console.error("API Error:", error);

      // Check if the error is a network or response error
      if (error.response) {
        // This means the request was made, but the server responded with a status code outside 2xx
        showMessage({
          message: 'Error',
          description: response.data.message || error.response.statusText || 'Something went wrong',
          type: 'danger',
          backgroundColor: '#f44336',
          color: '#FFFFFF',
          duration: 3000,
        });
      } else if (error.request) {
        // The request was made, but no response was received
        showMessage({
          message: 'Error',
          description: "No response from server. Please check your internet connection.",
          type: 'danger',
          backgroundColor: '#f44336',
          color: '#FFFFFF',
          duration: 3000,
        });
      } else {
        // Something else happened in setting up the request
        showMessage({
          message: 'Error',
          description: "An unexpected error occurred.",
          type: 'danger',
          backgroundColor: '#f44336',
          color: '#FFFFFF',
          duration: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor="#808080"
            style={styles.input}
            autoCapitalize="words"
          />
          <Text style={styles.inputHint}>Enter your Full name as on PAN Card</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={pan}
            onChangeText={(text) => setPan(text.toUpperCase())}
            placeholder="PAN"
            placeholderTextColor="#808080"
            autoCapitalize="characters"
            maxLength={10}
            style={styles.input}
          />
          <Text style={styles.inputHint}>Please enter valid PAN number</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={dob}
            onChangeText={formatDOB}
            keyboardType="numeric"
            placeholder="Date of Birth (DD-MM-YYYY)"
            placeholderTextColor="#808080"
            maxLength={10}
            style={styles.input}
          />
          <Text style={styles.inputHint}>Enter your DOB as on PAN card</Text>
        </View>

        <Pressable onPress={() => setModalVisible(true)} style={styles.uploadButton}>
          <FontAwesome name="address-card-o" size={19} color="black" />
          <Text style={styles.uploadButtonText}>
            {isPanProofUploaded ? 'PAN PROOF UPLOADED' : 'UPLOAD PAN PROOF'}
          </Text>
        </Pressable>

        {/* <UploadPanProof
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          setPanProof={setPanProof}
          onUploadSuccess={() => {
            setIsPanProofUploaded(true);
            setModalVisible(false);
          }}
        /> */}
        <UploadBankAcc
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          setBankProof={setBankProof}
          onUploadSuccess={() => {
            setIsPanProofUploaded(true);
            setModalVisible(false);
          }}
          fieldName="UPLOAD PAN"
        />

        <View style={styles.noteContainer}>
          <Text style={styles.noteTitle}>NOTE:</Text>
          <Text style={styles.noteText}>• Once linked to an account, your PAN cannot be unlinked</Text>
          <Text style={styles.noteText}>• It may take up to 24 hours to verify your PAN</Text>
        </View>



        <View style={{ width: wp('90%'), position: 'absolute', bottom: hp('1%') }}>
          {name && pan && dob && bankProof ? (
            // If all fields are filled, show active button with LinearGradient
            <LinearGradient
              style={{
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
              colors={['#3b53bd', '#243373', '#192451']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <Pressable
                onPress={CheckNameAndPan}
                style={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#737373" />
                ) : (
                  <Text style={styles.submitButtonText}>SUBMIT DETAILS</Text>
                )}
              </Pressable>
            </LinearGradient>
          ) : (
            // If fields are missing, show disabled plain button
            <View
              style={[
                styles.submitButton,
                styles.disabledButton,
                { backgroundColor: '#cccccc' }, // gray background for disabled
              ]}
            >
              <Text style={styles.submitButtonText}>SUBMIT DETAILS</Text>
            </View>
          )}
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  formContainer: { width: wp('100%'), height: hp('90%'), alignItems: 'center', padding: 15, gap: 15 },
  inputContainer: { width: wp('95%'), padding: 5 },
  input: { color: '#000', borderWidth: 1, borderColor: '#808080', borderRadius: 5, padding: 10, fontSize: hp(1.8) },
  inputHint: { fontSize: hp(1.5), color: '#808080', marginTop: 5 },
  uploadButton: { flexDirection: 'row', width: wp('92%'), alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#000', justifyContent: 'center', padding: 10, gap: 10 },
  uploadButtonText: { color: '#000', fontWeight: '600', fontSize: hp(1.8) },
  noteContainer: { width: wp('90%'), marginTop: 10 },
  noteTitle: { fontWeight: 'bold', fontSize: hp(1.6), color: '#000', marginBottom: 5 },
  noteText: { fontSize: hp(1.5), color: '#595959', fontWeight: '500', marginBottom: 3 },
  submitContainer: { width: wp('90%'), position: 'absolute', bottom: hp('1%') },
  submitButton: { padding: 12, alignItems: 'center', borderRadius: 8 },
  disabledButton: { opacity: 0.6 },
  submitButtonText: { fontSize: hp(1.8), fontWeight: 'bold', color: '#fff' },
});

export default VerifyPanCard;
