import React, { Component } from 'react'; 
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground} from 'react-native'
import { dimens, colors, customFonts } from '../constants'
import { commonStyling } from '../common'

class SupplierRestaurantScreen extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render() {
    const {
      mainContainer,
      upperHalfContainer,
      lowerHalfContainer,
      subText,
      mainText,
      textContainer,
      containerSupplyBG,
      constainerRestaurantOwnerBG
    } = styles
  
    const screen = 
    <View style={mainContainer}>
      <ImageBackground style={upperHalfContainer} source={require('../assets/Onboarding/supplier.jpg')}>
        <TouchableOpacity style={{...textContainer,...containerSupplyBG}}>
          <Text style={subText}> I am a </Text>
          <Text style={mainText}> Supplier </Text>
        </TouchableOpacity>
      </ImageBackground>
      <ImageBackground source={require('../assets/Onboarding/restaurantOwner.jpg')} style={lowerHalfContainer}>
        <TouchableOpacity style={{...textContainer,...constainerRestaurantOwnerBG}}>
          <Text style={subText}> I own a </Text>
          <Text style={mainText}> Restaurant </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  
    return screen
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    flexDirection: 'column'
  },
  upperHalfContainer: {
    flex:1,
    backgroundColor: 'black'
  },
  lowerHalfContainer: {
    flex: 1
  },
  subText:{
    fontSize: 28,
    color: colors.colorAccent,
    fontFamily: customFonts.bold,
    position: 'absolute',
    left: 20,
    top: 40
  },
  mainText: {
    fontSize: 60,
    fontFamily: customFonts.extraBold,
    color: colors.colorAccent
  },
  textContainer: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerSupplyBG:{
    backgroundColor: colors.colorPrimaryTransluscent
  },
  constainerRestaurantOwnerBG:{
    backgroundColor: colors.blackTransluscent
  }

})

SupplierRestaurantScreen.navigationOptions = {
  header:null
}

export default SupplierRestaurantScreen


