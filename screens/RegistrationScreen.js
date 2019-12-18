import React from 'react'
import { View, StyleSheet, Text} from 'react-native'
import { Back } from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common'

const RegistrationScreen = (props) => { 
  const screenName='Registration Screen'
  const {
    mainContainer
  } = styles

  const screen = 
  <View style={mainContainer}>
    <Text>Hello, from {screenName}</Text>
    <Back />
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

export default RegistrationScreen

