import React, { Component } from 'react';
import {
  SectionList, 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  Animated,
  Dimensions,
  Platform,
  ImageBackground
} from 'react-native'
import { dimens, colors, customFonts, strings } from '../constants'
import { commonStyling } from '../common'
import { Back, Edit, Card } from '../Components'

const HEADER_EXPANDED_HEIGHT = 350;
const HEADER_COLLAPSED_HEIGHT = 100;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen")

class InventoryItemScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'InventoryItemScreen',
      scrollY: new Animated.Value(0),
    }
  }


  render() {

    const {
      mainContainer,
      mainHeaderContainerStyle,
      collapsableHeaderStyle,
      itemNameStyle,
      editButton,
      imageContainer,
      imageStyling,
      headerContainerImage
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
        <Back size={34} style={commonStyling.backButtonStyling} onPress={() => navigation.goBack()} />
        <Edit size={34} style={editButton} />
        <ImageBackground style={headerContainerImage} source={require('../assets/gradients/gray.jpg')}>
          <View style={imageContainer}>
            <Card width={280} height={280} elevation={dimens.defaultElevation + 10} >
              <ImageBackground style={imageStyling} imageStyle={imageStyling} source={{ uri: itemImageURL }} />
            </Card>
            <Text style={itemNameStyle}>{itemName}</Text>
          </View>
        </ImageBackground>

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer
  },
  headerContainerImage: {
    width: '100%',
    zIndex: -1,
    height: 290
  },
  mainHeaderContainerStyle: {
    width: '100%',
  },
  editButton: {
    position: 'absolute',
    right: dimens.screenHorizontalMargin,
    marginTop: 44
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 420,
    borderBottomColor: colors.grayTransluscent,
    borderBottomWidth: 0.19,
    paddingTop: 70,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center'
  },
  imageStyling: {
    width: 280,
    height: 280,
    borderRadius: dimens.defaultBorderRadius,
  },
  collapsableHeaderStyle: {
    width: '100%',
    height: 250,
    alignItems: 'center',
    paddingTop: dimens.screenVerticalMargin
  },
  itemNameStyle: {
    fontSize: 20,
    marginTop: 12,
    fontFamily: customFonts.semiBold,
    color: colors.grayBlue,
    textTransform: 'uppercase'
  },
  headerEditContainerStyle: {
    marginRight: dimens.screenHorizontalMargin
  },
  headerEditStyle: {
    fontSize: 16,
    color: colors.facebookBlue
  }
})

InventoryItemScreen.navigationOptions = {
  header: null
}

export default InventoryItemScreen