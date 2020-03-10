import { createStore, applyMiddleware, combineReducers } from 'redux';
import inventoryReducer from './reducers/inventoryReducer'
import thunkMiddleware from 'redux-thunk';

const initialState = {
    inventoryData : [],
}

//Reducer Code
const rootReducer = combineReducers(
    { inventoryReducer : inventoryReducer }
);


//Store

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunkMiddleware))
}

export { configureStore }











