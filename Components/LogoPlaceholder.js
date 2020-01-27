import React from 'react'
import { View, StyleSheet } from 'react-native'
import { dimens, colors } from '../constants'
import {PropTypes} from 'prop-types'

const LogoPlaceholder = (props) => {  
  return <View style={{...props.style,...styles.logo}} />
}

const styles = StyleSheet.create({
    logo:{
      backgroundColor: colors.transparent
    }
})

LogoPlaceholder.propTypes = {
  style: PropTypes.object
}

export default LogoPlaceholder

