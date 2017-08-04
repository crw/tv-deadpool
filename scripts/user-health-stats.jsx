/**
 * user-health-stats.jsx - general stats monitoring script
 *
 * Shows # of signups, % with wager, % with names... general community health stats.
 * Requires changing the current episode to reflect this week's episode.
 *
 * SAFE TO RUN - DOES NOT ALTER DATA
 */
const CURRENT_SEASON = 'gameofthrones-07';
const CURRENT_EPISODE = 'gameofthrones-07-04';

const TIMESPAN = 86400000*28;

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


function countUsersWithWagers(users, id_str) {
  return users.filter(item =>
    Object.keys(item.wagers || {})
      .filter(wagerId =>
        wagerId.indexOf(id_str) >= 0
      ).length > 0
    ).length;
}


function generateStats(users, secure) {
  const userIds = Object.keys(secure);
  const secureArr = toArray(secure);
  const usersArr = toArray(users);

  const count = userIds.length;

  const createdPastWeek = secureArr.filter((item) => { return item.created_at > Date.now() - TIMESPAN; }).length;

  const withNames = usersArr.filter((item) => { return item.displayName; }).length;

  const seasonUserWagers = countUsersWithWagers(usersArr, CURRENT_SEASON);
  const episodeUserWagers = countUsersWithWagers(usersArr, CURRENT_EPISODE);

  let namePct = Math.floor(withNames*100/count);
  let seasonWageredPct = Math.floor(seasonUserWagers*100/count);
  let episodeWageredPct = Math.floor(episodeUserWagers*100/count);


  let timestamp = moment().format();

  console.log(
    `${timestamp}:`,
    `${count} users,`,
    `${createdPastWeek} created,`,
    `season: ${seasonWageredPct}% (${seasonUserWagers}),`,
    `episode: ${episodeWageredPct}% (${episodeUserWagers}),`,
    `${namePct}% named (${withNames}).`
  );

}

console.log('Watching season', CURRENT_SEASON);

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

