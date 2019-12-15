import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common'

const Cross = (props) => { 
  const {
    crossStyle
  } = styles



  const screen = 
  <TouchableOpacity style={props.style}>
    <Text style={crossStyle}>X</Text>
  </TouchableOpacity>
  

  return screen
}

const styles = StyleSheet.create({
  crossStyle:{
    fontSize: dimens.crossSize,
    fontFamily: 'raleway-medium'
  }
})

export default Cross

