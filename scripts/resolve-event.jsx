import firebase from 'firebase';
// App imports
import {DEFAULT_DISPLAY_NAME as CONST_DEFAULT_DISPLAY_NAME} from '../app/constants/strings';
import {isObject, sortObjectsByKey, getKey} from '../app/utils';

// Initialize the app with a custom auth variable, limiting the server's access
var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
  serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT_FILE || undefined,
  databaseAuthVariableOverride: {
    uid: "secret-service-worker"
  }
};
firebase.initializeApp(config);

const INITIAL_BALANCE = 100;
const DEFAULT_DISPLAY_NAME = CONST_DEFAULT_DISPLAY_NAME;

console.log('Updating Firebase database', process.env.FIREBASE_DATABASE_URL);

function toArray(firebaseArray) {
  if (isObject(firebaseArray)) {
    let itemsArr = [];
    Object.keys(firebaseArray).forEach((item) => {
      itemsArr.push(firebaseArray[item])
      // Preserve the key, which is often the ID for the object.
      itemsArr[itemsArr.length-1].key = item;
    });
    return itemsArr;
  } else {
    throw 'Invalid data, not an object.';
  }
}



// The app only has access as defined in the Security Rules
var db = firebase.database();
var ref = db.ref();


let eventId = 'gameofthrones-6-7';

ref.child(`events/${eventId}`).once('value').then((snapshot) => {

  let event = snapshot.val();
  let bets = getKey(event, 'bets', {});

  let updateData = {};

  updateData[`events/${eventId}/resolved`] = true;
  for (let betId of Object.keys(bets)) {
    updateData[`bets/${betId}/resolved`] = true;
  }

  ref.update(updateData).then((snapshot) => {
      process.exit(0);
  },(e) => {
    console.log('Updated error:', e)
  });

}, (e) => {
  console.log('error', e);
});

