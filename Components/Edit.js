import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
import { dimens, colors, customFonts } from '../constants'
import { Ionicons } from '@expo/vector-icons';



const Edit = (props) => { 

  const{
    size,
    color,
    style,
    onPress
  } = props

  const nameOfIcon =  (Platform.OS === 'ios') ? 'ios-create' : 'md-create'
  const sizeOfIcon = (typeof size !== 'undefined' ) ? size : 32
  const colorOfIcon = (typeof color !== 'undefined' ) ? color : colors.black

  const component = 
  <TouchableOpacity style={style} onPress={onPress}>
    <Ionicons  name={nameOfIcon} size={sizeOfIcon} color={colorOfIcon} />
  </TouchableOpacity>
  

  return component
}

export default Edit

