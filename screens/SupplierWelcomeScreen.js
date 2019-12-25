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
     
    ];

    const {
      mainContainer,
      listStyle
    } = styles

    return (
      <View style={mainContainer}>
        <FlatList 
          style={listStyle}
          contentContainerStyle={listStyle}
          data={supplierData}
          renderItem={({ item }) => ListItem(item)}
          keyExtractor={item => item.id}
      />
    </View>
    );
  }
}


function ListItem(item) {
  var backgroundImage = undefined
  var backgroundColorOverlay = undefined
  var cardTitle = item.title
  var textColor = undefined
  switch (item.title) {
    case 'Add Items': {
      backgroundImage = require('../assets/Supplier/addItems.jpg')
      backgroundColorOverlay = colors.blueTransluscent
      textColor = colors.colorAccent
      break;
    }
    case 'View Inventory':{
      backgroundImage = require('../assets/Supplier/viewInventory.jpeg')
      backgroundColorOverlay = colors.blackTransluscent
      textColor = colors.colorAccent
      break;
    }
    case 'Edit Items': {
      backgroundImage = require('../assets/Supplier/editItem.jpeg')
      backgroundColorOverlay = colors.orangeHueTransluscent
      textColor = colors.colorAccent
      break;
    }
    default: {
      backgroundImage = require('../assets/Supplier/viewInventory.jpeg')
      backgroundColorOverlay = colors.colorPrimaryTransluscent
    }
  }

  return ( <SupplierWelcomeItem 
    backgroundImage={backgroundImage}
    cardTitle={cardTitle}
    backgroundColorOverlay={backgroundColorOverlay}
    textColor={textColor}
    />)
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    marginTop: dimens.screenSafeUpperNotchDistance +10 
  },
  listStyle: {

  }
})

SupplierWelcomeScreen.navigationOptions = {
  header: null
}

export default SupplierWelcomeScreen