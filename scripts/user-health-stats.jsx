/**
 * user-health-stats.jsx - general stats monitoring script
 *
 * Shows # of signups, % with wager, % with names... general community health stats.
 * Requires changing the current episode to reflect this week's episode.
 *
 * SAFE TO RUN - DOES NOT ALTER DATA
 */
const CURRENT_EPISODE = 'gameofthrones-07-01';

import firebaseApp from './firebase-app';
import moment from 'moment';
import { toArray } from '../app/utils';


// The app only has access as defined in the Security Rules
const db = firebaseApp.database();
const ref = db.ref();

const secureRef = ref.child('secure');
const userRef = ref.child('users');

let users = {};
let secure = {};


function generateStats(users, secure) {
  const userIds = Object.keys(secure);
  const secureArr = toArray(secure);
  const usersArr = toArray(users);

  let count = userIds.length;

  let createdPastWeek = secureArr.filter((item) => { return item.created_at > Date.now() - 86400000*7; }).length;

  let withNames = usersArr.filter((item) => { return item.displayName; }).length;

  let withCurrentWagers = usersArr.filter((item) => {
    let wagers = item.wagers || {};
    return Object.keys(wagers).filter((wagerId) => {
      return wagerId.indexOf(CURRENT_EPISODE) >= 0;
    }).length > 0;
  }).length;

  let namePct = Math.floor(withNames*100/count);
  let wageredPct = Math.floor(withCurrentWagers*100/count);


  let timestamp = moment().format();

  console.log(`${timestamp}: ${count} users, ${createdPastWeek} created in past week, ${wageredPct}% with wagers (${withCurrentWagers} total), ${namePct}% with names (${withNames} total).`);

}

console.log('Watching episode', CURRENT_EPISODE);

secureRef.on('value', (snapshot) => {
  secure = snapshot.val();
  userRef.once('value').then((snapshot) => {
    users = snapshot.val();
    try {
      generateStats(users, secure);
    } catch (err) {
      console.log(err);
    }
  });
});

