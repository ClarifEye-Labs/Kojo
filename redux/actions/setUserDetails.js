import { userData } from '../constants'



const setUserFirestoreData = (data) => {
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