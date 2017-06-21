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


export const getUserRef = (uid) => {
  return firebaseApp.database().ref(`users/${uid}`);
};

export const getSecureRef = (uid) => {
  return firebaseApp.database().ref(`secure/${uid}`);
};

export const getCurrentUser = () => {
  return firebaseApp.auth().currentUser;
};


export function createSeries(title, description, published) {

  const seriesId = normalizeName(title);
  const updateData = {
    [`${seriesId}`]: {
      id: seriesId,
      title,
      description,
      published,
      created_at: Date.now(),
      updated_at: Date.now()
    }
  };
  return firebase.database().ref('/series/').update(updateData);
}


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
