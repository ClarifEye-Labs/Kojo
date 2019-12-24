import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { dimens, colors, customFonts } from '../constants'
import { commonStyling } from '../common'

const Heading = (props) => { 
  const {
    textStyle
  } = styles

  const {
    title,
    headingStyle,
    containerStyle
  } = props

  let headingStyling = {
    ...textStyle,
    ...headingStyle
  }

  const screen = 
  <View style={containerStyle}>
      <Text style={headingStyling}> {title} </Text>
  </View>

  return screen
}

const styles = StyleSheet.create({
  textStyle:{
    fontFamily: customFonts.bold,
    fontSize: dimens.headingSize
  }
})

export default Heading

