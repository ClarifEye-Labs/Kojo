import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native'
import { Confirm, Back, Heading, InputWithSubHeading, Button, Card, Edit } from '../Components'
import { dimens, colors, customFonts } from '../constants'
import { commonStyling } from '../common'
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

class EditItemScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Edit Item Screen',
      item: this.props.navigation.getParam('item'),
      newItemName: 'Milk',
      newItemPrice: 200,
      newItemCategory: 'Liquid'
    }
  }

  setItemName = (name) => {
    this.setState({
      newItemName: name
    })
  }

  setItemPrice = (price) => {
    if(price.length !== 0 ){
      this.setState({
        newItemPrice: parseInt(price)
      })
    }else{
      this.setState({
        newItemPrice: ''
      })
    }
  }

  setItemCategory = (category) => {
    this.setState({
      newItemCategory: category
    })
  }

  render() {
    const {
      mainContainer,
      confirmStyle,
      contentContainerStyle,
      headingContainerStyle,
      topButtonsContainer,
      textContentContainerStyle,
      textInputContainerStyle,
      confirmButtonStyle,
      buttonContainer,
      headerContainer,
      gradientStyle,
      imageContainer,
      imageStyling,
      imageEditOverlay,
      editImageIcon
    } = styles

    const itemName = 'Milk'
    const itemImageURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQdQSfIj7XNtCjG7SH0AKUvOsz6sXkP9NiLZBUF_1ujrYM3A9B3'
    const itemPrice = 200
    const itemCategory = 'Liquids'

    const {
      navigation
    } = this.props

    return (
      <View style={mainContainer}>
         <View style={headerContainer}>
          <LinearGradient
            colors={[colors.colorPrimary, colors.colorSecondary]}
            style={gradientStyle}>
          </LinearGradient>
          <View style={imageContainer}>
            <Card width={280} height={280} elevation={dimens.defaultElevation + 10} >
              <ImageBackground style={imageStyling} imageStyle={imageStyling} source={{ uri: itemImageURL }}>
                <View style={imageEditOverlay}>
                  <Edit style={editImageIcon} color={colors.colorAccent} size={32} />
                </View>
              </ImageBackground>
            </Card>
          </View>
        </View>

        <View style={topButtonsContainer}>
          <Confirm style={confirmStyle} size={55} color={colors.colorAccent} />
          <Back color={colors.colorAccent} style={commonStyling.backButtonStyling} size={34} onPress={ () => navigation.goBack() }/>
        </View>

        <View style={contentContainerStyle}>
          <Heading containerStyle={headingContainerStyle} title='Edit item' />
        </View>

        <ScrollView style={textContentContainerStyle}>
          <InputWithSubHeading 
            subHeadingTitle='Item Name'
            containerStyle={textInputContainerStyle}
            inputValue={this.state.newItemName}
            onChangeText={this.setItemName} />

          <InputWithSubHeading 
            subHeadingTitle='Item Price'
            keyboardType='numeric'
            containerStyle={textInputContainerStyle}
            inputValue={this.state.newItemPrice.toString()}
            onChangeText={this.setItemPrice} />

          <InputWithSubHeading 
            subHeadingTitle='Item Category'
            inputValue={this.state.newItemCategory}
            containerStyle={textInputContainerStyle}
            onChangeText={this.setItemCategory} />

          <InputWithSubHeading 
            subHeadingTitle='Temp'
            inputValue={this.state.newItemName}
            containerStyle={textInputContainerStyle}
            onChangeText={this.setItemName} />

          <View style={buttonContainer}>
            <Button 
              title='Confirm' 
              textColor={colors.colorAccent}
              style={confirmButtonStyle}/>
          </View>

          
        </ScrollView>

       
      
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
  },
  confirmStyle: {
    position: 'absolute',
    right: 20,
    top: dimens.screenSafeUpperNotchDistance + 10
  },
  contentContainerStyle: {
    marginTop: 25,
  },
  headingContainerStyle: {
    width: '100%',
    textAlign: 'left',
    marginLeft: dimens.screenHorizontalMargin
  },
  topButtonsContainer:{
    width: '100%',
    height: 100,
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0
  },
  textContentContainerStyle: {
    marginLeft: dimens.screenHorizontalMargin,
    marginRight: dimens.screenHorizontalMargin,
    padding: 8
  },
  textInputContainerStyle: {
    marginTop: 20,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  confirmButtonStyle: {
    width: 320,
    height: dimens.buttonHeight, 
    marginHorizontal: dimens.screenHorizontalMargin,
    marginRight: dimens.screenHorizontalMargin,
    backgroundColor: colors.colorSecondary
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
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 350,
    paddingTop: 70,
    justifyContent: 'center'
  },
  imageStyling: {
    width: 280,
    height: 280,
    borderRadius: dimens.defaultBorderRadius,
  },
  imageEditOverlay: {
    height: 45,
    borderBottomEndRadius: dimens.defaultBorderRadius,
    borderBottomStartRadius: dimens.defaultBorderRadius,
    backgroundColor: colors.blackTransluscent,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    right: 0
  },
  editImageIcon: {
    position: 'absolute',
    right: dimens.screenHorizontalMargin,

  }
})

EditItemScreen.navigationOptions = {
  header: null
}

export default EditItemScreen