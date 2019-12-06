import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { OutlineButton, BackgroundImage, BlackOverlay } from '../Components'
import { dimens, colors } from '../constants'

const LoginRegisterScreen = (props) => {  

  const {
    lowerContainer, 
    innerLowerContainer, 
    upperContainer, 
    mainContainer, 
    buttonStyle
  } = styles;
  return (
    <View style={mainContainer}>
      <View style={upperContainer}>
        <BlackOverlay>
          <BackgroundImage source={require('../assets/landing/1.jpg')} />
        </BlackOverlay>
      </View>
      <View style={lowerContainer}>
        <View style = {innerLowerContainer}>
          <OutlineButton style={buttonStyle} title="Login"/>
          <OutlineButton style={buttonStyle} title="Register"/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  lowerContainer : {
    width: '100%',
    height: 150,
    backgroundColor: colors.colorPrimary,
    width: '100%',
  },
  innerLowerContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  upperContainer: {
    flex: 3
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column'
  },
  buttonStyle:{
    width: '40%',
    margin: 15
  }
})

export default LoginRegisterScreen

