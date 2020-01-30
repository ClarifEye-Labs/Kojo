import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { Heading, Icon, InputWithSubHeading, Button } from '../Components'
import { dimens, colors, strings, customFonts } from '../constants'
import { commonStyling } from '../common'
import { PropTypes, string } from 'prop-types'
import iconNames from '../constants/iconNames';
import LottieView from 'lottie-react-native'

class AddressScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      name: 'Address Screen',
      addressEntered: ''
    }
  }

  componentDidMount = () => {
    this.animation.play()
  }
  render() {
    const {
      mainContainer,
      buttonStyle,
      animationContainerStyle,
      headingContainerStyle,
      subHeadingStyle,
      inputContainerStyle,
      orContainer,
      orStyling,
      thinLine
    } = styles

    const {
      navigation
    } = this.props
    return (
      <View style={mainContainer}>
        <Icon nameAndroid={iconNames.crossAndroid} nameIOS={iconNames.crossIOS} size={50} style={commonStyling.crossStyle} />
        <Heading title={strings.addressHeading} containerStyle={headingContainerStyle} />
        <Text style={subHeadingStyle}>{strings.addressSubHeading}</Text>
        <InputWithSubHeading
          containerStyle={inputContainerStyle}
          subHeadingTitle={strings.enterAddress}
          placeholder={strings.enterAddress} />
        <View style={orContainer}>
          <View style={thinLine} />
          <Text style={orStyling}> or </Text>
          <View style={thinLine} />
        </View>

        <Button title={strings.chooseCurrentLocation} style={buttonStyle} textColor={colors.colorAccent} />

        <View style={animationContainerStyle}>
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            onAnimationFinish={null}
            loop={false}
            source={require('../assets/animations/address.json')} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    paddingHorizontal: dimens.screenHorizontalMargin
  },
  subHeadingStyle: {
    fontSize: 16,
    color: colors.colorPrimary,
    fontFamily: customFonts.semiBold,
    marginTop: 12,
    marginLeft: 8,
    marginRight: 8,
    lineHeight: 22,
  },
  headingContainerStyle: {
    marginTop: dimens.screenHorizontalMargin + 80,
  },
  animationContainerStyle: {
    marginTop: 40,
    marginBottom: 40,
    width: '100%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingStyle: {
    color: colors.colorPrimary
  },
  inputContainerStyle: {
    marginHorizontal: 8,
    marginTop: 40
  },
  orStyling: {
    color: colors.blackTransluscent,
    fontSize: 18,
    marginHorizontal: 10,
    fontFamily: customFonts.regular
  },
  orContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 40
  },
  thinLine: {
    height: dimens.thinLine,
    backgroundColor: colors.grayTransluscent,
    width: '28%'
  },
  buttonStyle: {
    backgroundColor: colors.colorPrimary,
    width: '100%',
    marginTop: 40
  }
})

AddressScreen.navigationOptions = {
  header: null
}

AddressScreen.propTypes = {
  navigation: PropTypes.object
}

export default AddressScreen