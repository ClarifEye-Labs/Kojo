import React, {useEffect} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { dimens, colors } from '../constants'
import {PropTypes} from 'prop-types'

const Card = (props) => {  
  const {
    container,
    centerContent
  } = {styles}

  const {
    width,
    height,
    elevation
  } = props

  let cardStyle = {
    ...elevationShadowStyle(elevation),
    width: width,
    height: height,
    backgroundColor: colors.colorAccent,
    borderRadius: dimens.defaultBorderRadius
  }

  const card = 
  <View style={cardStyle}>
    {props.children}
  </View>

  return card
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
    padding: 24
  },
  centerContent: {
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})


function elevationShadowStyle(elevation) {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation
  };
}

Card.propTypes = {
  width: PropTypes.any,
  height: PropTypes.any,
  borderRadius: PropTypes.number
}

export default Card

