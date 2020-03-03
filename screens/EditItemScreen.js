import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Confirm, Back, Heading, InputWithSubHeading, Button, Card, Edit, Cross } from '../Components'
import { dimens, colors, customFonts, screens, strings } from '../constants'
import { commonStyling } from '../common'
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../config/firebase'
import { RNS3 } from 'react-native-aws3'
import awsConfig from '../config/aws'
import collectionNames from '../config/collectionNames';
import { Utils } from '../utils';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class EditItemScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Edit Item Screen',
      item: this.props.navigation.getParam('item'),
      newItemName: this.props.navigation.getParam('item').name,
      newItemPrice: this.props.navigation.getParam('item').price_per_unit,
      newItemCategory: this.props.navigation.getParam('item').category,
      newItemImageURL: this.props.navigation.getParam('item').imageURL,
      navigation: props.navigation,
      isLoading: false,
      showImagePicker: false,
      imageUri: null,
      imageHasBeenUploaded: false,
      imageAWSURL: null
    }
  }

  componentDidMount() {
    this.getPermissionAsync()
  }

  // ---------------------- IMAGE MODAL METHODS-----------------------------
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
      if (status !== 'granted') {
        alert(strings.sorryWeNeedPermissions);
      }
    }
  }

  openImagePickerModal = () => {
    this.setState({
      showImagePicker: true
    })
  }

  closeImagePickerModal = () => {
    this.setState({
      showImagePicker: false
    })
  }

  getImageModal = () => {
    const {
      modalContentContainerStyle,
      modalContainerStyle,
      crossStyle,
      textContainerModal,
      headingModalStyle,
      uploadButtonModal: deleteButtonModal,
      clickButtonModal: cancelButtonModal,
      modalButtonContainer
    } = styles

    return (
      <Modal visible={this.state.showImagePicker} transparent={true} animationType='slide' onBackButtonPress={() => { this.setState({ showImagePicker: false }) }}>
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => { this.setState({ showImagePicker: false }) }}
          style={modalContainerStyle}>
          <TouchableWithoutFeedback>
            <View style={modalContentContainerStyle}>
              <Cross style={crossStyle} onPress={() => { this.setState({ showImagePicker: false }) }} color={colors.grayBlue} size={38} />
              <View style={textContainerModal}>
                <Text style={headingModalStyle}>{strings.chooseUploadImageOption}</Text>
              </View>
              <View style={modalButtonContainer}>
                <Button
                  title='Upload from library'
                  textColor={colors.colorAccent}
                  onPress={() => { this.updateImagePickerValue('library') }}
                  style={deleteButtonModal} />
                <Button
                  title='Click from camera'
                  textColor={colors.colorAccent}
                  onPress={() => { this.updateImagePickerValue('camera') }}
                  style={cancelButtonModal} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    )
  }


  updateImagePickerValue = (value) => {
    if (value !== "") {
      this.setState({
        imagePickerValue: value,
      }, () => { this.uploadImageOnClick() })
    }
  }

  uploadImageOnClick = async () => {
    let result = null
    if (this.state.imagePickerValue == "library") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
    } else if (this.state.imagePickerValue == "camera") {
      result = await ImagePicker.launchCameraAsync();

    }


    if (!result.cancelled) {
      this.setState({ imageUri: result.uri, imageHasBeenUploaded: true, showImagePicker: false })
    }
  }

  uploadImageToAWS = async () => {
    const response = await fetch(this.state.imageUri);
    const blob = await response.blob();

    const file = {
      uri: this.state.imageUri,
      name: this.state.inventoryName + ".png",
      type: 'image/png'
    }

    var returnValue = null
    await RNS3.put(file, awsConfig)
      .then(
        (response) => {
          if (response.headers.Location) {
            returnValue = response.headers.Location
          }
        }
      )

    return returnValue
  }




  setItemName = (name) => {
    this.setState({
      newItemName: name
    })
  }

  setItemPrice = (price) => {
    if (price.length !== 0) {
      this.setState({
        newItemPrice: parseInt(price)
      })
    } else {
      this.setState({
        newItemPrice: null
      })
    }
  }

  confirmEdit = async () => {
    this.setState({
      isLoading: true
    })

    const {
      item,
      imageUri,
      newItemImageURL
    } = this.state


    let imageURL = newItemImageURL
    if (imageUri) {
      imageURL = await this.uploadImageToAWS()
      if (!imageURL) {
        Alert.alert("Image not uploaded, Try Again.")
      } else {
        this.setState({
          imageAWSURL: imageURL
        })
      }
    }

    const itemID = item.id
    const db = firebase.firestore()

    db
      .collection(collectionNames.products)
      .doc(itemID)
      .update({
        name: this.state.newItemName,
        price_per_unit: this.state.newItemPrice,
        imageURL: imageURL
      })
      .then(() => this.setState({
        isLoading: false
      }, () => Utils.dispatchScreen(screens.SupplierHome, undefined, this.state.navigation)))
  }


  render() {
    const {
      mainContainer,
      confirmStyle,
      headingStyle,
      headingContainerStyle,
      topButtonsContainer,
      textContentContainerStyle,
      textInputContainerStyle,
      confirmButtonStyle,
      buttonContainer,
      headerContainer,
      gradientStyle,
      imageContainer,
      imageStyling,
      imageEditOverlay,
      editImageIcon
    } = styles


    const {
      navigation
    } = this.props

    return (
      <View style={mainContainer}>
        <View style={headerContainer}>
          <LinearGradient
            colors={[colors.colorPrimary, colors.colorSecondary]}
            style={gradientStyle}>
          </LinearGradient>
          <View style={imageContainer}>
            <Card width={280} height={280} elevation={dimens.defaultElevation + 10} >
              {this.state.imageUri == null ? (<ImageBackground style={imageStyling} imageStyle={imageStyling} source={{ uri: this.state.newItemImageURL }}>
                <View style={imageEditOverlay}>
                  <Edit style={editImageIcon} color={colors.colorAccent} size={32} onPress={this.openImagePickerModal} />
                </View>
              </ImageBackground>
              ) : (<ImageBackground style={imageStyling} imageStyle={imageStyling} source={{ uri: this.state.imageUri }}>
                <View style={imageEditOverlay}>
                  <Edit style={editImageIcon} color={colors.colorAccent} size={32} onPress={this.openImagePickerModal} />
                </View>
              </ImageBackground>

                )}
            </Card>
          </View>
        </View>
        {this.getImageModal()}

        <View style={topButtonsContainer}>
          <Heading containerStyle={headingContainerStyle} headingStyle={headingStyle} title='Edit item' />
          <Confirm style={confirmStyle} size={60} color={colors.colorAccent} onPress={this.confirmEdit} />
          <Back color={colors.colorAccent} style={commonStyling.backButtonStyling} size={36} onPress={() => navigation.goBack()} />
        </View>

        <ScrollView style={textContentContainerStyle}>
          <InputWithSubHeading
            subHeadingTitle='Item Name'
            containerStyle={textInputContainerStyle}
            inputValue={this.state.newItemName}
            onChangeText={this.setItemName} />

          <InputWithSubHeading
            subHeadingTitle='Item Price'
            keyboardType='numeric'
            containerStyle={textInputContainerStyle}
            inputValue={this.state.newItemPrice ? this.state.newItemPrice.toString() : null}
            onChangeText={this.setItemPrice} />

          <View style={buttonContainer}>
            <Button
              title='Confirm'
              isLoading={this.state.isLoading}
              onPress={this.confirmEdit}
              textColor={colors.colorAccent}
              style={confirmButtonStyle} />
          </View>


        </ScrollView>




      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
  },
  confirmStyle: {
    position: 'absolute',
    right: 20,
    top: dimens.screenSafeUpperNotchDistance + 10
  },
  contentContainerStyle: {
    marginTop: 50,
  },
  headingContainerStyle: {
    width: '100%',
    marginTop: dimens.screenSafeUpperNotchDistance + 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: dimens.screenHorizontalMargin
  },
  headingStyle: {
    color: colors.colorAccent,
    fontSize: 25
  },
  topButtonsContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0
  },
  textContentContainerStyle: {
    marginLeft: dimens.screenHorizontalMargin,
    marginRight: dimens.screenHorizontalMargin,
    padding: 8,
    marginTop: 20
  },
  textInputContainerStyle: {
    marginTop: 20,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  confirmButtonStyle: {
    width: 320,
    height: dimens.buttonHeight,
    marginHorizontal: dimens.screenHorizontalMargin,
    marginRight: dimens.screenHorizontalMargin,
    backgroundColor: colors.colorSecondary
  },
  headerContainerImage: {
    width: '100%',
    zIndex: -1,
    height: 290
  },
  gradientStyle: {
    position: 'absolute',
    top: 0,
    zIndex: -100,
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
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 350,
    paddingTop: 130,
    justifyContent: 'center'
  },
  imageStyling: {
    width: 280,
    height: 280,
    borderRadius: dimens.defaultBorderRadius,
  },
  imageEditOverlay: {
    height: 45,
    borderBottomEndRadius: dimens.defaultBorderRadius,
    borderBottomStartRadius: dimens.defaultBorderRadius,
    backgroundColor: colors.blackTransluscent,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    right: 0
  },
  editImageIcon: {
    position: 'absolute',
    right: dimens.screenHorizontalMargin,
  },
  modalContentContainerStyle: {
    width: 320,
    height: 260,
    backgroundColor: colors.colorAccent,
    borderRadius: dimens.defaultBorderRadius
  },
  modalContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.blackTransluscent,
    alignItems: 'center'
  },
  crossStyle: {
    position: 'absolute',
    top: 5,
    right: 20,
  },
  textContainerModal: {
    marginTop: 45,
    width: '100%'
  },
  headingModalStyle: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: customFonts.regular,
    color: colors.grayBlue
  },
  uploadButtonModal: {
    width: '80%',
    marginTop: 15,
    height: dimens.buttonHeight,
    backgroundColor: colors.submitGreen
  },
  clickButtonModal: {
    width: '80%',
    marginTop: 15,
    height: dimens.buttonHeight,
    backgroundColor: colors.darkBlue
  },
  modalButtonContainer: {
    marginTop: 30,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center'
  }

})

EditItemScreen.navigationOptions = {
  header: null
}

export default EditItemScreen