import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSport } from '../../SportContext';
import TabSelection from '../TabSelection';

const Cricket = () => {
  const { selectedSport, TabName } = useSport();
  return (
    <View>
      <TabSelection/>
  
    </View>
  )
}
 
export default Cricket

const styles = StyleSheet.create({})