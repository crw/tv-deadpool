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
import { processAllWagers, processOneUser } from './lib/process';


console.log('Updating Firebase database', process.env.FIREBASE_DATABASE_URL);

const db = firebaseApp.database();
const fetchUsers = fetchFirebaseDataFn(db, 'users');
const fetchBets = fetchFirebaseDataFn(db, 'bets');
const fetchEpisodes = fetchFirebaseDataFn(db, 'episodes');


fetchUsers.then(users => {
  fetchBets.then(bets => {
    fetchEpisodes.then(episodes => {

      const seasonEps = toArray(episodes).filter(item => item.season === seasonId);
      const seasonBets = filterObjectKeys(bets, (obj) => item => obj[item].season === seasonId);

      try {

        let leaderboard = processAllWagers(users, seasonEps, seasonBets);
        // leaderboard = processOneUser(users['avclub-staffer-2'], seasonEps, seasonBets);
        // leaderboard = processOneUser(users['Jr9wO5CW1uX2li5HLFepQL9w5bn2'], seasonEps, seasonBets);
        let updateData = {};
        let count = 0;
        let skipped = 0;

        for (let userId of Object.keys(leaderboard)) {

          let lbUser = leaderboard[userId];

          if (!isEmpty(lbUser.episodes)) {
            updateData[`leaderboard/${seasonId}/${userId}`] = lbUser;
            updateData[`users/${userId}/balance/${seasonId}`] = lbUser.balance;
            console.info(`...${userId} processed.`);
            count++;
          } else {
            console.warn('skipping leaderboard for ' + lbUser.displayName, userId);
            skipped++;
          }
        }
        console.info('Processed', count, 'users, skipped', skipped, 'users');

        db.ref().update(updateData).then(() => {
          console.info('...done.');
          process.exit();
        });

      } catch (err) {
        console.log('Leaderboard processing error:', err);
        process.exit();
      }
    });
  });
});
