import { TextInput, Text, View, Pressable, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UploadBankAcc from '../Models/UploadBanAcc';
import { showMessage } from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { api } from '../envfile/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VerifyBankAcc() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isBankProofUploaded, setIsBankProofUploaded] = useState(false);
  const [bankAcNum, setBankAcNum] = useState("")
  const [retypeBankAcNum, setRetypeBankAcNum] = useState("")
  const [ifscCode, setIfscCode] = useState("")
  const [bankName, setBankName] = useState("")
  const [branchName, setBranchName] = useState("")
  const [state, setState] = useState("")
  const [bankProof, setBankProof] = useState(null)

  const validateBankDetails = async () => {
    let errors = [];
    let isValid = true;

    const showError = (description) => {
      isValid = false;
      errors.push(description);
      showMessage({
        message: 'Error',
        description,
        type: 'danger',
        backgroundColor: '#f44336',
        color: '#FFFFFF',
        duration: 3000,
      });
    };

    // Bank Account Number Validation
    if (!bankAcNum) {
      showError("Bank account number is required");
    } else if (!/^\d{5,18}$/.test(bankAcNum)) {
      showError("Enter a valid bank account number (5-18 digits)");
    }

    // Re-type Account Number Validation
    if (!retypeBankAcNum) {
      showError("Retype bank account number is required");
    } else if (retypeBankAcNum !== bankAcNum) {
      showError("Bank account numbers do not match");
    }

    // IFSC Code Validation
    if (!ifscCode) {
      showError("IFSC code is required");
    } else {
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (!ifscRegex.test(ifscCode.toUpperCase())) {
        showError("Enter a valid IFSC code (11 characters)");
      }
      // Here you could add an API call to validate IFSC against RBI database
    }

    // Bank Name Validation
    if (!bankName?.trim()) {
      showError("Bank name is required");
    }

    // Branch Name Validation
    if (!branchName?.trim()) {
      showError("Branch name is required");
    }

    // State Validation
    const validStates = ['Andhra Pradesh', 'Tamil Nadu', /*...other states...*/];
    if (!state?.trim()) {
      showError("State is required");
    } else if (!validStates.includes(state.trim())) {
      showError("Please select a valid state");
    }

    // Bank Proof Validation
    if (!bankProof) {
      showError("Bank proof is required");
    } else if (!bankProof.base64) {
      console.log("Bank proof base64 is not available", bankProof);

      showError("Invalid bank proof format");
    }

    if (!isValid) return { isValid, errors };

    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const userId = await AsyncStorage.getItem('userId');

      const body = {
        bankDetailsDtoList: [{
          accountNo: bankAcNum,
          ifscCode: ifscCode.toUpperCase(),
          bankName: bankName.trim(),
          branch: branchName.trim(),
          state: state.trim(),
          proof: bankProof.base64,
          userId: userId
        }]
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      console.log(body, "req body");

      const response = await axios.post(`${api}/admin/BankDetails/edit`, body, { headers });

      if (response.data.success) {
        showMessage({
          message: 'Success',
          description: "Bank details submitted successfully.",
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
      showError("An error occurred while validating bank details");
      return { isValid: false, errors: [error?.response?.data?.message || "An error occurred while validating bank details"] };
    }

  };

  const handleSubmit = async () => {
    const { isValid } = await validateBankDetails();
    if (isValid) {
      // Proceed with form submission
      showMessage({
        message: 'Success',
        description: "Bank details submitted successfully.",
        type: 'success',
        backgroundColor: '#4CAF50',
        color: '#FFFFFF',
        duration: 3000,
      });
    }
  };

  return (
    <>
      <SafeAreaView>
        <View
          style={{
            width: wp('100%'),
            height: hp('90%'),
            justifyContent: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 10,
            gap: 10,
          }}>
          <View
            style={{
              width: wp('100%'),
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              padding: 8,
              gap: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: wp('90%'),
                height: hp("5%"),
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#808080',
              }}>
              <TextInput
                value={bankAcNum}
                onChangeText={(text) => setBankAcNum(text)}
                placeholder="Account Number"
                placeholderTextColor="#808080"
                style={{ color: '#000', paddingLeft: 10 }}
                keyboardType="numeric"
              />
            </View>
            <View style={{ width: wp('90%') }}>
              <Text style={{ fontSize: hp(1.5), color: '#000' }}>
                Enter your Bank Account number
              </Text>
            </View>
          </View>

          <View
            style={{
              width: wp('100%'),
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: wp('90%'),
                height: hp("5%"),
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#808080',
              }}>
              <TextInput
                placeholder="Retype Account Number"
                value={retypeBankAcNum}
                onChangeText={setRetypeBankAcNum}
                placeholderTextColor="#808080"
                keyboardType="numeric"
                style={{ color: '#000', paddingLeft: 10 }}

              />
            </View>
            <View style={{ width: wp('90%') }}>
              <Text style={{ fontSize: hp(1.5), color: '#000' }}>
                Confirm your Bank Account number
              </Text>
            </View>
          </View>

          <View
            style={{
              width: wp('100%'),
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              padding: 5,
              gap: 4,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: wp('90%'),
                height: hp("5%"),
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#808080',
              }}>
              <TextInput placeholder="IFSC Code"
                value={ifscCode}
                onChangeText={(text) => setIfscCode(text.toUpperCase())}
                autoCapitalize="characters"
                placeholderTextColor="#808080"
                style={{ color: '#000', paddingLeft: 10 }} />
            </View>
            <View style={{ width: wp('90%') }}>
              <Text style={{ fontSize: hp(1.5), color: '#000' }}>
                Enter 11 digit Bank IFSC Code{' '}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: wp('100%'),
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              padding: 5,
              gap: 4,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: wp('90%'),
                height: hp("5%"),
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#808080',
              }}>
              <TextInput
                placeholder="Bank Name"
                value={bankName}
                onChangeText={setBankName}
                placeholderTextColor="#808080"
                style={{ color: '#000', paddingLeft: 10 }}
              />
            </View>
            <View style={{ width: wp('90%') }}>
              <Text style={{ fontSize: hp(1.5), color: '#000' }}>
                Your Bank Name
              </Text>
            </View>
          </View>

          <View
            style={{
              width: wp('100%'),
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              padding: 5,
              gap: 4,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: wp('90%'),
                height: hp("5%"),
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#808080',
              }}>
              <TextInput
                placeholder="Branch Name"
                value={branchName}
                onChangeText={setBranchName}
                placeholderTextColor="#808080"
                style={{ color: '#000', paddingLeft: 10 }} />

            </View>
            <View style={{ width: wp('90%') }}>
              <Text style={{ fontSize: hp(1.5), color: '#000' }}>
                Your Branch Name
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              width: wp('100%'),
              alignItems: 'center',
              justifyContent: 'center',
              gap: 25,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: wp('90%'),
                height: hp("5%"),
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#808080',
                paddingRight: 5
              }}>
              <TextInput placeholder="State"
                value={state}
                onChangeText={setState}
                placeholderTextColor="#808080"
                style={{ color: '#000', paddingLeft: 10 }} />
              <MaterialCommunityIcons
                name="chevron-down"
                size={24}
                color="black"
              />
            </View>

            <Pressable
              onPress={() => setModalVisible(true)}
              style={{
                flexDirection: 'row',
                width: wp('90%'),
                height: hp("5%"),
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#000',
                justifyContent: 'center',
                padding: 8,
                gap: 10,
              }}>
              <MaterialCommunityIcons
                name="bank-outline"
                size={24}
                color="black"
              />
              <Text style={{ color: '#000', fontWeight: '600' }}>
                {isBankProofUploaded ? 'BANK PROOF UPLOADED' : 'UPLOAD BANK PROOF'}

              </Text>
              <UploadBankAcc
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                setBankProof={setBankProof}
                onUploadSuccess={() => {
                  setIsBankProofUploaded(true);
                  setModalVisible(false);
                }}
                fieldName="UPLOAD BANK PROOF"

              />
            </Pressable>
          </View>
        </View>
        <View
          style={{
            width: wp('90%'),
            position: 'absolute',
            bottom: hp('1%'),
            alignSelf: 'center',
          }}>
          {bankAcNum && retypeBankAcNum && ifscCode && bankName && branchName && state && bankProof ? (
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
                onPress={handleSubmit}
                style={{
                  padding: 10,
                  width: '100%',
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderRadius: 8,
                }}>
                <Text
                  style={{ fontSize: hp(1.5), fontWeight: 'bold', color: '#fff' }}>
                  SUBMIT DETAILS
                </Text>
              </Pressable>
            </LinearGradient>
          ) : (
            <View
              style={{
                backgroundColor: '#d7d7d7',
                padding: 10,
                width: '100%',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderRadius: 8,
              }}>
              <Text
                style={{ fontSize: hp(1.5), fontWeight: 'bold', color: '#737373' }}>
                SUBMIT DETAILS
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
