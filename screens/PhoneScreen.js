import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Text,
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Modal    
} from 'react-native'
import { Back, Edit, Card, TextWithSubheading, Button, Cross } from '../Components'
import { LinearGradient } from 'expo-linear-gradient';
import { dimens, colors, customFonts, strings, screens } from '../constants'
import { commonStyling } from '../common' 
import {PropTypes} from 'prop-types'
import firebase from '../config/firebase'
import LottieView from 'lottie-react-native';

class PhoneScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: 'Phone Screen'
    }
  }
  componentDidMount() {
    this.animation.play();
  }
  render() {
    const {
      mainContainer,
      itemNameStyle,
      editButton,
      imageContainer,
      imageStyling,
      gradientStyle,
      headerContainer,
      infoItemContainer,
      subHeadingStyle,
      textStyle,
      buttonContainer,
      deleteButtonStyle,
      headingStyle,
      expandedHeaderContainerStyle
    } = styles

    const {
      navigation
    } = this.props

    return (
      <View style={mainContainer}>
      <Back size={34} style={commonStyling.backButtonStyling} color={colors.colorAccent} onPress={() => navigation.goBack()} />
      <View style={headerContainer}>
          <LinearGradient
            colors={[colors.colorPrimary, colors.colorSecondary]}
            style={gradientStyle}>
            <Text style={headingStyle}>Phone Number</Text>
          </LinearGradient>
          <View style={imageContainer}>
            <View width={200} height={200} elevation={dimens.defaultElevation + 10} >
            <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            onAnimationFinish={null}
            loop={false}
            source={require('../assets/animations/phone.json')} 
            width = {200}
            height = {200}
            />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer
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
  editButton: {
    position: 'absolute',
    right: dimens.screenHorizontalMargin,
    marginTop: 44
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 450,
    borderBottomColor: colors.grayTransluscent,
    borderBottomWidth: 1,
    paddingTop: 100,
    justifyContent: 'center'
  },
  imageStyling: {
    width: 280,
    height: 280,
    borderRadius: dimens.defaultBorderRadius,
  },
  itemNameStyle: {
    fontSize: 22,
    marginTop: 18,
    fontFamily: customFonts.bold,
    color: colors.grayBlue,
    textTransform: 'uppercase'
  },
  headerEditContainerStyle: {
    marginRight: dimens.screenHorizontalMargin
  },
  headerEditStyle: {
    fontSize: 16,
    color: colors.facebookBlue
  },
  infoItemContainer: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: colors.grayTransluscent,
    borderBottomWidth: 1
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
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  deleteButtonStyle: {
    marginLeft: 5,
    height: dimens.buttonHeight,
    width: '80%',
    backgroundColor: colors.deleteRed
  },
  modalContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.blackTransluscent,
    alignItems: 'center'
  },
  modalContentContainerStyle: {
    width: 320,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.colorAccent,
    borderRadius: dimens.defaultBorderRadius
  },
  crossStyle: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  textContainerModal: {
    flexDirection: 'column',
    height: 100,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingModalStyle: {
    fontSize: 23,
    textAlign: 'center',
    fontFamily: customFonts.semiBold,
    color: colors.grayBlue
  },
  itemNameModal: {
    fontSize: 23,
    width: 290,
    textAlign: 'center',
    fontFamily: customFonts.semiBold,
    color: colors.colorPrimary,
    marginTop: 8
  },
  modalButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteButtonModal: {
    width: 250,
    marginTop: 20,
    height: dimens.buttonHeight,
    backgroundColor: colors.deleteRed
  },
  cancelButtonModal: {
    width: 250,
    marginTop: 10,
    height: dimens.buttonHeight,
    backgroundColor: colors.facebookBlue
  },
  expandedHeaderContainerStyle: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'absolute'
  },
  headingStyle: {
    fontSize: 30,
    fontFamily: customFonts.semiBold,
    color: colors.colorAccent,
    marginTop: dimens.screenSafeUpperNotchDistance + 80,
    width: '100%',
    textAlign: 'center',
    paddingLeft: dimens.screenHorizontalMargin
  }

})

PhoneScreen.navigationOptions = {
  header: null
}

PhoneScreen.propTypes = {
  navigation: PropTypes.object
}

export default PhoneScreen