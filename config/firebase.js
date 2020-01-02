import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

var firebaseConfig = {
    apiKey: "AIzaSyCqAVUpIHOv_mgfBqdVg3vR15zYwUXVEAA",
    authDomain: "kojo-9861a.firebaseapp.com",
    databaseURL: "https://kojo-9861a.firebaseio.com",
    projectId: "kojo-9861a",
    storageBucket: "kojo-9861a.appspot.com",
    messagingSenderId: "824640030568",
    appId: "1:824640030568:web:ceded41ff3476487bfb8dd",
    measurementId: "G-CXQLBSB07C"
  };

firebase.initializeApp(firebaseConfig)

export default firebase