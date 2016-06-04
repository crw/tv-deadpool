import firebase from 'firebase';


firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
});


export var getUserRef = (uid) => {
  return firebase.database().ref(`users/${uid}`);
};

export var getSecureRef = (uid) => {
  return firebase.database().ref(`secure/${uid}`);
};

export var getCurrentUser = () => {
  return firebase.auth().currentUser;
}


export default firebase;
