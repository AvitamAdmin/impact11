import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrorMessage } from '../../../../Redux/Slice';


const ErrorMessage = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.fantasy.errorMessage);
  const errorVisible = useSelector(state => state.fantasy.errorVisible);

  useEffect(() => {
    if (errorVisible) {
      const timer = setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [errorVisible, dispatch]);

  if (!errorVisible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{errorMessage}</Text>
    </View>
  );
};


    const styles = StyleSheet.create({
        container: {
          position: 'absolute',
          bottom: 20, 
          left: 20,
          right: 20,
          backgroundColor: '#ff4444',
          padding: 15,
          borderRadius: 8,
          zIndex: 100,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        text: {
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
        },
      });


export default ErrorMessage;