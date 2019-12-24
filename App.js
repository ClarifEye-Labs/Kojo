import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/LoginScreen'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { colors } from './constants';


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)
  const[isAppReady, setIsAppReady] = useState(false)

  const RootStack = createStackNavigator({
    WelcomeScreen: {
      screen: WelcomeScreen,
      navigationOptions: {
        header: null,
      } 
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        title: 'Login'
      } 
    }
  })


  const AppContainer = createAppContainer(RootStack);

  async function setup(){
    await Font.loadAsync({
      'raleway-bold' : require('./assets/fonts/Raleway-Bold.ttf'),
      'raleway-bold-italic' : require('./assets/fonts/Raleway-BoldItalic.ttf'),
      'raleway-extra-bold' : require('./assets/fonts/Raleway-ExtraBold.ttf'),
      'raleway-extra-bold-italic': require('./assets/fonts/Raleway-ExtraBoldItalic.ttf'),
      'raleway-italic': require('./assets/fonts/Raleway-Italic.ttf'),
      'raleway-light': require('./assets/fonts/Raleway-Light.ttf'),
      'raleway-light-italic': require('./assets/fonts/Raleway-LightItalic.ttf'),
      'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf'),
      'raleway-medium-italic': require('./assets/fonts/Raleway-MediumItalic.ttf'),
      'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
      'raleway-semi-bold': require('./assets/fonts/Raleway-SemiBold.ttf'),
      'raleway-semi-bold-italic': require('./assets/fonts/Raleway-SemiBoldItalic.ttf'),
      'raleway-thin': require('./assets/fonts/Raleway-Thin.ttf'),
      'raleway-thin-italic': require('./assets/fonts/Raleway-ThinItalic.ttf'),
      'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf')
    });
    setFontLoaded(true)
    setIsAppReady(true)
  }

  // another variation of component did mount since there are no dependecies 
  useEffect(() => {
    setup()
  },[])

  const componentToRender = isAppReady? <AppContainer style={styles.container} /> : null;

  return componentToRender
  
}



const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: colors.colorAccent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

