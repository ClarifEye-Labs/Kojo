import React, {useRef, useEffect, Component} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { Back, Heading, InputWithSubHeading, Button } from '../Components'
import { dimens, colors, strings} from '../constants'
import { commonStyling } from '../common' 
import firebase from '../config/firebase'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


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

    }
  }


  componentDidMount() {
    this.getPermissionAsync();

    }

  setInventoryType = (text) => {
    this.setState({
        inventoryType: text
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
 
    // let result = await ImagePicker.launchCameraAsync();  For using camera instead of library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });


    if(!result.cancelled) {
        this.setState({imageUri: result.uri}, () => {this.uploadImageToFirebase()
            .then(()=>{Alert.alert("success")})
            .catch((error)=>{
                Alert.alert(error)
            })
        })
    }

  }

  uploadImageToFirebase = async () => {

    const response = await fetch(this.state.imageUri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child("images/" + this.state.inventoryName);
    return ref.put(blob);
    
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

    const screen = 
    <View style={mainContainer}>
      <Back 
        style={{...commonStyling.backButtonStyling}}
        onPress={()=> navigation.goBack()}/>

      <Heading 
        title="Add Inventory"
        containerStyle={headingContainerStyle} />
        
      <View style={allInputsContainer}>
        <InputWithSubHeading 
          secureTextEntry={false}
          placeholder={strings.inventoryTypeText}
          subHeadingTitle={strings.inventoryTypeSubheading}
          autoCorrect={false}
          autoCompleteType='name'
          autoCapitalize='words'
          onChangeText={this.setInventoryType}
          />

        <InputWithSubHeading 
          secureTextEntry={false}
          placeholder = {strings.inventoryDocumentNamePlaceholderText}
          autoCompleteType='name'
          subHeadingTitle={strings.inventoryDocumentName}
          autoCorrect={false}
          onChangeText={this.setInventoryDocumentName}
          autoCapitalize='none'
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
        onPress = {this.uploadImageOnClick}
        style={uploadButtonStyle} />
      </View>
    

      <Button 
        title={strings.addInventoryText}
        textColor={colors.colorAccent}
        onPress = {this.submitButtonOnClick}
        style={buttonStyle} />

    </View>
    

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