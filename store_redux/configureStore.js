import { createStore , combineReducers, applyMiddleware } from 'redux';
import  updateInventoryReducer  from '../reducers_redux/updateInventoryReducer';
import thunkMiddleWare from 'redux-thunk'


const rootReducer = combineReducers (  
        {inventory: updateInventoryReducer}   
);

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunkMiddleWare));
    
}

export default configureStore;