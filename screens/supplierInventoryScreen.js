import React, { Component } from 'react';
import { SectionList, View, StyleSheet, Text, TouchableOpacity, ImageBackground, Button} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { Loading, Header, Card, SearchIcon } from '../Components'
import { dimens, colors, customFonts } from '../constants'
import { commonStyling } from '../common' 
import * as Animatable from 'react-native-animatable'
import firebase from '../config/firebase'
import Utils from '../utils/Utils';
import {connect} from 'react-redux';

class SupplierInventoryScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
        name: 'SupplierInventoryScreen',
        loadingContent: false,
        firestore: undefined,
        suppliersData: undefined,
        supplierID: 'carlsberg',
        inventory: undefined,
        search: '',
        showSearch: false,
        dummyInventory: [
          {title: 'Alcohol', data: [
            {name :"asahi super dry draught 20L",
            price_per_unit: 350,
            imageURL: 'https://screenshotlayer.com/images/assets/placeholder.png',
            quantity_available: "3 KEG"},
            {name :"asahi super dry draught 20L",
            price_per_unit: 350,
            imageURL: 'https://screenshotlayer.com/images/assets/placeholder.png',
            quantity_available: "3 KEG"},
            {name :"asahi super dry draught 20L",
            price_per_unit: 350,
            imageURL: 'https://screenshotlayer.com/images/assets/placeholder.png',
            quantity_available: "3 KEG"},
            {name :"asahi super dry draught 20L",
            price_per_unit: 350,
            imageURL: 'https://screenshotlayer.com/images/assets/placeholder.png',
            quantity_available: "3 KEG"}] },  
          {title: 'Dairy', data: [
              { name :"Milk",
              price_per_unit: 20,
              imageURL: 'https://screenshotlayer.com/images/assets/placeholder.png',
              quantity_available: "3 L"},
              { name :"Milk",
              price_per_unit: 20,
              imageURL: 'https://screenshotlayer.com/images/assets/placeholder.png',
              quantity_available: "3 L"},
              { name :"Milk",
              price_per_unit: 20,
              imageURL: 'https://screenshotlayer.com/images/assets/placeholder.png',
              quantity_available: "3 L"},
              { name :"Milk",
              price_per_unit: 20,
              imageURL: 'https://screenshotlayer.com/images/assets/placeholder.png',
              quantity_available: "3 L"}]}
        ]
    }
  }

  updateSearch = search => {
    this.setState({search})
  }

  showSearchPanel = () => {
    this.setState({
      showSearch: true
    })
  }

  componentDidMount = () => {
    var firestore = firebase.firestore()
    var suppliersData = firestore.collection('suppliers')

    this.props.navigation.setParams({ showSearchPanel: this.showSearchPanel }); 
    this.setState({
      firestore: firestore,
      suppliersData: suppliersData
    }, () => this.getDataFromDatabase(this.state.suppliersData,this.state.supplierID))

  }

 

  getDataFromDatabase = async (suppliersData, supplierID) => {
    let supplierInventoryReference
    let supplierInventoryData = []

    await suppliersData.doc(supplierID).get().then((docRef) => {
        supplierInventoryReference = docRef.data().inventory
    }).catch((err) => {
        console.log('Error getting documents', err);
    })

    //ready to proceed to get data 
    await Utils.asyncForEach(supplierInventoryReference, async (inventory) => {
      await inventory.get().then(async (inventoryData) => {
          await supplierInventoryData.push(inventoryData.data())
      }).catch((err) => {
          console.log('Error getting documents', err);
      })
    })

    this.setState({
      inventory: supplierInventoryData,
      loadingContent: false
    })
  }


  render() {
    console.log("inventory is")
    console.log(this.props.dummyInventory)
    const {
      mainContainer,
      headingContainerStyle,
      headingStyle
    } = styles

    const {
      navigation
    } = this.props

    const componentLoading = 
      <Loading />

    const componentLoaded = 
    <Animatable.View animation='fadeInUpBig' style={mainContainer}> 
       {this.state.showSearch ? <SearchBar
        placeholder="Type Here..."
        lightTheme = {true}
        onChangeText={this.updateSearch}
        value={this.state.search}
      /> : null }
      <SectionList   
        sections={this.state.dummyInventory}
        renderItem={({item}) => SectionContent(item)}  
        renderSectionHeader={({section}) => SectionHeader(section) }  
        keyExtractor={(item, index) => index}  
      />  
    </Animatable.View>

    const componentToRender = this.state.loadingContent ? componentLoading : componentLoaded
    

    return componentToRender
  }
}

function mapStateToProps(state) {
  return {
    dummyInventory: state.dummyInventory
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateInventory : () => dispatch({type:'UPDATE_INVENTORY'})
  }
}

const SectionHeader = (section) => {
  const { 
    sectionHeaderContainer,
    sectionHeaderTitle
  } = styles
  const sectionHeader = <View style={sectionHeaderContainer}>
    <Text style={sectionHeaderTitle}>{section.title}</Text>
  </View>

  return sectionHeader

}

const SectionContent = (sectionContent) => {
  const {
    sectionContentContainerOuter,
    sectionContentContainerInner,
    sectionContentText,
    imageStyle,
    cardContainerStyle,
    thinLine
  } = styles

  const sectionContentToRender = <View style={sectionContentContainerOuter}>
    <View style={cardContainerStyle}>
      <Card width={65} height={65} elevation={dimens.defaultBorderRadius}>
        <ImageBackground 
          style={imageStyle} 
          imageStyle={{borderRadius: dimens.defaultBorderRadius}} 
          source={{ uri: sectionContent.imageURL }} />
      </Card>
    </View>
   
    <View style={sectionContentContainerInner}>
      <TouchableOpacity>
        <Text style={sectionContentText}>{sectionContent.name}</Text>
      </TouchableOpacity>
    </View>
  </View>

  return sectionContentToRender
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer
  },
  headingContainerStyle: {
    width: '100%',
    textAlign: 'left',
    padding: dimens.screenHorizontalMargin
  },
  headingStyle: {
    fontSize: 23,
    color: colors.blackTransluscent,
    fontFamily: customFonts.semiBold
  },
  sectionHeaderContainer: {
    width: '100%',
    height: 40,
    backgroundColor: colors.colorPrimaryTransluscent,
    justifyContent: 'center',
    paddingLeft: dimens.screenHorizontalMargin
  },
  sectionHeaderTitle: {
    color: colors.colorAccent,
    fontSize: 20,
    fontFamily: customFonts.bold
  },
  sectionContentContainerOuter: {
    height: 90,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row'
  },
  sectionContentContainerInner:{
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    marginLeft: dimens.screenHorizontalMargin + 65 + dimens.screenHorizontalMargin,
    borderBottomWidth: 0.2,
    borderBottomColor: colors.blackTransluscent
  },
  sectionContentText:{
    fontFamily: customFonts.regular,
    fontSize: 17,
    color: colors.blackTransluscent
  },
  imageStyle:{
    width: '100%',
    height: '100%',
    borderRadius: dimens.defaultBorderRadius
  },
  cardContainerStyle:{
    position: 'absolute',
    left: dimens.screenHorizontalMargin
  }
})



SupplierInventoryScreen.navigationOptions = ({navigation}) => {
  return{
    title: 'Inventory',
    headerRight: () => (
      <SearchIcon 
        style={{marginRight: dimens.screenHorizontalMargin}} 
        size={30}
        color={colors.colorPrimary}
        onPress={navigation.getParam('showSearchPanel')} />
    )
  }
 
}

export default connect(mapStateToProps)(SupplierInventoryScreen)