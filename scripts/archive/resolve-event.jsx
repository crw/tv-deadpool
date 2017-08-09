/**
 * resolve-event.jsx
 *
 * DANGEROUS TO RUN - ALTERS DATA
 */
import { EPISODE_ID, BETS_PAID, BETS_NOT_RESOLVED } from '../app/fixtures/s7e02-resolution.jsx';

import firebaseApp from './firebase-app';
import { getKey } from '../app/utils';

// The app only has access as defined in the Security Rules
const db = firebaseApp.database();
const ref = db.ref();

const errorFunc = (err) => {
  console.log(err);
  process.exit(1);
};

console.log('Updating Firebase database', process.env.FIREBASE_DATABASE_URL);

try {
  ref.child(`episodes/${EPISODE_ID}`).once('value').then((snapshot) => {

    console.log('Updating episode ' + EPISODE_ID);

    let episode = snapshot.val();
    let bets = getKey(episode, 'bets', {});

    let updateData = {};

    const resolved_bets = Object.keys(bets).filter(item => !BETS_NOT_RESOLVED.includes(item));

    for (let betId of BETS_PAID) {
      updateData[`bets/${betId}/paid`] = true;
    }
    for (let betId of resolved_bets) {
      updateData[`bets/${betId}/resolved`] = true;
    }
    updateData[`episodes/${EPISODE_ID}/resolved`] = true;

    console.log(updateData);

    ref.update(updateData).then(() => {

      console.log('...done.');
      process.exit(0);
    }, errorFunc);

  }, errorFunc);

} catch(err) {
  errorFunc(err);
}
