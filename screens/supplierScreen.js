import React, {useState, useEffect} from 'react'
import { Text, Image, View, StyleSheet } from 'react-native'
import firebase from '../config/firebase'
import {Button} from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common'
import SupplierInventoryScreen from './supplierInventoryScreen'
import supplierClientsScreen from './supplierClientsScreen'


const SupplierScreen = (props) => {

    const [name, setSupplierName] = useState('')
    const [inventory, setSupplierInventory] = useState('loading')
    const [clients, setSupplierClient] = useState('loading')
    const {
        mainContainer,
        submitButton
      } = styles


    useEffect(() => {

        firestore = firebase.firestore();
        suppliersData = firestore.collection('suppliers')
        setDataFromFirestore(suppliersData,'angliss') //Here the second parameter will come from props, from login screen, once authentication is complete

      });

      setDataFromFirestore = async (suppliersData, supplierID) => {
        let supplierInventoryReference
        let supplierClientReference
        await suppliersData.doc(supplierID).get().then((docRef) => {
            docData = docRef.data()
            setSupplierName(docData.name)
            supplierInventoryReference = docData.inventory
            supplierClientReference = docData.clients
        }).catch((err) => {
            console.log('Error getting documents', err);
        })
    
        await supplierInventoryReference.forEach((inventory) => {
            inventory.get().then((inventoryData) => {
                setSupplierInventory(inventoryData.data())
            }).catch((err) => {
                console.log('Error getting documents', err);
            })
        })
    
        await supplierClientReference.forEach((client) => {
            client.get().then((clientData) => {
                setSupplierClient(clientData.data())
            }).catch((err) => {
                console.log('Error getting documents', err);
            })
        })
 
    }

    const screen =         
    (<View style={mainContainer}>
    <Text>Hello {name}</Text>
    <Button 
          title='Inventory' 
          textColor={colors.colorAccent} 
          style={submitButton}/>
    <Button 
    title='Client List' 
    textColor={colors.colorAccent} 
    style={submitButton}/>

    </View>)


    return screen

}

const styles = StyleSheet.create({
    mainContainer: {
      ...commonStyling.mainContainer,
      alignItems: 'center',
      justifyContent: 'center'
    },
    submitButton:{
        backgroundColor: colors.colorPrimary,
        marginTop: 60,
        width: '100%'
      }
  })
  




export default SupplierScreen