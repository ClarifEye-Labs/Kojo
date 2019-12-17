import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native'
import { Cross, Button} from '../Components'
import { dimens, colors, customFonts } from '../constants'
import { commonStyling } from '../common'

const EmailScreen = (props) => { 
  const screenName='EmailScreen'
  const {
    mainContainer,
    imageStyle,
    subText,
    textContainer,
    mainText,
    crossStyle,
    goToEmailButton,
    goToEmailText
  } = styles

  const screen = 
  <View style={mainContainer}>
    <Cross style={crossStyle}/>
    <Image style={imageStyle} source={require('../assets/Onboarding/emailSent.png')}/>
    <View style={textContainer}>
      <Text style={mainText}>Check your Email</Text>
      <Text style={subText}> We have sent you a reset password link on your registered email address.</Text>
    </View>
    <Button 
    title="Go to Email" 
    style={goToEmailButton} 
    textColor={colors.colorAccent}/>
  </View>

  return screen
}

const styles = StyleSheet.create({
    mainContainer: {
      ...commonStyling.mainContainer,
      alignItems: 'center',
      justifyContent: 'center'
    },
    imageStyle:{
      width: dimens.logoWidthOnboarding,
      height: dimens.logoHeightOnboarding
    },
    textContainer: {
      width: '90%',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop:50,
      justifyContent: 'center'
    },
    mainText:{
      fontSize: 30,
      color: colors.black,
      fontFamily: customFonts.semiBold
    },
    subText:{
      width: '80%',
      marginTop: 20,
      color: colors.blackTransluscent,
      fontSize: 17,
      fontFamily: customFonts.regular,
      textAlign: 'center'
    },
    crossStyle:{
      position: 'absolute',
      top: dimens.crossTop,
      right: dimens.crossRight
    },
    goToEmailButton: {
      backgroundColor: colors.colorPrimary,
      width: 280,
      marginTop: 50
    },
    goToEmailText:{
      color: colors.colorAccent,
      fontSize: 20,
      fontFamily: customFonts.medium
    }
})

export default EmailScreen

