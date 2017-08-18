/**
 * process.jsx - Functions used to calculate the weekly results.
 *
 * DANGEROUS TO RUN - ALTERS DATA
 */
import { DEFAULT_DISPLAY_NAME } from '../../app/constants/strings';
import { INITIAL_BALANCE } from '../../app/constants/numbers';
import { isEmpty, sortObjectsByKey, getKey, toArray } from '../../app/utils';

/**
 * Functions that produce the loan amount for each episode
 */
const loanFn = {
  'gameofthrones-06-01': (balance, locked) => balance,
  'gameofthrones-06-02': (balance, locked) => balance,
  'gameofthrones-06-03': (balance, locked) => balance,
  'gameofthrones-06-04': (balance, locked) => balance,
  'gameofthrones-06-05': (balance, locked) => balance,
  'gameofthrones-06-06': (balance, locked) => balance,
  'gameofthrones-06-07': (balance, locked) => balance,
  'gameofthrones-06-08': (balance, locked) => balance,
  'gameofthrones-06-09': (balance, locked) => balance,
  'gameofthrones-06-10': (balance, locked) => balance,
  // First week, no loans.
  'gameofthrones-07-01': (balance, locked) => 100,
  // Everyone with < 100 gets 100 - locked-up wager amounts
  'gameofthrones-07-02': (balance, locked) => balance + locked < 100 ? 100 - locked : balance,
  'gameofthrones-07-03': (balance, locked) => balance + locked < 100 ? 100 - locked : balance,
  // Everyone gets max(200, balance+200)
  'gameofthrones-07-04': (balance, locked) => balance + 200 < 200 ? 200 : balance + 200,
  'gameofthrones-07-05': (balance, locked) => balance + 300 < 300 ? 300 : balance + 300,
  'gameofthrones-07-06': (balance, locked) => balance,
  'gameofthrones-07-07': (balance, locked) => balance
};

/**
 * @param {Object} wagers - all of one user's wagers.
 * @param {Object} bets - all of the bets.
 * return {Object} of Objects, wagers organized by betId
 */
function sortWagersIntoEpisodes(wagers, bets) {

  let wagersByEpisode = {};

  for (let betId of Object.keys(wagers)) {
    // Only include wagers for bets that exist! Wagers may be from another season.
    if (bets[betId]) {
      let episodeId = bets[betId].episode;
      let wager = wagers[betId];

      if (Array.isArray(wagersByEpisode[episodeId])) {
        wagersByEpisode[episodeId].push(wager);
      } else {
        wagersByEpisode[episodeId] = [wager]
      }
    }
  }
  return wagersByEpisode;
}

/**
 * @param {Object} user - user to process
 * @param {Array} episodes - episodes to process, filtered by season.
 * @param {Object} bets - All bets, unfiltered
 */
function processUserWagers(user, episodes, bets) {

  const episodesArr = episodes.sort(sortObjectsByKey());
  const wagers = (user.wagers) ? sortWagersIntoEpisodes(user.wagers, bets) : [];

  const anon = !user.displayName;
  const displayName = user.displayName || DEFAULT_DISPLAY_NAME;
  let balance = INITIAL_BALANCE;
  let winnings = 0;
  let losses = 0;
  let totalLoan = 0;
  // Episodes with a wager
  let epsPlayed = { count: 0 };

  let episodesSummary = {};

  // If this user has any wagers for this season...
  if (!isEmpty(wagers)) {

    for (let episode of episodesArr) {
      if (episode.resolved) {

        let episodeWinnings = 0;
        let totalWinnings = 0;
        let episodeLosses = 0;
        let costOfPlay = 0;
        let payout = 0;
        // How much of the wager amount is locked up in season wagers?
        let locked = 0;

        // if this user has any wagers on this episode...
        if (wagers[episode.id]) {
          epsPlayed.count++;
          epsPlayed[episode.id] = true;

          for (let wager of wagers[episode.id]) {
            costOfPlay = costOfPlay + wager.wager;
            let bet = bets[wager.id];
            if (bet.resolved) {
              if (bet.paid) {
                payout = Math.floor((bet.odds_payout * wager.wager) / bet.odds_wager);
                episodeWinnings = episodeWinnings + payout;
                totalWinnings = totalWinnings + payout + wager.wager;
              } else {
                episodeLosses = episodeLosses - wager.wager
              }
            } else {
              locked = locked + wager.wager;
            }
          }
        }
        // What is the balance plus the loan amount for this episode?
        let loanBalance = loanFn[episode.id](balance, locked);
        // What is the total value of the loan?
        let loan = loanBalance - balance;
        totalLoan = totalLoan + loan;
        // Did the user spend more than was available?
        let cheated = (loanBalance - costOfPlay < 0);
        let previousBalance = balance;
        let balanceBeforeWinnings = balance - costOfPlay;
        balance = balance - costOfPlay + totalWinnings;

        episodesSummary[episode.id] = {
          cheated,
          balance,
          previousBalance,
          loan,
          previousLoanBalance: loanBalance,
          balanceBeforeWinnings,
          winnings: episodeWinnings,
          losses: episodeLosses
        };
        winnings = winnings + episodeWinnings;
        losses = losses + episodeLosses;
      }
    }
  }
  return {
    displayName,
    anon,
    episodes: episodesSummary,
    winnings,
    losses,
    balance,
    loan: totalLoan,
    ratio: winnings / (losses === 0 ? 1 : losses*-1),
    epsPlayed
  };
}

export function processAllWagers(users, episodes, bets) {

  let leaderboard = {};

  for (let userId of Object.keys(users)) {
    let user = users[userId];
    let wagers = getKey(user, 'wagers', null);
    let wagerIds = [];
    if (wagers) {
      wagerIds = Object.keys(wagers);
    }
    if (wagers && wagerIds.length !== 0) {
      leaderboard[user.id] = processUserWagers(user, episodes, bets);
    }
  }
  return leaderboard;
}

export function processOneUser(user, episodes, bets) {

  let leaderboard = {};
  leaderboard[user.id] = processUserWagers(user, episodes, bets);
  return leaderboard;
}
