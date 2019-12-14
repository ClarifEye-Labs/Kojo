import React from 'react'
import { View, StyleSheet, SafeAreaView, Text, Image, ImageBackground} from 'react-native'
import { BlackOverlay } from '../Components'
import { NavBar} from 'galio-framework'
import { dimens, colors } from '../constants'

const SupplierRestaurantScreen = (props) => {  
  const{ 
    restaurantOwnerCard, 
    mainContainer,
    textStyle,
    textContainer,
    supplierCard} = styles
  return(
      <View style={mainContainer}>
        <ImageBackground source={require('../assets/landing/1.jpg')} style={supplierCard}>
          <BlackOverlay>
            <View style={textContainer}> 
              <Text style={textStyle}>I am a Supplier.</Text>
            </View>
          </BlackOverlay>
        </ImageBackground>
        <ImageBackground source={require('../assets/landing/2.jpg')} style={restaurantOwnerCard}>
          <BlackOverlay>
            <View style={textContainer}> 
              <Text style={textStyle}>I am a Restaurant Owner.</Text>
            </View>
          </BlackOverlay>
        </ImageBackground>
      </View>
        
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    width:'100%',
    height: '100%'
  },
  supplierCard: {
    flex: 1
  },
  restaurantOwnerCard:{
    flex: 1
  },
  subTextStyle:{
    width: '100%',
    textAlign: 'center'
  },
  textStyle:{
    color: colors.colorPrimary,
    fontSize: 23,
    textAlign: 'center',
    fontFamily: 'open-sans-bold'
  },
  textContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  }
})

export default SupplierRestaurantScreen

