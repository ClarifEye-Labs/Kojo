import React from 'react'
import * as Facebook from 'expo-facebook';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'
import {
  Card,
  LogoPlaceholder,
  Button,
  SocialButton,
  InputWithSubHeading,
  Back
} from '../Components'

import { dimens, colors, customFonts, strings } from '../constants'
import { commonStyling } from '../common'
import facebookConstants from '../config/facebook';
import firebase from '../config/firebase'
import screens from '../constants/screens';
import collectionNames from '../config/collectionNames';
import Utils from '../utils/Utils';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      emailEntered: '',
      passwordEntered: '',
      emailErrorStatus: false,
      emailErrorReason: null,
      passwordErrorStatus: false,
      passwordErrorReason: null,
      loginButtonLoading: false
    }
  }

  setEmailEntered = (text) => {
    this.setState({
      emailEntered: text
    })
  }

  setPasswordEntered = (text) => {
    this.setState({
      passwordEntered: text
    })
  }

  initiateLogin = () => {
    const {
      emailEntered,
      passwordEntered
    } = this.state
    this.setState({
      loginButtonLoading: true
    })
    const emailErrorResult = this.checkEmailEnteredError(emailEntered)
    if (emailErrorResult && emailErrorResult.errorStatus) {
      this.setState({
        emailErrorStatus: true,
        emailErrorReason: emailErrorResult.errorReason,
        loginButtonLoading: false
      })
    } else {
      this.setState({
        emailErrorStatus: false,
        emailErrorReason: null,
        loginButtonLoading: true
      })
    }
    const passwordErrorResult = this.checkPasswordEnteredError(passwordEntered)
    if (passwordErrorResult && passwordErrorResult.errorStatus) {
      this.setState({
        passwordErrorStatus: true,
        passwordErrorReason: passwordErrorResult.errorReason,
        loginButtonLoading: false
      })
      return
    } else {
      this.setState({
        passwordErrorStatus: false,
        passwordErrorReason: null,
        loginButtonLoading: true
      })
    }

    this.performLogin(emailEntered, passwordEntered)
  }

  checkPasswordEnteredError = (password) => {
    let error = {
      errorStatus: false,
      errorReason: null
    }

    if (password.length === 0) {
      error.errorStatus = true
      error.errorReason = strings.passwordCannotBeEmpty
      return error
    }


    if (password.length < 6) {
      error.errorStatus = true
      error.errorReason = strings.passwordErrorMessage
    }

    return error
  }

  checkEmailEnteredError = (email) => {
    let error = {
      errorStatus: false,
      errorReason: null
    }
    if (email.length === 0) {
      error.errorReason = strings.emailCannotBeEmpty
      error.errorStatus = true
      return error
    }

    if (! /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      error.errorStatus = true
      error.errorReason = strings.emailErrorMessage
    }

    return error

  }

  async performLogin(email, password) {
    await firebase.auth().signOut()
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      let errorCode = error.code
      let errorMessage = error.message
      if (error) {
        alert(errorMessage)
        this.setState({
          loginButtonLoading: false
        })
      }
    }).then((loginObject) => {
      if (loginObject && loginObject.user) {
        this.onSuccessfulLogin()
      }
    })
  }

  onSuccessfulLogin = async () => {
    //login has been enabled, check here for the missing props of user and redirect accordingly 
    const user = firebase.auth().currentUser
    const firestore = firebase.firestore()
    const userRef = firestore.collection(collectionNames.users)
    const userID = user.uid
    let userFirestore = null
    await userRef.doc(userID).get().then((doc) => doc.exists ? userFirestore = doc.data() : null)
    if(userFirestore) {
      const screenToDispatch = Utils.screenToLoadForUser(userFirestore)
      this.setState({
        loginButtonLoading: false
      })
      Utils.dispatchScreen(screenToDispatch, undefined, this.state.navigation)
    }else{
      alert('User has been deleted from our database, please register again!')
      this.setState({
        loginButtonLoading: false
      })
    }
  }

  render() {

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
              style={{ ...commonStyling.backButtonStyling }}
              onPress={() => navigation.goBack()} />

            <LogoPlaceholder style={logo} />
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
                  onPress={this.loginWithFacebook} />
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
                  onPress={null} />
              </Card>
            </View>

            <View style={orContainer}>
              <View style={thinLine} />
              <Text style={orStyling}> {strings.or} </Text>
              <View style={thinLine} />
            </View>

            <View style={loginDetailsContainer}>
              <InputWithSubHeading
                subHeadingTitle={strings.emailSubHeading}
                placeholder={strings.emailPlaceholderText}
                secureTextEntry={false}
                errorStatus={this.state.emailErrorStatus}
                subHeadingStyle={subText}
                onChangeText={this.setEmailEntered}
                inputValue={this.state.emailEntered}
                errorTitle={this.state.emailErrorReason}
                textInputContainerStyle={textInputContainer}
                autoCompleteType='email'
              />

              <InputWithSubHeading
                subHeadingTitle={strings.passwordSubHeading}
                placeholder={strings.passwordPlaceholderText}
                secureTextEntry={true}
                subHeadingStyle={subText}
                errorStatus={this.state.passwordErrorStatus}
                onChangeText={this.setPasswordEntered}
                errorTitle={this.state.passwordErrorReason}
                inputValue={this.state.passwordEntered}
                autoCompleteType='password'
                textInputContainerStyle={textInputContainer} />


              <TouchableOpacity onPress={() => navigation.navigate(screens.ForgotPasswordScreen)}>
                <Text style={forgotPasswordText}> {strings.forgotPassword} </Text>
              </TouchableOpacity>

              <Button
                title={strings.login}
                textColor={colors.colorAccent}
                onPress={this.initiateLogin}
                isLoading={this.state.loginButtonLoading}
                style={submitButton} />

            </View>

            <View style={registerContainer}>
              <Text style={registerTextSubtext}>{strings.dontHaveAnAccount}</Text>
              <TouchableOpacity onPress={() => navigation.navigate(screens.RegistrationScreen)}>
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
    const { navigation } = this.state
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(facebookConstants.appID, { permissions: facebookConstants.permissions })
    if (type == 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
      );
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase.auth().signInWithCredential(credential).then().catch((error) => alert(error));  // Sign in with Facebook credential
      const facebookUser = firebase.auth().currentUser
      //need to check if user is just logging in or registering for first time 
      const firestore = firebase.firestore()
      const usersRef = firestore.collection(collectionNames.users)
      await usersRef.doc(facebookUser.uid).get().then(async (doc) => {
        if (doc.exists) {
          //store the current user configuration in redux 
          console.log('User already exists, fetching details from database')

        } else {
          //write the user to database 
          const email = facebookUser.email
          const name = facebookUser.displayName
          const phone = facebookUser.phoneNumber
          const uid = facebookUser.uid
          await usersRef.doc(uid).set({
            name: name,
            email: email,
            phone: phone,
            role: null,
            address: null,
            uid: uid
          })

        }
      })
      return Promise.resolve({ type: 'success' });

    } else {
      alert(strings.pleaseTryAgain)
    }
  }

  loginWithGoogle = async () => {

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
  socialContainer: {
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
  loginDetailsContainer: {
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
  forgotPasswordText: {
    marginTop: 8,
    textAlign: 'right',
    fontSize: 16,
    fontFamily: customFonts.semiBold,
    color: colors.colorPrimary
  },
  submitButton: {
    backgroundColor: colors.colorPrimary,
    marginTop: 40,
    width: '100%'
  },
  loginText: {
    color: colors.colorAccent,
    fontSize: 18,
    fontFamily: customFonts.medium
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  registerText: {
    fontSize: 16,
    fontFamily: customFonts.semiBold,
    color: colors.colorPrimary
  },
  registerTextSubtext: {
    fontSize: 16,
    color: colors.blackTransluscent,
    fontFamily: customFonts.medium
  }

})

LoginScreen.navigationOptions = {
  header: null
}

export default LoginScreen

