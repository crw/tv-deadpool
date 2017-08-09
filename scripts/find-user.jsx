import firebaseApp from './lib/firebase-app';
import moment from 'moment';
import { toArray } from '../app/utils';
import { fetchFirebaseDataFn, err } from './lib/lib';


const db = firebaseApp.database();
const ref = db.ref();

const getSecure = fetchFirebaseDataFn(db, 'secure');
const getUsers = fetchFirebaseDataFn(db, 'users');

let search = process.argv[2];

if (!search) {
  console.log('Requires one argument: search term');
  process.exit();
}

getSecure.then(secure => {
  getUsers.then(users => {
    try {
      for (const secureUser of toArray(secure)) {
        const displayName = secureUser.displayName || '';
        const email = secureUser.email || '';
        if (displayName.indexOf(search) !== -1 || email.indexOf(search) !== -1) {
          console.log(`${secureUser.id}: '${displayName}', '${email}', '${users[secureUser.id].displayName}'`);
        }
      }
      process.exit();
    } catch (e) {
      err(e);
      process.exit();
    }
  }, err);
}, err);

