import {DEFAULT_DISPLAY_NAME} from '../app/constants/strings';
import {INITIAL_BALANCE} from '../app/constants/numbers';
import {sortObjectsByKey, getKey, toArray} from '../app/utils';


function sortWagersIntoEvents(wagers, events, bets) {

  let wagersByEvent = {};

  for (let betId of Object.keys(wagers)) {
    let eventId = bets[betId].event_id;
    let wager = wagers[betId];

    if (Array.isArray(wagersByEvent[eventId])) {
      wagersByEvent[eventId].push(wager);
    } else {
      wagersByEvent[eventId] = [wager]
    }
  };
  return wagersByEvent;
}

function processUserWagers(user, events, bets) {

  const eventsArr = toArray(events).sort(sortObjectsByKey());
  const wagers = (user.wagers) ? sortWagersIntoEvents(user.wagers, events, bets) : [];
  const anon = user.displayName ? false : true;
  const displayName = user.displayName || DEFAULT_DISPLAY_NAME;
  let balance = INITIAL_BALANCE;
  let winnings = 0;
  let losses = 0;

  let eventsSummary = {};

  for (let event of eventsArr) {
    if (event.resolved) {

      let eventWinnings = 0;
      let totalWinnings = 0;
      let eventLosses = 0;
      let costOfPlay = 0;
      let payout = 0;

      if (wagers[event.id]) {

        for (let wager of wagers[event.id]) {
          costOfPlay = costOfPlay + wager.wager;
          let bet = bets[wager.id];
          if (bet.resolved) {
            if (bet.paid) {
              payout = Math.floor((bet.odds_payout * wager.wager) / bet.odds_wager);
              eventWinnings = eventWinnings + payout;
              totalWinnings = totalWinnings + payout + wager.wager;
            } else {
              eventLosses = eventLosses - wager.wager
            }
          }
        }
      }
      let cheated = (balance - costOfPlay < 0);
      let balanceBeforeWinnings = balance - costOfPlay;
      balance = balance - costOfPlay + totalWinnings;
      eventsSummary[event.id] = {
        cheated,
        balance,
        balanceBeforeWinnings,
        winnings: eventWinnings,
        losses: eventLosses
      };
      winnings = winnings + eventWinnings;
      losses = losses + eventLosses;
    }
  }

  return {
    displayName,
    anon,
    events: eventsSummary,
    winnings,
    losses,
    balance
  };
}

export function processAllWagers(users, events, bets) {

  let leaderboard = {};
  for (let userId of Object.keys(users)) {
    let user = users[userId];
    let wagers = getKey(user, 'wagers', null);
    let wagerIds = [];
    if (wagers) {
      wagerIds = Object.keys(wagers); //.filter((wagerId) => { return wagerId.indexOf('gameofthrones-6-8') === -1 });
    }
    if (wagers && wagerIds.length !== 0) {
      leaderboard[user.id] = processUserWagers(user, events, bets);
    }
  }
  return leaderboard;
}

export function processOneUser(user, events, bets) {

  let leaderboard = {};
  leaderboard[user.id] = processUserWagers(user, events, bets);
  return leaderboard;
}
