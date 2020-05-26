import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBbMywh6LAfqvKuSEc7rnAelCpIvJJ9nKg",
  authDomain: "notice-db.firebaseapp.com",
  databaseURL: "https://notice-db.firebaseio.com",
  projectId: "notice-db",
  storageBucket: "notice-db.appspot.com",
  messagingSenderId: "785859186736",
  appId: "1:785859186736:web:cb0ddb82532fde6c9addf5",
  measurementId: "G-0W1CCYPP8N",
};

//This function creates a new user profile in the firestore database for user authentication
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

//This function creates a new notice post in the firstore database
export const createNewNotice = async (notice, userAuth) => {
  if (!userAuth) return;

  const noticeRef = firestore.doc(`notices/${notice.noticeId}`);

  const noticeSnapShot = await noticeRef.get();

  if (!noticeSnapShot.exists) {
    const {
      title,
      body,
      noticeId,
      quoteCitation,
      quoteIndicator,
      quoteAlignment,
    } = notice;
    const { displayName } = userAuth;
    const createdAt = new Date();

    try {
      await noticeRef.set({
        displayName,
        createdAt,
        noticeId,
        title,
        body,
        quoteCitation,
        quoteIndicator,
        quoteAlignment,
      });
    } catch (error) {
      console.log("error creating new post", error.message);
    }
  }

  return noticeRef;
};

//This function reads all notices from the firestore database
// and returns a reference to the notices collection
export const readAllNotices = () => {
  const noticeBoardRef = firestore.collection("notices");
  let notices = [];

  noticeBoardRef.onSnapshot((querySnapshot) => {
    querySnapshot.forEach((snapShot) => {
      notices.push(snapShot.data());
    });

    console.log("Data on notice collection:", notices);
  });

  return notices;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
