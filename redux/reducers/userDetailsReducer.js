import { inventoryData } from '../constants/index'


const initialState = {
    firebaseAuthUser: null,
    userFirstoreData: null,
    
}

const userDetailsReducer = (state = initialState, action) => {
    switch(action.type) {
        
        case "firebaseAuthUser":
            return { ...state, firebaseAuthUser: action.value }

        case "userFirestoreData":
            return { ...state, userFirestoreData: action.value }

        default:
            return state;
    }    
}

export default userDetailsReducer