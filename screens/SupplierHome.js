import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { } from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { PropTypes } from 'prop-types'
import SupplierWelcomeScreen from './SupplierWelcomeScreen';
import WelcomeScreen from './WelcomeScreen'
import { Icon } from 'react-native-elements';


const SupplierHome = createBottomTabNavigator(
    {
      Home: {
        screen: SupplierWelcomeScreen,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Icon name="home" size={25} color={tintColor} />
          )
        }
      },
      Profile: {
        screen: WelcomeScreen,
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

SupplierHome.navigationOptions = {
  header: null
}
export default SupplierHome