import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import { dimens, colors, customFonts, strings, screens, iconNames } from '../constants'
import { commonStyling } from '../common'
import { LinearGradient } from 'expo-linear-gradient';
import { PropTypes } from 'prop-types'
import firebase from '../config/firebase'
import { Loading, TextWithSubheading, Button, Icon } from '../Components';
import Utils from '../utils/Utils';
import { connect } from 'react-redux'
import { watchFirebaseAuthUser, watchUserFirestoreData } from '../redux/actions/watchUserData'
import { userLogOut } from '../redux/app-redux'

class ProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.props.watchFirebaseAuthUser();
    this.props.watchUserFirestoreData();
    this.state = {
      navigation: props.navigation,
      user: firebase.auth().currentUser,
      userNameInitials: null,
      loading: true,
      userAddress: null,
      userPhone: null,
      userRole: null,
      userName: null,
      userEmail: null,
      signOutButtonLoading: false,
      userData: this.props.userFirestoreData
    }
  }

  fetchUserDetialsFromOurDB = async () => {
    const userData = this.props.userFirestoreData
    if (userData) {
      const userInitialsArray = userData.name.split(' ').map((name) => name[0])
      this.setState({
        userAddress: userData.address.formattedName,
        userPhone: userData.phone.number,
        userRole: userData.role,
        userName: userData.name,
        userEmail: userData.email,
        userNameInitials: (userInitialsArray[0] + userInitialsArray[userInitialsArray.length - 1]).toUpperCase(),
        loading: false
      })

    }
    else {
      console.log('No such document')
    }
  }


  signOutUser = async () => {
    this.setState({
      signOutButtonLoading: true
    })
    this.props.userLogOut()
    // await firebase.auth().signOut()
    Utils.dispatchScreen(screens.WelcomeScreen, 1000, this.props.navigation)
  }

  componentDidMount = () => {
    this.fetchUserDetialsFromOurDB()
  }

  static getDerivedStateFromProps(props, state) {
    if (props.userFirestoreData !== state.userFirestoreData) {
      const userData = props.userFirestoreData
      if (userData) {
        const userInitialsArray = userData.name.split(' ').map((name) => name[0])
        state.userAddress = userData.address.formattedName
        state.userPhone = userData.phone.number
        state.userRole = userData.role
        state.userName = userData.name
        state.userEmail = userData.email
        state.userNameInitials = (userInitialsArray[0] + userInitialsArray[userInitialsArray.length - 1]).toUpperCase()
        state.loading = false
      }
    }
    else {
      console.log('No such document')
    }
    return state
  }


  render() {
    const {
      mainContainer,
      gradientStyle,
      headerContainer,
      profileIconContainer,
      profileIconText,
      fullNameText,
      infoItemContainer,
      subHeadingStyle,
      textStyle,
      buttonContainer,
      signOutButton,
      scrollView,
      rowContainer,
      editIcon,
      editIconText
    } = styles

    const {
      navigation
    } = this.props

    const loadingScreen =
      <Loading size={32}
        color={colors.grayBlue}
        textColor={colors.grayBlue}
        textStyle={{ fontSize: 20, fontFamily: customFonts.regular }} />

    const mainContent =
      <View style={mainContainer}>
        <View style={headerContainer}>
          <LinearGradient
            colors={[colors.colorPrimary, colors.colorSecondary]}
            style={gradientStyle}>
          </LinearGradient>
          <View style={profileIconContainer}>
            <Text style={profileIconText}>{this.state.userNameInitials}</Text>
          </View>
          <Text style={fullNameText}>{this.state.userName}</Text>
        </View>

        <ScrollView style={scrollView}>
          <View style={rowContainer}>
            <TouchableOpacity style={editIcon} onPress={() => this.props.navigation.navigate(screens.EditEmailScreen)}>
              <Text style={editIconText}>{strings.edit}</Text>
            </TouchableOpacity>
            <TextWithSubheading
              containerStyle={infoItemContainer}
              subHeadingStyle={subHeadingStyle}
              textStyle={textStyle}
              subHeadingTitle={strings.registeredEmail}
              textTitle={this.state.userEmail ? this.state.userEmail : strings.pleaseProvideThis} />
          </View>
          <View style={rowContainer}>
            <TouchableOpacity style={editIcon} onPress={() => this.props.navigation.navigate(screens.AddressScreen)} >
              <Text style={editIconText}>{strings.edit}</Text>
            </TouchableOpacity>
            <TextWithSubheading
              containerStyle={infoItemContainer}
              subHeadingStyle={subHeadingStyle}
              textStyle={textStyle}
              subHeadingTitle={strings.address}
              textTitle={this.state.userAddress ? this.state.userAddress : strings.pleaseProvideThis} />
          </View>
          <View style={rowContainer}>
            <TouchableOpacity style={editIcon} onPress={() => this.props.navigation.navigate(screens.PhoneScreen)}>
              <Text style={editIconText}>{strings.edit}</Text>
            </TouchableOpacity>
            <TextWithSubheading
              containerStyle={infoItemContainer}
              subHeadingStyle={subHeadingStyle}
              textStyle={textStyle}
              subHeadingTitle={strings.phone}
              textTitle={this.state.userPhone ? this.state.userPhone : strings.pleaseProvideThis} />
          </View>

          <View style={buttonContainer}>
            <Button style={signOutButton} textColor={colors.colorAccent} title={strings.signOut} isLoading={this.state.signOutButtonLoading} onPress={this.signOutUser} />
          </View>

        </ScrollView>
      </View>

    const componentToRender = this.state.loading ? loadingScreen : mainContent
    return componentToRender
  }
}

const mapStateToProps = state => ({
  firebaseAuthUser: state.userDetailsReducer.firebaseAuthUser,
  userFirestoreData: state.userDetailsReducer.userFirestoreData
});






// const ActionCreators = Object.assign(
//   {},
//   watchFirebaseAuthUser,
//   watchUserFirestoreData
// );

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(ActionCreators, dispatch),
// })

const mapDispatchToProps = dispatch => ({
  watchFirebaseAuthUser: () => { dispatch(watchFirebaseAuthUser()) },
  watchUserFirestoreData: () => { dispatch(watchUserFirestoreData()) },
  userLogOut: () => { dispatch(userLogOut()) }
})

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
  },
  gradientStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280
  },
  headerContainer: {
    zIndex: -1,
    height: 280,
    paddingTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconContainer: {
    backgroundColor: colors.colorAccent,
    borderRadius: 120,
    width: 150,
    height: 150,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 0.8 * 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileIconText: {
    fontSize: 40,
    fontFamily: customFonts.bold,
    color: colors.colorPrimary
  },
  fullNameText: {
    fontSize: 22,
    fontFamily: customFonts.medium,
    color: colors.colorAccent,
    marginTop: 12
  },
  infoItemContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: -1
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  signOutButton: {
    backgroundColor: colors.deleteRed,
    width: '85%'
  },
  scrollView: {
    paddingTop: 20
  },
  rowContainer: {
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 4,
    borderBottomColor: colors.grayTransluscent,
    borderBottomWidth: 1
  },
  editIcon: {
    position: 'absolute',
    right: 20,
    top: 14
  },
  editIconText: {
    color: colors.facebookBlue,
    fontSize: 15,
    fontFamily: customFonts.regular
  }
})

ProfileScreen.navigationOptions = {
  header: null
}

ProfileScreen.propTypes = {
  navigation: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)