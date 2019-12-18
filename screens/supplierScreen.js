import React, {useState, useEffect} from 'react'
import { Text, Image, View, StyleSheet } from 'react-native'
import firebase from '../config/firebase'
import {Button} from '../Components'
import { dimens, colors } from '../constants'
import { commonStyling } from '../common'
import SupplierInventoryScreen from './supplierInventoryScreen'
import supplierClientsScreen from './supplierClientsScreen'


//Function to support async await in forEach
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }


const SupplierScreen = (props) => {

    const [name, setSupplierName] = useState('')
    const [inventory, setSupplierInventory] = useState([])
    const [clients, setSupplierClient] = useState('')
    const {
        mainContainer,
        submitButton
      } = styles


    useEffect(() => {
        console.log("useEffectCalled")
        firestore = firebase.firestore();
        suppliersData = firestore.collection('suppliers')
        setDataFromFirestore(suppliersData,'carlsberg') //Here the second parameter will come from props, from login screen, once authentication is complete

      }, []); //Added the second argument to call it only once


      setDataFromFirestore = async (suppliersData, supplierID) => {
          console.log("setMethodCalled");
        let supplierInventoryReference
        let supplierClientReference
        let supplierInventoryData = []
        let supplierClientData = []
        let supplierName
        await suppliersData.doc(supplierID).get().then((docRef) => {
            docData = docRef.data()
            supplierName = docData.name
            supplierInventoryReference = docData.inventory
            supplierClientReference = docData.clients
           
        }).catch((err) => {
            console.log('Error getting documents', err);
        })

                    
    const fillInventory = async () =>  {
            supplierInventoryData = []
            await asyncForEach(supplierInventoryReference, async (inventory) =>  {
            
            await inventory.get().then(async (inventoryData) => {
                console.log("pushedd")
                await supplierInventoryData.push(inventoryData.data())
                
            }).catch((err) => {
                console.log('Error getting documents', err);
            })

            
        }) 

        setSupplierInventory(supplierInventoryData)
    }

    const fillClients = async () => {

        await asyncForEach(supplierClientReference, async (client) => {
            console.log("calling clientss")
            await client.get().then(async (clientData)  => {
                await supplierClientData.push(clientData.data().name)
                console.log(supplierClientData)
            }).catch((err) => {
                console.log('Error getting documents', err);
            })
        })

        setSupplierClient(supplierClientData)
        console.log(inventory)
        console.log(clients)

    }


    setSupplierName(supplierName)
    fillInventory()
    fillClients()
 
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
    <Text>{JSON.stringify(inventory)}</Text>
    <Text>{JSON.stringify(clients)}</Text>
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