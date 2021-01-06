import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDjIcQCw5l018JLtrnCLH0C38562Di9Kl8",
    authDomain: "photo-review-c5d5f.firebaseapp.com",
    projectId: "photo-review-c5d5f",
    storageBucket: "photo-review-c5d5f.appspot.com",
    messagingSenderId: "266574214700",
    appId: "1:266574214700:web:8e217494982dda85f24389",
    measurementId: "G-5KF3YY40LM"
  };

  firebase.initializeApp(firebaseConfig);


  // Get firebase auth instance
const auth = firebase.auth()

// Get firebase firestore instance
const db = firebase.firestore()

// Get firebase storage instance
const storage = firebase.storage()

export { auth, db, storage, firebase as default }