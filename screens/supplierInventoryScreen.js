import React, { Component } from 'react';
import { SectionList, View, StyleSheet, Text, TouchableOpacity, ImageBackground} from 'react-native'
import { Loading, Heading, Card } from '../Components'
import { dimens, colors, customFonts } from '../constants'
import { commonStyling } from '../common' 
import * as Animatable from 'react-native-animatable'
import firebase from '../config/firebase'
import Utils from '../utils/Utils';

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
        dummyInventory: [
          {title: 'Alcohol', data: ['ALTERED','ABBY','ACTION U.S.A.','AMUCK','ANGUISH']},  
          {title: 'Dairy', data: ['BEST MEN','BEYOND JUSTICE','BLACK GUNN','BLOOD RANCH','BEASTIES']},  
          {title: 'Meat', data: ['CARTEL', 'CASTLE OF EVIL', 'CHANCE', 'COP GAME', 'CROSS FIRE',]},  
        ]
    }
  }

  componentDidMount = () => {
    var firestore = firebase.firestore()
    var suppliersData = firestore.collection('suppliers')

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
      {/* <Heading 
        containerStyle={headingContainerStyle}
        headingStyle={headingStyle}
        title="Hi Lorem, here is your inventory:" /> */}

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
        <ImageBackground style={imageStyle} imageStyle={{borderRadius: dimens.defaultBorderRadius}} source={require('../assets/Supplier/addItems.jpg')} />
      </Card>
    </View>
   
    <View style={sectionContentContainerInner}>
      <Text style={sectionContentText}>{sectionContent}</Text>
    </View>
  </View>

  return sectionContentToRender
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    paddingTop: dimens.screenSafeUpperNotchDistance,
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



SupplierInventoryScreen.navigationOptions = {
  title: 'Inventory'
}

export default SupplierInventoryScreen