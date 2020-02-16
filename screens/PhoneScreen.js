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
  Modal,
  TextInput,
  FlatList   
} from 'react-native'
import { Back, Edit, Card, TextWithSubheading, Button, Cross, InputWithSubHeading, Icon } from '../Components'
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
      name: 'Phone Screen',
      isCountryModalVisible: false,
      countryList: [{'id': 852, title: '(+852) Hong Kong'} , {'id': 86, title: '(+86) China'}],
      countrySelected: null,
      countryToRender: "Select a country",
      country: null,
      phoneNumber: null
    }
  }
  componentDidMount() {
    this.animation.play();
  }

    // ----- COUNTRY MODAL --------
    showCountryModal = () => this.setState({ isCountryModalVisible: true })

    hideCountryModal = () => this.setState({ isCountryModalVisible: false })

    selectCountryItem = (itemObject) => {
       
        this.setState({
          countrySelected: itemObject
        })
      
    }

    CountryItem = (toRenderItem) => {
      const styles = {
        eachUnitContainer: {
          height: dimens.textInputHeight,
          borderBottomWidth: dimens.inputTextBorderWidth,
          borderBottomColor: colors.grayTransluscent,
          borderBottomColor: colors.grayTransluscent,
          borderBottomWidth: dimens.inputTextBorderWidth,
          marginHorizontal: dimens.screenHorizontalMargin
        },
        iconStyle: {
          marginLeft: 8,
          marginRight: 8
        },
        contentContainerStyle: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }
      }
  
      let toRenderTickIcon = false
      if (this.state.countrySelected) {
        toRenderTickIcon = this.state.countrySelected.item.id === toRenderItem.item.id
      }
  
      const component =
        <View style={styles.eachUnitContainer}>
          <TouchableOpacity style={styles.contentContainerStyle} onPress={() => this.selectCountryItem(toRenderItem)} >
            {toRenderTickIcon
              ? <Icon nameIOS='ios-checkmark' nameAndroid='md-checkmark' style={styles.iconStyle} />
              : null}
            <Text>{toRenderItem.item.title}</Text>
          </TouchableOpacity>
        </View>
  
  
      return component
    }

    confirmCountrySelection = async () => {
      const { countrySelected } = this.state
  
      if (!countrySelected) {
        this.setState({
          showUnitError: true
        })
      } 
      else {
        this.showCountryOnUI(countrySelected)
        this.hideCountryModal()
      }
    }

    showCountryOnUI = (countryObject) => {
      this.setState({
        countryToRender: countryObject.item.title,
        country: countryObject.item
      })
    }
  
    getCountryModal = () => {
      const styles = {
        modalContainerStyle: {
          flex: 1,
          backgroundColor: colors.blackTransluscent,
        },
        mainContainer: {
          flex: 1,
          marginTop: 50,
          flexDirection: 'column',
          backgroundColor: '#f2f2f2',
          borderTopLeftRadius: dimens.defaultBorderRadius,
          borderTopRightRadius: dimens.defaultBorderRadius
        },
        headingContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
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
          fontFamily: customFonts.bold
        },
        cancelButton: {
          position: 'absolute',
          top: 22,
          left: 20
        },
        setButton: {
          position: 'absolute',
          top: 22,
          right: 20
        },
        addUnitContainer: {
          width: '100%',
          marginTop: 35,
          height: 120,
        },
        pickUnitContainer: {
          flex: 1,
          overflow: 'hidden',
          marginTop: 35,
          marginBottom: 35
        },
        sectionHeading: {
          color: colors.colorPrimary,
          fontFamily: customFonts.semiBold,
          fontSize: 18,
          marginLeft: dimens.screenHorizontalMargin
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
          backgroundColor: colors.whiteTransluscent
        },
        flatListStyle: {
          width: '100%',
          paddingBottom: 20,
        },
        unitError: {
          marginTop: 8,
          width: '100%',
          fontSize: 17,
          fontFamily: customFonts.regular,
          color: colors.errorRed,
          textAlign: 'center'
        },
        errorStyle: {
          marginTop: 8
        },
        subTextStyle: {
          fontSize: 13,
          fontFamily: customFonts.regular
        },
        subHeadingErrorStyling: {
          marginTop: 8,
          width: '100%',
          fontSize: 17,
          fontFamily: customFonts.regular,
          color: colors.errorRed,
          textAlign: 'center'
        }
  
      }
      return (
        <Modal
          visible={this.state.isCountryModalVisible}
          transparent={true}
          animationType='slide'
          onBackButtonPress={this.hideCountryModal}>
          <View style={styles.modalContainerStyle}>
  
            <View style={styles.mainContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={this.hideCountryModal}>
                <Text style={styles.subHeadingButtons}>Cancel</Text>
              </TouchableOpacity>
  
              <TouchableOpacity style={styles.setButton} onPress={this.confirmCountrySelection}>
                <Text style={styles.subHeadingButtons}>Set</Text>
              </TouchableOpacity>
  
              <View style={styles.headingContainer}>
                <Text style={styles.headingStyle}>Choose Country</Text>
              </View>
  
              {/* pick unit section  */}
              <View style={styles.pickUnitContainer}>
                <Text style={styles.sectionHeading}>PICK</Text>
                <View
                  style={styles.unitListContainer}>
                  <FlatList
                    contentContainerStyle={styles.flatListStyle}
                    data={this.state.countryList}
                    renderItem={item => this.CountryItem(item)}
                    keyExtractor={item => item.id}
                  />
                </View>
              </View>
  
            </View>
          </View>
        </Modal>)
    }

    handlePhoneNumber = (number) => {
      this.setState({
        phoneNumber: number
      })
    }

    submitButtonOnClick = async () => {

      let phoneObject = {'country' : this.state.country , 'number' : this.state.phoneNumber}
      //await this.uploadPhoneNumberToDatabase(phoneObject)
      // console.log(phoneObject)
    }

    uploadPhoneNumberToDatabase = async (phoneNumber) => {
      const user = firebase.auth().currentUser
      const uid = user.uid
      const userRef = firebase.firestore().collection(collectionNames.users)
      if (userRef) {
        await userRef.doc(uid).update({
          phone: { phoneNumber }
        }).then(this.setState({
          
        })).catch((er) => {
          console.log(er)
        })
      }
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
      expandedHeaderContainerStyle,
      inputContainerStyle,
      inputContainerTouchableStyle,
      inputCountryTextStyle,
      addButtonStyle,
      phoneTextInput
      
    } = styles

    const {
      navigation
    } = this.props

    return (
      <ScrollView style={mainContainer}>
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
            loop={true}
            source={require('../assets/animations/phone.json')} 
            width = {200}
            height = {200}
            />
            </View>
          </View>   
        </View>
        <View style={inputContainerStyle}>
          <TouchableOpacity style={inputContainerTouchableStyle} onPress={this.showCountryModal}>
            <Text style={inputCountryTextStyle}>{this.state.countryToRender}</Text>
          </TouchableOpacity>
          </View>
          <View style={inputContainerStyle}>
          <TextInput
                  style={inputCountryTextStyle}
                  onChangeText={this.handlePhoneNumber}
                  placeholder="Enter Phone Number"
                  keyboardType = 'number-pad'
          />
          </View>

          <View style={buttonContainer}>
          <Button
            title="Submit"
            onPress={this.submitButtonOnClick}
            style={addButtonStyle}
            textColor={colors.colorAccent}
            isLoading={this.state.showLoadingDialog} />
        </View>

        {this.getCountryModal()}
      </ScrollView>
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
    borderBottomWidth: 0,
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
  },
  inputContainerStyle: {
    marginHorizontal: 8,
    height: dimens.textInputHeight,
    borderBottomColor: colors.grayTransluscent,
    borderBottomWidth: 1,
    justifyContent: 'center',
    marginBottom: 40
  },  
  inputContainerTouchableStyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  inputCountryTextStyle: {
    fontSize: 19,
    color: colors.grayTransluscent,
    fontFamily: customFonts.regular,
    textAlign: 'center'
  },
  phoneTextInput: {
    width: '100%',
    height: dimens.textInputHeight,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontFamily: customFonts.regular,
    fontSize: 16,
    borderColor: colors.grayTransluscent,
  },
  addButtonStyle: {
    backgroundColor: colors.submitGreen,
    width: '80%',
  }

})

PhoneScreen.navigationOptions = {
  header: null
}

PhoneScreen.propTypes = {
  navigation: PropTypes.object
}

export default PhoneScreen