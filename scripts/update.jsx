import firebaseApp from './lib/firebase-app';
import { err } from './lib/lib';


const updateData = {
  ['users/Jr9wO5CW1uX2li5HLFepQL9w5bn2']: true,
  ['secure/Jr9wO5CW1uX2li5HLFepQL9w5bn2']: true,
  ['roles/datamanagers/Jr9wO5CW1uX2li5HLFepQL9w5bn2']: true,
  ['roles/usermanagers/Jr9wO5CW1uX2li5HLFepQL9w5bn2']: true
};
const ref = firebaseApp.database().ref();

ref.update(updateData)
  .then(() => console.log('Update complete.'), err)
  .then(process.exit);