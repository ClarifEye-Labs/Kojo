import React from 'react'
import { View, StyleSheet, Text, ImageBackground, Image} from 'react-native'
import { } from '../Components'
import { dimens, colors } from '../constants'

const WelcomeScreen = (props) => {  

  const {
    mainContainer,
    backgroundStyle,
    contentContainer
  } = styles

  const screen = 
  <View style={mainContainer}>
    <ImageBackground 
    source ={require('../assets/Login/welcome.jpeg')}
    style={backgroundStyle}>
      <View style={contentContainer}>
        <Text>SHikahr</Text>
      </View>
    </ImageBackground>
  </View>


   return screen
}

const styles = StyleSheet.create({
  mainContainer:{
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0
  },
  backgroundStyle: {
    width: '100%',
    height: '100%'
  },
  contentContainer:{
    width: '100%',
    height: '100%',
    backgroundColor: colors.colorPrimaryTransluscent
  }
})

export default WelcomeScreen

