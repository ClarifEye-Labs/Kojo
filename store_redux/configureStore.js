import { createStore , combineReducers } from 'redux';
import  updateInventoryReducer  from '../reducers_redux/updateInventoryReducer';

const rootReducer = combineReducers (  
        {inventory: updateInventoryReducer}   
);

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;