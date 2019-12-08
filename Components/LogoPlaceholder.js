import React from 'react'
import { View, StyleSheet } from 'react-native'
import { dimens, colors } from '../constants'

const LogoPlaceholder = (props) => {  
  return <View style={{...props.style,...styles.logo}} />
}

const styles = StyleSheet.create({
    logo:{
      backgroundColor: colors.transparent
    }
})

export default LogoPlaceholder

