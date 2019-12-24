import React, {useRef, useEffect} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Back, Heading, InputWithSubHeading, Button } from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common'

const RegistrationScreen = (props) => { 
  const screenName='Registration Screen'
  const {
    mainContainer,
    backButtonStyle,
    headingContainerStyle,
    buttonStyle,
    allInputsContainer,
    subHeadingStyle,
    termsStyle,
    tandcContainer,
    termsContainer,
    tandcText
  } = styles


  const screen = 
  <View style={mainContainer}>
    <Back 
      style={backButtonStyle}
      onPress={()=> props.navigation.goBack()}/>

    <Heading 
      title='Register to Kojo'
      containerStyle={headingContainerStyle} />
      
    <View style={allInputsContainer}>
      <InputWithSubHeading 
        secureTextEntry={false}
        placeholder='John Doe'
        subHeadingTitle='Full Name'
        subHeadingStyle={subHeadingStyle}/>
      

      <InputWithSubHeading 
        secureTextEntry={false}
        placeholder='johndoe@gmail.com'
        subHeadingTitle='Email'
        subHeadingStyle={subHeadingStyle}/>

      
      <InputWithSubHeading 
        secureTextEntry={false}
        placeholder='+852-64346741'
        subHeadingTitle='Mobile Number'
        subHeadingStyle={subHeadingStyle}/>
      

      <InputWithSubHeading 
        secureTextEntry={true}
        placeholder='Enter your password'
        subHeadingTitle='Password'
        subHeadingStyle={subHeadingStyle}/>
      

      <InputWithSubHeading 
        secureTextEntry={false}
        placeholder='Confrim your password'
        subHeadingTitle='Confirm Password'
        subHeadingStyle={subHeadingStyle}/>
    </View>
  

    <Button 
      title='Register'
      textColor={colors.colorAccent}
      style={buttonStyle} />

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

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    alignItems: 'center',
    paddingLeft: dimens.screenHorizontalMargin,
    paddingRight: dimens.screenHorizontalMargin
  },
  backButtonStyle: {
    position: 'absolute',
    top: 40,
    left: 25
  },
  headingContainerStyle:{
    width: '100%',
    textAlign: 'left',
    marginTop: dimens.screenSafeUpperNotchDistance + 55
  },
  buttonStyle:{
    width: '90%',
    backgroundColor: colors.colorPrimary,
    marginTop: 20
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

export default RegistrationScreen

