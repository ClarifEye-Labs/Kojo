import React, { Component } from 'react'; 
import { View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native'
import { Cross, Button} from '../Components'
import { dimens, colors, customFonts, strings } from '../constants'
import { commonStyling } from '../common'


class EmailScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      name : 'EmailScreen'
    }
  }
  render() {
    const {
      mainContainer,
      imageStyle,
      subText,
      textContainer,
      mainText,
      goToEmailButton
    } = styles
    
    const {
      navigation
    } = this.props

    const screen = 
    <View style={mainContainer}>
      <Cross style={commonStyling.crossStyle} size={40} onPress={() => navigation.goBack()} />
      <Image style={imageStyle} source={require('../assets/Onboarding/emailSent.png')}/>
      <View style={textContainer}>
        <Text style={mainText}>{strings.checkYourEmail}</Text>
        <Text style={subText}> {strings.resetLinkSent} </Text>
      </View>
      <Button 
      title={strings.goToEmail}
      style={goToEmailButton} 
      textColor={colors.colorAccent}/>
    </View>
  
    return screen
  }
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

EmailScreen.navigationOptions = {
  header: null
}

export default EmailScreen

