import firebase from 'firebase';
// App imports
import {isObject, sortObjectsByKey, getKey} from '../app/utils/index.jsx';


////  HACK IT UP
////  USER IDs BELOW
const FROM_ID = '';
const TO_ID = '';




// Initialize the app with a custom auth variable, limiting the server's access
var config = {
  serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT_FILE || undefined,
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
  databaseAuthVariableOverride: {
    uid: "secret-service-worker"
  }
};
firebase.initializeApp(config);

console.log('Updating Firebase database', process.env.FIREBASE_DATABASE_URL);

// The app only has access as defined in the Security Rules
var db = firebase.database();
var ref = db.ref('users');

var fromRef = ref.child(`${FROM_ID}/wagers`);
var toRef = ref.child(`${TO_ID}/wagers`);

fromRef.once('value').then((snapshot) => {
  let val = snapshot.val();

  toRef.update(val).then((snapshot) => {

    // fromRef.remove();

  });

}, (e) => {
  console.log('error', e);
});
