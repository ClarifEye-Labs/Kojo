import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Card, LogoPlaceholder } from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common'
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = (props) => {  
  const {
    mainContainer,
    logoContainer,
    contentContainer,
    logo,
    socialContainer,
    socialButton,
    socialText,
    socialIcon
  } = styles
  const screen =
  <View style={mainContainer}>
    <View style={logoContainer}>
      <LogoPlaceholder style={logo}/>
    </View>
    <View style={contentContainer}>
      <View style={socialContainer}>
        <Card 
        width={dimens.logoWidthOnboarding}
        height={dimens.buttonHeight}
        elevation={10}>
          <TouchableOpacity style={socialButton}>
            <Ionicons style={socialIcon} name="logo-facebook" size={32} color={colors.facebookBlue} />
            <Text style={socialText} >Facebook</Text>
          </TouchableOpacity>
        </Card>
        <Card 
        width={dimens.logoWidthOnboarding}
        height={dimens.buttonHeight}
        elevation={5}>
          <TouchableOpacity style={socialButton}>
            <Ionicons style={socialIcon} name="logo-google" size={32} color={colors.googleOrange} />
            <Text style={socialText} >Google</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </View>

  </View>

  return screen
}

const styles = StyleSheet.create({
    mainContainer: {
      ...commonStyling.mainContainer,
      flexDirection: 'column'
    },
    logoContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    logo: {
      width: dimens.logoWidthOnboarding,
      height: dimens.logoHeightOnboarding,
      borderColor: colors.colorPrimary,
      borderWidth: 1
    },
    contentContainer: {
      flex: 2,
      // backgroundColor: colors.colorPrimary
    },
    socialContainer:{
      width: '100%',
      height: dimens.buttonHeight,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'row'
    },
    socialButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    },
    socialText:{
      marginLeft: 10,
      fontFamily: 'open-sans-regular',
      fontSize: 16
    },
    socialIcon: {
      position: 'absolute',
      left: 20
    }

})

export default LoginScreen

