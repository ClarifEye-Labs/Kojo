import { createStore , combineReducers } from 'redux';

import updateInventoryReducer from '../reducers_redux'

const rootReducer = combineReducers (  
        {inventory: updateInventoryReducer}   
);

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;