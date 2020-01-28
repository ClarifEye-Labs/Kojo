import React, { Component } from 'react'; 
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground} from 'react-native'
import { dimens, colors, customFonts, strings } from '../constants'
import { commonStyling } from '../common'
import { Cross } from '../Components';
import {NavigationActions, StackActions} from 'react-navigation'
import firebase from '../config/firebase'
import screens from '../constants/screens';
import appConfig from '../config/appConfig';
import collectionNames from '../config/collectionNames';

class SupplierRestaurantScreen extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  
  navigateToScreen = async (screen) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: screen })
      ]
    })

    const user = firebase.auth().currentUser
    const uid = user.uid
    const userRef = firebase.firestore().collection(collectionNames.users)

    if(screen === screens.SupplierWelcomeScreen) {
      let role = appConfig.userRoleSupplier
      await userRef.doc(uid).update({
        role: role
      })
      this.props.navigation.dispatch(resetAction);
    }else{
      let role = appConfig.userRoleRestaurantOwner
      await userRef.doc(uid).update({
        role: role
      })
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
      constainerRestaurantOwnerBG,
      crossStyle
    } = styles

    const {
      navigation
    } = this.props

    console.log(firebase.auth().currentUser)
  
    const screen = 
    <View style={mainContainer}>
      <ImageBackground style={upperHalfContainer} source={require('../assets/Onboarding/supplier.jpg')}>
        <TouchableOpacity 
          style={{...textContainer,...containerSupplyBG}} 
          onPress={() => this.navigateToScreen(screens.SupplierWelcomeScreen, )}>

          <Text style={subText}> {strings.iAmA}</Text>
          <Text style={mainText}> {strings.supplier} </Text>
        </TouchableOpacity>
      </ImageBackground>
      <ImageBackground source={require('../assets/Onboarding/restaurantOwner.jpg')} style={lowerHalfContainer}>
        <TouchableOpacity 
          style={{...textContainer,...constainerRestaurantOwnerBG}}
          onPress={ ()=> this.navigateToScreen(null) }>
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


