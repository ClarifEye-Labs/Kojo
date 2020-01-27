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


// PropTypes.any: The prop can be of any data type
// PropTypes.bool: The prop should be a Boolean
// PropTypes.number: The prop should be a number
// PropTypes.string: The prop should be a string
// PropTypes.func: The prop should be a function
// PropTypes.array: The prop should be an array
// PropTypes.object: The prop should be an object
// PropTypes.symbol: The prop should be a symbol
