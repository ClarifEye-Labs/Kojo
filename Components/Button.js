import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { dimens, colors, customFonts} from '../constants'
import { commonStyling } from '../common'

const Button = (props) => { 
  const screenName='Button'
  const {
    textStyle
  } = styles

  const {
    title,
    onPress,
    textColor,
    style,
    isLoading
  } = props

  const stylingForButton = {
    width: dimens.defaultButtonWidth,
    height: dimens.buttonHeight,
    borderRadius: dimens.defaultBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    ...style
  }

  const textStyling = {
    ...textStyle,
    color: textColor
  }

  const component = 
  <TouchableOpacity style={stylingForButton} onPress={onPress}>
    {isLoading 
    ? <ActivityIndicator size={37} color={textColor} />
    : <Text style={textStyling}>{title}</Text> }
      
  </TouchableOpacity>
  return component
}

const styles = StyleSheet.create({
  textStyle:{
    fontSize: 20,
    fontFamily: customFonts.medium
  }
})

export default Button

