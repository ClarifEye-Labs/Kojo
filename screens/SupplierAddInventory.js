import React, {useRef, useEffect, Component} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Back, Heading, InputWithSubHeading, Button } from '../Components'
import { dimens, colors, strings} from '../constants'
import { commonStyling } from '../common' 
import firebase from '../config/firebase'

class SupplierAddInventoryScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
        inventoryType: '',
        documentName: '',
        inventoryName: '',
        quantityAvailable: '',
        pricePerUnit: '',
        inventoryAddSuccess: false
    }
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
      tandcText
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