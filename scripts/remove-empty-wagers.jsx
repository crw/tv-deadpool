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

const userRef = ref.child('users');

let users = {};
let secure = {};

userRef.once('value').then((snapshot) => {
  try {
    let users = snapshot.val();
    let usersArr = toArray(users);
    let updateData = {};

    for (let user of usersArr) {
      let userId = user.id;


      let wagersArr = user.wagers ? toArray(user.wagers) : [];

      for (let wager of wagersArr) {
        if (wager.wager === 0 && wager.comment === '') {
          userRef.child(`${userId}/wagers/${wager.id}`).remove(() => {
            console.log(`Removed ${userId}: wager ${wager.id}, ${wager.wager} :: ${wager.comment}`);
          });
        }
      }
    }
  } catch (err) {
    console.log('Uncaught exception:');
    console.log(err);
  }
});
