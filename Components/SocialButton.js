import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { dimens, colors, customFonts} from '../constants'
import { Ionicons } from '@expo/vector-icons';
import { commonStyling } from '../common'

const SocialButton = (props) => { 
  const screenName='Button'
  const {
    textStyle,
    socialButtonStyle,
    iconStyle
  } = styles

  const {
    title,
    icon,
    iconColor,
    onPress,
    textColor,
    style
  } = props

  const stylingForButton = {
    ...socialButtonStyle,
    ...style
  }

  const textStyling = {
    ...textStyle,
    color: textColor
  }

  const screen = 
    <TouchableOpacity style={stylingForButton} onPress={onPress}>
      <Ionicons  style={iconStyle} name={icon} size={32} color={iconColor} />
      <Text style={textStyling}>{title}</Text>
    </TouchableOpacity>

  return screen
}

const styles = StyleSheet.create({
  textStyle:{
    fontSize: 17,
    textAlign: 'center',
    marginLeft: 13,
    fontFamily: customFonts.medium
  },
  socialButtonStyle: {
    width: dimens.defaultButtonWidth,
    height: dimens.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  iconStyle: {
    position: 'absolute',
    left: 20
  },
})

export default SocialButton

