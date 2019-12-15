import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'
import { Card, LogoPlaceholder } from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common'
import { Ionicons } from '@expo/vector-icons';
import { dim } from 'ansi-colors'

const LoginScreen = (props) => {  
  const {
    mainContainer,
    logoContainer,
    contentContainer,
    logo,
    socialContainer,
    socialButton,
    socialText,
    socialIcon,
    orStyling,
    orContainer,
    thinLine,
    loginDetailsContainer,
    textInput,
    textInputContainer,
    subText,
    forgotPasswordText,
    submitButton,
    loginText,
    registerContainer,
    registerText,
    registerTextSubtext
  } = styles
  const screen =
  <KeyboardAvoidingView behavior="padding" enabled style={mainContainer}>

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
      
      <View style={orContainer}>
        <View style={thinLine} />
        <Text style={orStyling}> or </Text>
        <View style={thinLine} />
      </View>

      <View style={loginDetailsContainer}>

        <Text style={subText}>Email ID</Text>
        <View style={textInputContainer}>
          <TextInput 
            style={textInput}
            placeholder='johndoe@gmail.com'/>
        </View>
        <Text style={subText}>Password</Text>
        <View style={textInputContainer}>
          <TextInput 
            style={textInput}
            placeholder='Enter password'
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity>
          <Text style={forgotPasswordText}> Forgot Password? </Text>
        </TouchableOpacity>

        <TouchableOpacity style={submitButton}>
          <Text style={loginText}> Login</Text>
        </TouchableOpacity>
      </View>

      <View style={registerContainer}>
        <Text style={registerTextSubtext}>Don't have an account?</Text>
        <TouchableOpacity>
          <Text style={registerText}> Register Now.</Text>
        </TouchableOpacity>
      </View>
    </View>

  </KeyboardAvoidingView>

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
      flex: 2
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
    },
    orStyling: {
      color: colors.blackTransluscent,
      fontSize: 18
    },
    orContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 40
    },
    thinLine: {
      height: dimens.thinLine,
      backgroundColor: colors.blackTransluscent,
      width: '40%'
    },
    loginDetailsContainer:{
      flexDirection: 'column',
      justifyContent: 'center',
      paddingLeft: '10%',
      marginTop: 20,
      paddingRight: '10%'
    },
    textInput: {
     flex: 1,
     fontSize: 19
    },
    textInputContainer: {
      height: dimens.textInputHeight,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.blackTransluscent,
    },
    subText: {
      fontSize:12,
      color: colors.blackTransluscent,
      marginTop: 25
    },
    forgotPasswordText:{
      marginTop: 20,
      textAlign: 'right',
      color: colors.colorPrimary
    },
    submitButton:{
      height: dimens.buttonHeight,
      backgroundColor: colors.colorPrimary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    },
    loginText:{
      color: colors.colorAccent,
      fontSize: 18
    },
    registerContainer:{
      position: 'absolute',
      bottom: 40,
      left: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    registerText:{
      fontSize: 16,
      color: colors.colorPrimary
    },
    registerTextSubtext:{
      fontSize: 16,
      color: colors.blackTransluscent
    }

})

export default LoginScreen

