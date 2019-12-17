import React from 'react'
import { View, StyleSheet, Text} from 'react-native'
import { } from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common'

const SupplierInventoryScreen = (props) => { 
  const screenName='SupplierInventory'
  const {
    mainContainer
  } = styles

  const {
      inventoryList 
  } = props

  const screen = 
  <View style={mainContainer}>
    <Text>{JSON.stringify(inventoryList)}</Text>
  </View>

  return screen
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default SupplierInventoryScreen

