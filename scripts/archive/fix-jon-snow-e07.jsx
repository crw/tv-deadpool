/**
 * process-results.jsx - Calculates leaderboard and balances from scratch
 *              for one season. Run any time an episode or bet is resolved.
 *
 * DANGEROUS TO RUN - ALTERS DATA
 */

// leaderboard {
//   seasons {
//     [season_id] {
//       [uid] {
//         balance
//         winnings
//         losses
//         loan
//         episodes {
//           [episode_id] {
//             cheated
//             balance
//             winnings
//             losses
//             loan
//             balanceBeforeWinnings
//             previousBalance
//           }
//         }
//       }
//     }
//   }
// }
const seasonId = 'gameofthrones-07';

import firebaseApp from './lib/firebase-app';
import { isEmpty, toArray, filterObjectKeys } from '../app/utils';
import { err, fetchFirebaseDataFn } from './lib/lib';
import { reconcileLimitedWagers } from './lib/process';


console.log('Updating Firebase database', process.env.FIREBASE_DATABASE_URL);

const db = firebaseApp.database();
const fetchUsers = fetchFirebaseDataFn(db, 'users');
const fetchBets = fetchFirebaseDataFn(db, 'bets');

const VALID_WAGERS = ['gameofthrones-07-01-16','gameofthrones-07-01-17'];


fetchUsers.then(users => {
  fetchBets.then(bets => {

    console.log('Data received.');

    let output = [];

    for (const userId in users) {
      const results = reconcileLimitedWagers(users[userId], bets, VALID_WAGERS);
      if (results.totalPayout > 0) {
        output.push(results);
      }
    }

    let updateData = {};

    for (const result of output) {
      updateData[`users/${result.userId}/balance/${seasonId}`] = result.balance;
    }

    db.ref().update(updateData).then(() => {
      console.log(output);
      console.log(output.length);
      console.info('...done.');
      process.exit();
    });
  });
});
