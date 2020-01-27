import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput} from 'react-native'
import { Heading, Back, Icon, Button } from '../Components'
import { dimens, colors, strings, customFonts } from '../constants'
import { commonStyling } from '../common' 
import iconNames from '../constants/iconNames';
import {PropTypes} from 'prop-types'
import LottieView from 'lottie-react-native'

class ForgotPasswordScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: 'ForgotPassword',
      emailEntered: ''
    }
  }


  setEmailEntered = (text) => {
    this.setState({
      emailEntered: text
    })
  }

  submitButtonPressed = () => {
    this.animation.play()
  }

  render() {
    const {
      mainContainer,
      headingContainerStyle,
      inputContainer,
      subHeadingStyle,
      textInputContainer,
      textInputStyle,
      crossStyle,
      buttonStyle,
      animationContainerStyle
    } = styles

    const {
      navigation
    } = this.props
    
    return (
      <View style={mainContainer}>
        <Icon nameIOS={iconNames.backIOS} nameAndroid={iconNames.backAndroid} style={commonStyling.backButtonStyling} size={34} />
        <Icon nameIOS={iconNames.crossIOS} nameAndroid={iconNames.crossAndroid} style={crossStyle} size={50}/>
        <Heading containerStyle={headingContainerStyle} title={strings.forgotPassword} />

        <View style={inputContainer}>
          <Text style={subHeadingStyle}>{strings.enterYourEmailForgotPassword}</Text>
          <View style={textInputContainer}>
          <TextInput 
            style={textInputStyle}
            onChange={this.setEmailEntered}
            placeholder={strings.emailPlaceholderText} 
            autoCapitalize='none'
            autoCompleteType='email'
            numberOfLines={1}
            />
          </View>
        </View>
        <View style={animationContainerStyle}>
          <LottieView  
            ref={animation => {
              this.animation = animation;
            }}
            loop={false}
            source={require('../assets/animations/email_send.json')} />
        </View>
        <Button title={strings.sendEmail} onPress={this.submitButtonPressed} style={buttonStyle} textColor={colors.colorAccent} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
  },
  headingContainerStyle: {
    // position: 'absolute',
    marginTop: 120,
    marginLeft: dimens.screenHorizontalMargin,
    marginRight: dimens.screenHorizontalMargin
  },
  crossStyle: {
    position: 'absolute',
    top: 45,
    right: dimens.screenHorizontalMargin
  },
  inputContainer: {
    marginTop: 40,
    marginLeft: dimens.screenHorizontalMargin + 8,
    marginRight: dimens.screenHorizontalMargin
  },
  subHeadingStyle: {
    fontSize: 17,
    fontFamily: customFonts.regular
  },
  textInputContainer: {
    borderBottomWidth: dimens.inputTextBorderWidth,
    borderBottomColor: colors.blackTransluscent,
    marginTop: 12,
  },
  textInputStyle: {
    fontSize: dimens.inputTextFontSize + 6,
    color: colors.colorPrimary,
    fontFamily: customFonts.regular,
    paddingVertical: 12,
  },
  buttonStyle: {
    backgroundColor: colors.submitGreen,
    width: '90%',
    marginStart: dimens.screenHorizontalMargin,
    marginRight: dimens.screenHorizontalMargin
  },
  animationContainerStyle: {
    marginTop: 50,
    marginBottom: 58,
    width: '100%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center'
  }
  
})

ForgotPasswordScreen.navigationOptions = {
  header: null
}

ForgotPasswordScreen.propTypes = {
  navigation: PropTypes.object
}

export default ForgotPasswordScreen