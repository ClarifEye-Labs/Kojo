import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native'
import { WelcomeItem } from '../Components'
import { dimens, colors, strings, screens } from '../constants'
import { commonStyling } from '../common'
import Constants from 'expo-constants'
import * as Animatable from 'react-native-animatable'
import RegistrationScreen from './RegistrationScreen';
import WelcomeScreen from './WelcomeScreen'
import { Icon } from 'react-native-elements';

class SupplierWelcomeScreen extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      supplierData: [{
        id: '0',
        title: strings.viewInventory,
      },
      {
        id: '1',
        title: strings.editItems,
      },
      {
        id: '2',
        title: strings.addItems,
      },
      {
        id: '3',
        title: strings.viewClients,
      },]
    }
  }

  render() {
    const {
      mainContainer,
      listStyle
    } = styles

    const {
      navigation
    } = this.props

    return (
      <Animatable.View animation='fadeInUpBig' style={mainContainer}>
        <FlatList 
          style={listStyle}
          contentContainerStyle={listStyle}
          data={this.state.supplierData}
          renderItem={({ item }) => ListItem(item, navigation)}
          keyExtractor={item => item.id}
        />
    </Animatable.View>
    );
  }
}


function ListItem(item, navigation) {
  var backgroundImage = undefined
  var backgroundColorOverlay = undefined
  var cardTitle = item.title
  var textColor = undefined
  var onPress = undefined


  switch (item.title) {
    case 'Add Items': {
      backgroundImage = require('../assets/Supplier/addItems.jpg')
      backgroundColorOverlay = colors.blueTransluscent
      textColor = colors.colorAccent
      onPress = () => navigation.navigate(screens.SupplierAddInventoryScreen)
      break;
    }
    case 'View Inventory': {
      backgroundImage = require('../assets/Supplier/viewInventory.jpeg')
      backgroundColorOverlay = colors.blackTransluscent
      textColor = colors.colorAccent
      onPress = () => navigation.navigate(screens.SupplierInventoryScreen)
      break;
    }
    case 'Edit Items': {
      backgroundImage = require('../assets/Supplier/editItem.jpeg')
      backgroundColorOverlay = colors.orangeHueTransluscent
      textColor = colors.colorAccent
      onPress = () => navigation.navigate(screens.EditInventoryScreen)
      break;
    }
    case 'View Clients': {
      backgroundImage = require('../assets/Supplier/client.jpg')
      backgroundColorOverlay = colors.colorPrimaryTransluscent
      textColor = colors.colorAccent
      onPress = () => navigation.navigate('SupplierClientsScreen')
      break;
    }
    default: {
      backgroundImage = require('../assets/Supplier/viewInventory.jpeg')
      backgroundColorOverlay = colors.googleOrangeTransluscent
      textColor = colors.colorAccent
      onPress = () => navigation.navigate('RegistrationScreen')
    }
  }

  return (<WelcomeItem
    backgroundImage={backgroundImage}
    cardTitle={cardTitle}
    backgroundColorOverlay={backgroundColorOverlay}
    textColor={textColor}
    onPress={onPress}
  />)
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    paddingTop: dimens.screenSafeUpperNotchDistance + 10
  },
  listStyle: {
    marginBottom: 10
  }
})

SupplierWelcomeScreen.navigationOptions = {
  header: null
}

export default SupplierWelcomeScreen