import React, { Component } from 'react'; 
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground} from 'react-native'
import { dimens, colors, customFonts, strings } from '../constants'
import { commonStyling } from '../common'
import { Cross } from '../Components';
import {NavigationActions, StackActions} from 'react-navigation'

class SupplierRestaurantScreen extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  
  navigateToSupplierScreen = () => {
    console
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'SupplierWelcomeScreen' })
      ]
    })
    this.props.navigation.dispatch(resetAction);
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
      constainerRestaurantOwnerBG,
      crossStyle
    } = styles

    const {
      navigation
    } = this.props

  
    const screen = 
    <View style={mainContainer}>
      <ImageBackground style={upperHalfContainer} source={require('../assets/Onboarding/supplier.jpg')}>
        <TouchableOpacity 
          style={{...textContainer,...containerSupplyBG}} 
          onPress={() => this.navigateToSupplierScreen()}>
          <Cross style={crossStyle} size={50} color={colors.colorAccent} onPress={() => navigation.goBack()}/>
          <Text style={subText}> {strings.iAmA}</Text>
          <Text style={mainText}> {strings.supplier} </Text>
        </TouchableOpacity>
      </ImageBackground>
      <ImageBackground source={require('../assets/Onboarding/restaurantOwner.jpg')} style={lowerHalfContainer}>
        <TouchableOpacity style={{...textContainer,...constainerRestaurantOwnerBG}}>
          <Text style={subText}> {strings.iOwnA} </Text>
          <Text style={mainText}> {strings.restaurant} </Text>
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
  },
  crossStyle:{
    position: 'absolute',
    right: 20,
    top: 32
  }

})

SupplierRestaurantScreen.navigationOptions = {
  header:null
}

export default SupplierRestaurantScreen


