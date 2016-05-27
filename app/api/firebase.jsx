import firebase from 'firebase';

var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
};
firebase.initializeApp(config);

console.log('Firebase initialized at', process.env.FIREBASE_DATABASE_URL);

export var getUserRef = (uid) => {
  return firebase.database().ref(`users/${uid}`);
};

export var getCurrentUser = () => {
  return firebase.auth().currentUser;
}


export default firebase;
