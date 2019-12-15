import React from 'react'
import { View, StyleSheet, Text} from 'react-native'
import { } from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common'

const Name = (props) => { 
  const screenName='Name'
  const {
    mainContainer
  } = styles

  const screen = 
  <View style={mainContainer}>
    <Text>Hello, from {screenName}</Text>
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

export default Name

