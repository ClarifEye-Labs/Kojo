import React, {useRef, useEffect, Component} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Modal, Alert, Picker, TouchableWithoutFeedback, FlatList } from 'react-native'
import { Back, Heading, InputWithSubHeading, Button, DropDownWithSubHeading } from '../Components'
import { dimens, colors, strings, customFonts} from '../constants'
import { commonStyling } from '../common' 
import firebase from '../config/firebase'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { RNS3 } from 'react-native-aws3'
import { ScrollView } from 'react-native-gesture-handler'





class SupplierAddInventoryScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
        inventoryType: '',
        documentName: '',
        inventoryName: '',
        quantityAvailable: '',
        pricePerUnit: '',
        imageUri : '',
        inventoryAddSuccess: false,
        showImagePicker: false,
        showInventoryTypePicker: false,
        imagePickerValue : null,
        inventoryTypePickerValue: null,
        inventoryCategories: null,
        showCategoryModal: false

    }
  }


  componentDidMount() {
    this.getPermissionAsync();
    this.getInventoryTypes();

    }


  getInventoryTypes = async () => {

    let inventoryTypes = []
    const firestore = firebase.firestore()
    const inventoryTypeCollection = firestore.collection('product_type')
    await inventoryTypeCollection
    .get()
    .then(
      function(querySnapShot){
        querySnapShot.forEach(function(doc){
          inventoryTypes.push(doc.data().type)
        })
      }
    )

    inventoryTypes.push("Other")

    this.setState({
      inventoryCategories: inventoryTypes
    })



  }

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

  submitButtonOnClick = async () => {
      await this.addInvetorytoFirestore()
      this.setState({
          inventoryAddSuccess: true
      })
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }


  uploadImageOnClick = async () => {
 
    // let result = await ImagePicker.launchCameraAsync(); 
    var result = null
    if(this.state.imagePickerValue == "library")
    {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });

    } 

    else if(this.state.imagePickerValue == "camera")
    {
      result = await ImagePicker.launchCameraAsync(); 

    }




    if(!result.cancelled) {
        this.setState({imageUri: result.uri}, () => {this.uploadImageToAWS()
            .then(()=>{Alert.alert("success")})
            .catch((error)=>{
                Alert.alert(error)
            })
        })
    }

  }

  uploadImageToAWS = async () => {

    const response = await fetch(this.state.imageUri);
    const blob = await response.blob();

    const file = {
      uri: this.state.imageUri,
      name: this.state.inventoryName,
      type: 'image/png'
    }
    const config = {
      keyPrefix: 's3/',
      bucket: 'testbuckettutoriall',
      region: 'us-east-1',
      accessKey: 'AKIA2QICFMTIIBYNRIAN',
      secretKey: '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',
      successActionStatus: 201
    }

    RNS3.put(file, config)
    .then(
      (response)=>{
        console.log(response)
      }
    )
    // var ref = firebase.storage().ref().child("images/" + this.state.inventoryName);
    // return ref.put(blob);
    
  }

  closeCategoryModal = () => {
    this.setState({
      showCategoryModal: false
    })
  }

  openCategoryModal = () => {
    this.setState({
      showCategoryModal: true
    })
  }

  getCategoryModal = () => {
    const styles = {
      modalContainerStyle: {
        flex: 1,
        justifyContent: 'center', 
        backgroundColor: colors.blackTransluscent, 
        alignItems: 'center'
      },
      mainContainer: {
        width: '100%',
        height: '100%',
        marginTop: 120,
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
      },
      pickCategoryContainer: {
        width: '100%',
        marginTop: 35,
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
        paddingHorizontal: dimens.screenHorizontalMargin,
        marginTop: 8,
        marginBottom: 20,
        height: 3000,
        backgroundColor: colors.whiteTransluscent,
        borderTopWidth: dimens.inputTextBorderWidth,
        borderTopColor: colors.grayTransluscent,
        borderBottomWidth: dimens.inputTextBorderWidth,
        borderBottomColor: colors.grayTransluscent,
      },
      eachCategoryContainer: {
        height: dimens.textInputHeight,
        borderBottomWidth: dimens.inputTextBorderWidth,
        borderBottomColor: colors.grayTransluscent,
        justifyContent: 'center'
      }
    }
    return (
      <Modal 
        visible={this.state.showCategoryModal} 
        transparent={true} 
        animationType='slide' 
        onBackButtonPress={this.closeDeleteModal}>
        <TouchableOpacity 
          activeOpacity={1}  
          onPressOut={this.closeCategoryModal} 
          style={styles.modalContainerStyle}>

          <TouchableWithoutFeedback>
            <View style={styles.mainContainer}>

              <TouchableOpacity style={styles.cancelButton} onPress={this.closeCategoryModal}>
                <Text style={styles.subHeadingButtons}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.setButton} onPress={this.closeCategoryModal}>
                  <Text style={styles.subHeadingButtons}>Set</Text>
              </TouchableOpacity>

              <View style={styles.headingContainer}>
                <Text style={styles.headingStyle}>Choose Category</Text>
              </View>

              <ScrollView>
                <View style={styles.addCategoryContainer}>
                  <Text style={styles.sectionHeading}>ADD</Text>
                  <InputWithSubHeading 
                    containerStyle={styles.inputContainerStyle}
                    secureTextEntry={false}
                    placeholder = {'Enter Item Category'}
                    subHeadingTitle={strings.inventoryDocumentCategory}
                    autoCorrect={false}
                    onChangeText={this.setInventoryCategory}
                    autoCapitalize='words'/>
                </View>

                <View style={styles.pickCategoryContainer}>
                  <Text style={styles.sectionHeading}>PICK</Text>
                  <View
                    style={styles.categoryListContainer}>
                    {this.getInventoryCategories().map(
                      item => {
                        return(<View style={styles.eachCategoryContainer}>
                          <Text>{item.title}</Text>
                        </View> )
                      }) }
                    {/* <FlatList
                      contentContainerStyle={styles.categoryListContainer}
                      data={this.getInventoryCategories()}
                      renderItem={({ item }) => (
                       }
                      keyExtractor={item => item.id}
                    /> */}
                  </View>

                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    )
  }

  getInventoryCategories = () => {
    return [
      {id: 'Alocohol', title: 'Alcohol'},
      {id: 'Dairy', title: 'Dairy'},
      {id: 'Alocohol', title: 'Alcohol'},
      {id: 'Dairy', title: 'Dairy'},
      {id: 'Alocohol', title: 'Alcohol'},
      {id: 'Dairy', title: 'Dairy'},
      {id: 'Alocohol', title: 'Alcohol'},
      {id: 'Dairy', title: 'Dairy'},
      {id: 'Alocohol', title: 'Alcohol'},
      {id: 'Dairy', title: 'Dairy'},
      {id: 'Alocohol', title: 'Alcohol'},
      {id: 'Dairy', title: 'Dairy'},
      {id: 'Alocohol', title: 'Alcohol'},
      {id: 'Dairy', title: 'Dairy'},
      {id: 'Alocohol', title: 'Alcohol'},
      {id: 'Dairy', title: 'Dairy'},
      {id: 'Alocohol', title: 'Alcohol'},
      {id: 'Dairy', title: 'Dairy'},
      {id: 'Alocohol', title: 'Alcohol'},
      {id: 'Dairy', title: 'Dairy'},
      {id: 'Alocohol', title: 'Alcohol'},
      {id: 'Dairy', title: 'Dairy'},
      {id: 'Alocohol', title: 'Alcohol'},
      {id: 'Dairy', title: 'Dairy'},
    ]
  }

  addInvetorytoFirestore = () => {
    const {
        inventoryType,
        documentName,
        inventoryName,
        quantityAvailable,
        pricePerUnit
    } = this.state

    const inventoryObject = {
        name: inventoryName,
        price_per_unit: pricePerUnit,
        quantity_available: quantityAvailable,
        type: inventoryType
    }

    const firestore = firebase.firestore()

    firestore
        .collection("products")
        .doc(documentName)
        .set(inventoryObject, {merge: true})

    const inventoryReference = "/products/" + documentName

    firestore
        .collection("suppliers")
        .doc("carlsberg") //Will be dynamic based on the logged in user
        .update({
            inventory: firebase.firestore.FieldValue.arrayUnion(firebase.firestore().doc(inventoryReference))
        })
    
    
  }

  updateImagePickerValue = (value) => {

    this.setState({
      showImagePicker: false
    })

    if(value != "")
    {
      this.setState({
        imagePickerValue : value,
      }, () => { this.uploadImageOnClick() })

    }

  }

  updateInventoryTypePickerValue = (value) => {

    this.setState({
      showInventoryTypePicker: false
    })

    if(value != "")
    {
      this.setState({
        inventoryTypePickerValue: value  
      })
    }

  }




  render() {
  

    const {
      navigation
    } = this.props

    const renderImagePicker = () => {
      if(this.state.showImagePicker)
      {
        return (
          <Picker selectedValue = {this.state.imagePickerValue} onValueChange = {this.updateImagePickerValue}>
          <Picker.Item label = "" value = "" />
            <Picker.Item label = "Choose from library" value = "library" />
            <Picker.Item label = "Click from camera" value = "camera" />
          </Picker>
  
        );
      }
    }
  

    const {
      mainContainer,
      headingContainerStyle,
      allInputsContainer,
      subHeadingStyle,
      categoryInputContainer,
      categoryContainer,
      categoryTextStyle,
      inputContainerStyle
    } = styles

    const screen = (
    <View style={mainContainer}>
      <Back 
        style={{...commonStyling.backButtonStyling}}
        onPress={()=> navigation.goBack()}/>

      <Heading 
        title='Add Inventory'
        containerStyle={headingContainerStyle} />
        
      <View style={allInputsContainer}>
          <View style={categoryContainer}>
            <Text style={subHeadingStyle}>Inventory Category</Text>
            <TouchableOpacity style={categoryInputContainer} onPress={this.openCategoryModal}>
              <Text style={categoryTextStyle}>Touch to add category</Text>
            </TouchableOpacity>
          </View>

          {this.getCategoryModal()}

          <InputWithSubHeading 
            containerStyle={inputContainerStyle}
            secureTextEntry={false}
            placeholder = {'Enter Item Title.'}
            subHeadingTitle={strings.inventoryDocumentName}
            autoCorrect={false}
            onChangeText={this.setInventoryName}
            autoCapitalize='words'
            subHeadingStyle={subHeadingStyle}/>
          
          <InputWithSubHeading 
            containerStyle={inputContainerStyle}
            secureTextEntry={false}
            placeholder = {'Enter Item Name.'}
            subHeadingTitle={strings.inventoryDocumentName}
            autoCorrect={false}
            onChangeText={this.setInventoryName}
            autoCapitalize='words'
            subHeadingStyle={subHeadingStyle}/>

          


      </View>



      {/* <Button 
      title={strings.inventoryUploadImage}
      textColor={colors.colorAccent}
      onPress = {()=> {this.setState({showImagePicker:true})}}
      style= />
      {renderImagePicker()} */}
      
      {/* <Button 
        title={strings.addInventoryText}
        textColor={colors.colorAccent}
        onPress = {this.submitButtonOnClick}
        style={buttonStyle} />  */}

      </View>
    )
    

    return screen
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
  },
  backButtonStyle: {
    ...commonStyling.backButtonStyling
  },
  headingContainerStyle:{
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
  inputContainerStyle: {
    marginTop: 18
  }

})

SupplierAddInventoryScreen.navigationOptions = {
  header: null
}

export default SupplierAddInventoryScreen