import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const config = {
  apiKey: "AIzaSyBbMywh6LAfqvKuSEc7rnAelCpIvJJ9nKg",
  authDomain: "notice-db.firebaseapp.com",
  databaseURL: "https://notice-db.firebaseio.com",
  projectId: "notice-db",
  storageBucket: "notice-db.appspot.com",
  messagingSenderId: "785859186736",
  appId: "1:785859186736:web:cb0ddb82532fde6c9addf5",
  measurementId: "G-0W1CCYPP8N"
};

export const createUserProfileDocument = async () => {

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

