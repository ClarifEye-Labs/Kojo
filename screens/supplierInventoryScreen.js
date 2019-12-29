import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet, Text} from 'react-native'
import { Loading } from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common' 
import Spinner from 'react-native-spinkit'
import * as Animatable from 'react-native-animatable'
import firebase from '../config/firebase'
import Utils from '../utils/Utils';

class SupplierInventoryScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
        name: 'SupplierInventoryScreen',
        loadingContent: true,
        firestore: undefined,
        suppliersData: undefined,
        supplierID: 'carlsberg',
        inventory: undefined,
    }
  }

    //Function to support async await in forEach
  asyncForEach = async(array, callback) =>  {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
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
      mainContainer
    } = styles

    const {
      navigation
    } = this.props

    const componentLoading = 
      <Loading />

    const componentLoaded = 
    <Animatable.View animation='fadeInUpBig' style={mainContainer}> 
      <Text> {JSON.stringify(this.state.inventory)}</Text>
    </Animatable.View>

    const componentToRender = this.state.loadingContent ? componentLoading : componentLoaded
    

    return componentToRender
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyling.mainContainer,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default SupplierInventoryScreen