import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Back, Heading, InputWithSubHeading, Button } from '../Components'
import { dimens, colors, strings } from '../constants'
import { commonStyling } from '../common'
import firebase from '../config/firebase'
import screens from '../constants/screens'
import appConfig from '../config/appConfig'
import Utils from '../utils/Utils'
import { watchFirebaseAuthUser, watchUserFirestoreData } from '../redux/actions/watchUserData'
import { connect } from 'react-redux'

class RegistrationScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      nameEntered: appConfig.DEBUG_MODE ? 'Shikhar Khandelwal' : '',
      emailEntered: appConfig.DEBUG_MODE ? 'conveytoshikhar@gmail.com' : '',
      passwordEntered: appConfig.DEBUG_MODE ? '1234567890' : '',
      confirmationPasswordEntered: appConfig.DEBUG_MODE ? '1234567890' : '',
      submitButtonClicked: false,
      showLoadingDialog: false,
      navigation: this.props.navigation,
      nameErrorTitle: '',
      nameErrorStatus: false,
      emailErrorTitle: '',
      emailErrorStatus: false,
      passwordErrorTitle: '',
      passwordErrorStatus: false,
      confirmationPasswordTitle: '',
      confirmationPasswordStatus: false
    }
  }

  setEmailEntered = (text) => {
    this.setState({
      emailEntered: text
    })
  }

  setNameEntered = (text) => {
    this.setState({
      nameEntered: text
    })
  }

  setPasswordEntered = (text) => {
    this.setState({
      passwordEntered: text
    })
  }

  setConfirmationPasswordEntered = (text) => {
    this.setState({
      confirmationPasswordEntered: text
    })
  }

  submitButtonOnClick = () => {
    const {
      nameEntered,
      emailEntered,
      passwordEntered,
      confirmationPasswordEntered
    } = this.state

    this.setState({
      showLoadingDialog: true,
      submitButtonClicked: true
    })

    const errors = {
      email: {},
      name: {},
      password: {},
      confirmPassword: {}
    }
    errors.name = this.performNameValidation(nameEntered)
    errors.email = this.performEmailValidation(emailEntered)
    errors.password = this.performPasswordValidation(passwordEntered)
    errors.confirmPassword = this.performConfirmPasswordValidation(passwordEntered, confirmationPasswordEntered)


    if (errors.confirmPassword.errorReason === strings.passwordsDoNotMatch) {
      errors.password = {
        errorStatus: true,
        errorReason: strings.passwordsDoNotMatch
      }
    }

    this.setState({
      nameErrorTitle: errors.name.errorReason,
      nameErrorStatus: errors.name.errorStatus,
      emailErrorTitle: errors.email.errorReason,
      emailErrorStatus: errors.email.errorStatus,
      passwordErrorTitle: errors.password.errorReason,
      passwordErrorStatus: errors.password.errorStatus || errors.confirmPassword.errorStatus,
      confirmPasswordErrorTitle: errors.confirmPassword.errorReason,
      confirmPasswordErrorStatus: errors.confirmPassword.errorStatus,
    }, this.peformUIOperationsForShowingErrors(errors))

  }

  performNameValidation = (name) => {
    var error = {
      errorStatus: false,
      errorReason: null
    }

    if (name.length === 0) {
      error.errorStatus = true
      error.errorReason = strings.nameCannotBeEmpty
      return error
    }

    if (! /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/.test(name)) {
      error.errorStatus = true,
        error.errorReason = strings.nameErrorMessage
    }

    return error

  }

  performEmailValidation = (email) => {
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


  performPasswordValidation = (password) => {
    var error = {
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

  performConfirmPasswordValidation = (oldpassword, newpassword) => {
    var error = {
      errorStatus: false,
      errorReason: null
    }

    if (oldpassword.length === 0 || newpassword.length === 0) {
      error.errorStatus = true
      error.errorReason = strings.confirmPasswordCannotBeEmpty
      return error
    }

    if (oldpassword !== newpassword) {
      error.errorStatus = true
      error.errorReason = strings.passwordsDoNotMatch
    }

    return error
  }

  peformUIOperationsForShowingErrors(errors) {
    if (!errors.name.errorStatus && !errors.email.errorStatus && !errors.password.errorStatus && !errors.confirmPassword.errorStatus) {
      this.performRegistration()
    } else {
      this.setState({
        showLoadingDialog: false,
        submitButtonClicked: false
      })
    }
  }

  performRegistration() {

    const {
      emailEntered,
      passwordEntered,
      nameEntered
    } = this.state

    firebase
      .auth()
      .createUserWithEmailAndPassword(emailEntered, passwordEntered)
      .then((user) => this.successfulRegistration())
      .catch((error) => this.registrationFailure(error))

  }

  successfulRegistration = async () => {
    await this.writeUserToFireStore()
    this.props.watchFirebaseAuthUser();
    this.props.watchUserFirestoreData();
  }

  writeUserToFireStore = async () => {

    const firestore = firebase.firestore()
    const ref = firestore.collection('users')
    const user = firebase.auth().currentUser

    await ref.doc(user.uid).set({
      uid: user.uid,
      name: this.state.nameEntered,
      email: user.email,
      role: null,
      address: null,
      phone: null
    })

    Utils.dispatchScreen(screens.SupplierRestaurantScreen, undefined, this.props.navigation)


  }

  registrationFailure = (error) => {
    this.setState({
      showLoadingDialog: false,
      submitButtonClicked: false
    })
    alert(error)
  }


  render() {
    const {
      mainContainer,
      headingContainerStyle,
      buttonStyle,
      allInputsContainer,
      subHeadingStyle,
      termsStyle,
      tandcContainer,
      termsContainer,
      tandcText
    } = styles

    const {
      navigation
    } = this.props

    const screen =
      <View style={mainContainer}>
        <Back
          style={{ ...commonStyling.backButtonStyling }}
          onPress={() => navigation.goBack()} />

        <Heading
          title={strings.registerWithKojo}
          containerStyle={headingContainerStyle} />

        <View style={allInputsContainer}>
          <InputWithSubHeading
            secureTextEntry={false}
            placeholder={strings.namePlaceholderText}
            autoCorrect={false}
            autoCompleteType='name'
            subHeadingTitle={strings.fullNameSubHeading}
            autoCapitalize='words'
            errorTitle={this.state.nameErrorTitle}
            onChangeText={this.setNameEntered}
            errorStatus={this.state.nameErrorStatus}
            editable={!this.state.submitButtonClicked}
            containerStyle={{ marginTop: 5, marginBottom: 5 }}
            subHeadingStyle={subHeadingStyle} />


          <InputWithSubHeading
            secureTextEntry={false}
            placeholder={strings.emailPlaceholderText}
            autoCompleteType='email'
            subHeadingTitle={strings.emailSubHeading}
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
            errorTitle={this.state.emailErrorTitle}
            onChangeText={this.setEmailEntered}
            errorStatus={this.state.emailErrorStatus}
            editable={!this.state.submitButtonClicked}
            subHeadingStyle={subHeadingStyle} />

          <InputWithSubHeading
            secureTextEntry={true}
            autoCompleteType='password'
            placeholder={strings.passwordPlaceholderText}
            subHeadingTitle={strings.passwordSubHeading}
            autoCorrect={false}
            autoCapitalize='none'
            errorTitle={this.state.passwordErrorTitle}
            onChangeText={this.setPasswordEntered}
            errorStatus={this.state.passwordErrorStatus}
            editable={!this.state.submitButtonClicked}
            subHeadingStyle={subHeadingStyle} />


          <InputWithSubHeading
            secureTextEntry={true}
            autoCompleteType='password'
            placeholder={strings.confirmPasswordPlaceholderText}
            subHeadingTitle={strings.confirmPasswordSubHeading}
            autoCorrect={false}
            autoCapitalize='none'
            errorTitle={this.state.confirmPasswordErrorTitle}
            onChangeText={this.setConfirmationPasswordEntered}
            errorStatus={this.state.confirmPasswordErrorStatus}
            editable={!this.state.submitButtonClicked}
            subHeadingStyle={subHeadingStyle} />
        </View>


        <Button
          title={strings.register}
          textColor={colors.colorAccent}
          style={buttonStyle}
          isLoading={this.state.showLoadingDialog}
          onPress={this.submitButtonOnClick} />

        <View style={termsContainer}>
          <Text style={termsStyle}>
            {strings.registeringWithKojoHeadline}
          </Text>
          <View style={tandcContainer}>
            <TouchableOpacity onPress={() => navigation.navigate(screens.SupplierRestaurantScreen)}>
              <Text style={tandcText}> {strings.termsAndConditions} </Text>
            </TouchableOpacity>
            <Text style={termsStyle}> {strings.and} </Text>
            <TouchableOpacity>
              <Text style={tandcText}> {strings.privacyPolicy} </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>

    return screen
  }
}

const mapStateToProps = state => ({
});


const mapDispatchToProps = dispatch => ({
  watchFirebaseAuthUser: () => { dispatch(watchFirebaseAuthUser()) },
  watchUserFirestoreData: () => { dispatch(watchUserFirestoreData()) }
})

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    alignItems: 'center',
    paddingLeft: dimens.screenHorizontalMargin,
    paddingRight: dimens.screenHorizontalMargin
  },
  backButtonStyle: {
    ...commonStyling.backButtonStyling
  },
  headingContainerStyle: {
    width: '100%',
    textAlign: 'left',
    marginTop: dimens.screenSafeUpperNotchDistance + 70
  },
  buttonStyle: {
    width: '90%',
    backgroundColor: colors.colorPrimary,
    marginTop: 35
  },
  subHeadingStyle: {
    marginTop: 16
  },
  termsStyle: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.blackTransluscent
  },
  allInputsContainer: {
    width: '100%',
    padding: 8,
    marginTop: 20,
    marginBottom: 10
  },
  tandcContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 2,
    alignItems: 'center'
  },
  tandcText: {
    fontSize: 15,
    color: colors.colorPrimary
  },
  termsContainer: {
    marginTop: 8
  }
})

RegistrationScreen.navigationOptions = {
  header: null
}
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen)

