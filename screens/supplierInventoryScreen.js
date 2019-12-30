import React, { Component } from 'react';
import { SectionList, View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { Loading, Heading, Card } from '../Components'
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
        sections={this.props.dummyInventory}
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
    sectionContentText
  } = styles

  const sectionContentToRender = <View style={sectionContentContainerOuter}>
    <Card height={120} width='100%' elevation={4}>
      <TouchableOpacity>
        <View style={sectionContentContainerInner}>
          <Text style={sectionContentText}>{sectionContent}</Text>
        </View>
      </TouchableOpacity>
    </Card>
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
    height: 120,
    marginTop: 4,
    marginBottom: 4,
    alignItems: 'center',
    width: '100%'
  },
  sectionContentContainerInner:{
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft: dimens.screenHorizontalMargin,
    paddingRight: dimens.screenHorizontalMargin
  },
  sectionContentText:{
    fontFamily: customFonts.semiBold,
    fontSize: 23,
    color: colors.blackTransluscent
  }
})



SupplierInventoryScreen.navigationOptions = {
  title: 'Inventory'
}

export default connect(mapStateToProps)(SupplierInventoryScreen)