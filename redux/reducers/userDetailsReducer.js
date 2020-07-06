import firebase from '../../config/firebase'
const initialState = {
  firebaseAuthUser: firebase.auth().currentUser,
  userFirstoreData: null,
}

const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "firebaseAuthUser":
      return { ...state, firebaseAuthUser: action.value }

    case "userFirestoreData":
      return { ...state, userFirestoreData: action.value }
      
    default:
      return state;
  }
}
export default userDetailsReducer