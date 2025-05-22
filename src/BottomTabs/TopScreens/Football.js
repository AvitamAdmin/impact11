import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TabSelection from '../TabSelection';
import { useSport } from '../../SportContext';

const Football = () => {
  const { selectedSport, TabName } = useSport();
  return (
    <View>

     <TabSelection/>
     
    
    </View>
  )
}

export default Football

const styles = StyleSheet.create({})