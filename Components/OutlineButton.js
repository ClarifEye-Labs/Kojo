import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native'
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
    outlineColor,
    style
  } = props

  const stylingForButton = {
    width: dimens.defaultButtonWidth,
    height: dimens.buttonHeight,
    borderColor: colors.colorAccent,
    borderWidth: dimens.defaultButtonBorder,
    borderRadius: dimens.defaultBorderRadius,
    backgroundColor: colors.transparent,
    borderColor: outlineColor,
    alignItems: 'center',
    justifyContent: 'center',
    ...style
  }

  const textStyling = {
    ...textStyle,
    color: outlineColor
  }

  const screen = 
  <TouchableOpacity style={stylingForButton} onPress={onPress}>
      <Text style={textStyling}>{title}</Text>
  </TouchableOpacity>
  return screen
}

const styles = StyleSheet.create({
  textStyle:{
    fontSize: 20,
    fontFamily: customFonts.medium
  }
})

export default Button

