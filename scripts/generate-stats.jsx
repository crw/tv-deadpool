import firebaseApp from './firebase-app';
import moment from 'moment';


// stats:
//   bets:
//     $betId:
//       count: Number
//       amount: Number
//       comments:
//         $userid: String
//   events:  // Unused?
//     $eventid:
//       count: Number
//       amount: Number


function processStats(users) {

  let stats = { bets: {} };

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
var db = firebaseApp.database();
var ref = db.ref();

ref.child('users').on('value', (snapshot) => {
  let users = snapshot.val();

  try {

    let stats = processStats(users);

    ref.child('stats').set(stats).then((snapshot) => {
      console.log(`${moment().format()} Stats updated.`);
    }, errorFunc);

  } catch (err) {
    console.log('Main program exception', err);
  }
});

