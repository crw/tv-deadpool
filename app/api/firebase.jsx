import * as firebase from 'firebase';


var app = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
});


export var getUserRef = (uid) => {
  return app.database().ref(`users/${uid}`);
};

export var getSecureRef = (uid) => {
  return app.database().ref(`secure/${uid}`);
};

export var getCurrentUser = () => {
  return app.auth().currentUser;
}


export default app;
