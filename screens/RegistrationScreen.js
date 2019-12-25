import React, {useRef, useEffect} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Back, Heading, InputWithSubHeading, Button } from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common'

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

  componentDidUpdate(){
    // console.log(this.state)
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

    this.peformUIOperationsForShowingErrors(errors)
  }

  performNameValidation = (name) => { 
    var error = {
      errorStatus : false,
      errorReason : 'No Error'
    }

    if(name == ''){
      error.errorStatus = 'Name cannot be empty'
      error.errorReason = false
      return error
    }

    return error
    
  }

  performEmailValidation = (email) => {
    var error = {
      errorStatus : false,
      errorReason : 'No Error'
    }

    if(email == ''){
      error.errorStatus = 'Email cannot be empty'
      error.errorReason = false
      return error
    }

    return error
  }


  performPasswordValidation = (password) => {
    var error = {
      errorStatus : false,
      errorReason : 'No Error'
    }

    if(password == ''){
      error.errorStatus = 'Password cannot be empty'
      error.errorReason = false
      return error
    }

    return error
  }

  performConfirmPasswordValidation = (oldpassword, newpassword) => {
    var error = {
      errorStatus : false,
      errorReason : 'No Error'
    }

    if(oldpassword == '' || newpassword==''){
      error.errorStatus = 'Either Passwords cannot be empty'
      error.errorReason = false
      return error
    }

    if(oldpassword !== newpassword){
      error.errorStatus = false
      error.errorReason = 'Passwords do not match'
    }

    return error
  }
  

  performEmailValidation = (email) => {
    var error = {
      errorStatus : false,
      errorReason : 'No Error'
    }

    if(email == ''){
      error.errorStatus = 'Email cannot be empty'
      error.errorReason = false
      return error
    }

    return error
  }

  peformUIOperationsForShowingErrors(errors){
    if(errors.name.errorStatus){
      console.log('Name error')
    }
    if(errors.email.errorStatus){
      console.log('Email error')
    }
    if(errors.password.errorStatus){
      console.log('Password error')
    }
    if(errors.confirmPassword.errorStatus){
      console.log('Confirm Password error')
    }

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
        title='Register to Kojo'
        containerStyle={headingContainerStyle} />
        
      <View style={allInputsContainer}>
        <InputWithSubHeading 
          secureTextEntry={false}
          placeholder='John Doe'
          autoCorrect={false}
          autoCompleteType='name'
          subHeadingTitle='Full Name'
          autoCapitalize='words'
          onChangeText={this.setNameEntered}
          errorStatus={this.state.nameError}
          subHeadingStyle={subHeadingStyle}/>
        

        <InputWithSubHeading 
          secureTextEntry={false}
          placeholder='johndoe@gmail.com'
          autoCompleteType='email'
          subHeadingTitle='Email'
          autoCorrect={false}
          autoCapitalize='none'
          onChangeText={this.setEmailEntered}
          errorStatus={this.state.emailError}
          subHeadingStyle={subHeadingStyle}/>

        <InputWithSubHeading 
          secureTextEntry={true}
          autoCompleteType='password'
          placeholder='Enter your password'
          subHeadingTitle='Password'
          autoCorrect={false}
          autoCapitalize='none'
          onChangeText={this.setPasswordEntered}
          errorStatus={this.state.passwordError}
          subHeadingStyle={subHeadingStyle}/>
        

        <InputWithSubHeading 
          secureTextEntry={true}
          autoCompleteType='password'
          placeholder='Confrim your password'
          subHeadingTitle='Confirm Password'
          autoCorrect={false}
          autoCapitalize='none'
          onChangeText={this.setConfirmationPasswordEntered}
          errorStatus={this.state.confirmationPasswordError}
          subHeadingStyle={subHeadingStyle}/>
      </View>
    

      <Button 
        title='Register'
        textColor={colors.colorAccent}
        style={buttonStyle} 
        onPress={this.submitButtonOnClick}/>

      <View style={termsContainer}>
        <Text style={termsStyle}>
          By registering you agree to Kojo's 
        </Text>
        <View style={tandcContainer}>
          <TouchableOpacity>
            <Text style={tandcText}> Terms & Conditions </Text>
          </TouchableOpacity>
          <Text style={termsStyle}> and </Text>
          <TouchableOpacity>
            <Text style={tandcText}> Privacy Policy </Text>
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
    marginTop: dimens.screenSafeUpperNotchDistance + 60
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

