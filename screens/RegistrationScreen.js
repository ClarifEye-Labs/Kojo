import React, {useRef, useEffect} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Back, Heading, InputWithSubHeading, Button } from '../Components'
import { dimens, colors, strings} from '../constants'
import { commonStyling } from '../common'
import firebase from '../config/firebase'

class RegistrationScreen extends React.Component { 
  constructor(props){
    super(props)
    this.state={
      nameEntered: '',
      nameError: false,
      emailError: false,
      emailEntered: '',
      passwordError: false,
      passwordEntered: '',
      confirmationPasswordEntered: '',
      confirmationPasswordError: false
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
    const{
      nameEntered,
      emailEntered,
      passwordEntered,
      confirmationPasswordEntered
    } = this.state

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
        errorReason: strings.passwordDoNotMatch
      }
    }


    this.setState({
      nameError: errors.name.errorReason,
      emailError: errors.email.errorReason,
      passwordError: errors.password.errorReason,
      confirmPasswordError: errors.confirmPassword.errorReason,
    }, this.peformUIOperationsForShowingErrors(errors))

    
  }

  performNameValidation = (name) => { 
    var error = {
      errorStatus : false,
      errorReason : null
    }

    if(name.length === 0){
      error.errorStatus = true
      error.errorReason = strings.nameCannotBeEmpty
      return error
    }

    return error
    
  }

  performEmailValidation = (email) => {
    var error = {
      errorStatus : false,
      errorReason : null
    }

    if(email.length === 0){
      error.errorReason = strings.emailCannotBeEmpty
      error.errorStatus = true
      return error
    }

    return error
  }


  performPasswordValidation = (password) => {
    var error = {
      errorStatus : false,
      errorReason : null
    }

    if(password.length === 0){
      error.errorStatus = true
      error.errorReason = strings.passwordCannotBeEmpty
      return error
    }

    return error
  }

  performConfirmPasswordValidation = (oldpassword, newpassword) => {
    var error = {
      errorStatus : false,
      errorReason : null
    }

    if(oldpassword.length === 0|| newpassword.length === 0){
      error.errorStatus = true
      error.errorReason = strings.confirmPasswordCannotBeEmpty
      return error
    }

    if(oldpassword !== newpassword){
      error.errorStatus = true
      error.errorReason = strings.passwordsDoNotMatch
    }

    return error
  }
  
  peformUIOperationsForShowingErrors(errors){
    this.setState({
      nameError: errors.name.errorStatus,
      emailError: errors.email.errorStatus,
      passwordError: errors.password.errorStatus || errors.confirmPassword.errorStatus,
      confirmationPasswordError: errors.confirmPassword.errorStatus
    })

    console.log("TCL: RegistrationScreen -> peformUIOperationsForShowingErrors -> errors", errors)
    if( !errors.name.errorStatus && !errors.email.errorStatus && !errors.password.errorStatus && !errors.confirmPassword.errorStatus){
      // this.performRegitstration()
      console.log('Proceed')
    }else{
      console.log('Please fix the errors!')
    }
    
  }

  performRegitstration(){
    const {
      emailEntered,
      passwordEntered,
      nameEntered
    } = this.state

    firebase
      .auth()
      .createUserWithEmailAndPassword(emailEntered, passwordEntered)
      .then((user) => console.log(user))
      .catch(error => console.log(error))



  }
  

  render(){
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
        style={{...commonStyling.backButtonStyling}}
        onPress={()=> navigation.goBack()}/>

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
          errorTitle={this.state.nameError}
          onChangeText={this.setNameEntered}
          errorStatus={this.state.nameError}
          subHeadingStyle={subHeadingStyle}/>
        

        <InputWithSubHeading 
          secureTextEntry={false}
          placeholder = {strings.emailPlaceholderText}
          autoCompleteType='email'
          subHeadingTitle={strings.emailSubHeading}
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='email-address'
          errorTitle={this.state.emailError}
          onChangeText={this.setEmailEntered}
          errorStatus={this.state.emailError}
          subHeadingStyle={subHeadingStyle}/>

        <InputWithSubHeading 
          secureTextEntry={true}
          autoCompleteType='password'
          placeholder={strings.passwordPlaceholderText}
          subHeadingTitle={strings.passwordSubHeading}
          autoCorrect={false}
          autoCapitalize='none'
          errorTitle={this.state.passwordError}
          onChangeText={this.setPasswordEntered}
          errorStatus={this.state.passwordError}
          subHeadingStyle={subHeadingStyle}/>
        

        <InputWithSubHeading 
          secureTextEntry={true}
          autoCompleteType='password'
          placeholder={strings.confirmPasswordPlaceholderText}
          subHeadingTitle={strings.confirmPasswordSubHeading}
          autoCorrect={false}
          autoCapitalize='none'
          errorTitle={this.state.confirmPasswordError}
          onChangeText={this.setConfirmationPasswordEntered}
          errorStatus={this.state.confirmationPasswordError}
          subHeadingStyle={subHeadingStyle}/>
      </View>
    

      <Button 
        title={strings.register}
        textColor={colors.colorAccent}
        style={buttonStyle} 
        onPress={this.submitButtonOnClick}/>

      <View style={termsContainer}>
        <Text style={termsStyle}>
          {strings.registeringWithKojoHeadline}
        </Text>
        <View style={tandcContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SupplierRestaurantScreen')}>
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
  headingContainerStyle:{
    width: '100%',
    textAlign: 'left',
    marginTop: dimens.screenSafeUpperNotchDistance + 70
  },
  buttonStyle:{
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
  allInputsContainer:{
    width: '100%',
    padding: 8,
    marginTop: 20,
    marginBottom: 10
  },
  tandcContainer:{
    flexDirection: 'row',
    width: '100%',
    marginTop: 2,
    alignItems: 'center'
  },
  tandcText:{
    fontSize: 15,
    color: colors.colorPrimary
  },
  termsContainer: {
    marginTop: 8
  }
})

RegistrationScreen.navigationOptions={
  header:null
}
export default RegistrationScreen

 