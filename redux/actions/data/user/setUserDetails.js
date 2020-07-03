import { userData } from '../../../constants'


const setUserFirestoreData = (data) => {
  console.log("setting firebase user data", data)
  return {
    type: 'userFirestoreData',
    value: data
  }
}

const setFirebaseAuthUser = (user) => {
  return {
    type: 'firebaseAuthUser',
    value: user
  }
}

export { setUserFirestoreData, setFirebaseAuthUser }