import { createStore, applyMiddleware, combineReducers } from 'redux';
import inventoryReducer from './reducers/inventoryReducer'
import userDetailsReducer from './reducers/userDetailsReducer'
import thunkMiddleware from 'redux-thunk';



//Reducer Code
const rootReducer = combineReducers(
    { inventoryReducer : inventoryReducer,
      userDetailsReducer: userDetailsReducer    
    }
);


//Store

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunkMiddleware))
}

export { configureStore }











