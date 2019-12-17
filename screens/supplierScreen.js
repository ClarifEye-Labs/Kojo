import React from 'react'
import { Text, Image, View, StyleSheet } from 'react-native'
import {BlackOverlay, BackgroundImage, LandingContentView, OutlineButton} from '../Components'
import colors from '../constants/colors'
import firebase from '../config/firebase'


//firestore db
firestore = firebase.firestore();
const SupplierScreen = (props) => {

    firestore.collection('clients').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
         const name = doc.data().name
         const supplierData = doc.data().suppliers
         supplierData.forEach((supplierDoc) => supplierDoc.get().then(snap => {console.log(snap.data())}))
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
  
    return (
        <View>
            <Text>Hello World</Text>
        </View>
    )

}

export default SupplierScreen