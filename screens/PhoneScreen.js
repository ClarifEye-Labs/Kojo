import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import { Icon, Button } from "../Components";
import { LinearGradient } from "expo-linear-gradient";
import {
  dimens,
  colors,
  customFonts,
  strings,
  screens,
  iconNames,
} from "../constants";
import { commonStyling } from "../common";
import { PropTypes } from "prop-types";
import firebase from "../config/firebase";
import LottieView from "lottie-react-native";
import { Utils } from "../utils";
import collectionNames from "../config/collectionNames";
import { connect } from "react-redux";
import appConfig from "../config/appConfig";
import * as Animatable from "react-native-animatable";

class PhoneScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      name: "Phone Screen",
      isCountryModalVisible: false,
      countryList: [
        {
          id: "+852",
          title: "(+852) Hong Kong",
          country_code: "HK",
          max_length: 8,
        },
        { id: "+86", title: "(+86) China", country_code: "CN", max_length: 11 },
      ],
      countrySelected: null,
      countryToRender: "Select a country",
      country: null,
      phoneNumber: null,
      phoneNumberMaxLength: 0,
      placeHolderPhone: "Phone number",
      phoneSubmitIsLoading: false,
    };
    // this.getCountryList()
  }
  componentDidMount() {
    this.animation.play();
  }

  // ----- COUNTRY MODAL --------
  showCountryModal = () => this.setState({ isCountryModalVisible: true });

  hideCountryModal = () => this.setState({ isCountryModalVisible: false });

  selectCountryItem = (itemObject) => {
    this.setState({
      countrySelected: itemObject,
    });
  };

  CountryItem = (toRenderItem) => {
    const styles = {
      eachUnitContainer: {
        height: dimens.textInputHeight,
        borderBottomWidth: dimens.inputTextBorderWidth,
        borderBottomColor: colors.grayTransluscent,
        borderBottomColor: colors.grayTransluscent,
        borderBottomWidth: dimens.inputTextBorderWidth,
        marginHorizontal: dimens.screenHorizontalMargin,
      },
      iconStyle: {
        marginLeft: 8,
        marginRight: 8,
      },
      contentContainerStyle: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      },
    };

    let toRenderTickIcon = false;
    if (this.state.countrySelected) {
      toRenderTickIcon =
        this.state.countrySelected.item.id === toRenderItem.item.id;
    }

    const component = (
      <View style={styles.eachUnitContainer}>
        <TouchableOpacity
          style={styles.contentContainerStyle}
          onPress={() => this.selectCountryItem(toRenderItem)}
        >
          {toRenderTickIcon ? (
            <Icon
              nameIOS="ios-checkmark"
              nameAndroid="md-checkmark"
              style={styles.iconStyle}
            />
          ) : null}
          <Text>{toRenderItem.item.title}</Text>
        </TouchableOpacity>
      </View>
    );

    return component;
  };

  confirmCountrySelection = async () => {
    const { countrySelected } = this.state;

    if (!countrySelected) {
      this.setState({
        showUnitError: true,
      });
    } else {
      this.showCountryOnUI(countrySelected);
      this.setPhoneNumberLength(countrySelected);
      this.hideCountryModal();
    }
  };

  showCountryOnUI = (countryObject) => {
    this.setState({
      countryToRender: countryObject.item.title,
      country: countryObject.item,
    });
  };

  setPhoneNumberLength = (countryObject) => {
    if (countryObject) {
      const item = countryObject.item;
      this.setState({
        phoneNumberMaxLength: item.max_length,
      });

      this.setPlaceholderPhone(item.max_length);
    }
  };

  setPlaceholderPhone = (phoneNumberLength) => {
    const numberLength = phoneNumberLength;
    let newPlaceholderPhone = "X".repeat(numberLength);
    this.setState({
      placeHolderPhone: newPlaceholderPhone,
    });
  };

  getCountryModal = () => {
    const styles = {
      modalContainerStyle: {
        flex: 1,
        backgroundColor: colors.blackTransluscent,
      },
      mainContainer: {
        flex: 1,
        marginTop: 50,
        flexDirection: "column",
        backgroundColor: "#f2f2f2",
        borderTopLeftRadius: dimens.defaultBorderRadius,
        borderTopRightRadius: dimens.defaultBorderRadius,
      },
      headingContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingTop: 20,
        borderTopLeftRadius: dimens.defaultBorderRadius,
        borderTopRightRadius: dimens.defaultBorderRadius,
        zIndex: -1,
        paddingBottom: 20,
        backgroundColor: colors.whiteTransluscent,
        borderBottomWidth: dimens.inputTextBorderWidth,
        borderBottomColor: colors.grayTransluscent,
      },
      subHeadingButtons: {
        color: colors.colorPrimary,
        fontSize: 16,
        fontFamily: customFonts.semiBold,
      },
      headingStyle: {
        fontSize: 20,
        color: colors.black,
        fontFamily: customFonts.bold,
      },
      cancelButton: {
        position: "absolute",
        top: 22,
        left: 20,
      },
      setButton: {
        position: "absolute",
        top: 22,
        right: 20,
      },
      addUnitContainer: {
        width: "100%",
        marginTop: 35,
        height: 120,
      },
      pickUnitContainer: {
        flex: 1,
        overflow: "hidden",
        marginTop: 35,
        marginBottom: 35,
      },
      sectionHeading: {
        color: colors.colorPrimary,
        fontFamily: customFonts.semiBold,
        fontSize: 18,
        marginLeft: dimens.screenHorizontalMargin,
      },
      inputContainerStyle: {
        paddingHorizontal: dimens.screenHorizontalMargin,
        paddingVertical: 18,
        marginTop: 8,
        backgroundColor: colors.whiteTransluscent,
        borderTopWidth: dimens.inputTextBorderWidth,
        borderTopColor: colors.grayTransluscent,
        borderBottomWidth: dimens.inputTextBorderWidth,
        borderBottomColor: colors.grayTransluscent,
      },
      unitListContainer: {
        marginTop: 8,
        paddingVertical: 8,
        backgroundColor: colors.whiteTransluscent,
      },
      flatListStyle: {
        width: "100%",
        paddingBottom: 20,
      },
      unitError: {
        marginTop: 8,
        width: "100%",
        fontSize: 17,
        fontFamily: customFonts.regular,
        color: colors.errorRed,
        textAlign: "center",
      },
      errorStyle: {
        marginTop: 8,
      },
      subTextStyle: {
        fontSize: 13,
        fontFamily: customFonts.regular,
      },
      subHeadingErrorStyling: {
        marginTop: 8,
        width: "100%",
        fontSize: 17,
        fontFamily: customFonts.regular,
        color: colors.errorRed,
        textAlign: "center",
      },
    };
    return (
      <Modal
        visible={this.state.isCountryModalVisible}
        transparent={true}
        animationType="slide"
        onBackButtonPress={this.hideCountryModal}
      >
        <View style={styles.modalContainerStyle}>
          <View style={styles.mainContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={this.hideCountryModal}
            >
              <Text style={styles.subHeadingButtons}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.setButton}
              onPress={this.confirmCountrySelection}
            >
              <Text style={styles.subHeadingButtons}>Set</Text>
            </TouchableOpacity>

            <View style={styles.headingContainer}>
              <Text style={styles.headingStyle}>Choose Country</Text>
            </View>

            {/* pick unit section  */}
            <View style={styles.pickUnitContainer}>
              <Text style={styles.sectionHeading}>PICK</Text>
              <View style={styles.unitListContainer}>
                <FlatList
                  contentContainerStyle={styles.flatListStyle}
                  data={this.state.countryList}
                  renderItem={(item) => this.CountryItem(item)}
                  keyExtractor={(item) => item.title}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  handlePhoneNumber = (number) => {
    this.setState({
      phoneNumber: number,
    });
  };

  submitButtonOnClick = async () => {
    let phoneObject = {
      country: this.state.country,
      number: this.state.phoneNumber,
    };
    this.setState({
      phoneSubmitIsLoading: true,
    });

    const errors = {
      number: {},
      extension: {},
    };

    errors.extension = this.performExtensionValidation(phoneObject.country);
    errors.number = await this.performNumberValidation(phoneObject.number);

    this.performUIOperationsForShowingErrors(errors, phoneObject);
  };

  performUIOperationsForShowingErrors = async (errors, phoneObject) => {
    if (!errors.number.errorStatus && !errors.extension.errorStatus) {
      await this.uploadPhoneNumberToDatabase(phoneObject);
    } else {
      this.setState({
        phoneSubmitIsLoading: false,
      });

      if (errors.extension.errorStatus) {
        alert(errors.extension.errorReason);
      } else if (errors.number.errorStatus) {
        alert(errors.number.errorReason);
      }
    }
  };

  performNumberValidation = async (phoneNumber) => {
    let error = {
      errorStatus: false,
      errorReason: null,
    };

    if (!phoneNumber) {
      error.errorStatus = true;
      error.errorReason = "Phone number cannot be empty";
    } else {
      if (this.state.country) {
        let country_code = this.state.country.country_code;
        if (country_code) {
          if (country_code == "HK") {
            if (!/^[5,6,9]{1}[0-9]{7}$/.test(phoneNumber)) {
              error.errorStatus = true;
              error.errorReason = "Invalid Hong Kong phone number";
            }
          } else if (country_code == "CN") {
            if (!/^1[0-9]{10}$/.test(phoneNumber)) {
              error.errorStatus = true;
              error.errorReason = "Invalid China phone number";
            }
          }
        }
      }

      // Use this code if you want to extend this to any country and check actual validity.
      // if(country_code) {
      //   await axios.get('http://apilayer.net/api/validate', {
      //     params: {
      //       access_key: '',
      //       number: phoneNumber,
      //       country_code: country_code
      //     }
      //   })
      //   .then(function(response) {
      //     console.log(response.data)
      //     if(response.data.valid == false) {
      //       error.errorStatus = true
      //       error.errorReason = "Invalid Phone Number"
      //     }
      //   })
      // }
    }

    return error;
  };

  performExtensionValidation = (extension) => {
    let error = {
      errorStatus: false,
      errorReason: null,
    };

    if (!extension) {
      error.errorStatus = true;
      error.errorReason = "Extension cannot be empty";
    }

    return error;
  };

  uploadPhoneNumberToDatabase = async (phoneNumber) => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const userRef = firebase.firestore().collection(collectionNames.users);
    if (userRef) {
      await userRef
        .doc(uid)
        .update({
          phone: {
            country: { ...phoneNumber.country },
            number: phoneNumber.number,
          },
        })
        .then(this.successfulUpload)
        .catch((er) => {
          alert(er);
        });
    } else {
      console.log("User not signed in, redirect to welcome screen.");
    }
  };

  //   Use this code if we want to get the whole country list, for validating all phone numbers, need to use API, contact developers for access key or create one of your own :)

  // getCountryList = async () => {
  //   let responseCountryList = this.state.testingFullCountryList
  //   let countryList = []
  //   //Can get country list of all countries too
  //   await axios.get('http://apilayer.net/api/countries', {
  //     params: {
  //       access_key : '16863ca1402f241af153ec9b282e6f4c'
  //     }
  //   })
  //   .then(function(response) {
  //     responseCountryList = response.data
  //   })

  //   await Object.entries(responseCountryList).map( ([key,value]) => {
  //     let countryObject = { 'id': '', title: '', country_code: '', max_length: 10 }
  //     countryObject.id = value.dialling_code
  //     countryObject.title = '(' + value.dialling_code + ')' + ' ' + value.country_name
  //     countryObject.country_code = key
  //     countryList.push(countryObject)
  //   })

  //   this.setState({countryList: countryList})
  // }

  successfulUpload = () => {
    this.setState({
      phoneSubmitIsLoading: false,
    });
    //check here for role of user and then proceed to according screen
    const screenToDispatch =
      this.props.user.role === appConfig.userRoleSupplier
        ? screens.SupplierHome
        : screens.ClientHome;
    Utils.dispatchScreen(screenToDispatch, undefined, this.state.navigation);
  };

  render() {
    const {
      mainContainer,
      imageContainer,
      gradientStyle,
      headerContainer,
      subHeadingStyle,
      buttonContainer,
      headingStyle,
      inputContainerStyle,
      inputContainerTouchableStyle,
      inputCountryTextStyle,
      phoneTextInput,
      inputsContainer,
      submitButtonStyle,
    } = styles;

    const { navigation } = this.props;

    return (
      <Animatable.View animation="fadeInUp">
        <ScrollView style={mainContainer}>
          <Icon
            nameAndroid={iconNames.crossAndroid}
            nameIOS={iconNames.crossIOS}
            size={36}
            style={commonStyling.crossStyle}
            color={colors.colorAccent}
            onPress={() => navigation.goBack()}
          />
          <View style={headerContainer}>
            <LinearGradient
              colors={[colors.colorPrimary, colors.colorSecondary]}
              style={gradientStyle}
            >
              <Text style={headingStyle}>{strings.phoneNumber}</Text>
            </LinearGradient>
            <View style={imageContainer}>
              <View
                width={200}
                height={200}
                elevation={dimens.defaultElevation + 10}
              >
                <LottieView
                  ref={(animation) => {
                    this.animation = animation;
                  }}
                  onAnimationFinish={null}
                  loop={true}
                  source={require("../assets/animations/phone.json")}
                  width={200}
                  height={200}
                />
              </View>
            </View>
          </View>
          <View style={inputsContainer}>
            <View style={inputContainerStyle}>
              <Text style={subHeadingStyle}>
                {strings.choosePhoneExtension}
              </Text>
              <TouchableOpacity
                style={inputContainerTouchableStyle}
                onPress={this.showCountryModal}
              >
                <Text style={inputCountryTextStyle}>
                  {this.state.countryToRender}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={inputContainerStyle}>
              <Text style={subHeadingStyle}>{strings.enterPhone}</Text>
              <TextInput
                onChangeText={this.handlePhoneNumber}
                placeholder={this.state.placeHolderPhone}
                style={phoneTextInput}
                keyboardType="number-pad"
                maxLength={this.state.phoneNumberMaxLength}
              />
            </View>

            <View style={buttonContainer}>
              <Button
                title="Submit"
                isLoading={this.state.phoneSubmitIsLoading}
                onPress={this.submitButtonOnClick}
                style={submitButtonStyle}
                textColor={colors.colorAccent}
              />
            </View>
          </View>
          {this.getCountryModal()}
        </ScrollView>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
  },
  headerContainerImage: {
    width: "100%",
    zIndex: -1,
    height: 280,
  },
  gradientStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 280,
  },
  headerContainer: {
    zIndex: -1,
  },
  mainHeaderContainerStyle: {
    width: "100%",
  },
  editButton: {
    position: "absolute",
    right: dimens.screenHorizontalMargin,
    marginTop: 44,
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    height: 300,
    borderBottomColor: colors.grayTransluscent,
    borderBottomWidth: 0,
    paddingTop: 260,
    justifyContent: "center",
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
    textTransform: "uppercase",
  },
  headerEditContainerStyle: {
    marginRight: dimens.screenHorizontalMargin,
  },
  headerEditStyle: {
    fontSize: 16,
    color: colors.facebookBlue,
  },
  infoItemContainer: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: colors.grayTransluscent,
    borderBottomWidth: 1,
  },
  subHeadingStyle: {
    fontSize: 16,
    fontFamily: customFonts.regular,
    color: colors.grayBlue,
  },
  textStyle: {
    fontFamily: customFonts.regular,
    fontSize: 16,
    marginTop: 8,
    color: colors.blackTransluscent,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonStyle: {
    marginLeft: 5,
    height: dimens.buttonHeight,
    width: "80%",
    backgroundColor: colors.deleteRed,
  },
  modalContainerStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.blackTransluscent,
    alignItems: "center",
  },
  modalContentContainerStyle: {
    width: 320,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.colorAccent,
    borderRadius: dimens.defaultBorderRadius,
  },
  crossStyle: {
    position: "absolute",
    top: 10,
    right: 20,
  },
  textContainerModal: {
    flexDirection: "column",
    height: 100,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  headingModalStyle: {
    fontSize: 23,
    textAlign: "center",
    fontFamily: customFonts.semiBold,
    color: colors.grayBlue,
  },
  itemNameModal: {
    fontSize: 23,
    width: 290,
    textAlign: "center",
    fontFamily: customFonts.semiBold,
    color: colors.colorPrimary,
    marginTop: 8,
  },
  modalButtonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonModal: {
    width: 250,
    marginTop: 20,
    height: dimens.buttonHeight,
    backgroundColor: colors.deleteRed,
  },
  cancelButtonModal: {
    width: 250,
    marginTop: 10,
    height: dimens.buttonHeight,
    backgroundColor: colors.facebookBlue,
  },
  expandedHeaderContainerStyle: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "column",
    position: "absolute",
  },
  headingStyle: {
    fontSize: 30,
    fontFamily: customFonts.semiBold,
    color: colors.colorAccent,
    marginTop: dimens.screenSafeUpperNotchDistance + 80,
    width: "100%",
    textAlign: "center",
    paddingLeft: dimens.screenHorizontalMargin,
  },
  inputContainerStyle: {
    height: dimens.textInputHeight + 20,
    width: "90%",
    flexDirection: "column",
    borderBottomColor: colors.grayBlue,
    borderBottomWidth: 0.5,
    justifyContent: "center",
    marginBottom: 35,
  },
  inputContainerTouchableStyle: {
    height: dimens.textInputHeight,
    justifyContent: "center",
  },
  inputCountryTextStyle: {
    fontSize: 20,
    color: colors.grayTransluscent,
    fontFamily: customFonts.regular,
  },
  phoneTextInput: {
    width: "100%",
    height: dimens.textInputHeight,
    borderBottomWidth: 0.5,
    paddingVertical: 4,
    fontFamily: customFonts.regular,
    fontSize: 20,
    borderColor: colors.grayTransluscent,
  },
  addButtonStyle: {
    backgroundColor: colors.submitGreen,
    width: "80%",
  },
  inputsContainer: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonStyle: {
    width: "90%",
    backgroundColor: colors.colorPrimary,
  },
});

const mapStateToProps = (state) => ({
  user: state.userDetailsReducer.userFirestoreData,
});

const mapDispatchToProps = (dispatch) => ({});

PhoneScreen.navigationOptions = {
  header: null,
};

PhoneScreen.propTypes = {
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneScreen);
