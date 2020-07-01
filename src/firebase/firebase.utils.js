import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
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

  const noticeCollectionRef = firestore.collection('notices');

  const noticeRef = noticeCollectionRef.doc();

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
    const createdAt = new Date().toDateString();

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
// export const readAllNotices = () => {
//   const noticeBoardRef = firestore.collection("notices");
//   let notices = [];

//   noticeBoardRef.get().then((querySnapshot) => {
//     querySnapshot.forEach((snapShot) => {
//       notices.push(snapShot.data());
//     });
//   });

//   return notices;
// };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
