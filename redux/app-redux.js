import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import firebase from '../config/firebase'

const initialState = {
    inventory : {},
}

//Reducer Code

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "inventoryData":
            return { ...state, inventoryData: action.value}
        default:
            return state;
    }
    
}

//Store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
applyMiddleware(thunkMiddleware)
export { store }

//Action creators

const setInventoryData = (inventoryData) => {
    return {
        type: "inventoryData",
        value: inventoryData
    }
}

export { setInventoryData }

const watchInventoryData = (supplierID) => {
    return function(dispatch) {
        let inventoryArray = []
        let db = firebase.firestore()
        let inventoryRefArray = []
        let products = []
        await db
          .collection(collectionNames.suppliers)
          .doc(supplierID)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const data = doc.data()
              inventoryRefArray = data.inventory
              products = inventoryRefArray ? this.fetchProductsForEachInventoryRef(inventoryRefArray) : []
              var actionSetInvetoryData = setInventoryData(products)
              dispatch(actionSetInvetoryData)
            }
          })
    }
}

const  fetchProductsForEachInventoryRef = async (inventoryRefArray) => {
    let db = firebase.firestore()
    let products = []
    for (let index in inventoryRefArray) {
      const inventoryRef = inventoryRefArray[index]
      await db.doc(inventoryRef)
        .get()
        .then((doc) => {
          if (doc.exists) {
            products.push({ ...{id: doc.id}, ...{...doc.data()} } )
          } else {
            console.log('Werent able to fetch products')
          }
        })
    }

    return products
  }





