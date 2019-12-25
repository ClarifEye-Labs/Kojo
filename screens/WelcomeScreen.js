import React, { useEffect } from 'react'
import { View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { LogoPlaceholder, Button, OutlineButton } from '../Components'
import { dimens, colors, customFonts } from '../constants'

class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
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

    const {
      navigation
    } = this.props


    const screen =
      <View style={mainContainer}>
        <ImageBackground
          source={require('../assets/Onboarding/welcome.jpeg')}
          style={backgroundStyle}>
          <View style={contentContainer}>
            <View style={logoContainer}>
              <LogoPlaceholder style={logo} />
            </View>
            <View style={buttonContainer}>
              <OutlineButton
                title='SIGN UP'
                outlineColor={colors.colorAccent}
                onPress={() => navigation.navigate('RegistrationScreen')}
                style={signUpButton}
              />
              <Button
                title='LOGIN'
                textColor={colors.colorPrimary}
                style={loginButton}
                onPress={() => navigation.navigate('LoginScreen')} />
            </View>
          </View>
        </ImageBackground>
      </View>


    return screen
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0
  },
  backgroundStyle: {
    width: '100%',
    height: '100%'
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.colorPrimaryTransluscent,
    alignItems: 'center',
    paddingTop: dimens.screenSafeUpperNotchDistance
  },
  logo: {
    width: dimens.logoWidthOnboarding,
    height: dimens.logoHeightOnboarding,
    borderColor: colors.colorAccent,
    borderWidth: 2
  },
  loginButton: {
    width: '75%',
    backgroundColor: colors.colorAccent,
    marginTop: dimens.screenVerticalMargin * 1.5
  },
  loginButtonText: {
    fontSize: 20,
    color: colors.colorPrimary,
    fontFamily: customFonts.medium,
    textAlign: 'center',
    width: '100%'
  },
  signUpButton: {
    width: '75%'
  },
  signUpButtonText: {
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

WelcomeScreen.navigationOptions = {
  header: null
}

export default WelcomeScreen

