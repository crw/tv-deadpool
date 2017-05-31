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
  const secureArr = toArray(secure).sort((itemA, itemB) => {
    if (itemA.created_at < itemB.created_at) {
      return -1;
    } else if (itemA.created_at > itemB.created_at) {
      return 1;
    } else {
      return 0;
    }
  });
  const usersArr = toArray(users);

  let i = 1;
  for (let secure of secureArr) {
    console.log(`${moment(secure.created_at).format()}, ${i++}`);
  }

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

