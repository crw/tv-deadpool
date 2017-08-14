/**
 * win_loss_ratio.jsx - show the ratio of money won / money lost
 *
 * SAFE TO RUN - does not alter data
 */

const seasonId = 'gameofthrones-07';

import firebaseApp from './lib/firebase-app';
import { isEmpty, toArray, filterObjectKeys } from '../app/utils';
import { err, fetchFirebaseDataFn } from './lib/lib';
import { processAllWagers, processOneUser } from './lib/process';


console.log('Updating Firebase database', process.env.FIREBASE_DATABASE_URL);

const db = firebaseApp.database();
const fetchLeaderboard = fetchFirebaseDataFn(db, `leaderboard/${seasonId}`);


fetchLeaderboard.then(leaderboard => {

  let winloss = [];

  for (const uid in leaderboard) {
    const user = leaderboard[uid];
    const loss = user.losses*-1;
    const ratio = user.winnings / (loss===0 ? 1 : loss);
    winloss.push({ id: uid, ratio, ...user, loan: undefined, episodes: undefined });
  }

  let output = winloss.sort((a, b) => a.balance - b.balance);

  for (const item of output) {
    console.log(`${item.displayName}: ${item.ratio} (${item.winnings}/${item.losses})`);
  }

  process.exit();
});
