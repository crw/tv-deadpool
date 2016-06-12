import firebase from 'firebase';
// App imports
import {isObject, isEmpty, sortObjectsByKey, getKey, toArray} from '../app/utils';
// import {processAllWagers, processOneUser} from './lib';


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

// stats:
//   bets:
//     $betId:
//       count: Number
//       amount: Number
//       comments:
//         $userid: String
//   events:
//     $eventid:
//       count: Number
//       amount: Number


function processStats(users) {

  let stats = { events: {}, bets: {} };

  for (let userId of Object.keys(users)) {
    let user = users[userId];
    let wagers = user.wagers || {};
    for (let wagerId of Object.keys(wagers)) {
      let wager = user.wagers[wagerId];
      stats.bets[wagerId] = stats.bets[wagerId] || { count: 0, amount: 0, comments: {} };
      stats.bets[wagerId].count = stats.bets[wagerId].count + 1;
      stats.bets[wagerId].amount = stats.bets[wagerId].amount + wager.wager;
      if (wager.comment) { stats.bets[wagerId].comments[userId] = wager.comment };
    }
  }

  return stats;
}

function errorFunc (err) {
  console.log(err);
}

// The app only has access as defined in the Security Rules
var db = firebase.database();
var ref = db.ref();

ref.child('users').on('value', (snapshot) => {
  let users = snapshot.val();

  try {

    let stats = processStats(users);

    ref.child('stats').set(stats).then((snapshot) => {
      console.log('Stats updated.');
    }, errorFunc);

  } catch (err) {
    console.log('Main program exception', err);
  }
});

