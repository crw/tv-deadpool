/**
 * reset-balances.jsx - Grants extra money to underperforming users.
 *
 *
 *
 * DANGEROUS TO RUN - ALTERS DATA
 * Running process-results.jsx will undo / rollback any changes made by this script.
 */
const seasonId = 'gameofthrones-07';


import firebaseApp from './firebase-app';
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

          // ... and is not Marah Eakin
          if (curBalance + locked_up < 100 &&
            id.indexOf('avclub') === -1 &&
            id !== '0yomzuaZZRVJ1c4gzbL5M1ICWyf1') {

            console.log(`Updating ${id} (${displayName}, old balance ${curBalance}, locked up ${locked_up}.)`);
            updateData[`users/${id}/balance/${seasonId}`] = 100 - locked_up;
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

// SEASON 7 EPISODE 01
// Updating 06GflVliFUhR6wBZoYsdKqi2EU13 (Krystle, old balance 0, locked up 60.)
// Updating 0ptaUzLyLVQPL6oZ9RAm9qX7B4I3 (Wobbie, old balance 80, locked up 14.)
// Updating 1Mo1oNQnUmZnpZ7yYkWwVFRJzOD3 (WhitneyJoeAhn, old balance 95, locked up 0.)
// Updating 1PSUqjrv8xS7XXUY7IDevfWnPw12 (Logahmmed, First of His Name, old balance 23, locked up 46.)
// Updating 1nyBZKElklaBYD4vOmGbKvPkeIK2 (undefined, old balance 30, locked up 20.)
// Updating 2NVH1sXfXIeaIYqq4srx1SQgDCS2 (undefined, old balance 67, locked up 28.)
// Updating 2Sw3abwem0Q89ZzV0KHok1Ugkdw1 (Joeltronics, old balance 30, locked up 44.)
// Updating 2wAjrXUAivSsjHQlCKCcn7jDe5q2 (undefined, old balance 80, locked up 5.)
// Updating 3rZOWhC1kQVmN3PoJKW8nsGATjC2 (undefined, old balance 74, locked up 20.)
// Updating 72IgaPGqL7aEGXU5JJFE2m6UhuH3 (undefined, old balance 0, locked up 30.)
// Updating 73CwZDftCZRViZtvivRr7fbEWuz2 (Ally MacKenzie, old balance 25, locked up 42.)
// Updating 7ZawU455oNVhsjDl20NU75v3vNF2 (Carter T, old balance 96, locked up 3.)
// Updating 7g8uxJ21jlcoGVB41UCcwF7gd6G3 (A girl has no game, old balance 97, locked up 0.)
// Updating 7oDKfiECz2aR78WHco3sJHHSvLh1 (undefined, old balance 80, locked up 0.)
// Updating 87OhTEb9hTbmgb9ACzApSDqwCCs2 (undefined, old balance 0, locked up 40.)
// Updating 8uFul5mwtOPYOzRIS38ZGazyPOq1 (Weak Belwas, old balance 63, locked up 10.)
// Updating 9J5YqE5ZU6WILUVsfx2emo3cb8b2 (efreed52, old balance 70, locked up 25.)
// Updating 9XkydKunZZMGSykLgrDhu5wy4252 (undefined, old balance 0, locked up 40.)
// Updating 9fA80eNs5Uhtds5LG9vNUC2mRO03 (undefined, old balance 20, locked up 70.)
// Updating D1hUxDnIaTaJqfGqRpIGmQeDd4q1 (undefined, old balance 0, locked up 0.)
// Updating En8DAKA1Ppg9itX5duBlnemHrkO2 (undefined, old balance 45, locked up 0.)
// Updating EqqZ0yPPekcPjN2IZGu2YPQwdIE2 (undefined, old balance 78, locked up 20.)
// Updating F1tN8E5wa7QUpprfidc3Xl6MIbk1 (undefined, old balance 90, locked up 5.)
// Updating G47ye4gLhyWt2qVAOlV8NjZgyNI3 (Beer Sandwich, old balance 75, locked up 15.)
// Updating GpgVwohDxyNgY26aNb1ByFa8JG43 (undefined, old balance 94, locked up 4.)
// Updating H3UtwFrEOdcG9fbkN3GV0lKFF3z2 (undefined, old balance 30, locked up 0.)
// Updating HW6qjK8Cagc7QHeM8W2v3sf32lW2 (undefined, old balance 90, locked up 0.)
// Updating HqfTiOVoFuhVDWgMRxVdsW0Ki5C2 (undefined, old balance 35, locked up 60.)
// Updating IBlO30ZfEhUK5EaH5EHlC4EWYXV2 (Cyndersteller, old balance 0, locked up 35.)
// Updating IKoVHoLaK9gEVzvk59mnGLJFq6v1 (Syrio Forel Fights On, old balance 80, locked up 10.)
// Updating JCodBw5KmHO4oWf7A82FB0q1VRY2 (I drink and I know things, old balance 80, locked up 0.)
// Updating Ju9X70dGnsN5Wq5Tvc5WcWThXE43 (undefined, old balance 44, locked up 16.)
// Updating KL4svftcLGQRAFZknX9LEvvLK8g1 (Jesus H Stark, old balance 25, locked up 15.)
// Updating MfkQ3ihzzvftaoWDnJC5xQSjDlB3 (undefined, old balance 40, locked up 50.)
// Updating Mzk1cqnOwUQYcvaiCN5DAwUFy7u1 (undefined, old balance 30, locked up 60.)
// Updating OEl1AFH3jWb5yrUHzebHNAruXuh1 (undefined, old balance 90, locked up 0.)
// Updating PGjS2FZqHzegNP27MnqLsG2aXkn2 (Katricus, old balance 0, locked up 75.)
// Updating PeXmoU7kXcQX73RIut2rrjkVB153 (JIFeldman, old balance 64, locked up 28.)
// Updating QFlXTZ8vRzPQ1m03F97fEmGp0he2 (undefined, old balance 89, locked up 10.)
// Updating RzG5iC3qLDM95BY5TcH4D2pYSmn1 (undefined, old balance 37, locked up 32.)
// Updating SjHxMv4PgUZOj7AlxY5SnLZUcBh1 (The Hound and the Fury, old balance 85, locked up 0.)
// Updating TPuEvOqAzxWmAfmZ7hdlxDJSuvy1 (Zombie Mountain, old balance 60, locked up 10.)
// Updating Tj8QudMg3GVGeAAMGmpMQq23nkj2 (Cakeigh, old balance 80, locked up 0.)
// Updating VfDQ7IKX9MeK1OeyiYbfeRZeHm23 (Al, old balance 0, locked up 0.)
// Updating WiVoYPdPmza9zXA4tgVHHccfMOv1 (undefined, old balance 66, locked up 10.)
// Updating XGnQKVOnzfgZXbsBUizRLN8Qunm1 (undefined, old balance 66, locked up 0.)
// Updating XnxD12iRkRYYY7gWPjEuKZMgUQk1 (undefined, old balance 25, locked up 45.)
// Updating Xt56N9Bl3jhqFiGXjEUReKKMLIR2 (undefined, old balance 98, locked up 0.)
// Updating YJioqoAOSjehBiuc88CbsdKAoTy1 (undefined, old balance 0, locked up 25.)
// Updating ZK0fOoXRUpT9jx5rUMV7ZNIqtX42 (Yannis Baratheonoplis, old balance 50, locked up 45.)
// Updating ZqkJgYRgusSC07duQfYLNRB3hnW2 (Narc Twain, old balance 90, locked up 0.)
// Updating bDzNPP0fbAeoVEDw0mXaNfBQ8gf2 (undefined, old balance 84, locked up 10.)
// Updating cEf6tRbnx6Xh6Z8NrNrNl2bLoyn2 (undefined, old balance 68, locked up 15.)
// Updating cLxVlYzmQrOnCU6vdIEMly6uxVi2 (Baron Werner Ünderbheit, old balance 30, locked up 35.)
// Updating cgBfnrfF8AQKwwmXQGGyVBSENym2 (undefined, old balance 70, locked up 15.)
// Updating f8gMEjad7zez0IJLOP09Sh5Tgsz1 (undefined, old balance 0, locked up 5.)
// Updating fW6biipMt6Xn5qx7SJMbnC8miES2 (undefined, old balance 90, locked up 0.)
// Updating g2tqtRsTZhZfT5J1JjSQdlbdAO52 (Hipster Ariel, old balance 0, locked up 50.)
// Updating gdDhbd0cJXg4gUX2febNMkyP8Ul1 (undefined, old balance 0, locked up 0.)
// Updating hGZJgr46Twb4J0d65h2IMQYl01F2 (Born to be Wildling, old balance 50, locked up 0.)
// Updating hJ5lKhAnTWOj7jJhFmZ5vFzyjG72 (undefined, old balance 55, locked up 20.)
// Updating mAzBJS7sW2NzGsFdEpeOoM94NQP2 (undefined, old balance 84, locked up 15.)
// Updating mDRM5de7gxOqIJkpYmntkzRmcs72 (GeOHUdson93, old balance 82, locked up 14.)
// Updating mzJa4XH7skdHnAOYUcpwXFK6W7o2 (undefined, old balance 60, locked up 30.)
// Updating nteB75yCngPa4Ny69zu7fz3iTJu2 (undefined, old balance 93, locked up 0.)
// Updating p4tMI6Lx69gmdIswAb7FRObyMKX2 (undefined, old balance 25, locked up 70.)
// Updating peMeI5hfhFdNRKRUUJwgMUKZH283 (bob, old balance 0, locked up 0.)
// Updating ptRgWMz2AqhoW77AzkWKjD0n4Fj1 (PNelly, old balance 65, locked up 20.)
// Updating qSFwsuJoXhcMXQB6vXyoyc1yoxD2 (HOTPIEWILLNEVERDIE, old balance 0, locked up 54.)
// Updating qcm5owwraTcgevYibjeE2LqJZb33 (undefined, old balance 8, locked up 60.)
// Updating rOa4MNZhRsRT0FyizJfyChraaSl1 (DrGrlFrnd, old balance 40, locked up 30.)
// Updating rWAxKAjQBzRqEscOwyoTPhYeVHv1 (undefined, old balance 20, locked up 40.)
// Updating t2JOnhduHDc5JznRF3z86vXJu9k1 (Suahol, old balance 0, locked up 0.)
// Updating tVCNE56YKsSoVaoNd3rShkxFG4h1 (undefined, old balance 70, locked up 0.)
// Updating tu9HRMg40GZb78hOuyrPcFYi9d62 (All Men Must Die, old balance 45, locked up 15.)
// Updating v8Bwqyw3mhPD2gmvsEs8osC5HUh1 (sportzak, old balance 0, locked up 25.)
// Updating w281lqKiBCSgwFTl4PTfu9NBL0A2 (undefined, old balance 0, locked up 90.)
// Updating xAoHcemyayQ0wtEhc1TKsfoj5mB3 (WhatIsHypedMayNeverDie, old balance 60, locked up 30.)
// Updating xUpKU4k5voPzslRXnnmCpoYE52k1 (Bumwell Fartly, old balance 45, locked up 0.)
// Updating xyTLjwPsFGNqMdIR0A0JFR84zkt2 (undefined, old balance 95, locked up 0.)
// Updating yn2Py5rZ7qYdJw06Pon806bUR7b2 (undefined, old balance 75, locked up 0.)
// Processed 81 accounts.
