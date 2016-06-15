import firebase from 'firebase';
// App imports
import {DEFAULT_DISPLAY_NAME as DEFAULT_DISPLAY_NAME} from '../app/constants/strings';
import {getKey} from '../app/utils';

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

console.log('Updating Firebase database', process.env.FIREBASE_DATABASE_URL);


//// CHANGE THIS!!!
////
let eventId = 'gameofthrones-6-8';


// The app only has access as defined in the Security Rules
var db = firebase.database();
var ref = db.ref();

let errorFunc = (err) => {
  console.log(err);
};

try {
  ref.child(`events/${eventId}`).once('value').then((snapshot) => {


    console.log('Updating event ' + eventId);

    let event = snapshot.val();
    let bets = getKey(event, 'bets', {});

    let updateData = {};

    updateData[`events/${eventId}/resolved`] = true;
    for (let betId of Object.keys(bets)) {
      updateData[`bets/${betId}/resolved`] = true;
    }

    // Any of the Tullys
    updateData['bets/gameofthrones-6-8-3/paid'] = true;
    // The Waif
    updateData['bets/gameofthrones-6-8-6/paid'] = true;
    // The Under (5.5)
    updateData['bets/gameofthrones-6-8-17/paid'] = true;
    // updateData['bets//paid'] = true;

    console.log(updateData);

    ref.update(updateData).then((snapshot) => {
        console.log(snapshot.val());
        // process.exit(0);
    }, errorFunc);

  }, errorFunc);

} catch(err) {
  errorFunc(err);
}