import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, ActivityIndicator } from 'react-native'
import { LogoPlaceholder, Loading, Button } from '../Components'
import { dimens, colors, customFonts } from '../constants'
import { commonStyling } from '../common'
import { PropTypes } from 'prop-types'
import screens from '../constants/screens'
import firebase from '../config/firebase'
import collectionNames from '../config/collectionNames';
import Utils from '../utils/Utils';
import { connect } from 'react-redux'
import { watchFirebaseAuthUser, watchUserFirestoreData } from '../redux/actions/watchUserData'
import { userLogOut } from '../redux/app-redux'
import { bindActionCreators } from 'redux';


class SplashScreen extends Component {
  constructor(props) {
    super(props)
    // this.props.watchFirebaseAuthUser();
    // this.props.watchUserFirestoreData();
    this.state = {
      navigation: props.navigation,
      user: undefined,
      userExists: false,
      supplierRestaurantSelected: false,
      phoneEntered: false,
      navigateToScreenLogic: this.navigateToScreenLogic
    }
  }



  componentDidMount = () => {
    this.navigateToScreenLogic()
  }


  navigateToScreenLogic = async () => {
    const user = firebase.auth().currentUser
    console.log("user", user)
    const firestore = firebase.firestore()
    if (user) {
      const userRef = firestore.collection(collectionNames.users)
      const userID = user.uid
      let userFirestore = null
      await userRef.doc(userID).get().then((doc) => doc.exists ? userFirestore = doc.data() : null)
      //if user has been deleted from our database then reinit the entire thing
      if (userFirestore) {
        const screenToDispatch = Utils.screenToLoadForUser(userFirestore)
        Utils.dispatchScreen(screenToDispatch, 1000, this.state.navigation)
      }
      else {
        // await firebase.auth().signOut()
        this.props.userLogOut()
        console.log('User has been deleted from our database')
        Utils.dispatchScreen(screens.WelcomeScreen, 1000, this.state.navigation)
      }
    }
    else {
      //no user signed in 
      Utils.dispatchScreen(screens.WelcomeScreen, 2000, this.state.navigation)
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
        </View>
      </ImageBackground>
    );
  }


}

const mapStateToProps = state => ({
  firebaseAuthUser: state.userDetailsReducer.firebaseAuthUser,
  userFirestoreData: state.userDetailsReducer.userFirestoreData
});

const mapDispatchToProps = dispatch => ({
  watchFirebaseAuthUser: () => { dispatch(watchFirebaseAuthUser()) },
  watchUserFirestoreData: () => { dispatch(watchUserFirestoreData()) },
  userLogOut: () => { dispatch(userLogOut()) }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)