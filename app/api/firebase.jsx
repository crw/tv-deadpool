import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { normalizeName, getKey } from 'app/utils';

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
});


export function getUserRef(uid) {
  return firebaseApp.database().ref(`users/${uid}`);
};

export function getSecureRef(uid) {
  return firebaseApp.database().ref(`secure/${uid}`);
};

export function getCurrentUser() {
  return firebaseApp.auth().currentUser;
};


export function isLoggedIn() {
  return !!firebaseApp.auth().currentUser;
}

export function isAdmin() {
  return true;
}


/**
 * Creates edit functions
 * @returns func
 */
function editRef(ref) {
  return (id, values) => {
    return firebase.database().ref(`/${ref}/`).update({
      [`${id}`]: {
        ...values,
        updated_at: Date.now()
      }
    });
  };
};


/**
 * @param object {
 *  title string
 *  description string
 *  published bool
 * }
 */
export function createSeries(title, description, published) {

  const seriesId = normalizeName(title);
  const updateData = {
    [`${seriesId}`]: {
      id: seriesId,
      title,
      description,
      published,
      type: 'TV_SERIES',
      created_at: Date.now(),
      updated_at: Date.now()
    }
  };
  return firebase.database().ref('/series/').update(updateData);
}


/**
 * @param object {
 *  series string id
 *  season number
 *  title string
 *  description string
 *  lock_at number
 *  published bool
 * }
 */
export function createSeason(values) {

  const { series, season } = values;
  const id = `${series}-${season.padStart(2, "0")}`;
  const updateData = {
    [`/seasons/${id}`]: {
      ...values,
      id,
      type: 'TV_SEASON',
      created_at: Date.now(),
      updated_at: Date.now()
    },
    [`/series/${series}/seasons/${id}`]: true
  };
  return firebase.database().ref('/').update(updateData);
}

export const editSeason = editRef('seasons');


export function createEpisode(values) {

  const { season, episode } = values;
  const episodeId = `${season}-${episode.toString().padStart(2, "0")}`;
  const updateData = {
    [`/episodes/${episodeId}`]: {
      ...values,
      resolved: false,
      id: episodeId,
      type: 'TV_EPISODE',
      created_at: Date.now(),
      updated_at: Date.now()
    },
    [`/seasons/${season}/episodes/${episodeId}`]: true
  }
  return firebase.database().ref('/').update(updateData);
}

export function createBet(values) {

  const { episode, nextBetId } = values;

  if (!episode) {
    throw new Error('episode (id) not defined; required to create Bets');
  }
  if (!nextBetId && nextBetId !== 0) {
    throw new Error('nextBetId not defined; required to create Bets.');
  }

  const betId = `${episode}-${nextBetId.toString().padStart(2, "0")}`;
  const updateData = {
    [`/bets/${betId}`]: {
      ...values,
      note: '',
      official: true,
      paid: false,
      resolved: false,
      id: betId,
      type: 'TV_EPISODE_BET',
      created_at: Date.now(),
      updated_at: Date.now()
    },
    [`/episodes/${episode}/bets/${betId}`]: true
  }
  return firebase.database().ref('/').update(updateData);
}

export const editBet = editRef('bets');


export function placeWager(user, betId, wager, comment) {

    const userRef = getUserRef(user.id);
    const prevWager = getKey(user.wagers, betId, null);
    const prevWagerAmount = getKey(prevWager, wager, 0);
    // Refund the previous wager, charge the new wager.
    const newBalance = user.balance + prevWagerAmount - wager;

    if (newBalance < 0) {
      return Promise.resolve();
    }
    const updateData = {
      [`wagers/${betId}`]: {
        id: betId,
        wager,
        comment,
        created_at: getKey(prevWager, created_at, Date.now()),
        updated_at: Date.now()
      },
      balance: newBalance
    };
    return userRef.update(updateData).then(() => {
      if (wager === 0 && comment === '') {
        userRef.child(`wagers/${betId}`).remove();
      }
    });
}


export default firebaseApp;
