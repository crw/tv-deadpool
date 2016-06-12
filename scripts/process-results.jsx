import firebase from 'firebase';
// App imports
import {isObject, isEmpty, sortObjectsByKey, getKey, toArray} from '../app/utils';
import {processAllWagers, processOneUser} from './lib';


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

// leaderboard {
//   uid {
//     displayName
//     balance
//     winnings
//     losses
//     events {
//       event_id {
//         cheated
//         balance
//         winnings
//         losses
//         balanceBeforeWinnings
//       }
//     }
//   }
// }

// The app only has access as defined in the Security Rules
var db = firebase.database();
var ref = db.ref();

ref.once('value').then((snapshot) => {
  let val = snapshot.val();
  let bets = val.bets;
  let events = val.events;
  let users = val.users;

  let leaderboard;

  try {

    leaderboard = processAllWagers(users, events, bets);
    // leaderboard = processOneUser(users['hz9NYEdvzygqx9pDqziRjLrl00h2'], events, bets);
    let updateData = {};

    for (let userId of Object.keys(leaderboard)) {

      let lbUser = leaderboard[userId];

      if (!isEmpty(lbUser.events)) {
        updateData[`leaderboard/${userId}`] = lbUser;
        updateData[`users/${userId}/balance`] = lbUser.balance;
        console.log(`...${userId} processed.`);
      } else {
        console.log('skipping leaderboard for ' + lbUser.id);
      }
    }

    ref.update(updateData).then((snapshot) => {
      console.log('...done.');
    });

  } catch (e) {
    console.log('Exception', e);
  }
}, (e) => {
  console.log('error', e);
});

