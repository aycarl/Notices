import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const config = {
  apiKey: "AIzaSyAHHshoj3i_CvI9EZnd_iUmYhmvyv8x_p4",
  authDomain: "notice-d91bb.firebaseapp.com",
  databaseURL: "https://notice-d91bb.firebaseio.com",
  projectId: "notice-d91bb",
  storageBucket: "notice-d91bb.appspot.com",
  messagingSenderId: "226118271572",
  appId: "1:226118271572:web:a32114bb87d13967b963c1"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

