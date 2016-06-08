import firebase from 'firebase';
// App imports
import {DEFAULT_DISPLAY_NAME as CONST_DEFAULT_DISPLAY_NAME} from '../app/constants/strings';
import {isObject, sortObjectsByKey, getKey} from '../app/utils';

// Initialize the app with a custom auth variable, limiting the server's access
var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
  serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT_FILE || undefined,
  databaseAuthVariableOverride: {
    uid: "secret-service-worker"
  }
};
firebase.initializeApp(config);

const INITIAL_BALANCE = 100;
const DEFAULT_DISPLAY_NAME = CONST_DEFAULT_DISPLAY_NAME;

console.log('Updating Firebase database', process.env.FIREBASE_DATABASE_URL);

function toArray(firebaseArray) {
  if (isObject(firebaseArray)) {
    let itemsArr = [];
    Object.keys(firebaseArray).forEach((item) => {
      itemsArr.push(firebaseArray[item])
      // Preserve the key, which is often the ID for the object.
      itemsArr[itemsArr.length-1].key = item;
    });
    return itemsArr;
  } else {
    throw 'Invalid data, not an object.';
  }
}

// leaderboard {
//   uid {
//     displayName
//     balance
//     winnings
//     losses
//     events {
//       event_id {
//         cheated
//         balance
//         winnings
//         losses
//         balanceBeforeWinnings
//       }
//     }
//   }
// }

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

  let eventsArr = toArray(events).sort(sortObjectsByKey());
  let wagers = (user.wagers) ? sortWagersIntoEvents(user.wagers, events, bets) : [];
  let balance = INITIAL_BALANCE;
  let winnings = 0;
  let losses = 0;
  let displayName = user.displayName || DEFAULT_DISPLAY_NAME;

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
    events: eventsSummary,
    winnings,
    losses,
    balance
  };
}

function processAllWagers(users, events, bets) {

  let leaderboard = {};
  for (let userId of Object.keys(users)) {
    let user = users[userId];
    let wagers = getKey(user, 'wagers', null);
    if (wagers && wagers.length !== 0) {
      leaderboard[user.id] = processUserWagers(user, events, bets);
    }
  }
  return leaderboard;
}

function processOneUser(user, events, bets) {

  let leaderboard = {};
  leaderboard[user.id] = processUserWagers(user, events, bets);
  return leaderboard;
}


// The app only has access as defined in the Security Rules
var db = firebase.database();
var ref = db.ref();

ref.once('value').then((snapshot) => {
  let val = snapshot.val();
  let bets = val.bets;
  let events = val.events;
  let users = val.users;

  let leaderboard;

  try {
    leaderboard = processAllWagers(users, events, bets);

    let updateData = {};

    for (let userId of Object.keys(leaderboard)) {
      updateData[`users/${userId}/balance`] = leaderboard[userId].balance;
    }

    ref.child('leaderboard').set(leaderboard).then(() => {
      ref.update(updateData).then((snapshot) => {
        process.exit(0);
      });
    });
  } catch (e) {
    console.log('Exception', e);
  }
}, (e) => {
  console.log('error', e);
});

