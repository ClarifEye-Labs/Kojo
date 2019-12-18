import React from 'react'
import { View, StyleSheet, Text} from 'react-native'
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
    textInputStyle,
    textInputContainerStyle,
    subHeadingStyle,
    termsStyle
  } = styles

  const screen = 
  <View style={mainContainer}>
    <Back style={backButtonStyle} />

    <Heading 
      title='Register to KOJO'
      containerStyle={headingContainerStyle} />

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

    <Button 
      title='Register'
      textColor={colors.colorAccent}
      style={buttonStyle} />

    <Text style={termsStyle}>
      By registering you agree to Terms and Conditions
      and Privacy Policy of Kojo.
    </Text>

  </View>

  return screen
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    padding: dimens.screenVerticalMargin
  },
  backButtonStyle: {
    position: 'absolute',
    top: 40,
    left: 28
  },
  headingContainerStyle:{
    marginTop: 70
  },
  buttonStyle:{
    width: '80%',
    backgroundColor: colors.colorPrimary,
    marginTop: 40
  },
  subHeadingStyle: {
    marginTop: 16
  },
  termsStyle: {
    textAlign: 'center',
    width: '80%',
    fontSize: 14,
    color: colors.blackTransluscent
  }
})

export default RegistrationScreen

