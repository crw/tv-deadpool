
/**
 * Catch Firebase data errors and quit
 * @param err {Error} - exception error
 */
export function err(err) {
  console.log('Firebase data error:', err);
  process.exit();
}


/**
 * Fetch data promise generator
 * @param key {String} - location to fetch from Firebase
 * @return {Function} - generates fetch data promise
 */
export function fetchFirebaseDataFn(fbDb, key) {
  return new Promise((resolve, reject) => {
    fbDb.ref(key).once('value').then(snapshot => resolve(snapshot.val())).catch(err);
  });
}

