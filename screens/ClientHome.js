import React from 'react';
import { colors } from '../constants'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SupplierWelcomeScreen from './SupplierWelcomeScreen';
import { Icon } from 'react-native-elements';
import ProfileScreen from './ProfileScreen';
import ClientWelcomeScreen from './ClientWelcomeScreen';


const ClientHome = createBottomTabNavigator(
    {
      Home: {
        screen: ClientWelcomeScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="home" size={25} color={tintColor} />
          )
        }
      },
      Profile: {
        screen: ProfileScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="person-outline" size={25} color={tintColor} />
          )
        }
      },
    },
    {
      initialRouteName: 'Home',
      tabBarOptions: {
        activeTintColor: colors.colorPrimary
      }
    }
  );

ClientHome.navigationOptions = {
  header: null
}
export default ClientHome