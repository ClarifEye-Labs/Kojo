import React from 'react'
import { View, StyleSheet, Text} from 'react-native'
import { } from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common'

const SupplierClientsScreen = (props) => { 
  const screenName='SupplierClients'
  const {
    mainContainer
  } = styles

  const {
      clientsList 
  } = props

  const screen = 
  <View style={mainContainer}>
    <Text>{JSON.stringify(clientsList)}</Text>
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

export default SupplierClientsScreen
