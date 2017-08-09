/**
 * reset-balances.jsx - Grants extra money to underperforming users.
 *
 *
 *
 * DANGEROUS TO RUN - ALTERS DATA
 * Running process-results.jsx will undo / rollback any changes made by this script.
 */
const seasonId = 'gameofthrones-07';


import firebaseApp from './lib/firebase-app';
import moment from 'moment';
import { toArray } from '../app/utils';


console.log('Updating Firebase database', process.env.FIREBASE_DATABASE_URL);

// The app only has access as defined in the Security Rules
const db = firebaseApp.database();

let users = {};
let secure = {};
db.ref('bets').once('value').then(snapshot => {

  const bets = snapshot.val();

  db.ref('users').once('value').then(snapshot => {

    try {

        let users = snapshot.val();
        let usersArr = toArray(users);
        let updateData = {};
        let count = 0;

        for (let user of usersArr) {

          const { id, balance, displayName, wagers } = user;

          const curBalance = balance[seasonId];

          let locked_up = 0;
          if (wagers) {
            for (let wagerId of Object.keys(wagers)) {
              const wager = wagers[wagerId];
              const bet = bets[wagerId];
              if (bet.season === seasonId && !bet.resolved) {
                locked_up += wager.wager;
              }
            }
          }

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
          if (id.indexOf('avclub') === -1 && id !== '0yomzuaZZRVJ1c4gzbL5M1ICWyf1') {
            const newBalance = curBalance + 200 < 200 ? 200 : curBalance + 200;
            console.log(`Updating ${id} (${displayName}, old balance ${curBalance}, locked up ${locked_up}, new balance ${newBalance}.)`);
            updateData[`users/${id}/balance/${seasonId}`] = newBalance;
            count++;
          }
        }

        db.ref().update(updateData).then((snapshot) => {
          console.log('Processed', count, 'accounts.');
          console.log('...done.');
          process.exit();
        });

    } catch (err) {
      console.log(err);
      process.exit();
    }
  });
});
