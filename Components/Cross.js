import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
import { dimens, colors, customFonts } from '../constants'
import { Ionicons } from '@expo/vector-icons';
import { commonStyling } from '../common'

const Cross = (props) => { 
  const {
    crossStyle
  } = styles


  const{
    size,
    color,
    style,
    onPress
  } = props

  const nameOfIcon =  (Platform.OS === 'ios') ? 'ios-close' : 'md-close'
  const sizeOfIcon = (typeof size !== 'undefined' ) ? size : 32
  const colorOfIcon = (typeof color !== 'undefined' ) ? color : colors.black


  const screen = 
  <TouchableOpacity style={style} onPress={onPress}>
    <Ionicons name={nameOfIcon} size={sizeOfIcon} color={colorOfIcon} />
  </TouchableOpacity>
  

  return screen
}

const styles = StyleSheet.create({
  crossStyle:{
    fontSize: dimens.crossSize,
    fontFamily: customFonts.semiBold
  }
})

export default Cross

