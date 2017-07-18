
import { EPISODE_ID, BETS_PAID, BETS_NOT_RESOLVED } from '../app/fixtures/s7e01-resolution.jsx';

import firebaseApp from './firebase-app';
import { DEFAULT_DISPLAY_NAME as DEFAULT_DISPLAY_NAME } from '../app/constants/strings';
import { getKey } from '../app/utils';




console.log('Updating Firebase database', process.env.FIREBASE_DATABASE_URL);


// The app only has access as defined in the Security Rules
var db = firebaseApp.database();
var ref = db.ref();

let errorFunc = (err) => {
  console.log(err);
};

try {
  ref.child(`episodes/${EPISODE_ID}`).once('value').then((snapshot) => {


    console.log('Updating episode ' + EPISODE_ID);

    let episode = snapshot.val();
    let bets = getKey(episode, 'bets', {});

    let updateData = {};

    for (let betId of BETS_PAID) {
      updateData[`bets/${betId}/paid`] = true;
    }

    updateData[`episodes/${EPISODE_ID}/resolved`] = true;
    for (let betId of Object.keys(bets).filter(item => !BETS_NOT_RESOLVED.includes(item))) {
      updateData[`bets/${betId}/resolved`] = true;
    }

    console.log(updateData);

    ref.update(updateData).then(() => {

      console.log('...done.');
        // process.exit(0);
    }, errorFunc);

  }, errorFunc);

} catch(err) {
  errorFunc(err);
}