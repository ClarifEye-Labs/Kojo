import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { dimens, colors, customFonts, strings } from '../constants'
import { commonStyling } from '../common'
import { Back, Edit, Card, TextWithSubheading, Button } from '../Components'

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
      itemNameStyle,
      editButton,
      imageContainer,
      imageStyling,
      gradientStyle,
      headerContainer,
      infoItemContainer,
      subHeadingStyle,
      textStyle,
      buttonContainer,
      deleteButtonStyle
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
        <Back size={34} style={commonStyling.backButtonStyling} color={colors.colorAccent} onPress={() => navigation.goBack()} />
        <Edit size={34} style={editButton} color={colors.colorAccent} onPress={() => navigation.navigate('EditItemScreen')} />
        <View style={headerContainer}>
          <LinearGradient
            colors={[colors.colorPrimary, colors.colorSecondary]}
            style={gradientStyle}>
          </LinearGradient>
          <View style={imageContainer}>
            <Card width={280} height={280} elevation={dimens.defaultElevation + 10} >
              <ImageBackground style={imageStyling} imageStyle={imageStyling} source={{ uri: itemImageURL }} />
            </Card>
            <Text style={itemNameStyle}>{itemName}</Text>
          </View>
        </View>

        <ScrollView>
          <TextWithSubheading
            containerStyle={infoItemContainer}
            subHeadingStyle={subHeadingStyle}
            textStyle={textStyle}
            subHeadingTitle='Category'
            textTitle={itemPrice} />
          <TextWithSubheading
            containerStyle={infoItemContainer}
            subHeadingStyle={subHeadingStyle}
            textStyle={textStyle}
            subHeadingTitle='Price per Unit'
            textTitle={itemPrice} />
          <TextWithSubheading
            containerStyle={infoItemContainer}
            subHeadingStyle={subHeadingStyle}
            textStyle={textStyle}
            subHeadingTitle='Units Available'
            textTitle={quantityAvailable} />
          <TextWithSubheading
            containerStyle={infoItemContainer}
            subHeadingStyle={subHeadingStyle}
            textStyle={textStyle}
            subHeadingTitle='Temp'
            textTitle={itemPrice} />

          <View style={buttonContainer}>
            <Button title='Delete' textColor={colors.colorAccent} style={deleteButtonStyle}></Button>
          </View>
        </ScrollView>
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
  gradientStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280
  },
  headerContainer: {
    zIndex: -1
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
    height: 450,
    borderBottomColor: colors.grayTransluscent,
    borderBottomWidth: 1,
    paddingTop: 70,
    justifyContent: 'center'
  },
  imageStyling: {
    width: 280,
    height: 280,
    borderRadius: dimens.defaultBorderRadius,
  },
  itemNameStyle: {
    fontSize: 22,
    marginTop: 18,
    fontFamily: customFonts.bold,
    color: colors.grayBlue,
    textTransform: 'uppercase'
  },
  headerEditContainerStyle: {
    marginRight: dimens.screenHorizontalMargin
  },
  headerEditStyle: {
    fontSize: 16,
    color: colors.facebookBlue
  },
  infoItemContainer: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: colors.grayTransluscent,
    borderBottomWidth: 1
  },
  subHeadingStyle: {
    fontSize: 18,
    fontFamily: customFonts.semiBold,
    color: colors.grayBlue
  },
  textStyle: {
    fontFamily: customFonts.regular,
    fontSize: 16,
    marginTop: 8,
    color: colors.blackTransluscent
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  deleteButtonStyle: {
    marginLeft: 5,
    height: dimens.buttonHeight,
    width: '80%',
    backgroundColor: colors.deleteRed
  }
})

InventoryItemScreen.navigationOptions = {
  header: null
}

export default InventoryItemScreen