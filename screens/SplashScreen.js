import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, ActivityIndicator } from 'react-native'
import { LogoPlaceholder, Loading, Button } from '../Components'
import { dimens, colors, customFonts } from '../constants'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'
import screens from '../constants/screens'
import firebase from '../config/firebase'
import {NavigationActions, StackActions} from 'react-navigation'
import collectionNames from '../config/collectionNames';

class SplashScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'SplashScreen',
      navigation: props.navigation,
      user: undefined,
      userExists: false,
      supplierRestaurantSelected: false,
      phoneEntered: false, 

    }
  }

  dispatchScreen = (screenName) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: screenName })
      ]
    })
    setTimeout(()=>this.state.navigation.dispatch(resetAction), 2000);
  }

  navigateToScreenLogic = async () => {
    const user = firebase.auth().currentUser
    const firestore = firebase.firestore()

    if(user) {
      const userRef = firestore.collection(collectionNames.users)
      const userID = user.uid
      let userFirestore = null
  
      await userRef.doc(userID).get().then( (doc) => doc.exists ? userFirestore = doc.data() : null )
  
      const {role} = userFirestore
      if(!role){
        this.dispatchScreen(screens.SupplierRestaurantScreen)
      }else{
        console.log('Check for phone number etc. ')
      }
    }else{
      this.dispatchScreen(screens.WelcomeScreen)
    }
  }

  render() {
    const {
      mainContainer,
      overlayStyle,
      logoStyle,
      loadingStyle,
      loadingContainer
    } = styles

    const {
      navigation
    } = this.props

    this.navigateToScreenLogic()

    return (
      <ImageBackground
        style={mainContainer}
        imageStyle={{ paddingLeft: 120 }}
        source={require('../assets/Splash/splashScreen.jpg')}>
        <View style={overlayStyle}>
          <LogoPlaceholder style={logoStyle} />
          <View style={loadingContainer}>
            <ActivityIndicator style={loadingStyle} size='large' color={colors.colorAccent} />
          </View>
          <Button onPress={ () => {firebase.auth().signOut()} } title='Sign Out' textColor={colors.colorAccent}  ></Button>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer
  },
  overlayStyle: {
    backgroundColor: colors.colorPrimaryTransluscent,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    width: dimens.logoWidthOnboarding,
    height: dimens.logoHeightOnboarding,
    borderColor: colors.colorAccent,
    borderWidth: 1,
  },
  loadingStyle: {
    fontSize: 50
  },
  loadingContainer: {
    marginTop: 40,
  }
})

SplashScreen.navigationOptions = {
  header: null
}

SplashScreen.propTypes = {
  navigation: PropTypes.object
}

export default SplashScreen