import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { normalizeName, getKey } from 'app/utils';
import { seasonDefaults, episodeDefaults, betDefaults } from 'redux/form/details';



// Special Firebase directive that sets the value to "now" based on the server's clock.
const { TIMESTAMP } = firebase.database.ServerValue;

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
};

const firebaseApp = firebase.initializeApp(config);


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
function editRef(ref, keys) {
  return (id, values) => {
    let updateData = {};
    for (let key of keys) {
      updateData[`${id}/${key}`] = values[key];
    }
    updateData[`${id}/updated_at`] = TIMESTAMP;
    console.log(updateData);
    return firebase.database().ref(`/${ref}/`).update(updateData);
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
      created_at: TIMESTAMP,
      updated_at: TIMESTAMP
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
      created_at: TIMESTAMP,
      updated_at: TIMESTAMP
    },
    [`/series/${series}/seasons/${id}`]: true
  };
  return firebase.database().ref('/').update(updateData);
}

/**
 *
 */
export const editSeason = editRef('seasons', Object.keys(seasonDefaults));


/**
 *
 */
export function createEpisode(values) {

  const { season, episode } = values;
  const episodeId = `${season}-${episode.toString().padStart(2, "0")}`;
  const updateData = {
    [`/episodes/${episodeId}`]: {
      ...values,
      resolved: false,
      id: episodeId,
      type: 'TV_EPISODE',
      created_at: TIMESTAMP,
      updated_at: TIMESTAMP
    },
    [`/seasons/${season}/episodes/${episodeId}`]: true
  }
  return firebase.database().ref('/').update(updateData);
}

/**
 *
 */
export const editEpisode = editRef('episodes', Object.keys(episodeDefaults));


/**
 *
 */
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
      created_at: TIMESTAMP,
      updated_at: TIMESTAMP
    },
    [`/episodes/${episode}/bets/${betId}`]: true
  }
  return firebase.database().ref('/').update(updateData);
}

/**
 *
 */
export const editBet = editRef('bets', Object.keys(betDefaults));


/**
 *
 */
export function placeWager(user, bet, wager, comment) {

    const userRef = getUserRef(user.id);
    const prevWager = getKey(user.wagers, bet.id, {});
    const prevWagerAmount = prevWager.wager || 0;
    // Refund the previous wager, charge the new wager.
    const newBalance = user.balance[bet.season] + prevWagerAmount - wager;

    if (newBalance < 0) {
      return Promise.resolve();
    }

    const updateData = {
      [`balance/${bet.season}`]: newBalance,
      [`wagers/${bet.id}`]: {
        id: bet.id,
        wager,
        comment,
        created_at: prevWager.created_at || TIMESTAMP,
        updated_at: TIMESTAMP
      }
    };
    return userRef.update(updateData).then(() => {
      if (wager === 0 && comment === '') {
        userRef.child(`wagers/${bet.id}`).remove();
      }
    });
}


export function reconcileEpisode(episode, paid, resolved, notes = {}, confirmation = '') {

  let updateData = {
    [`episodes/${episode.id}/resolved`]: true,
    [`episodes/${episode.id}/confirmation`]: confirmation,
  };

  for (let betId in paid) {
    updateData[`bets/${betId}/paid`] = paid[betId];
  }

  for (let betId in resolved) {
    updateData[`bets/${betId}/resolved`] = resolved[betId];
  }

  for (let betId in notes) {
    updateData[`bets/${betId}/note`] = notes[betId];
  }

  console.log('updateData', updateData);
  return firebase.database().ref().update(updateData);

}


export default firebaseApp;
