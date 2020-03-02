import { UPDATE_INVENTORY } from '../constants_redux'

const initialState = {
    inventory: null
};

const updateInventoryReducer = (state=initialState, action) => {
    switch(action.type) {
        case UPDATE_INVENTORY: 
        return {
            ...state,
            count:action.payload
        };
        default:
        return state;
    }
}

export default updateInventoryReducer