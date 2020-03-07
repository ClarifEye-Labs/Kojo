import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ImageBackground,
  TouchableOpacity } from 'react-native'
import { dimens, colors, customFonts } from '../constants'
import { commonStyling } from '../common' 
import Card from './Card';

export default  class WelcomeItem extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render() {
    const {
      mainContainer,
      cardTitleTextStyle,
      cardContentStyle,
      imageBackgroundStyle
    } = styles


    const {
      backgroundImage,
      textColor,
      cardTitle,
      backgroundColorOverlay,
      onPress
    } = this.props

    return (
      <View style={mainContainer}>
        <Card 
          width='90%'
          height={270}
          elevation={dimens.defaultElevation}>
          <ImageBackground 
            imageStyle={imageBackgroundStyle}
            style={imageBackgroundStyle}
            source={backgroundImage}>
              <TouchableOpacity style={
                {
                  ...cardContentStyle, 
                  backgroundColor: backgroundColorOverlay
                }} 
                onPress={onPress}>
                <Text style={
                  {
                    ...cardTitleTextStyle,
                    color: textColor
                  }}> {cardTitle}</Text>
              </TouchableOpacity>
          </ImageBackground>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {  
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8
  },
  cardTitleTextStyle:{
    fontFamily: customFonts.bold,
    fontSize: 30
  },
  imageBackgroundStyle:{
    borderRadius: dimens.defaultBorderRadius
  },
  cardContentStyle:{
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: dimens.defaultBorderRadius
  }
})
