import {
  Modal,
  Pressable,
  Text,
  View,
  Image,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
// import DocumentPicker from 'react-native-document-picker';
import { ActivityIndicator } from 'react-native-paper';


const UploadBankAcc = ({ visible, onClose, setBankProof, onUploadSuccess, fieldName }) => {
  const [isUploading, setIsUploading] = React.useState(false);

  const processImage = async (uri, name, type) => {
    try {
      const filePath =
        Platform.OS === 'android' ? uri : uri.replace('file://', '');
      const base64Data = await RNFS.readFile(filePath, 'base64');

      // const imageData = {
      //   uri: document.uri,
      //   name: document.name || `bank_proof_${Date.now()}.${document.type?.split('/')[1] || 'pdf'}`,
      //   type: document.type,
      //   base64: base64Data, // Send raw base64 without the prefix// Only the base64 string, no data:... prefix
      // };

      setBankProof(imageData);
      console.log(imageData, "pan details");

      onUploadSuccess();
    } catch (error) {
      console.error('Error processing image:', error);
      Alert.alert('Error', 'Failed to process image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageSelection = async (response) => {
    if (response.didCancel || !response.assets?.length) return;

    const image = response.assets[0];
    const type = image.type || 'image/jpeg';
    const name =
      image.fileName || `bank_proof_${Date.now()}.${type.split('/')[1] || 'jpg'}`;

    setIsUploading(true);

    await processImage(image.uri, name, type);
  };

  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        quality: 1,
      },
      handleImageSelection
    );
  };

  const takePhoto = () => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      handleImageSelection
    );
  };

  // const uploadFromDocument = async () => {
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
  //         Alert.alert('Invalid Format', 'Only PDF, DOC, and DOCX formats are allowed.');
  //         return;
  //       }

  //       setIsUploading(true);

  //       try {
  //         // Try to read file as base64 (works for file:// URIs)
  //         let base64Data = null;
  //         let filePath = document.uri;

  //         // For Android content URIs, try to get file path using RNFS stat or copy to cache
  //         if (Platform.OS === 'android' && filePath.startsWith('content://')) {
  //           // Copy to cache directory to get a file:// path
  //           const destPath = `${RNFS.TemporaryDirectoryPath}/${document.name}`;
  //           await RNFS.copyFile(document.uri, destPath);
  //           filePath = destPath;
  //         }

  //         // Remove file:// if present
  //         if (filePath.startsWith('file://')) {
  //           filePath = filePath.replace('file://', '');
  //         }

  //         // Try reading as base64
  //         base64Data = await RNFS.readFile(filePath, 'base64');
  //         console.log(base64Data, "panproof base64");

  //         setBankProof({
  //           uri: document.uri,
  //           name: document.name || `bank_proof_${Date.now()}.${document.type?.split('/')[1] || 'pdf'}`,
  //           type: document.type,
  //           base64: base64Data, // Send raw base64 without the prefix
  //         });
  //         onUploadSuccess();
  //       } catch (err) {
  //         // If base64 fails, fallback to just passing uri/name/type
  //         setBankProof({
  //           uri: document.uri,
  //           name: document.name || `bank_proof_${Date.now()}.${document.type?.split('/')[1] || 'pdf'}`,
  //           type: document.type,
  //         });
  //         Alert.alert(
  //           'Notice',
  //           'Base64 preview is not available for this document, but the file will be uploaded.'
  //         );
  //         onUploadSuccess();
  //       } finally {
  //         setIsUploading(false);
  //       }
  //     }
  //   } catch (error) {
  //     if (DocumentPicker.isCancel(error)) {
  //       console.log('Document selection cancelled');
  //     } else {
  //       console.error('Error picking document:', error);
  //       Alert.alert('Error', 'Failed to pick document');
  //     }
  //     setIsUploading(false);
  //   }
  // };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <Pressable
        style={styles.modalOverlay}
        onPress={!isUploading ? onClose : null}
      >
        <Pressable
          style={styles.modalContent}
          onPress={(e) => e.stopPropagation()}
        >
          <Text style={styles.modalTitle}>{fieldName}</Text>

          <Image
            source={require('../../assets/UploadCardImage.png')}
            style={styles.previewImage}
            resizeMode="contain"
          />

          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsText}>
              Ensure that the image proofs aren't blurred and your{' '}
              <Text style={styles.importantText}>
                Full Name, Account number, Signature and Photo
              </Text>{' '}
              must be clear.
            </Text>
          </View>

          {isUploading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#000" />
              <Text style={styles.uploadingText}>Uploading...</Text>
            </View>
          ) : (
            <>
              <Pressable style={styles.uploadOption} onPress={pickImage}>
                <FontAwesome name="photo" size={18} color="#000" />
                <Text style={styles.uploadOptionText}>UPLOAD FROM GALLERY</Text>
              </Pressable>

              <Pressable style={styles.uploadOption} onPress={takePhoto}>
                <FontAwesome name="camera" size={18} color="#000" />
                <Text style={styles.uploadOptionText}>TAKE PHOTO</Text>
              </Pressable>

              <Pressable style={styles.uploadOption} 
              // onPress={uploadFromDocument}
              >
                <FontAwesome name="file-text-o" size={18} color="#000" />
                <Text style={styles.uploadOptionText}>UPLOAD FROM DOCUMENT</Text>
              </Pressable>
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(7, 7, 7, 0.3)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: hp(2.2),
    color: '#000',
    marginBottom: 15,
    fontWeight: '600',
  },
  previewImage: {
    width: wp('35%'),
    height: hp('15%'),
    marginBottom: 15,
  },
  instructionsContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  instructionsText: {
    fontSize: hp(1.6),
    fontWeight: 'bold',
    color: '#808080',
    textAlign: 'center',
  },
  importantText: {
    color: '#000',
    fontWeight: 'bold',
  },
  uploadOption: {
    width: wp('90%'),
    borderColor: '#000',
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  uploadOptionText: {
    fontWeight: 'bold',
    fontSize: hp(1.6),
    color: '#000',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadingText: {
    marginTop: 10,
    fontSize: hp(1.6),
    color: '#000',
  },
});

export default UploadBankAcc;
