import { setUserFirestoreData, setFirebaseAuthUser } from '../actions/setUserDetails'
import collectionNames from '../../config/collectionNames'
import firebase from '../../config/firebase'


const watchFirebaseAuthUser = () => {
  return function (dispatch) {
    let user = firebase.auth().currentUser
    let actionSetFirebaseAuthUser = setFirebaseAuthUser(user)
    dispatch(actionSetFirebaseAuthUser)
  }
}

const watchUserFirestoreData = () => {
  return function (dispatch) {
    const firestore = firebase.firestore()
    const userRef = firestore.collection(collectionNames.users)
    const user = firebase.auth().currentUser
    if (user) {
      const userID = user.uid
      let userFirestore = null
      userRef.doc(userID)
        .onSnapshot(
          function (doc) {
            userFirestore = doc.data()
            let actionSetUserFirestoreData = setUserFirestoreData(userFirestore)
            dispatch(actionSetUserFirestoreData)
          }
        )
    }
  }
}

export { watchFirebaseAuthUser, watchUserFirestoreData }