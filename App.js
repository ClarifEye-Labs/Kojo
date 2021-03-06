import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { commonStyling } from './common'
import * as Font from 'expo-font';
import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegistrationScreen from './screens/RegistrationScreen'
import SupplierWelcomeScreen from './screens/SupplierWelcomeScreen'
import SupplierRestaurantScreen from './screens/SupplierRestaurantScreen'
import EmailScreen from './screens/EmailScreen'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider, connect } from 'react-redux';
import InventoryItemScreen from './screens/InventoryItemScreen'
import SupplierInventoryScreen from './screens/SupplierInventoryScreen';
import SupplierClientsScreen from './screens/SupplierClientsScreen';
import SupplierAddInventoryScreen from './screens/SupplierAddInventory';
import EditItemScreen from './screens/EditItemScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SplashScreen from './screens/SplashScreen'
import screens from './constants/screens';
import PhoneScreen from './screens/PhoneScreen';
import AddressScreen from './screens/AddressScreen';
import AddressComplete from './screens/AddressComplete';
import SupplierHome from './screens/SupplierHome';
import ProfileScreen from './screens/ProfileScreen';
import EditInventoryScreen from './screens/EditInventoryScreen';
import ClientWelcomeScreen from './screens/ClientWelcomeScreen';
import ViewSupplierScreen from './screens/ViewSupplierScreen';
import ClientHome from './screens/ClientHome';
import ViewOrdersClient from './screens/ViewOrdersClient';
import AddSupplierScreen from './screens/AddSupplierScreen';
import EditEmailScreen from './screens/EditEmailScreen';
import ViewClientsScreen from './screens/ViewClientsScreen';
import ViewAllOrders from './screens/ViewAllOrders';
import { configureStore } from './redux/app-redux'
import ViewSupplierItemScreen from './screens/ViewSupplierItemsScreen';
import ViewOrderItemDetails from './screens/ViewOrderItemDetails';

const store = configureStore()

const AppNavigator = createStackNavigator({
  LoginScreen: LoginScreen,
  WelcomeScreen: WelcomeScreen,
  RegistrationScreen: RegistrationScreen,
  SupplierWelcomeScreen: SupplierWelcomeScreen,
  EmailScreen: EmailScreen,
  SupplierRestaurantScreen: SupplierRestaurantScreen,
  SupplierInventoryScreen: SupplierInventoryScreen,
  SupplierClientsScreen: SupplierClientsScreen,
  InventoryItemScreen: InventoryItemScreen,
  SupplierAddInventoryScreen: SupplierAddInventoryScreen,
  ForgotPasswordScreen: ForgotPasswordScreen,
  EditItemScreen: EditItemScreen,
  SplashScreen: SplashScreen,
  PhoneScreen: PhoneScreen,
  AddressScreen: AddressScreen,
  AddressComplete: AddressComplete,
  SupplierHome: SupplierHome,
  ProfileScreen: ProfileScreen,
  EditInventoryScreen: EditInventoryScreen,
  ClientWelcomeScreen: ClientWelcomeScreen,
  ViewSupplierScreen: ViewSupplierScreen,
  ClientHome: ClientHome,
  ViewOrdersClient: ViewOrdersClient,
  AddSupplierScreen: AddSupplierScreen,
  EditEmailScreen: EditEmailScreen,
  ViewClientsScreen: ViewClientsScreen,
  ViewAllOrders: ViewAllOrders,
  ViewSupplierItemScreen: ViewSupplierItemScreen,
  ViewOrderItemDetails: ViewOrderItemDetails
},
  {
    initialRouteName: screens.SplashScreen
  })

const AppContainer = createAppContainer(AppNavigator);

//const store = configureStore()

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false,
      isAppReady: false
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
      'raleway-bold-italic': require('./assets/fonts/Raleway-BoldItalic.ttf'),
      'raleway-extra-bold': require('./assets/fonts/Raleway-ExtraBold.ttf'),
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
      fontLoaded: true,
      isAppReady: true
    })
  }


  render() {
    const {
      mainContainer
    } = styles

    const {
      navigation
    } = this.props

    {
      return this.state.isAppReady
        ? <Provider store={store}>
          <AppContainer />
        </Provider>
        : null
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
  header: null
}

export default App