import { createStore, applyMiddleware, combineReducers } from 'redux';
import inventoryReducer from './reducers/inventoryReducer'
import userDetailsReducer from './reducers/userDetailsReducer'
import thunkMiddleware from 'redux-thunk';
import firebase from '../config/firebase'

//Global Reset Action
const userLogOut = () => {

    return {
        type: 'USER_LOGOUT',
        value: null
    }
}

export { userLogOut }

//Reducer Code
const appReducer = combineReducers(
    { inventoryReducer : inventoryReducer,
      userDetailsReducer: userDetailsReducer    
    }
);

const rootReducer =  (state, action) => {
    
    if(action.type === 'USER_LOGOUT') {
        console.log("reached the logout reducer")
        firebase.auth().signOut()
        state = undefined 
    }

    return appReducer(state,action)
}

//Store

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunkMiddleware))
}

export { configureStore }











