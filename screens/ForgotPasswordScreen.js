import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native'
import { Heading, Back, Icon, Button } from '../Components'
import { dimens, colors, strings, customFonts } from '../constants'
import { commonStyling } from '../common'
import iconNames from '../constants/iconNames';
import { PropTypes } from 'prop-types'
import LottieView from 'lottie-react-native'
import screens from '../constants/screens';

class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailEntered: '',
      emailErrorReason: undefined,
      emailErrorStatus: false,
      buttonLoading: false
    }
  }


  setEmailEntered = (text) => {
    this.setState({
      emailEntered: text
    })
  }

  submitButtonPressed = () => {
    this.setState({
      buttonLoading: true
    }, () => this.checkForEmailError())
  }

  checkForEmailError = () => {
    const { emailEntered } = this.state
    let emailError = {
      errorReason: undefined,
      errorStatus: false
    }
    if (emailEntered.length === 0) {
      emailError.errorReason = strings.emailCannotBeEmpty,
        emailError.errorStatus = true
    } else if (! /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(emailEntered)) {
      emailError.errorStatus = true
      emailError.errorReason = strings.emailErrorMessage
    }
    
    if(emailError.errorStatus) {
      this.setState({
        emailErrorReason: emailError.errorReason,
        emailErrorStatus: true,
        buttonLoading: false
      })
    }else{
      this.setState({
        emailErrorReason: emailError.errorReason,
        emailErrorStatus: false,
      }, this.uploadInfoToDatabase)
    }
  }

  uploadInfoToDatabase = () => {
    console.log('Entering firebase')
    this.setState({
      buttonLoading: false
    }, () => {this.animation.play()})
  }

  changeScreens = (navigation) => {
    navigation.navigate(screens.EmailScreen)
  }

  render() {
    const {
      mainContainer,
      headingContainerStyle,
      inputContainer,
      subHeadingStyle,
      textInputContainer,
      textInputStyle,
      textInputStyleError,
      crossStyle,
      buttonStyle,
      errorSubHeadingStyle,
      animationContainerStyle
    } = styles

    const {
      navigation
    } = this.props

    return (
      <View style={mainContainer}>
        <Icon nameIOS={iconNames.backIOS} nameAndroid={iconNames.backAndroid} style={commonStyling.backButtonStyling} size={34} onPress={()=> navigation.goBack() } />
        <Icon nameIOS={iconNames.crossIOS} nameAndroid={iconNames.crossAndroid} style={crossStyle} size={50} onPress={()=> navigation.goBack() } />
        <Heading containerStyle={headingContainerStyle} title={strings.forgotPassword} />

        <View style={inputContainer}>
          <Text style={subHeadingStyle}>{strings.enterYourEmailForgotPassword}</Text>
          {this.state.emailErrorStatus
            ? <Text style={errorSubHeadingStyle}>{this.state.emailErrorReason} </Text>
            : null}
          <View style={textInputContainer}>
            <TextInput
              style={this.state.emailErrorStatus ? textInputStyleError : textInputStyle}
              onChangeText={this.setEmailEntered}
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
            onAnimationFinish={()=>this.changeScreens(navigation)}
            loop={false}
            source={require('../assets/animations/email_send.json')} />
        </View>
        <Button 
          title={strings.sendEmail} 
          isLoading={this.state.buttonLoading}
          onPress={this.submitButtonPressed} 
          style={buttonStyle} 
          textColor={colors.colorAccent} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
  },
  errorSubHeadingStyle: {
    fontSize: 16,
    fontFamily: customFonts.regular,
    marginTop: 16,
    color: colors.errorRed
  },
  headingContainerStyle: {
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
    marginTop: 8,
  },
  textInputStyle: {
    fontSize: dimens.inputTextFontSize + 6,
    color: colors.colorPrimary,
    fontFamily: customFonts.regular,
    borderBottomWidth: dimens.inputTextBorderWidth,
    borderBottomColor: colors.blackTransluscent,
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
  },
  textInputStyleError: {
    fontSize: dimens.inputTextFontSize + 6,
    color: colors.colorPrimary,
    fontFamily: customFonts.regular,
    borderBottomWidth: dimens.inputTextBorderWidth,
    borderBottomColor: colors.errorRed,
    paddingVertical: 12,
  }

})

ForgotPasswordScreen.navigationOptions = {
  header: null
}

ForgotPasswordScreen.propTypes = {
  navigation: PropTypes.object
}

export default ForgotPasswordScreen