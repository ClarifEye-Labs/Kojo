import { setInventoryData } from '../actions/setInventoryData'
import collectionNames from '../../config/collectionNames'
import firebase from '../../config/firebase'

const watchInventoryData = (supplierID) => {
    return function (dispatch) {
        const db = firebase.firestore()
        let inventoryRefArray = []
        db
            .collection('suppliers')
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot(
                function (doc) {
                    if (doc.exists) {
                        let data = doc.data()
                        inventoryRefArray = data.inventory
                        if (inventoryRefArray) {
                            let products = []
                            for (let index in inventoryRefArray) {
                                let inventoryRef = inventoryRefArray[index]
                                db
                                    .doc(inventoryRef)
                                    .onSnapshot(
                                        (doc) => {
                                            if (doc.exists) {
                                                let product_found = false
                                                for (let idx in products) {
                                                    if (doc.id == products[idx].id) {
                                                        products[idx] = { ...{ id: doc.id }, ...{ ...doc.data() } }
                                                        product_found = true
                                                    }
                                                }
                                                if (product_found == false) {
                                                    products.push({ ...{ id: doc.id }, ...{ ...doc.data() } })
                                                }

                                                const productsOfUser = products
                                                let inventoryDictionary = {}
                                                for (let index in productsOfUser) {
                                                    const product = productsOfUser[index]
                                                    const category = product.type
                                                    if (Array.isArray(inventoryDictionary[category])) {
                                                        const products = inventoryDictionary[category]
                                                        products.push(product)
                                                        inventoryDictionary[category] = products
                                                    }

                                                    else {

                                                        inventoryDictionary[category] = [product]
                                                    }
                                                }

                                                let listToReturn = []

                                                if (inventoryDictionary) {

                                                    for (let key in inventoryDictionary) {
                                                        listToReturn.push({ title: key, data: inventoryDictionary[key] })
                                                    }
                                                }

                                                var actionSetInventoryData = setInventoryData(listToReturn)
                                                dispatch(actionSetInventoryData)

                                            } else {
                                                console.log('Werent able to fetch products')
                                            }
                                        })
                            }
                        }
                    }

                    
                }
            )
    }
}

export { watchInventoryData }