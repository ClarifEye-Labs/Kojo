import React, { useRef, useEffect, Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Modal, Alert, ScrollView, TouchableWithoutFeedback, FlatList, ImageBackground, Image } from 'react-native'
import { Back, Heading, InputWithSubHeading, Cross, Button, DropDownWithSubHeading, Icon } from '../Components'
import { dimens, colors, strings, customFonts } from '../constants'
import { commonStyling } from '../common'
import firebase from '../config/firebase'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { RNS3 } from 'react-native-aws3'
import awsConfig from '../config/aws'
import * as Animatable from 'react-native-animatable'


class SupplierAddInventoryScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inventoryType: '',
      documentName: '',
      inventoryName: '',
      quantityAvailable: '',
      pricePerUnit: '',
      inventoryUnit: '',
      imageUri: null,
      imageAWSURL: null,
      inventoryAddSuccess: false,
      showImagePicker: false,
      showInventoryTypePicker: false,
      imagePickerValue: null,
      inventoryTypePickerValue: null,
      inventoryCategories: null,
      inventoryUnits: null,
      showCategoryModal: false,
      showAddCategorySection: false,
      showAddUnitSection: false,
      categorySelected: undefined,
      categoryTyped: '',
      showCategoryError: null,
      showLoadingDialog: false,
      submitButtonClicked: false,
      inventoryTitleError: null,
      pricePerUnitError: null,
      inventoryCategorySelectionError: null,
      unitSelectionError: null,
      categoryNameToRender: 'Touch to add category',
      unitToRender: 'Touch to add Unit',
      showUnitModal: false,
      showUnitError: false,
      unitTyped: '',
      imageHasBeenUploaded: false
    }
  }


  componentDidMount() {
    this.getPermissionAsync();
    this.getInventoryCategories();
    this.getUnits();
  }



  // ----------- STATE SETTERS ------------------
  setInventoryType = (typeIndex) => {
    this.setState({
      inventoryType: this.state.inventoryCategories[typeIndex]
    })
  }

  setInventoryDocumentName = (text) => {
    this.setState({
      documentName: text,
    })
  }

  setInventoryName = (text) => {
    this.setState({
      inventoryName: text
    })
  }

  setInventoryCategory = (category) => {
    this.setState({
      inventoryCategory: category
    })
  }

  setInventoryQuantity = (text) => {
    this.setState({
      quantityAvailable: text
    })
  }

  setInventoryPrice = (text) => {
    this.setState({
      pricePerUnit: text
    })
  }


  // --------- VALIDATION AND ONCLICK LISTENERS -------------

  submitButtonOnClick = async () => {
    const {
      inventoryType,
      inventoryName,
      pricePerUnit,
      inventoryUnit

    } = this.state

    this.setState({
      showLoadingDialog: true,
      submitButtonClicked: true
    })

    const errors = {
      inventoryTitle: {},
      pricePerUnit: {},
      inventoryCategorySelection: {},
      unitSelection: {}
    }

    errors.inventoryTitle = this.performInventoryTitleValidation(inventoryName)
    errors.pricePerUnit = this.performPricePerUnitValidation(pricePerUnit)
    errors.inventoryCategorySelection = this.performInventoryCategorySelectionValidation(inventoryType)
    errors.unitSelection = this.performInventoryUnitSelectionValidation(inventoryUnit)


    this.setState({
      inventoryTitleError: errors.inventoryTitle.errorReason,
      pricePerUnitError: errors.pricePerUnit.errorReason,
      inventoryCategorySelectionError: errors.inventoryCategorySelection.errorReason,
      unitSelectionError: errors.unitSelection.errorReason

    })

    if (!errors.inventoryTitle.errorStatus && !errors.pricePerUnit.errorStatus && !errors.inventoryCategorySelection.errorStatus && !errors.unitSelection.errorStatus) {
      this.uploadInventory()
    } else {
      this.setState({
        showLoadingDialog: false,
        submitButtonClicked: false
      })
    }

    // await this.addInvetorytoFirestore()
    // this.setState({
    //   inventoryAddSuccess: true
    // })
  }

  performInventoryTitleValidation = (inventoryName) => {
    var error = {
      errorStatus: false,
      errorReason: null
    }

    if (inventoryName.length === 0) {
      error.errorStatus = true
      error.errorReason = strings.inventoryTitleCannotBeEmpty
    }

    return error

  }

  performPricePerUnitValidation = (pricePerUnit) => {
    var error = {
      errorStatus: false,
      errorReason: null
    }

    if (pricePerUnit.length === 0) {
      error.errorStatus = true
      error.errorReason = strings.pricePerUnitCannotBeEmpty
      return error
    }

    if (! /^\d+$/.test(pricePerUnit)) {
      error.errorStatus = true
      error.errorReason = strings.pricePerUnitErrorMessage
    }

    return error

  }

  performInventoryCategorySelectionValidation = (inventoryType) => {
    var error = {
      errorStatus: false,
      errorReason: null
    }

    if (inventoryType.length === 0) {
      error.errorStatus = true
      error.errorReason = strings.inventoryCategoryCannotBeEmpty
    }

    return error
  }

  performInventoryUnitSelectionValidation = (inventoryUnit) => {
    var error = {
      errorStatus: false,
      errorReason: null
    }

    if (inventoryUnit.length === 0) {
      error.errorStatus = true
      error.errorReason = strings.inventoryUnitCannotBeEmpty
    }

    return error
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert(strings.sorryWeNeedPermissions);
      }
    }
  }


  // --------------- CATEGORY MODAL -----------------

  getCategoryModal = () => {
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
      addCategoryContainer: {
        width: '100%',
        marginTop: 35,
        height: 120,
      },
      pickCategoryContainer: {
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
      categoryListContainer: {
        marginTop: 8,
        paddingVertical: 8,
        backgroundColor: colors.whiteTransluscent
      },
      flatListStyle: {
        width: '100%',
        paddingBottom: 20,
      },
      categoryError: {
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
        visible={this.state.showCategoryModal}
        transparent={true}
        animationType='slide'
        onBackButtonPress={this.closeDeleteModal}>
        <View style={styles.modalContainerStyle}>

          <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={this.closeCategoryModal}>
              <Text style={styles.subHeadingButtons}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.setButton} onPress={this.confirmInventoryCategory}>
              <Text style={styles.subHeadingButtons}>Set</Text>
            </TouchableOpacity>

            <View style={styles.headingContainer}>

              <Text style={styles.headingStyle}>Choose Category</Text>
            </View>

            {/*Error checking for category type selection */}

            {this.state.showCategoryError ?
              <Text style={styles.categoryError}>{strings.pleaseChooseCategory}</Text>
              : null
            }

            {/* this is add section, hidden buy default */}

            {this.state.showAddCategorySection
              ? <Animatable.View animation='fadeIn' easing='ease-in-out' style={styles.addCategoryContainer}>
                <Text style={styles.sectionHeading}>ADD</Text>
                <InputWithSubHeading
                  containerStyle={styles.inputContainerStyle}
                  secureTextEntry={false}
                  placeholder={'Enter Item Category'}
                  subHeadingTitle={strings.inventoryDocumentCategory}
                  autoCorrect={false}
                  onChangeText={this.setCategoryTyped}
                  autoCapitalize='words'
                  editable={!this.state.submitButtonClicked}
                />
              </Animatable.View>
              : null}

            {/* pick category section  */}
            <View style={styles.pickCategoryContainer}>


              <Text style={styles.sectionHeading}>PICK</Text>
              <View
                style={styles.categoryListContainer}>
                <FlatList
                  contentContainerStyle={styles.flatListStyle}
                  data={this.state.inventoryCategories}
                  renderItem={item => this.InventoryCategoryItem(item)}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>

          </View>



        </View>
      </Modal>
    )
  }

  openCategoryModal = () => {
    this.setState({
      showCategoryModal: true
    })
  }

  closeCategoryModal = () => {
    this.setState({
      showCategoryModal: false,
      showCategoryError: null
    })
  }

  confirmInventoryCategory = () => {
    const { categorySelected } = this.state
    if (!categorySelected) {

      this.setState({
        showCategoryError: true
      })

    } else if (categorySelected.item.id === 'other') {
      const { categoryTyped } = this.state

      if (categoryTyped.length === 0) {
        this.setState({
          showCategoryError: true
        })
      } else {
        this.setState({
          showCategoryError: false
        }, this.writeCategoryToDatabase())
      }
    } else {
      this.showCategoryOnUI(categorySelected.item.title)
      this.closeCategoryModal()
    }

  }

  writeCategoryToDatabase = () => {
    const { categoryTyped } = this.state
    //write this category to database and refresh loadout of categories 
    this.showCategoryOnUI(categoryTyped)
    this.closeCategoryModal()
  }

  showCategoryOnUI = (categoryNameToShow) => {
    this.setState({
      categoryNameToRender: categoryNameToShow,
      inventoryType: categoryNameToShow
    })

  }

  selectInventoryCategoryItem = (itemObject) => {
    if (itemObject.item.id === 'other') {
      this.setState({
        showAddCategorySection: true,
        categorySelected: itemObject,
      })
    } else {
      this.setState({
        showAddCategorySection: false,
        categorySelected: itemObject
      })
    }

  }

  setCategoryTyped = (text) => {
    this.setState({
      categoryTyped: text
    })
  }

  getInventoryCategories = async () => {

    var inventoryCategoryList = [{ 'id': 'other', title: 'Other' }]
    const inventoryCategoryCollection = firebase.firestore().collection('product_type')
    await inventoryCategoryCollection
      .get()
      .then(function (querySnapShot) {
        querySnapShot.forEach(function (doc) {
          let categoryObject = {}
          categoryObject.id = doc.id
          categoryObject.title = doc.data().title
          inventoryCategoryList.push(categoryObject)
        })
      })

    this.setState({
      inventoryCategories: inventoryCategoryList
    })

  }

  InventoryCategoryItem = (toRenderItem) => {
    const styles = {
      eachCategoryContainer: {
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
    if (this.state.categorySelected) {
      toRenderTickIcon = this.state.categorySelected.item.id === toRenderItem.item.id
    }

    const component =
      <View style={styles.eachCategoryContainer}>
        <TouchableOpacity style={styles.contentContainerStyle} onPress={() => this.selectInventoryCategoryItem(toRenderItem)}>
          {toRenderTickIcon
            ? <Icon nameIOS='ios-checkmark' nameAndroid='md-checkmark' style={styles.iconStyle} />
            : null}
          <Text>{toRenderItem.item.title}</Text>
        </TouchableOpacity>
      </View>


    return component
  }


  // -------------------   UNIT MODAL --------------------

  getUnitModal = () => {
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
        visible={this.state.showUnitModal}
        transparent={true}
        animationType='slide'
        onBackButtonPress={this.closeUnitModal}>
        <View style={styles.modalContainerStyle}>

          <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={this.closeUnitModal}>
              <Text style={styles.subHeadingButtons}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.setButton} onPress={this.confirmUnitSelection}>
              <Text style={styles.subHeadingButtons}>Set</Text>
            </TouchableOpacity>

            <View style={styles.headingContainer}>
              <Text style={styles.headingStyle}>Choose Unit</Text>
            </View>

            {/*Error checking for unit type selection */}

            {this.state.showUnitError ?
              <Text style={styles.unitError}>{strings.pleaseChooseUnit}</Text>
              : null
            }

            {/* this is add section, hidden buy default */}

            {this.state.showAddUnitSection
              ? <Animatable.View animation='fadeIn' easing='ease-in-out' style={styles.addUnitContainer}>
                <Text style={styles.sectionHeading}>ADD</Text>
                <InputWithSubHeading
                  containerStyle={styles.inputContainerStyle}
                  secureTextEntry={false}
                  placeholder={'Enter Unit'}
                  subHeadingTitle={strings.inventoryDocumentUnit}
                  autoCorrect={false}
                  onChangeText={this.setUnitTyped}
                  autoCapitalize='words'
                  editable={!this.state.submitButtonClicked}
                />
              </Animatable.View>
              : null}

            {/* pick unit section  */}
            <View style={styles.pickUnitContainer}>
              <Text style={styles.sectionHeading}>PICK</Text>
              <View
                style={styles.unitListContainer}>
                <FlatList
                  contentContainerStyle={styles.flatListStyle}
                  data={this.state.inventoryUnits}
                  renderItem={item => this.UnitItem(item)}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>

          </View>
        </View>
      </Modal>)
  }

  confirmUnitSelection = () => {
    const { unitSelected } = this.state

    if (!unitSelected) {
      this.setState({
        showUnitError: true
      })
    } else if (unitSelected.item.id === 'other') {
      const { unitTyped } = this.state
      if (unitTyped.length === 0) {
        this.setState({
          showUnitError: true
        })
      } else {
        this.setState({
          showUnitError: false
        }, this.writeUnitToDatabase())
      }
    } else {
      this.showUnitOnUI(unitSelected.item.title)
      this.closeUnitModal()
    }
  }

  writeUnitToDatabase = () => {
    const { unitTyped } = this.state

    //write this category to database and refresh loadout of categories 

    this.showUnitOnUI(unitTyped)
    this.closeUnitModal()
  }

  showUnitOnUI = (unit) => {
    this.setState({
      unitToRender: unit,
      inventoryUnit: unit
    })
  }

  getUnits = async () => {

    var inventoryUnitList = [{ 'id': 'other', title: 'Other' }]
    const inventoryCategoryCollection = firebase.firestore().collection('units')
    await inventoryCategoryCollection
      .get()
      .then(function (querySnapShot) {
        querySnapShot.forEach(function (doc) {
          let categoryObject = {}
          categoryObject.id = doc.id
          categoryObject.title = doc.data().title
          inventoryUnitList.push(categoryObject)
        })
      })

    this.setState({
      inventoryUnits: inventoryUnitList
    })

  }

  selectUnitItem = (itemObject) => {
    if (itemObject.item.id === 'other') {
      this.setState({
        showAddUnitSection: true,
        unitSelected: itemObject,
      })
    } else {
      this.setState({
        showAddUnitSection: false,
        unitSelected: itemObject
      })
    }
  }

  UnitItem = (toRenderItem) => {
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
    if (this.state.unitSelected) {
      toRenderTickIcon = this.state.unitSelected.item.id === toRenderItem.item.id
    }

    const component =
      <View style={styles.eachUnitContainer}>
        <TouchableOpacity style={styles.contentContainerStyle} onPress={() => this.selectUnitItem(toRenderItem)} >
          {toRenderTickIcon
            ? <Icon nameIOS='ios-checkmark' nameAndroid='md-checkmark' style={styles.iconStyle} />
            : null}
          <Text>{toRenderItem.item.title}</Text>
        </TouchableOpacity>
      </View>


    return component
  }

  openUnitModal = () => {
    this.setState({
      showUnitModal: true
    })
  }

  closeUnitModal = () => {
    this.setState({
      showUnitModal: false
    })
  }

  setUnitTyped = (text) => {
    this.setState({
      unitTyped: text
    })
  }

  // ----------------- IMAGE MODAL -------------------------

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

  updateImagePickerValue = (value) => {
    if (value !== "") {
      this.setState({
        imagePickerValue: value,
      }, () => { this.uploadImageOnClick() })
    }
  }

  updateInventoryTypePickerValue = (value) => {
    this.setState({
      showInventoryTypePicker: false
    })
    if (value !== "") {
      this.setState({
        inventoryTypePickerValue: value
      })
    }
  }



  // ---------------- MAIN SCREEN --------------------------

  render() {
    const {
      navigation
    } = this.props

    const {
      mainContainer,
      headingContainerStyle,
      allInputsContainer,
      subHeadingStyle,
      categoryInputContainer,
      categoryContainer,
      categoryTextStyle,
      inputContainerStyle,
      addImageContainer,
      imageContainer,
      imageStyle,
      addButtonStyle,
      buttonContainer,
      errorStyle,
      subTextStyle,
      imageContainerStlye
    } = styles

    const subHeadingErrorStyling = {
      ...subTextStyle,
      ...errorStyle,
      color: colors.errorRed
    }

    const screen = (
      <ScrollView style={mainContainer}>
        <Back
          style={{ ...commonStyling.backButtonStyling }}
          onPress={() => navigation.goBack()} />

        <Heading
          title='Add Inventory'
          containerStyle={headingContainerStyle} />

        <View style={allInputsContainer}>
          <View style={categoryContainer}>
            <Text style={subHeadingStyle}>Inventory Category</Text>
            {this.state.inventoryCategorySelectionError
              ? <Text style={subHeadingErrorStyling}>{this.state.inventoryCategorySelectionError}</Text>
              : null}
            <TouchableOpacity style={categoryInputContainer} onPress={this.openCategoryModal}>
              <Text style={categoryTextStyle}>{this.state.categoryNameToRender}</Text>
            </TouchableOpacity>
          </View>

          {this.getCategoryModal()}

          <InputWithSubHeading
            containerStyle={inputContainerStyle}
            secureTextEntry={false}
            placeholder={'Enter Item Title.'}
            subHeadingTitle={strings.inventoryDocumentName}
            autoCorrect={false}
            onChangeText={this.setInventoryName}
            autoCapitalize='words'
            subHeadingStyle={subHeadingStyle}
            errorTitle={this.state.inventoryTitleError}
            errorStatus={this.state.inventoryTitleError} />

          <View style={{ ...categoryContainer }}>
            <Text style={subHeadingStyle}>Unit</Text>
            {this.state.unitSelectionError
              ? <Text style={subHeadingErrorStyling}>{this.state.unitSelectionError}</Text>
              : null}
            <TouchableOpacity style={{ ...categoryInputContainer }} onPress={this.openUnitModal}>
              <Text style={{ ...categoryTextStyle }}>{this.state.unitToRender}</Text>
            </TouchableOpacity>
          </View>

          {this.getUnitModal()}

          <InputWithSubHeading
            containerStyle={inputContainerStyle}
            secureTextEntry={false}
            placeholder={'Enter Price'}
            subHeadingTitle={'Price'}
            autoCorrect={false}
            keyboardType='number-pad'
            onChangeText={this.setInventoryPrice}
            subHeadingStyle={subHeadingStyle}
            errorTitle={this.state.pricePerUnitError}
            errorStatus={this.state.pricePerUnitError} />

        </View>

        <View style={addImageContainer}>
          <Text style={subHeadingStyle}>Add Image</Text>
          <View style={imageContainer}>
            {this.state.imageUri != null ? (
              <ImageBackground style={imageStyle} imageStyle={imageStyle} source={{ uri: this.state.imageUri }}>
                {this.state.imageHasBeenUploaded
                  ? <TouchableOpacity style={imageContainerStlye} onPress={this.openImagePickerModal} />
                  : null}
                {!this.state.imageHasBeenUploaded
                  ? <Icon onPress={this.openImagePickerModal} nameIOS='ios-add' nameAndroid='md-add' size={60} />
                  : null}
              </ImageBackground>
            ) : (
                <ImageBackground style={imageStyle} imageStyle={imageStyle}>
                  <Icon onPress={this.openImagePickerModal} nameIOS='ios-add' nameAndroid='md-add' size={60} />
                </ImageBackground>
              )}
          </View>
        </View>

        {this.getImageModal()}

        <View style={buttonContainer}>
          <Button
            title={strings.addInventoryText}
            onPress={this.submitButtonOnClick}
            style={addButtonStyle}
            textColor={colors.colorAccent}
            isLoading={this.state.showLoadingDialog} />
        </View>
      </ScrollView>
    )


    return screen
  }


  // ----------------- DATABASE FUNCTIONS -------------------

  uploadInventory = async () => {
    const {
      inventoryType,
      documentName,
      inventoryName,
      quantityAvailable,
      pricePerUnit,
      imageUri,
      imageAWSURL,
      inventoryUnit
    } = this.state

    var imageURL = await this.uploadImageToAWS()

    if (!imageURL) {
      Alert.alert("Image not uploaded, Try Again.")

    } else {
      this.setState({
        imageAWSURL: imageURL
      })
    }

    const inventoryObject = {
      name: inventoryName,
      price_per_unit: pricePerUnit,
      unit: inventoryUnit,
      type: inventoryType,
      imageURL: imageURL
    }

    const firestore = firebase.firestore()

    // firestore
    //   .collection("products")
    //   .set(inventoryObject, { merge: true })

    //Add a new document with a generated id.
    var writtenDocID = null
    await firestore.collection("products").add(inventoryObject)
      .then(function (docRef) {
        writtenDocID = docRef.id
        this.setState({
          showLoadingDialog: false
        })
      })
      .catch(function (error) {
        Alert.alert("Error adding inventory, try again: ", error);
      });

    const inventoryReference = "/products/" + writtenDocID

    firestore
      .collection("suppliers")
      .doc("carlsberg") //Will be dynamic based on the logged in user
      .update({
        inventory: firebase.firestore.FieldValue.arrayUnion(firebase.firestore().doc(inventoryReference))
      })
      .then(function (error) {
        Alert.alert("Inventory added to your account successuly.")
      })
      .catch(function (error) {
        Alert.alert("Error adding inventory to your account, try again.", error)
      })
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


}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
  },
  backButtonStyle: {
    ...commonStyling.backButtonStyling
  },
  uploadButtonStyle: {
    width: '50%',
    backgroundColor: colors.colorPrimary,
    marginTop: dimens.screenSafeUpperNotchDistance,
    marginLeft: dimens.screenHorizontalMargin

  },
  headingContainerStyle: {
    width: '100%',
    textAlign: 'left',
    marginTop: dimens.screenSafeUpperNotchDistance + 70,
    marginLeft: dimens.screenHorizontalMargin
  },
  categoryInputContainer: {
    height: dimens.textInputHeight,
    justifyContent: 'center'
  },
  allInputsContainer: {
    marginLeft: dimens.screenHorizontalMargin + 8,
    marginRight: dimens.screenHorizontalMargin + 8,
  },
  categoryContainer: {
    flexDirection: 'column',
    marginTop: 18,
    borderBottomColor: colors.blackTransluscent,
    borderBottomWidth: dimens.inputTextBorderWidth,
  },
  categoryTextStyle: {
    color: colors.grayTransluscent,
    fontFamily: customFonts.regular,
    fontSize: dimens.inputTextFontSize
  },
  modalContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.blackTransluscent,
    alignItems: 'center'
  },
  modalContentContainerStyle: {
    width: 320,
    height: 260,
    backgroundColor: colors.colorAccent,
    borderRadius: dimens.defaultBorderRadius
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
  itemNameModal: {
    fontSize: 23,
    width: 290,
    textAlign: 'center',
    fontFamily: customFonts.semiBold,
    color: colors.colorPrimary,
    marginTop: 8
  },
  modalButtonContainer: {
    marginTop: 30,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center'
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
  inputContainerStyle: {
    marginTop: 18
  },
  imageContainer: {
    width: '100%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    width: 230,
    height: 230,
    borderWidth: 0.4,
    borderRadius: dimens.defaultBorderRadius,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subHeadingStyle: {
    fontSize: 13,
    color: colors.blackTransluscent,
    fontFamily: customFonts.semiBold
  },
  addImageContainer: {
    marginTop: 8,
    marginLeft: dimens.screenHorizontalMargin,
    marginRight: dimens.screenHorizontalMargin,
    padding: 8
  },
  addButtonStyle: {
    backgroundColor: colors.submitGreen,
    width: '90%',
  },
  buttonContainer: {
    marginTop: 40,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorStyle: {
    marginTop: 8
  },
  subTextStyle: {
    fontSize: 13,
    fontFamily: customFonts.regular
  },
  imageContainerStlye: {
    width: '100%',
    height: '100%'
  }
})

SupplierAddInventoryScreen.navigationOptions = {
  header: null
}

export default SupplierAddInventoryScreen