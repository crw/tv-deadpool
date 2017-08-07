import firebaseApp from './firebase-app';

const updateData = {
  ['users/Jr9wO5CW1uX2li5HLFepQL9w5bn2']: true,
  ['secure/Jr9wO5CW1uX2li5HLFepQL9w5bn2']: true,
  ['roles/datamanagers/Jr9wO5CW1uX2li5HLFepQL9w5bn2']: true,
  ['roles/usermanagers/Jr9wO5CW1uX2li5HLFepQL9w5bn2']: true
};

console.log('Updating Firebase database', process.env.FIREBASE_DATABASE_URL);

// The app only has access as defined in the Security Rules
const db = firebaseApp.database();
const ref = db.ref();

ref.update(updateData).then((snapshot) => {
  console.log('Update complete.');
}, (e) => {
  console.log('Update error.');
  console.log(e);
}).then(process.exit);