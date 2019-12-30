import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { commonStyling } from './common' 
import firebase from './config/firebase'
import * as Font from 'expo-font';
import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegistrationScreen from './screens/RegistrationScreen'
import SupplierWelcomeScreen from './screens/SupplierWelcomeScreen'
import SupplierRestaurantScreen from './screens/SupplierRestaurantScreen'
import EmailScreen from './screens/EmailScreen'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { colors } from './constants';
import {createStore} from 'redux';
import {Provider} from 'react-redux';


import SupplierInventoryScreen from './screens/SupplierInventoryScreen';
import SupplierClientsScreen from './screens/SupplierClientsScreen';
import SupplierScreen from './screens/SupplierScreen'






const AppNavigator = createStackNavigator({
LoginScreen: LoginScreen,
WelcomeScreen: WelcomeScreen,
RegistrationScreen: RegistrationScreen,
SupplierWelcomeScreen: SupplierWelcomeScreen,
EmailScreen: EmailScreen,
SupplierRestaurantScreen: SupplierRestaurantScreen,
SupplierInventoryScreen: SupplierInventoryScreen,
SupplierClientsScreen: SupplierClientsScreen,
},
{
initialRouteName: 'WelcomeScreen'
})


const AppContainer = createAppContainer(AppNavigator);

const initialState = {
  dummyInventory: [
    {title: 'Alcohol', data: ['ALTERED','ABBY','ACTION U.S.A.','AMUCK','ANGUISH']},  
    {title: 'Dairy', data: ['BEST MEN','BEYOND JUSTICE','BLACK GUNN','BLOOD RANCH','BEASTIES']},  
    {title: 'Meat', data: ['CARTEL', 'CASTLE OF EVIL', 'CHANCE', 'COP GAME', 'CROSS FIRE',]},  
  ]
}

const reducer = (state = initialState, action) => {
  console.log("reducer called")
  switch(action.type) {
    case 'UPDATE_INVENTORY' : 
    return {dummyInventory : [
      {title: 'Dairy', data: ['BEST MEN','BEYOND JUSTICE','BLACK GUNN','BLOOD RANCH','BEASTIES']},   
      {title: 'Meat', data: ['CARTEL', 'CASTLE OF EVIL', 'CHANCE', 'COP GAME', 'CROSS FIRE',]},
    ]}
  }
  return state
}

const store = createStore(reducer)



class App extends Component {


  constructor(props){
    super(props)
    this.state = {
        fontLoaded: false,
        isAppReady: false
    }
  }

  async componentDidMount() { 
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
  
    this.setState({
        fontLoaded:true,
        isAppReady:true
    })
  }


  render() {
    const {
      mainContainer
    } = styles

    const {
      navigation
    } = this.props

    if(this.state.isAppReady)
    {
      return (
        <Provider store = {store}>
        <SupplierInventoryScreen />
        </Provider>
      )

    }

    else {
      return null
    }

  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

App.navigationOptions = {
  title: 'Title'
}

export default App