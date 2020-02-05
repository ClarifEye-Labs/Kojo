import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Modal, Platform, TextInput, ActivityIndicator } from 'react-native'
import { Heading, Icon, InputWithSubHeading, Button } from '../Components'
import { dimens, colors, strings, customFonts } from '../constants'
import { commonStyling } from '../common'
import { PropTypes, string } from 'prop-types'
import iconNames from '../constants/iconNames';
import LottieView from 'lottie-react-native';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import appConfig from '../config/appConfig';


class AddressScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigation: props.navigation,
      name: 'Address Screen',
      addressEntered: '',
      isAddressModalVisible: true,
      addressPlaceholder: 'Enter your warehouse address'
    }
  }

  componentDidMount = () => {
    this.animation.play()
  }

  // ----- ADDRESS MODAL --------
  showAddressModal = () => this.setState({ isAddressModalVisible: true })

  hideAddressModal = () => this.setState({ isAddressModalVisible: false })

  getAddressModal = () => {
    const {
      modalContainerStyle,
      modalContentContainerStyle,
      closeButton,
      addressContentContainer,
      closeText
    } = styles
    return (
      <Modal
        visible={this.state.isAddressModalVisible}
        transparent={true}
        animationType='slide'
        onBackButtonPress={this.closeDeleteModal}>
        <View style={modalContainerStyle}>
          <View style={modalContentContainerStyle}>
            <View>
              <TouchableOpacity style={closeButton} onPress={this.hideAddressModal}>
                <Text style={closeText}>{strings.cancel}</Text>
              </TouchableOpacity>
            </View>

            <View style={addressContentContainer}>
              {this.getAddressAutoCompleteComponent()}
            </View>

          </View>

        </View>


      </Modal>
    )
  }

  getAddressAutoCompleteComponent = () => {
    const {
      addressTextInput,
      addressComponentStyle,
      subHeadingStyle,
      addressScrollingContainer,
      activityIndicatorAddressStyle,
      addressInputContainer,
      closeButtonAddressInput,
    } = styles

    const component =
      <GoogleAutoComplete
        apiKey={appConfig.googleCloudKey}
        debounce={300}
        queryTypes='establishment'>
        {({ inputValue, handleTextChange, locationResults, fetchDetails, isSearching, clearSearch }) => (
          <React.Fragment>
            <View style={addressComponentStyle}>
              <Text style={subHeadingStyle}>{strings.addressModalSubheading}</Text>
              <View style={addressInputContainer}>
                <TextInput
                  style={addressTextInput}
                  value={inputValue}
                  onChangeText={handleTextChange}
                  placeholder={this.state.addressPlaceholder}
                />
                 <Icon
                  nameAndroid={iconNames.crossAndroid}
                  nameIOS={iconNames.crossIOS}
                  onPress={clearSearch}
                  size={38}
                  color={colors.colorPrimary} />
              </View>
              <ScrollView style={addressScrollingContainer} >
                {isSearching
                  ? <ActivityIndicator style={activityIndicatorAddressStyle} size='small' color={colors.grayTransluscent} />
                  : locationResults.map((ai, i) => (
                    this.AddressListItem(ai)
                  ))}
              </ScrollView>
            </View>

          </React.Fragment>
        )}
      </GoogleAutoComplete>

    // <GooglePlacesAutocomplete
    //   placeholder='Search'
    //   minLength={2} // minimum length of text to search
    //   autoFocus={false}
    //   returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
    //   keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
    //   listViewDisplayed='auto'    // true/false/undefined
    //   fetchDetails={true}
    //   renderDescription={row => row.description} // custom description render
    //   onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
    //     console.log(data, details);
    //   }}
    //   getDefaultValue={() => ''}

    //   query={{
    //     // available options: https://developers.google.com/places/web-service/autocomplete
    //     key: appConfig.googelCloudKey,
    //     language: 'en', // language of the results
    //     types: 'establishment' // default: 'geocode'
    //   }}

    //   styles={{
    //     textInputContainer: {
    //       width: '100%'
    //     },
    //     description: {
    //       fontWeight: 'bold'
    //     },
    //     predefinedPlacesDescription: {
    //       color: '#1faadb'
    //     }
    //   }}

    //   currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
    //   currentLocationLabel="Current location"
    //   nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
    //   GoogleReverseGeocodingQuery={{
    //     // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
    //   }}
    //   GooglePlacesSearchQuery={{
    //     // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
    //     rankby: 'distance',
    //     type: 'cafe'
    //   }}

    //   GooglePlacesDetailsQuery={{
    //     // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
    //     fields: 'formatted_address',
    //   }}

    //   filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
    //   predefinedPlaces={[homePlace, workPlace]}

    //   debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    //   renderLeftButton={() => <Text>Cancel</Text>}
    //   renderRightButton={() => <Text>Custom text after the input</Text>}
    // />


    return component
  }

  AddressListItem = (addressItem) => {
    const {
      addressListItemContainer,
      addressItemText
    } = styles

    const addressListItemComponent =
      <View style={addressListItemContainer} key={addressItem.description}>
        <TouchableOpacity>
          <Text numberOfLines={1} ellipsizeMode='tail' style={addressItemText}>{addressItem.description}</Text>
        </TouchableOpacity>
      </View>
    return addressListItemComponent
  }

  render() {
    const {
      mainContainer,
      buttonStyle,
      animationContainerStyle,
      headingContainerStyle,
      subHeadingStyle,
      inputContainerStyle,
      inputContainerTouchableStyle,
      orContainer,
      orStyling,
      thinLine,
      inputAddressTextStyle
    } = styles

    const {
      navigation
    } = this.props
    return (
      <ScrollView style={mainContainer}>
        <Icon nameAndroid={iconNames.crossAndroid} nameIOS={iconNames.crossIOS} size={42} style={commonStyling.crossStyle} />
        <Heading title={strings.addressHeading} containerStyle={headingContainerStyle} />
        <Text style={subHeadingStyle}>{strings.addressSubHeading}</Text>
        <View style={inputContainerStyle}>
          <TouchableOpacity style={inputContainerTouchableStyle} onPress={this.showAddressModal}>
            <Text style={inputAddressTextStyle}>{strings.enterAddress}</Text>
          </TouchableOpacity>
        </View>
        <View style={orContainer}>
          <View style={thinLine} />
          <Text style={orStyling}> {strings.or} </Text>
          <View style={thinLine} />
        </View>

        <Button title={strings.chooseCurrentLocation} style={buttonStyle} textColor={colors.colorAccent} />

        <View style={animationContainerStyle}>
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            onAnimationFinish={null}
            loop={true}
            source={require('../assets/animations/address.json')} />
        </View>

        {this.getAddressModal()}

      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    paddingHorizontal: dimens.screenHorizontalMargin
  },
  subHeadingStyle: {
    fontSize: 12,
    color: colors.colorPrimary,
    fontFamily: customFonts.semiBold,
    marginTop: 30,
    marginLeft: 8,
    marginRight: 8,
    lineHeight: 22,
  },
  headingContainerStyle: {
    marginTop: dimens.screenHorizontalMargin + 80,
  },
  animationContainerStyle: {
    marginTop: 20,
    marginBottom: 40,
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingStyle: {
    color: colors.colorPrimary
  },
  inputContainerStyle: {
    marginHorizontal: 8,
    height: dimens.textInputHeight,
    borderBottomColor: colors.grayTransluscent,
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  inputAddressTextStyle: {
    fontSize: 19,
    color: colors.grayTransluscent,
    fontFamily: customFonts.regular,
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
  },
  inputContainerTouchableStyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  modalContainerStyle: {
    flex: 1,
    backgroundColor: colors.blackTransluscent
  },
  modalContentContainerStyle: {
    flex: 1,
    marginTop: 40,
    backgroundColor: colors.offWhite,
    borderTopLeftRadius: dimens.defaultBorderRadius,
    borderTopRightRadius: dimens.defaultBorderRadius,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: dimens.screenHorizontalMargin
  },
  closeText:{
    color: colors.colorPrimary,
    fontFamily: customFonts.semiBold,
    fontSize: 16
  },
  addressTextInput: {
    width: '100%',
    height: dimens.textInputHeight,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontFamily: customFonts.regular,
    fontSize: 16,
    borderColor: colors.grayTransluscent,
  },
  addressContentContainer: {
    width: '100%',
    height: '100%',
    marginTop: 40
  },
  addressComponentStyle: {
    paddingHorizontal: dimens.screenHorizontalMargin
  },
  addressScrollingContainer: {
    marginTop: 12,
    maxHeight: 250
  },
  activityIndicatorAddressStyle: {
    marginTop: 15,
  },
  addressListItemContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grayTransluscent,
    paddingVertical: 10,
  },
  addressItemText: {
    fontSize: 15,
    fontFamily: customFonts.regular,
  },
  addressInputContainer: {
    flexDirection: 'row',
    width: '95%',
  },
  closeButtonAddressInput: {
    marginRight: dimens.screenHorizontalMargin
  }
})


AddressScreen.navigationOptions = {
  header: null
}

AddressScreen.propTypes = {
  navigation: PropTypes.object
}

export default AddressScreen