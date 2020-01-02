import React, { Component } from 'react';
import { View, StyleSheet, Image, Text} from 'react-native'
import { dimens, colors, customFonts, strings } from '../constants'
import { commonStyling } from '../common' 
import { TouchableOpacity } from 'react-native-gesture-handler';

class InventoryItemScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      name:'InventoryItemScreen'
    }
  }
  render() {
    const {
      mainContainer,
      imageStyle,
      collapsableHeaderStyle,
      itemNameStyle
    } = styles

    const {
      navigation,
    } = this.props
    
    const itemName = navigation.getParam('item').name;
    const itemPrice = navigation.getParam('item').price_per_unit;
    const itemImageURL = navigation.getParam('item').imageURL;
    const quantityAvailable = navigation.getParam('item').quantityAvailable;

    return (
      <View style={mainContainer}>
        <View style={collapsableHeaderStyle}> 
          <Image source= {{ uri: itemImageURL} }  style={imageStyle} />
          <Text style={itemNameStyle}> {itemName} </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer
  },
  imageStyle:{
    width: 150,
    height: 150
  },
  collapsableHeaderStyle:{
    width: '100%',
    height: 250,
    alignItems: 'center',
    paddingTop: dimens.screenVerticalMargin
  },
  itemNameStyle: {
    fontSize: 20,
    marginTop: 10,
    fontFamily: customFonts.semiBold,
    color: colors.gray
  },
  headerEditContainerStyle:{
    marginRight: dimens.screenHorizontalMargin
  },
  headerEditStyle:{
    fontSize: 16,
    color: colors.facebookBlue
  }
})

InventoryItemScreen.navigationOptions = {
  title: 'InventoryItemScreen',
  headerRight: () => (
    <TouchableOpacity style={styles.headerEditContainerStyle}>
      <Text style={styles.headerEditStyle}>{strings.edit}</Text>
    </TouchableOpacity>
  )
}

export default InventoryItemScreen