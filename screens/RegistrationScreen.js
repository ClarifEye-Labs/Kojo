import React, {useRef, useEffect} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Back, Heading, InputWithSubHeading, Button } from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common'

class RegistrationScreen extends React.Component { 
  constructor(props){
    super(props)
    this.state={

    }
  }

  render(){
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
          subHeadingStyle={subHeadingStyle}/>
        

        <InputWithSubHeading 
          secureTextEntry={false}
          placeholder='johndoe@gmail.com'
          autoCompleteType='email'
          subHeadingTitle='Email'
          autoCorrect={false}
          autoCapitalize='none'
          subHeadingStyle={subHeadingStyle}/>

        <InputWithSubHeading 
          secureTextEntry={true}
          autoCompleteType='password'
          placeholder='Enter your password'
          subHeadingTitle='Password'
          autoCorrect={false}
          autoCapitalize='none'
          subHeadingStyle={subHeadingStyle}/>
        

        <InputWithSubHeading 
          secureTextEntry={true}
          autoCompleteType='password'
          placeholder='Confrim your password'
          subHeadingTitle='Confirm Password'
          autoCorrect={false}
          autoCapitalize='none'
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

