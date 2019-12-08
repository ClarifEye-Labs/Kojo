import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { OutlineButton,  BlackOverlay, LogoPlaceholder} from '../Components'
import { dimens, colors } from '../constants'

const LoginRegisterScreen = (props) => {  

  const {
    lowerContainer, 
    upperContainer, 
    mainContainer, 
    logo,
    logoText,
    loginText,
    loginSubText,
    loginContainer
  } = styles;

  return (
    <View style={mainContainer}>
      <View style={upperContainer}>
        <LogoPlaceholder style={logo} />
        <Text style={logoText}> Welcome to KOJO!</Text>
      </View>
      <View>
        <Text> Register stuff here</Text>
      </View>
      <View style={lowerContainer}>
        <View style={loginContainer}>
          <Text style={loginSubText}>Already a customer?</Text>
          <Text style={loginText}> Log In.</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  upperContainer: {
    width: '100%',
    height: 300,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContainer: {
    width: '100%',
    height: '100%'
  },
  buttonStyle:{
    width: '40%',
    margin: 15
  },
  logo:{
    width: 120,
    height: 120,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.colorPrimary,
  },
  logoText: {
    color: colors.colorPrimary,
    fontSize: 22,
    marginTop: 10,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'open-sans-regular'
  },
  lowerContainer:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 75,
    width: '100%'
  },
  loginText: {
    fontSize: 18,
    color: colors.colorPrimary
  },
  loginSubText: {
    fontSize: 18,
    color: colors.blackTransluscent
  },
  loginContainer:{
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center'
  }
})

export default LoginRegisterScreen

