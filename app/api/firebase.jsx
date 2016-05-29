import firebase from 'firebase';
import {isObject} from 'app/utils';


firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
});


export var getUserRef = (uid) => {
  return firebase.database().ref(`users/${uid}`);
};

export var getCurrentUser = () => {
  return firebase.auth().currentUser;
}

/**
 * Converts a Firebase "array" hash into a Javascript array, useful as
 * javascript arrays can be sorted, filtered, and mapped.
 * @param firebaseArray object "array" from Firebase. Each entry will have "key"
 *     mapped to the item key from the object.
 * @return array
 */
export function toArray(firebaseArray) {
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

export default firebase;
