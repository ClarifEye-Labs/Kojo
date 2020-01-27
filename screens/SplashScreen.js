import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, ActivityIndicator } from 'react-native'
import { LogoPlaceholder, Loading } from '../Components'
import { dimens, colors, customFonts } from '../constants'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'
import screens from '../constants/screens';

class SplashScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'SplashScreen',
      navigation: props.navigation
    }
  }


  navigateToScreenLogic = () => {
    setTimeout( () => this.state.navigation.navigate(screens.WelcomeScreen), 2000)
  }

  render() {
    const {
      mainContainer,
      overlayStyle,
      logoStyle,
      loadingStyle,
      loadingContainer
    } = styles

    const {
      navigation
    } = this.props

    this.navigateToScreenLogic()

    return (
      <ImageBackground
        style={mainContainer}
        imageStyle={{ paddingLeft: 120 }}
        source={require('../assets/Splash/splashScreen.jpg')}>
        <View style={overlayStyle}>
          <LogoPlaceholder style={logoStyle} />
          <View style={loadingContainer}>
            <ActivityIndicator style={loadingStyle} size='large' color={colors.colorAccent} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer
  },
  overlayStyle: {
    backgroundColor: colors.colorPrimaryTransluscent,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    width: dimens.logoWidthOnboarding,
    height: dimens.logoHeightOnboarding,
    borderColor: colors.colorAccent,
    borderWidth: 1,
  },
  loadingStyle: {
    fontSize: 50
  },
  loadingContainer: {
    marginTop: 40,
  }
})

SplashScreen.navigationOptions = {
  header: null
}

SplashScreen.propTypes = {
  navigation: PropTypes.object
}

export default SplashScreen