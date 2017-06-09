import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const app = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
});


export const getUserRef = (uid) => {
  return app.database().ref(`users/${uid}`);
};

export const getSecureRef = (uid) => {
  return app.database().ref(`secure/${uid}`);
};

export const getCurrentUser = () => {
  return app.auth().currentUser;
};

export default app;
