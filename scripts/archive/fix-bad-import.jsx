import firebase from 'firebase';

import {getKey} from '../app/utils';

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
var ref = db.ref();


let errorFunc = (e) => { console.log(e); };


ref.child('leaderboard').once('value').then((snapshot) => {

  console.log('Loaded leaderboard');

  const leaderboard = snapshot.val();


  ref.child('users').once('value').then((snapshot) => {

    console.log('Loaded users');

    const users = snapshot.val();



    let updateData = {};

    for (let userId of Object.keys(users)) {

      const user = users[userId];

      // console.log('Processing ' + user.id);

      let cost = 0;

      if (user.wagers) {
        for (let wagerId of Object.keys(user.wagers)) {
          if (wagerId.indexOf('gameofthrones-6-8') > -1) {
            cost = cost + user.wagers[wagerId].wager;
          }
        }
      }

      let balance = getKey(leaderboard, `${userId}.balance`, 100);

      balance = balance - cost;

      if (balance < 0) {
        console.log(userId, balance);
      }

      updateData[`${userId}/balance`] = balance;

    }

    ref.child('users').update(updateData).then((snapshot) => { console.log('updated.')}, errorFunc);

  }, errorFunc);
}, errorFunc);