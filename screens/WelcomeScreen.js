import React from 'react'
import { View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity} from 'react-native'
import { LogoPlaceholder, Button, OutlineButton } from '../Components'
import { dimens, colors, customFonts } from '../constants'
import { dim } from 'ansi-colors'

const WelcomeScreen = (props) => {  
  //
  //const {navigate} = this.props.navigation
  const {
    mainContainer,
    backgroundStyle,
    contentContainer,
    logo,
    loginButton,
    logoContainer,
    signUpButton,
    signUpButtonText,
    buttonContainer,
    loginButtonText
  } = styles

  const screen = 
  <View style={mainContainer}>
    <ImageBackground 
    source ={require('../assets/Onboarding/welcome.jpeg')}
    style={backgroundStyle}>
      <View style={contentContainer}>
        <View style={logoContainer}>
          <LogoPlaceholder style={logo} />
        </View>
        <View style={buttonContainer}>
          <OutlineButton 
            title= 'SIGN UP'
            outlineColor={colors.colorAccent}
            style={signUpButton}
            />
          <Button 
            title='LOGIN'
            textColor={colors.colorPrimary}
            style={loginButton}
            onPress={() => props.navigation.navigate('LoginScreen')} />
        </View>
      </View>
    </ImageBackground>
  </View>


   return screen
}

const styles = StyleSheet.create({
  mainContainer:{
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0
  },
  backgroundStyle: {
    width: '100%',
    height: '100%'
  },
  contentContainer:{
    width: '100%',
    height: '100%',
    backgroundColor: colors.colorPrimaryTransluscent,
    alignItems: 'center',
    paddingTop: dimens.screenSafeUpperNotchDistance
  },
  logo:{
    width: dimens.logoWidthOnboarding,
    height: dimens.logoHeightOnboarding,
    borderColor: colors.colorAccent,
    borderWidth: 2
  },
  loginButton:{
    width: '75%',
    backgroundColor: colors.colorAccent,
    marginTop: dimens.screenVerticalMargin,
    marginBottom: dimens.screenVerticalMargin
  },
  loginButtonText:{
    fontSize: 20,
    color: colors.colorPrimary,
    fontFamily: customFonts.medium,
    textAlign: 'center',
    width: '100%'
  },
  signUpButton:{
    width: '75%',
    marginTop: dimens.screenVerticalMargin,
    marginBottom: dimens.screenVerticalMargin
  },
  signUpButtonText:{
    fontSize: 20,
    color: colors.colorAccent,
    fontFamily: customFonts.medium,
    textAlign: 'center',
    width: '100%'
  },
  logoContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }

})

export default WelcomeScreen

