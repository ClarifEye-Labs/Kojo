import firebase from '../../config/firebase'

const watchClientSuppliers = (clientID) => {
    return function(dispatch) {
        const db = firebase.firestore()
        db
        .collection()
        .doc()
        .onSnap
        ]
    }
}