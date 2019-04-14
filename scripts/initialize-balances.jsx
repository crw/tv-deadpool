/**
 * intialize-balances.jsx - At the start of a new season, give players money
 *
 *
 *
 * DANGEROUS TO RUN - ALTERS DATA
 * Running process-results.jsx will undo / rollback any changes made by this script.
 */
const seasonId = 'gameofthrones-08';
const INITIAL_BALANCE = 100;

import firebaseApp from './lib/firebase-app';
import moment from 'moment';
import { toArray } from '../app/utils';


console.log('Updating Firebase database', process.env.FIREBASE_DATABASE_URL);

// The app only has access as defined in the Security Rules
const db = firebaseApp.database();

let users = {};
let secure = {};

let missing_users = "";

db.ref('users').once('value').then(snapshot => {

  try {

      let users = snapshot.val();
      let usersArr = toArray(users);
      let updateData = {};
      let count = 0;

      for (let user of usersArr) {

        const { id, displayName } = user;

        // // ... and is not Marah Eakin
        // if (curBalance + locked_up < 100 &&
        //   id.indexOf('avclub') === -1 &&
        //   id !== '0yomzuaZZRVJ1c4gzbL5M1ICWyf1') {

        //   const newBalance = 100 - locked_up;
        //   console.log(`Updating ${id} (${displayName}, old balance ${curBalance}, locked up ${locked_up}, new balance ${newBalance}.)`);
        //   updateData[`users/${id}/balance/${seasonId}`] = newBalance;
        //   count++;
        // }

        // ... is not Marah Eakin
        if (id !== undefined) {
          console.log(`Will update ${id} (${displayName}, new balance ${INITIAL_BALANCE}.)`);
          updateData[`users/${id}/balance/${seasonId}`] = INITIAL_BALANCE;
          count++;
        } else {
          missing_users += `Missing user ${displayName} \n`;
        }
      }

      db.ref().update(updateData).then((snapshot) => {
        console.log('Processed', count, 'accounts.');
        console.log('...done.');
        console.log(missing_users);
        process.exit();
      });

  } catch (err) {
    console.log(err);
    process.exit();
  }
});

