import firebaseApp from './lib/firebase-app';
import { err } from './lib/lib';

////  HACK IT UP
////  USER IDs BELOW
const FROM_ID = 'mcbLQf1vOUdwKUYbEcAKNqM3IAE2';
const TO_ID = 'Jr9wO5CW1uX2li5HLFepQL9w5bn2';

const db = firebaseApp.database();
var ref = db.ref('users');

var fromRef = ref.child(`${FROM_ID}`);
var toRef = ref.child(`${TO_ID}`);

fromRef.once('value').then(snapshot => {
  let val = snapshot.val();
  toRef.update(val).then(snapshot => {
    // fromRef.remove();
    console.log(`Moved ${FROM_ID} to ${TO_ID}.`);
    process.exit();
  }, err);
}, err);
