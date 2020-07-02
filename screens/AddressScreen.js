import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Heading, Icon, InputWithSubHeading, Button } from "../Components";
import { dimens, colors, strings, customFonts } from "../constants";
import { commonStyling } from "../common";
import { PropTypes, string } from "prop-types";
import iconNames from "../constants/iconNames";
import LottieView from "lottie-react-native";
import { GoogleAutoComplete } from "react-native-google-autocomplete";
import appConfig from "../config/appConfig";
import firebase from "../config/firebase";
import collectionNames from "../config/collectionNames";
import Utils from "../utils/Utils";
import screens from "../constants/screens";
import * as Animatable from "react-native-animatable";

class AddressScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      addressEntered: strings.enterAddress,
      isAddressModalVisible: false,
      addressPlaceholder: "Enter your warehouse address",
    };
  }

  // ----- ADDRESS MODAL --------
  showAddressModal = () => this.setState({ isAddressModalVisible: true });

  hideAddressModal = () => this.setState({ isAddressModalVisible: false });

  getAddressModal = () => {
    const {
      modalContainerStyle,
      modalContentContainerStyle,
      closeButton,
      addressContentContainer,
      closeText,
    } = styles;
    return (
      <Modal
        visible={this.state.isAddressModalVisible}
        transparent={true}
        animationType="slide"
        onBackButtonPress={this.closeDeleteModal}
      >
        <View style={modalContainerStyle}>
          <View style={modalContentContainerStyle}>
            <View>
              <TouchableOpacity
                style={closeButton}
                onPress={this.hideAddressModal}
              >
                <Text style={closeText}>{strings.cancel}</Text>
              </TouchableOpacity>
            </View>

            <View style={addressContentContainer}>
              {this.getAddressAutoCompleteComponent()}
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  getAddressAutoCompleteComponent = () => {
    const {
      addressTextInput,
      addressComponentStyle,
      subHeadingStyle,
      addressScrollingContainer,
      activityIndicatorAddressStyle,
      addressInputContainer,
      closeButtonAddressInput,
    } = styles;

    const component = (
      <GoogleAutoComplete
        apiKey={appConfig.googleCloudKey}
        debounce={300}
        queryTypes="establishment"
      >
        {({
          inputValue,
          handleTextChange,
          locationResults,
          fetchDetails,
          isSearching,
          clearSearch,
        }) => (
          <React.Fragment>
            <View style={addressComponentStyle}>
              <Text style={subHeadingStyle}>
                {strings.addressModalSubheading}
              </Text>
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
                  color={colors.colorPrimary}
                />
              </View>
              <ScrollView style={addressScrollingContainer}>
                {isSearching ? (
                  <ActivityIndicator
                    style={activityIndicatorAddressStyle}
                    size="small"
                    color={colors.grayTransluscent}
                  />
                ) : (
                  locationResults.map((ai, i) =>
                    this.AddressListItem(ai, fetchDetails)
                  )
                )}
              </ScrollView>
            </View>
          </React.Fragment>
        )}
      </GoogleAutoComplete>
    );
    return component;
  };

  AddressListItem = (addressItem, fetchDetails) => {
    const { addressListItemContainer, addressItemText } = styles;

    const addressListItemComponent = (
      <View style={addressListItemContainer} key={addressItem.description}>
        <TouchableOpacity
          onPress={() =>
            this.handleAddressListItemClick(addressItem, fetchDetails)
          }
        >
          <Text numberOfLines={1} ellipsizeMode="tail" style={addressItemText}>
            {addressItem.description}
          </Text>
        </TouchableOpacity>
      </View>
    );
    return addressListItemComponent;
  };

  handleAddressListItemClick = async (addressItem, fetchDetails) => {
    const res = await fetchDetails(addressItem.place_id);
    let place = undefined;

    this.hideAddressModal(); //hide the modal and set text to addres formatted address

    if (res && res.geometry) {
      place = {};
      place.latitude = res.geometry.location.lat;
      place.longitude = res.geometry.location.lng;
      place.formattedName = res.name + ", " + res.formatted_address;
      place.place_id = res.place_id;
      this.setState({
        addressEntered: place.formattedName,
      });
    }

    if (place) {
      this.uploadAddressToDatabase(place);
    }
    return;
  };

  uploadAddressToDatabase = async (place) => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const userRef = firebase.firestore().collection(collectionNames.users);
    if (userRef) {
      this.animation.play();
      await userRef
        .doc(uid)
        .update({
          address: { ...place },
        })
        .then(
          this.setState({
            proceedButtonVisible: true,
          })
        )
        .catch((er) => {
          console.log(er);
        });
    }
  };

  onSubmitClick = () => {
    Utils.dispatchScreen(screens.PhoneScreen, undefined, this.state.navigation);
  };

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
      inputAddressTextStyle,
    } = styles;

    const { navigation } = this.props;
    return (
      <Animatable.View animation="fadeInUp">
        <ScrollView style={mainContainer}>
          <Icon
            nameAndroid={iconNames.crossAndroid}
            nameIOS={iconNames.crossIOS}
            size={42}
            style={commonStyling.crossStyle}
            onPress={() => this.state.navigation.goBack()}
          />
          <Heading
            title={strings.addressHeading}
            containerStyle={headingContainerStyle}
          />
          <Text style={subHeadingStyle}>{strings.addressSubHeading}</Text>
          <View style={inputContainerStyle}>
            <TouchableOpacity
              style={inputContainerTouchableStyle}
              onPress={this.showAddressModal}
            >
              <Text style={inputAddressTextStyle}>
                {this.state.addressEntered}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={animationContainerStyle}>
            <LottieView
              ref={(animation) => {
                this.animation = animation;
              }}
              onAnimationFinish={null}
              loop={false}
              source={require("../assets/animations/address.json")}
            />
          </View>

          {this.state.proceedButtonVisible ? (
            <Button
              title={strings.submit}
              style={buttonStyle}
              textColor={colors.colorAccent}
              onPress={this.onSubmitClick}
            />
          ) : null}

          {this.getAddressModal()}
        </ScrollView>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    paddingHorizontal: dimens.screenHorizontalMargin,
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
    marginTop: 50,
    marginBottom: 40,
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  headingStyle: {
    color: colors.colorPrimary,
  },
  inputContainerStyle: {
    marginHorizontal: 8,
    height: dimens.textInputHeight,
    borderBottomColor: colors.grayTransluscent,
    borderBottomWidth: 1,
    justifyContent: "center",
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
    fontFamily: customFonts.regular,
  },
  orContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 40,
  },
  thinLine: {
    height: dimens.thinLine,
    backgroundColor: colors.grayTransluscent,
    width: "28%",
  },
  buttonStyle: {
    backgroundColor: colors.colorPrimary,
    width: "100%",
    marginTop: 50,
  },
  inputContainerTouchableStyle: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  modalContainerStyle: {
    flex: 1,
    backgroundColor: colors.blackTransluscent,
  },
  modalContentContainerStyle: {
    flex: 1,
    marginTop: 40,
    backgroundColor: colors.offWhite,
    borderTopLeftRadius: dimens.defaultBorderRadius,
    borderTopRightRadius: dimens.defaultBorderRadius,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: dimens.screenHorizontalMargin,
  },
  closeText: {
    color: colors.colorPrimary,
    fontFamily: customFonts.semiBold,
    fontSize: 16,
  },
  addressTextInput: {
    width: "100%",
    height: dimens.textInputHeight,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontFamily: customFonts.regular,
    fontSize: 16,
    borderColor: colors.grayTransluscent,
  },
  addressContentContainer: {
    width: "100%",
    height: "100%",
    marginTop: 40,
  },
  addressComponentStyle: {
    paddingHorizontal: dimens.screenHorizontalMargin,
  },
  addressScrollingContainer: {
    marginTop: 12,
    maxHeight: 250,
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
    flexDirection: "row",
    width: "95%",
  },
  closeButtonAddressInput: {
    marginRight: dimens.screenHorizontalMargin,
  },
});

AddressScreen.navigationOptions = {
  header: null,
};

AddressScreen.propTypes = {
  navigation: PropTypes.object,
};

export default AddressScreen;
