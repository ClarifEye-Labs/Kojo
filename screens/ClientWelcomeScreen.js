import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native'
import { WelcomeItem } from '../Components'
import { dimens, colors, strings, screens } from '../constants'
import { commonStyling } from '../common'
import * as Animatable from 'react-native-animatable'
import { Icon } from 'react-native-elements';

class ClientWelcomeScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      clientData: [{
        id: '0',
        title: strings.viewSuppliers,
      },
      {
        id: '1',
        title: strings.viewOrders,
      },
      {
        id: '2',
        title: strings.addSupplier,
      },
    ]
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
          data={this.state.clientData}
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
    case strings.viewSuppliers: {
      backgroundImage = require('../assets/Supplier/addItems.jpg')
      backgroundColorOverlay = colors.blueTransluscent
      textColor = colors.colorAccent
      onPress = () => navigation.navigate(screens.ViewSupplierScreen)
      break;
    }
    case strings.viewOrders: {
      backgroundImage = require('../assets/Supplier/viewInventory.jpeg')
      backgroundColorOverlay = colors.blackTransluscent
      textColor = colors.colorAccent
      onPress = () => navigation.navigate(screens.ViewOrdersClient)
      break;
    }
    case strings.addSupplier: {
      backgroundImage = require('../assets/Supplier/viewInventory.jpeg')
      backgroundColorOverlay = colors.blackTransluscent
      textColor = colors.colorAccent
      onPress = () => navigation.navigate(screens.ViewOrdersClient)
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

ClientWelcomeScreen.navigationOptions = {
  header: null
}

export default ClientWelcomeScreen