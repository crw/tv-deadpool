/**
 * generate-stats-house.jsx - Calculates the house's take / losses.
 *
 * SAFE TO RUN
 */
const seasonId = 'gameofthrones-06';

import firebaseApp from './firebase-app';
import moment from 'moment';
import { toCurrencyString } from '../app/utils';

// The app only has access as defined in the Security Rules
const db = firebaseApp.database();



function processHouseStats(leaderboard) {

  let stats = { winnings: 0, losses: 0, balance: 0 };

  for (let userId of Object.keys(leaderboard)) {
    let leader = leaderboard[userId];
    stats.winnings = stats.winnings + leader.losses;
    stats.losses = stats.losses + leader.winnings;
  }

  stats.winnings = stats.winnings * -1;
  stats.losses = stats.losses * -1;

  stats.balance = stats.winnings + stats.losses;

  return stats;
}


db.ref(`leaderboard/${seasonId}`).once('value').then((snapshot) => {
  let leaderboard = snapshot.val();

  try {

    const stats = processHouseStats(leaderboard);

    console.log(`The house: balance: ${toCurrencyString(stats.balance)}, winnings: ${toCurrencyString(stats.winnings)}, losses: ${toCurrencyString(stats.losses)}`);

  } catch (err) {
    console.log('Main program exception', err);
  }
});

