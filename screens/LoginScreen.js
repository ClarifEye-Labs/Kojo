import React from 'react'
import * as Facebook from 'expo-facebook';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView} from 'react-native'
import { 
  Card, 
  LogoPlaceholder, 
  Button, 
  SocialButton, 
  InputWithSubHeading} from '../Components'
import { dimens, colors, customFonts } from '../constants'
import { commonStyling } from '../common'
import { Ionicons } from '@expo/vector-icons';
import { dim } from 'ansi-colors'
import facebookConstants from '../config/facebook';
import firebase from 'firebase'

const LoginScreen = (props) => {  

  async function loginWithFacebook(){
    await Facebook.initializeAsync(facebookConstants.appID)
    await Facebook.setAutoInitEnabledAsync(true)
    const {type,token} = await Facebook.logInWithReadPermissionsAsync(facebookConstants.appID, {permissions: facebookConstants.permissions})
    if(type == 'success'){
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
      );
      console.log('response', JSON.stringify(response));
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      const facebookProfileData = await firebase.auth().signInWithCredential(credential);  // Sign in with Facebook credential
      console.log(facebookProfileData)

      // Do something with Facebook profile data
      // OR you have subscribed to auth state change, authStateChange handler will process the profile data
      
      return Promise.resolve({type: 'success'});

    } else {
      alert(type)
    } 
  }

  async function loginWithGoogle(){

  }

  const {
    mainContainer,
    logoContainer,
    contentContainer,
    logo,
    socialContainer,
    socialButton,
    orStyling,
    orContainer,
    thinLine,
    loginDetailsContainer,
    textInputContainer,
    subText,
    forgotPasswordText,
    submitButton,
    registerContainer,
    registerText,
    registerTextSubtext
  } = styles
  const screen =
  <KeyboardAvoidingView behavior="padding" enabled  style={mainContainer}>

    <View style={logoContainer}>
      <LogoPlaceholder style={logo}/>
    </View>

    <View style={contentContainer}>

      <View style={socialContainer}>
        <Card 
        width={dimens.logoWidthOnboarding}
        height={dimens.buttonHeight}
        elevation={10}>
          <SocialButton
            title='Facebook'
            icon='logo-facebook'
            iconColor={colors.facebookBlue} 
            style={socialButton}
            onPress={loginWithFacebook}/>
        </Card>
        <Card 
        width={dimens.logoWidthOnboarding}
        height={dimens.buttonHeight}
        elevation={10}>
          <SocialButton
            title='Google'
            icon='logo-google'
            iconColor={colors.googleOrange} 
            style={socialButton}
            onPress={null}/>
        </Card>
      </View>
      
      <View style={orContainer}>
        <View style={thinLine} />
        <Text style={orStyling}> or </Text>
        <View style={thinLine} />
      </View>

      <View style={loginDetailsContainer}>
        <InputWithSubHeading 
          subHeadingTitle='Email ID'
          placeholder='johndoe@gmail.com'
          secureTextEntry={false} 
          subHeadingStyle={subText}
          textInputContainerStyle={textInputContainer} />

        <InputWithSubHeading 
          subHeadingTitle='Password'
          placeholder='Enter Password'
          secureTextEntry={true} 
          subHeadingStyle={subText}
          textInputContainerStyle={textInputContainer} />


        <TouchableOpacity>
          <Text style={forgotPasswordText}> Forgot Password? </Text>
        </TouchableOpacity>

        <Button 
          title='Login' 
          textColor={colors.colorAccent} 
          style={submitButton}/>
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
      width: '100%',
    },
    orStyling: {
      color: colors.blackTransluscent,
      fontSize: 18,
      marginHorizontal: 10,
      fontFamily: customFonts.regular
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
      paddingRight: '10%'
    },
    textInputContainer: {
      borderBottomColor: colors.blackTransluscent,
    },
    subText: {
      marginTop: 30
    },
    forgotPasswordText:{
      marginTop: 8,
      textAlign: 'right',
      fontSize: 16,
      fontFamily: customFonts.semiBold,
      color: colors.colorPrimary
    },
    submitButton:{
      backgroundColor: colors.colorPrimary,
      marginTop: 60,
      width: '100%'
    },
    loginText:{
      color: colors.colorAccent,
      fontSize: 18,
      fontFamily: customFonts.medium
    },
    registerContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    },
    registerText:{
      fontSize: 16,
      fontFamily: customFonts.semiBold,
      color: colors.colorPrimary
    },
    registerTextSubtext:{
      fontSize: 16,
      color: colors.blackTransluscent,
      fontFamily: customFonts.medium
    }

})

export default LoginScreen

