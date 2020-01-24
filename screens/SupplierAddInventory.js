import React, {useRef, useEffect, Component} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert, Picker } from 'react-native'
import { Back, Heading, InputWithSubHeading, Button, DropDownWithSubHeading } from '../Components'
import { dimens, colors, strings} from '../constants'
import { commonStyling } from '../common' 
import firebase from '../config/firebase'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { RNS3 } from 'react-native-aws3'





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
        inventoryCategories: null

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
      mainContainer,
      headingContainerStyle,
      buttonStyle,
      allInputsContainer,
      subHeadingStyle,
      termsStyle,
      tandcContainer,
      termsContainer,
      tandcText,
      uploadButtonStyle
    } = styles

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
  
    const screen = (
    <View style={mainContainer}>
      <Back 
        style={{...commonStyling.backButtonStyling}}
        onPress={()=> navigation.goBack()}/>

      <Heading 
        title="Add Inventory"
        containerStyle={headingContainerStyle} />
        
      <View style={allInputsContainer}>
        
        <DropDownWithSubHeading
          subHeadingStyle={subHeadingStyle}
          subHeadingTitle= "Inventory Type"
          disabled = {false}
          options = {this.state.inventoryCategories}
          onSelect = {(typeIndex) => {this.setInventoryType(typeIndex)}}
        />

        <InputWithSubHeading 
          secureTextEntry={false}
          placeholder = {strings.inventoryDocumentNamePlaceholderText}
          subHeadingTitle={strings.inventoryDocumentName}
          autoCorrect={false}
          onChangeText={this.setInventoryDocumentName}
          autoCapitalize='words'
          subHeadingStyle={subHeadingStyle}/>


        <InputWithSubHeading 
          secureTextEntry={false}
          placeholder = {strings.inventoryNamePlaceholderText}
          autoCompleteType='name'
          subHeadingTitle={strings.inventoryName}
          autoCorrect={false}
          onChangeText={this.setInventoryName}
          autoCapitalize='none'
          subHeadingStyle={subHeadingStyle}/>

         <InputWithSubHeading 
          secureTextEntry={false}
          placeholder = {strings.inventoryQuantityAvailablePlaceholderText}
          autoCompleteType='name'
          subHeadingTitle={strings.inventoryQuantityAvailable}
          autoCorrect={false}
          onChangeText={this.setInventoryQuantity}
          autoCapitalize='none'
          subHeadingStyle={subHeadingStyle}/>
          
          <InputWithSubHeading 
          secureTextEntry={false}
          placeholder = {strings.inventoryPricePerUnit}
          autoCompleteType='name'
          onChangeText={this.setInventoryPrice}
          subHeadingTitle={strings.inventoryPricePerUnitPlaceholderText}
          autoCorrect={false}
          autoCapitalize='none'
          subHeadingStyle={subHeadingStyle}/>  

        <Button 
        title={strings.inventoryUploadImage}
        textColor={colors.colorAccent}
        onPress = {()=> {this.setState({showImagePicker:true})}}
        style={uploadButtonStyle} />
        {renderImagePicker()}
      </View>


    

      <Button 
        title={strings.addInventoryText}
        textColor={colors.colorAccent}
        onPress = {this.submitButtonOnClick}
        style={buttonStyle} />

      
    </View>
    )
    

    return screen
  }
}

const styles = StyleSheet.create({
    mainContainer: {
      ...commonStyling.mainContainer,
      alignItems: 'center',
      paddingLeft: dimens.screenHorizontalMargin,
      paddingRight: dimens.screenHorizontalMargin
    },
    backButtonStyle: {
      ...commonStyling.backButtonStyling
    },
    headingContainerStyle:{
      width: '100%',
      textAlign: 'left',
      marginTop: dimens.screenSafeUpperNotchDistance + 60
    },
    buttonStyle:{
      width: '90%',
      backgroundColor: colors.colorPrimary,
      marginTop: 35
    },
    uploadButtonStyle:{
        width: '51%',
        backgroundColor: colors.facebookBlue,
        marginTop: 35,

    },
    subHeadingStyle: {
      marginTop: 16
    },
    termsStyle: {
      textAlign: 'center',
      fontSize: 15,
      color: colors.blackTransluscent
    },
    allInputsContainer:{
      width: '100%',
      padding: 8,
      marginTop: 20,
      marginBottom: 10
    },
    tandcContainer:{
      flexDirection: 'row',
      width: '100%',
      marginTop: 2,
      alignItems: 'center'
    },
    tandcText:{
      fontSize: 15,
      color: colors.colorPrimary
    },
    termsContainer: {
      marginTop: 8
    }
  })

SupplierAddInventoryScreen.navigationOptions = {
  header: null
}

export default SupplierAddInventoryScreen