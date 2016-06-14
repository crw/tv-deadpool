import firebase from 'firebase';
// App imports
import {toCurrencyString} from '../app/utils';
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


function processHouseStats(leaderboard) {

  let stats = { winnings: 0, losses: 0, balance: 0 };

  for (let userId of Object.keys(leaderboard)) {
    let leader = leaderboard[userId];
    stats.winnings = stats.winnings + leader.losses;
    stats.losses = stats.losses + leader.winnings;
  }

  stats.winnings = stats.winnings * -1;
  stats.losses = stats.losses * -1;

  stats.balance = stats.winnings + stats.losses;

  return stats;
}

function errorFunc (err) {
  console.log(err);
}

// The app only has access as defined in the Security Rules
var db = firebase.database();
var ref = db.ref();

ref.child('leaderboard').once('value').then((snapshot) => {
  let leaderboard = snapshot.val();

  try {

    let stats = processHouseStats(leaderboard);

    console.log(`The house: balance: ${toCurrencyString(stats.balance)}, winnings: ${toCurrencyString(stats.winnings)}, losses: ${toCurrencyString(stats.losses)}`);

  } catch (err) {
    console.log('Main program exception', err);
  }
});

