import { inventoryData } from '../constants/index'



const initialState = {
    inventoryData: [],
}

const inventoryReducer = (state = initialState, action) => {
    switch(action.type) {

        case "inventoryData":
            return { ...state, inventoryData: action.value }

        default:
            return state;
    }    
}

export default inventoryReducer