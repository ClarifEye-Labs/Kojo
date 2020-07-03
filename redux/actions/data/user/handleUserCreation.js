import { setUserFirestoreData, setFirebaseAuthUser } from '../actions/setUserDetails'
import collectionNames from '../../../../config/collectionNames'
import firebase from '../../../../config/firebase'

const createFirebaseUser = (emailEntered, passwordEntered, nameEntered) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(emailEntered, passwordEntered)
    .then((user) => this.successfulRegistration(user, nameEntered))
    .catch((error) => this.registrationFailure(error))

}

const succesfulRegistration = (user, nameEntered) => {

  await firebase.auth().currentUser.updateProfile({
    displayName: nameEntered
  })

  await this.writeUserToFireStore()
  this.setState({
    showLoadingDialog: false
  }, () => { Utils.dispatchScreen(screens.SupplierRestaurantScreen, undefined, this.state.navigation) })

}

const registrationFailure = (error) => {
}

const writeUserToFireStore = () => {

  const firestore = firebase.firestore()
  const ref = firestore.collection('users')
  const user = firebase.auth().currentUser

  await ref.doc(user.uid).set({
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    role: null,
    address: null,
    phone: null
  })

}
