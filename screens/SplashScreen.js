import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native'
import { LogoPlaceholder } from '../Components'
import { dimens, colors } from '../constants'
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
  unsubscribeListener = null;
  constructor(props) {
    super(props)
    // this.props.watchFirebaseAuthUser();
    // this.props.watchUserFirestoreData();
  }

  componentDidMount = () => {
    this.navigateToScreenLogic()
  }

  componentWillUnmount = () => {
    this.unsubscribeListener()
  }


  navigateToScreenLogic = async () => {
    const firestore = firebase.firestore()
    this.unsubscribeListener = firebase.auth().onAuthStateChanged( async user => {
      if (user) {
        const userRef = firestore.collection(collectionNames.users)
        const userID = user.uid
        let userFirestore = null
        await userRef.doc(userID).get().then( (doc) => doc.exists ? userFirestore = doc.data() : null )
        //if user has been deleted from our database then reinit the entire thing
        if (userFirestore) {
          const screenToDispatch = Utils.screenToLoadForUser(userFirestore)
          Utils.dispatchScreen(screenToDispatch, 1000, this.props.navigation)
        }
        else {
          await firebase.auth().signOut()
          Utils.dispatchScreen(screens.WelcomeScreen, 1000, this.props.navigation)
        }
      }
      else {
        //no user signed in 
        Utils.dispatchScreen(screens.WelcomeScreen, 2000, this.props.navigation)
      }
    })
  }

  render() {
    const {
      mainContainer,
      overlayStyle,
      logoStyle,
      loadingStyle,
      loadingContainer,
    } = styles;

    return (
      <ImageBackground
        style={mainContainer}
        imageStyle={{ paddingLeft: 120 }}
        source={require("../assets/Splash/splashScreen.jpg")}
      >
        <View style={overlayStyle}>
          <LogoPlaceholder style={logoStyle} />
          <View style={loadingContainer}>
            <ActivityIndicator
              style={loadingStyle}
              size="large"
              color={colors.colorAccent}
            />
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

const mapDispatchToProps = (dispatch) => ({
  watchFirebaseAuthUser: () => {
    dispatch(watchFirebaseAuthUser());
  },
  watchUserFirestoreData: () => {
    dispatch(watchUserFirestoreData());
  },
  userLogOut: () => {
    dispatch(userLogOut());
  },
});

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
  },
  overlayStyle: {
    backgroundColor: colors.colorPrimaryTransluscent,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoStyle: {
    width: dimens.logoWidthOnboarding,
    height: dimens.logoHeightOnboarding,
    borderColor: colors.colorAccent,
    borderWidth: 1,
  },
  loadingStyle: {
    fontSize: 50,
  },
  loadingContainer: {
    marginTop: 40,
  },
});

SplashScreen.navigationOptions = {
  header: null,
};

SplashScreen.propTypes = {
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
