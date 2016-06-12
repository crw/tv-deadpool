import firebase from 'firebase';
import moment from 'moment';
// App imports
import {toArray} from '../app/utils';


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
const db = firebase.database();
const ref = db.ref();

const secureRef = ref.child('secure');
const userRef = ref.child('users');

let users = {};
let secure = {};


function generateStats(users, secure) {
  const userIds = Object.keys(secure);
  const secureArr = toArray(secure);
  const usersArr = toArray(users);

  let count = userIds.length;

  let createdPast24 = secureArr.filter((item) => { return item.created_at > Date.now() - 86400000; }).length;

  let withNames = usersArr.filter((item) => { return item.displayName; }).length;

  let withCurrentWagers = usersArr.filter((item) => {
    let wagers = item.wagers || {};
    return Object.keys(wagers).filter((wagerId) => {
      return wagerId.indexOf('gameofthrones-6-8') >= 0;
    }).length > 0;
  }).length;

  let namePct = Math.floor(withNames*100/count);
  let wageredPct = Math.floor(withCurrentWagers*100/count);


  let timestamp = moment().format();

  console.log(`${timestamp}: ${count} users, ${createdPast24} created in past 24 hours, ${wageredPct}% with wagers (${withCurrentWagers} total), ${namePct}% with names (${withNames} total).`);

}


secureRef.on('value', (snapshot) => {
  secure = snapshot.val();
  userRef.once('value').then((snapshot) => {
    users = snapshot.val();
    try {
      generateStats(users, secure);
    } catch (err) {
      console.log(err);
    }
  });
});

