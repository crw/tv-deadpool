import firebaseApp from './lib/firebase-app';
// App imports
import { isObject, sortObjectsByKey, getKey } from '../app/utils/index.jsx';
import { err } from './lib/lib';

////  HACK IT UP
////  USER IDs BELOW
const FROM_ID = '';
const TO_ID = '';

const db = firebaseApp.database();
var ref = db.ref('users');

var fromRef = ref.child(`${FROM_ID}/wagers`);
var toRef = ref.child(`${TO_ID}/wagers`);

fromRef.once('value').then(snapshot => {
  let val = snapshot.val();
  toRef.update(val).then(snapshot => {
    // fromRef.remove();
    process.exit();
  });
}, err);
