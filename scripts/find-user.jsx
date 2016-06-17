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

let search = 'Anderson';

secureRef.on('value', (snapshot) => {
  secure = snapshot.val();
  userRef.once('value').then((snapshot) => {
    users = snapshot.val();
    try {

      let secureArr = toArray(secure);

      for (let secureUser of secureArr) {

        let displayName = secureUser.displayName || '';
        let email = secureUser.email || '';
        if (displayName.indexOf(search) !== -1 || email.indexOf(search) !== -1) {
          console.log(`${secureUser.id}: '${displayName}', '${email}', '${users[secureUser.id].displayName}'`);
        }
      }

    } catch (err) {
      console.log(err);
    }
  });
});

