import firebaseApp from './lib/firebase-app';
import moment from 'moment';
import { fetchFirebaseDataFn, err } from './lib/lib';

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


function processStats(users, exclude = []) {

  let stats = { bets: {} };

  for (const userId of Object.keys(users)) {

    const banned = exclude.includes(userId);

    const user = users[userId];
    const wagers = user.wagers || {};
    for (const wagerId of Object.keys(wagers)) {
      const wager = user.wagers[wagerId];
      stats.bets[wagerId] = stats.bets[wagerId] || { count: 0, amount: 0, comments: {} };
      if (!banned) {
        stats.bets[wagerId].count = stats.bets[wagerId].count + 1;
        stats.bets[wagerId].amount = stats.bets[wagerId].amount + wager.wager;
      }
      if (wager.comment) { stats.bets[wagerId].comments[userId] = wager.comment };
    }
  }
  return stats;
}


const db = firebaseApp.database();
const fetchCheaters = fetchFirebaseDataFn(db, 'labels/Three-Eyed Raven');

db.ref('users').on('value', snapshot => {
  const users = snapshot.val();
  fetchCheaters.then(exclude => {

    try {
      const stats = processStats(users, Object.keys(exclude));

      db.ref('stats').set(stats).then(snapshot => {
        console.log(`${moment().format()} Stats updated.`);
      }, err);
    } catch (e) {
      err(e);
    }
  });
});

