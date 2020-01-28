import React from 'react'
import * as Facebook from 'expo-facebook';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView} from 'react-native'
import { 
  Card, 
  LogoPlaceholder, 
  Button, 
  SocialButton, 
  InputWithSubHeading,
  Back} from '../Components'
  
import { dimens, colors, customFonts, strings } from '../constants'
import { commonStyling } from '../common'
import facebookConstants from '../config/facebook';
import firebase from '../config/firebase'
import screens from '../constants/screens';
import collectionNames from '../config/collectionNames';
import Utils from '../utils/Utils';

class LoginScreen extends React.Component { 
  constructor(props){
    super(props)
    this.state = {
      navigation: props.navigation
    }
  }

  render(){

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

    const {
      navigation
    } = this.props

    const screen =
      <KeyboardAvoidingView behavior="padding" enabled style={mainContainer} >
        <ScrollView style={mainContainer}>

        <View style={logoContainer}>
          <Back 
            style={{...commonStyling.backButtonStyling}}
            onPress={()=> navigation.goBack()}/>
            
          <LogoPlaceholder style={logo}/>
        </View>
 
        <View style={contentContainer}>
 
          <View style={socialContainer}>
         <Card 
         width={dimens.logoWidthOnboarding}
         height={dimens.buttonHeight}
         elevation={10}>
           <SocialButton
             title={strings.facebook}
             icon='logo-facebook'
             iconColor={colors.facebookBlue} 
             style={socialButton}
             onPress={this.loginWithFacebook}/>
         </Card>
         <Card 
         width={dimens.logoWidthOnboarding}
         height={dimens.buttonHeight}
         elevation={10}>
           <SocialButton
             title={strings.google}
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
           subHeadingTitle={strings.emailSubHeading}
           placeholder={strings.emailPlaceholderText}
           secureTextEntry={false} 
           subHeadingStyle={subText}
           textInputContainerStyle={textInputContainer} 
           autoCompleteType='email'
           />
 
         <InputWithSubHeading 
           subHeadingTitle={strings.passwordSubHeading}
           placeholder={strings.passwordPlaceholderText}
           secureTextEntry={true} 
           subHeadingStyle={subText}
           autoCompleteType='password'
           textInputContainerStyle={textInputContainer} />
 
 
         <TouchableOpacity onPress={()=>navigation.navigate(screens.ForgotPasswordScreen)}>
           <Text style={forgotPasswordText}> {strings.forgotPassword} </Text>
         </TouchableOpacity>
 
         <Button 
           title={strings.login} 
           textColor={colors.colorAccent} 
           style={submitButton}/>

       </View>
 
          <View style={registerContainer}>
         <Text style={registerTextSubtext}>{strings.dontHaveAnAccount}</Text>
         <TouchableOpacity onPress={()=>navigation.navigate(screens.RegistrationScreen)}>
           <Text style={registerText}> {strings.registerNow}</Text>
         </TouchableOpacity>
       </View>
        </View>
        </ScrollView>
        
      </KeyboardAvoidingView>
    
    
  
    return screen
  }



  loginWithFacebook = async () => {
    await Facebook.initializeAsync(facebookConstants.appID)
    await Facebook.setAutoInitEnabledAsync(true)
    const {navigation} = this.state
    const {type,token} = await Facebook.logInWithReadPermissionsAsync(facebookConstants.appID, {permissions: facebookConstants.permissions})
    if(type == 'success'){
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
      );
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      const facebookProfileData = await firebase.auth().signInWithCredential(credential).then().catch((error) => alert(error));  // Sign in with Facebook credential
      const facebookUser = firebase.auth().currentUser
      //need to check if user is already registered or just logging in 
      const firestore = firebase.firestore()
      const usersRef = firestore.collection(collectionNames.users)
      await usersRef.doc(facebookUser.uid).get().then( async (doc)=>{
        if(doc.exists){
          //store the current user configuration in redux 
          console.log('User already exists ')
          Utils.dispatchScreen(screens.SupplierWelcomeScreen, undefined, navigation)
        }else{
          //write the user to database 
          const email = facebookUser.email
          const name = facebookUser.displayName
          const phone = facebookUser.phoneNumber
          const uid = facebookUser.uid
          await usersRef.doc(uid).set({
            name: name,
            email:email,
            phone: phone,
            role: null,
            uid: uid
          })
          Utils.dispatchScreen(screens.SupplierRestaurantScreen, undefined, navigation)
          console.log('Ready to switch screens')
        }
      })
      return Promise.resolve({type: 'success'});

    } else {
      alert(strings.pleaseTryAgain)
    } 
  }

  loginWithGoogle = async() => {

  }


}

const styles = StyleSheet.create({
    mainContainer: {
      ...commonStyling.mainContainer,
      flexDirection: 'column'
    },
    logoContainer: {
      flex: 1,
      paddingTop: dimens.screenSafeUpperNotchDistance + 40,
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
      marginTop: 40
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
      marginTop: 40,
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
      marginTop: 20,
      marginBottom: 20
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

LoginScreen.navigationOptions = {
  header: null
}

export default LoginScreen

