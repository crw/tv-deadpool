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

  for (const id in leaderboard) {
    const { displayName, ratio, winnings, losses, epsPlayed } = leaderboard[id];
    console.log(`${id}, "${displayName}", ${ratio}, ${winnings}, ${losses}, ${epsPlayed}`);
  }
  process.exit();
});
