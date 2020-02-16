import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
import { dimens, colors, customFonts } from '../constants'
import { Ionicons } from '@expo/vector-icons';
import { commonStyling } from '../common'

const TextWithSubheading = (props) => { 
  const {
    mainContainer
  } = styles


  const{
    subHeadingTitle,
    textTitle,
    subHeadingStyle,
    textStyle,
    containerStyle,
    numberOfLines
  } = props

  const component = 
  <View style={{...mainContainer},{...containerStyle}}>
    <Text style={subHeadingStyle}> {subHeadingTitle} </Text>
    <Text numberOfLines={numberOfLines ? numberOfLines : 1} style={textStyle}> {textTitle} </Text>
  </View> 
  

  return component
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'center'
  }
})

export default TextWithSubheading

