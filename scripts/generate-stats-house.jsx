/**
 * generate-stats-house.jsx - Calculates the house's take / losses.
 *
 * SAFE TO RUN
 */
const SEASON_ID = 'gameofthrones-07';

import firebaseApp from './lib/firebase-app';
import moment from 'moment';
import { toCurrencyString } from '../app/utils';
import { fetchFirebaseDataFn, err } from './lib/lib';


const db = firebaseApp.database();

const getLeaderboard = fetchFirebaseDataFn(db, `leaderboard/${SEASON_ID}`);

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

getLeaderboard.then(leaderboard => {
  try {
    const stats = processHouseStats(leaderboard);
    console.log(`The house: balance: ${toCurrencyString(stats.balance)}, winnings: ${toCurrencyString(stats.winnings)}, losses: ${toCurrencyString(stats.losses)}`);
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit();
  }
}, err);


