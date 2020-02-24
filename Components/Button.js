import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { dimens, colors, customFonts} from '../constants'
import { commonStyling } from '../common'
import {PropTypes} from 'prop-types'

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

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  textColor: PropTypes.string,
  style: PropTypes.object,
  isLoading: PropTypes.bool
}

export default Button

