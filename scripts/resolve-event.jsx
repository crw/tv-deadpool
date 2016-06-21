import firebase from 'firebase';
// App imports
import {DEFAULT_DISPLAY_NAME as DEFAULT_DISPLAY_NAME} from '../app/constants/strings';
import {getKey} from '../app/utils';
// Weekly fixture
import {EVENT_ID, BETS_PAID} from '../app/fixtures/s6e9-resolution.jsx';


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




// The app only has access as defined in the Security Rules
var db = firebase.database();
var ref = db.ref();

let errorFunc = (err) => {
  console.log(err);
};

try {
  ref.child(`events/${EVENT_ID}`).once('value').then((snapshot) => {


    console.log('Updating event ' + EVENT_ID);

    let event = snapshot.val();
    let bets = getKey(event, 'bets', {});

    let updateData = {};

    for (let betId of BETS_PAID) {
      updateData[`bets/${betId}/paid`] = true;
    }

    updateData[`events/${EVENT_ID}/resolved`] = true;
    for (let betId of Object.keys(bets)) {
      updateData[`bets/${betId}/resolved`] = true;
    }

    console.log(updateData);

    ref.update(updateData).then(() => {

      console.log('...done.');
        // process.exit(0);
    }, errorFunc);

  }, errorFunc);

} catch(err) {
  errorFunc(err);
}