import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  Text,
  TouchableOpacity,
  FlatList} from 'react-native'
import {SupplierWelcomeItem} from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common' 
import Constants from 'expo-constants'

class SupplierWelcomeScreen extends Component {
 
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render() {
    const supplierData = [
      {
        id: '0',
        title: 'View Inventory',
      },
      {
        id: '1',
        title: 'Edit Items',
      },
      {
        id: '2',
        title: 'Add Items',
      },
      {
        id: '3',
        title: 'View Clients',
      },
     
    ];

    const {
      mainContainer,
      listStyle
    } = styles

    const {
      navigation
    } = this.props

    return (
      <View style={mainContainer}>
        <FlatList 
          style={listStyle}
          contentContainerStyle={listStyle}
          data={supplierData}
          renderItem={({ item }) => ListItem(item, navigation)}
          keyExtractor={item => item.id}
      />
    </View>
    );
  }
}


function ListItem(item, navigation) {
  var backgroundImage = undefined
  var backgroundColorOverlay = undefined
  var cardTitle = item.title
  var textColor = undefined
  var onPress  = undefined


  switch (item.title) {
    case 'Add Items': {
      backgroundImage = require('../assets/Supplier/addItems.jpg')
      backgroundColorOverlay = colors.blueTransluscent
      textColor = colors.colorAccent
      onPress = () => navigation.navigate('WelcomeScreen') 
      break;
    }
    case 'View Inventory':{
      backgroundImage = require('../assets/Supplier/viewInventory.jpeg')
      backgroundColorOverlay = colors.blackTransluscent
      textColor = colors.colorAccent
      onPress = () => navigation.navigate('SupplierInventoryScreen')
      break;
    }
    case 'Edit Items': {
      backgroundImage = require('../assets/Supplier/editItem.jpeg')
      backgroundColorOverlay = colors.orangeHueTransluscent
      textColor = colors.colorAccent
      onPress = () => navigation.navigate('RegistrationScreen')
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

  return ( <SupplierWelcomeItem 
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
    paddingTop: dimens.screenSafeUpperNotchDistance +10 
  },
  listStyle: {
    marginBottom: Constants.statusBarHeight + 10
  }
})

SupplierWelcomeScreen.navigationOptions = {
  header: null
}

export default SupplierWelcomeScreen