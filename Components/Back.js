import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
import { dimens, colors, customFonts } from '../constants'
import { Ionicons } from '@expo/vector-icons';
import {PropTypes} from 'prop-types'

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

Back.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
  onPress: PropTypes.func
}

export default Back

