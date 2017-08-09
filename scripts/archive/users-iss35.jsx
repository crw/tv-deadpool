import firebaseApp from './lib/firebase-app';
import moment from 'moment';
import { toArray } from '../app/utils';
import { fetchFirebaseDataFn, err } from './lib/lib';


const db = firebaseApp.database();
const fetchUsers = fetchFirebaseDataFn(db, 'users');

fetchUsers.then(users => {

  let broken_users = [];
  let updateData = {};

  for (const user of toArray(users)) {
    if (!user.id || !user.balance || !user.created_at) {
      broken_users.push(user);
      updateData[user.key] = {
        id: user.key,
        created_at: moment().valueOf(),
        balance: {
          ['gameofthrones-06']: 100,
          ['gameofthrones-07']: 100
        },
        displayName: user.displayName
      }
    }
  }

  console.log(broken_users);

  db.ref('users').update(updateData).then(() => {
    console.log('Updated', updateData);
    console.log('Modified', broken_users.length, 'users.');
    process.exit();
  })
}, err);
