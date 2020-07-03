import { createStore, applyMiddleware, combineReducers } from 'redux';
import inventoryReducer from './reducers/data/inventory/inventoryReducer'
import userDetailsReducer from './reducers/data/user/userDetailsReducer'
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

const appReducer = combineReducers({
    user: combineReducers({
        userDetailsReducer
    }),
    inventory: combineReducers({
        inventoryReducer
    })
})

const rootReducer = (state, action) => {

    if (action.type === 'USER_LOGOUT') {
        firebase.auth().signOut()
        state = undefined
    }

    return appReducer(state, action)
}

//Store

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunkMiddleware))
}

export { configureStore }











