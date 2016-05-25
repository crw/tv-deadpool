import firebase from 'firebase';

var config = {
  serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT_FILE || undefined,
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
};
firebase.initializeApp(config);

export var getUserRef = (uid) => {
  return firebase.database().ref(`users/${uid}`);
};

export default firebase;
