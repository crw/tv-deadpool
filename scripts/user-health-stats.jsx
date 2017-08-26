/**
 * user-health-stats.jsx - general stats monitoring script
 *
 * Shows # of signups, % with wager, % with names... general community health stats.
 * Requires changing the current episode to reflect this week's episode.
 *
 * SAFE TO RUN - DOES NOT ALTER DATA
 */
const CURRENT_SEASON = 'gameofthrones-07';
const CURRENT_EPISODE = 'gameofthrones-07-07';

const TIMESPAN = 86400000*52;

import firebaseApp from './lib/firebase-app';
import moment from 'moment';
import { toArray } from '../app/utils';
import { err } from './lib/lib';

const ref = firebaseApp.database().ref();
const secureRef = ref.child('secure');
const userRef = ref.child('users');


/**
 * Returns the number of users that have wagers with ids matching _match_
 * This works because of the iterative nature of ids (gameofthrones_04_02)
 * @param { Object } users
 * @param { String } match
 * @return Number
 */
function countUsersWithWagers(users, match) {
  return users.filter(item =>
    Object.keys(item.wagers || {})
      .filter(wagerId =>
        wagerId.indexOf(match) >= 0
      ).length > 0
    ).length;
}

/**
 * Logs stats whenever a user is updated
 * @param { Object } users
 * @param { Object } secure
 * @return undefined
 */
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

userRef.on('value', (snapshot) => {
  const users = snapshot.val();
  secureRef.once('value').then((snapshot) => {
    const secure = snapshot.val();
    try {
      generateStats(users, secure);
    } catch (e) {
      err(e);
    }
  });
});

