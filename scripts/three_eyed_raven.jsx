/**
 * three_eyed_raven.jsx - sorts out the unbelievably prescient
 *
 * DANGEROUS TO RUN - alters data
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

  let updateData = {};

  for (const id in leaderboard) {
    const { displayName, balance, ratio, winnings, losses, epsPlayed } = leaderboard[id];

    // if (Object.keys(epsPlayed).length === 2 && epsPlayed['gameofthrones-07-05'] && losses === 0) {
    if ((epsPlayed.count > 2 && ratio > 500) || (losses === 0)) {
      updateData[`users/${id}/data/${seasonId}/three_eyed_raven`] = true;
      updateData[`labels/Three-Eyed Raven/${id}`] = true;

      console.log(`${id}, "${displayName}", ${balance}, ${ratio}, ${winnings}, ${losses}, ${epsPlayed.count}`);
    }
  }
  // db.ref().update(updateData).then(() => process.exit());
  process.exit();
});
