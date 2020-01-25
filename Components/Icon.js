import React from 'react'
import { TouchableOpacity, Platform } from 'react-native'
import { colors } from '../constants'
import { Ionicons } from '@expo/vector-icons';



const Icon = (props) => { 

  const{
    size,
    color,
    style,
    onPress,
    nameIOS,
    nameAndroid
  } = props

  const nameOfIcon =  (Platform.OS === 'ios') ? nameIOS: nameAndroid
  const sizeOfIcon = (typeof size !== 'undefined' ) ? size : 32
  const colorOfIcon = (typeof color !== 'undefined' ) ? color : colors.black

  const component = 
  <TouchableOpacity style={style} onPress={onPress}>
    <Ionicons  name={nameOfIcon} size={sizeOfIcon} color={colorOfIcon} />
  </TouchableOpacity>
  

  return component
}

export default Icon

