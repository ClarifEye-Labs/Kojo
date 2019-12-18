import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { dimens, colors, customFonts } from '../constants'
import { commonStyling } from '../common'
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';



const Back = (props) => { 

  const{
    size,
    color,
    style,
    onPress
  } = props

  const nameOfIcon =  (Platform.OS === 'ios') ? 'ios-arrow-back' : 'md-arrow-back'
  const sizeOfIcon = (typeof size !== 'undefined' ) ? size : 32
  const colorOfIcon = (typeof color !== 'undefined' ) ? color : colors.black

  const component = 
  <TouchableOpacity style={style} onPress={onPress}>
    <Ionicons  name={nameOfIcon} size={sizeOfIcon} color={colorOfIcon} />
  </TouchableOpacity>
  

  return component
}

export default Back

