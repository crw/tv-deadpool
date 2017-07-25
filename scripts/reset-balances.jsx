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

            console.log(`Updating ${id} (${displayName}, old balance ${curBalance}, locked up ${locked_up}, new balance ${100-locked_up}.)`);
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
// Updating 06GflVliFUhR6wBZoYsdKqi2EU13 (Krystle, old balance 0, locked up 60, new balance 40.)
// Updating 0ptaUzLyLVQPL6oZ9RAm9qX7B4I3 (Wobbie, old balance 80, locked up 14, new balance 86.)
// Updating 1Mo1oNQnUmZnpZ7yYkWwVFRJzOD3 (WhitneyJoeAhn, old balance 95, locked up 0, new balance 100.)
// Updating 1PSUqjrv8xS7XXUY7IDevfWnPw12 (Logahmmed, First of His Name, old balance 23, locked up 46, new balance 54.)
// Updating 1nyBZKElklaBYD4vOmGbKvPkeIK2 (undefined, old balance 30, locked up 20, new balance 80.)
// Updating 2NVH1sXfXIeaIYqq4srx1SQgDCS2 (undefined, old balance 67, locked up 28, new balance 72.)
// Updating 2Sw3abwem0Q89ZzV0KHok1Ugkdw1 (Joeltronics, old balance 30, locked up 44, new balance 56.)
// Updating 2wAjrXUAivSsjHQlCKCcn7jDe5q2 (undefined, old balance 80, locked up 5, new balance 95.)
// Updating 3rZOWhC1kQVmN3PoJKW8nsGATjC2 (undefined, old balance 74, locked up 20, new balance 80.)
// Updating 72IgaPGqL7aEGXU5JJFE2m6UhuH3 (undefined, old balance 0, locked up 30, new balance 70.)
// Updating 73CwZDftCZRViZtvivRr7fbEWuz2 (Ally MacKenzie, old balance 25, locked up 42, new balance 58.)
// Updating 7ZawU455oNVhsjDl20NU75v3vNF2 (Carter T, old balance 96, locked up 3, new balance 97.)
// Updating 7g8uxJ21jlcoGVB41UCcwF7gd6G3 (A girl has no game, old balance 97, locked up 0, new balance 100.)
// Updating 7oDKfiECz2aR78WHco3sJHHSvLh1 (undefined, old balance 80, locked up 0, new balance 100.)
// Updating 87OhTEb9hTbmgb9ACzApSDqwCCs2 (undefined, old balance 0, locked up 40, new balance 60.)
// Updating 8uFul5mwtOPYOzRIS38ZGazyPOq1 (Weak Belwas, old balance 63, locked up 10, new balance 90.)
// Updating 9J5YqE5ZU6WILUVsfx2emo3cb8b2 (efreed52, old balance 70, locked up 25, new balance 75.)
// Updating 9XkydKunZZMGSykLgrDhu5wy4252 (undefined, old balance 0, locked up 40, new balance 60.)
// Updating 9fA80eNs5Uhtds5LG9vNUC2mRO03 (undefined, old balance 20, locked up 70, new balance 30.)
// Updating D1hUxDnIaTaJqfGqRpIGmQeDd4q1 (undefined, old balance 0, locked up 0, new balance 100.)
// Updating En8DAKA1Ppg9itX5duBlnemHrkO2 (undefined, old balance 45, locked up 0, new balance 100.)
// Updating EqqZ0yPPekcPjN2IZGu2YPQwdIE2 (undefined, old balance 78, locked up 20, new balance 80.)
// Updating F1tN8E5wa7QUpprfidc3Xl6MIbk1 (undefined, old balance 90, locked up 5, new balance 95.)
// Updating G47ye4gLhyWt2qVAOlV8NjZgyNI3 (Beer Sandwich, old balance 75, locked up 15, new balance 85.)
// Updating GpgVwohDxyNgY26aNb1ByFa8JG43 (undefined, old balance 94, locked up 4, new balance 96.)
// Updating H3UtwFrEOdcG9fbkN3GV0lKFF3z2 (undefined, old balance 30, locked up 0, new balance 100.)
// Updating HW6qjK8Cagc7QHeM8W2v3sf32lW2 (Ianki, old balance 90, locked up 0, new balance 100.)
// Updating HqfTiOVoFuhVDWgMRxVdsW0Ki5C2 (undefined, old balance 35, locked up 60, new balance 40.)
// Updating IBlO30ZfEhUK5EaH5EHlC4EWYXV2 (Cyndersteller, old balance 0, locked up 35, new balance 65.)
// Updating IKoVHoLaK9gEVzvk59mnGLJFq6v1 (Syrio Forel Fights On, old balance 80, locked up 10, new balance 90.)
// Updating JCodBw5KmHO4oWf7A82FB0q1VRY2 (I drink and I know things, old balance 80, locked up 0, new balance 100.)
// Updating Ju9X70dGnsN5Wq5Tvc5WcWThXE43 (undefined, old balance 44, locked up 16, new balance 84.)
// Updating KL4svftcLGQRAFZknX9LEvvLK8g1 (Jesus H Stark, old balance 25, locked up 15, new balance 85.)
// Updating MfkQ3ihzzvftaoWDnJC5xQSjDlB3 (undefined, old balance 40, locked up 50, new balance 50.)
// Updating Mzk1cqnOwUQYcvaiCN5DAwUFy7u1 (undefined, old balance 30, locked up 60, new balance 40.)
// Updating OEl1AFH3jWb5yrUHzebHNAruXuh1 (undefined, old balance 90, locked up 0, new balance 100.)
// Updating PGjS2FZqHzegNP27MnqLsG2aXkn2 (Katricus, old balance 0, locked up 75, new balance 25.)
// Updating PeXmoU7kXcQX73RIut2rrjkVB153 (JIFeldman, old balance 64, locked up 28, new balance 72.)
// Updating QFlXTZ8vRzPQ1m03F97fEmGp0he2 (undefined, old balance 89, locked up 10, new balance 90.)
// Updating RzG5iC3qLDM95BY5TcH4D2pYSmn1 (undefined, old balance 37, locked up 32, new balance 68.)
// Updating SjHxMv4PgUZOj7AlxY5SnLZUcBh1 (The Hound and the Fury, old balance 85, locked up 0, new balance 100.)
// Updating TPuEvOqAzxWmAfmZ7hdlxDJSuvy1 (Zombie Mountain, old balance 60, locked up 10, new balance 90.)
// Updating Tj8QudMg3GVGeAAMGmpMQq23nkj2 (Cakeigh, old balance 80, locked up 0, new balance 100.)
// Updating VfDQ7IKX9MeK1OeyiYbfeRZeHm23 (Al, old balance 0, locked up 0, new balance 100.)
// Updating WiVoYPdPmza9zXA4tgVHHccfMOv1 (undefined, old balance 66, locked up 10, new balance 90.)
// Updating XGnQKVOnzfgZXbsBUizRLN8Qunm1 (undefined, old balance 66, locked up 0, new balance 100.)
// Updating XnxD12iRkRYYY7gWPjEuKZMgUQk1 (undefined, old balance 25, locked up 45, new balance 55.)
// Updating Xt56N9Bl3jhqFiGXjEUReKKMLIR2 (undefined, old balance 98, locked up 0, new balance 100.)
// Updating YJioqoAOSjehBiuc88CbsdKAoTy1 (undefined, old balance 0, locked up 25, new balance 75.)
// Updating ZK0fOoXRUpT9jx5rUMV7ZNIqtX42 (Yannis Baratheonoplis, old balance 50, locked up 45, new balance 55.)
// Updating ZqkJgYRgusSC07duQfYLNRB3hnW2 (Narc Twain, old balance 90, locked up 0, new balance 100.)
// Updating bDzNPP0fbAeoVEDw0mXaNfBQ8gf2 (undefined, old balance 84, locked up 10, new balance 90.)
// Updating cEf6tRbnx6Xh6Z8NrNrNl2bLoyn2 (undefined, old balance 68, locked up 15, new balance 85.)
// Updating cLxVlYzmQrOnCU6vdIEMly6uxVi2 (Baron Werner Ünderbheit, old balance 30, locked up 35, new balance 65.)
// Updating cgBfnrfF8AQKwwmXQGGyVBSENym2 (undefined, old balance 70, locked up 15, new balance 85.)
// Updating f8gMEjad7zez0IJLOP09Sh5Tgsz1 (undefined, old balance 0, locked up 5, new balance 95.)
// Updating fW6biipMt6Xn5qx7SJMbnC8miES2 (undefined, old balance 90, locked up 0, new balance 100.)
// Updating g2tqtRsTZhZfT5J1JjSQdlbdAO52 (Hipster Ariel, old balance 0, locked up 50, new balance 50.)
// Updating gdDhbd0cJXg4gUX2febNMkyP8Ul1 (undefined, old balance 0, locked up 0, new balance 100.)
// Updating hGZJgr46Twb4J0d65h2IMQYl01F2 (Born to be Wildling, old balance 50, locked up 0, new balance 100.)
// Updating hJ5lKhAnTWOj7jJhFmZ5vFzyjG72 (undefined, old balance 55, locked up 20, new balance 80.)
// Updating mAzBJS7sW2NzGsFdEpeOoM94NQP2 (undefined, old balance 84, locked up 15, new balance 85.)
// Updating mDRM5de7gxOqIJkpYmntkzRmcs72 (GeOHUdson93, old balance 82, locked up 14, new balance 86.)
// Updating mzJa4XH7skdHnAOYUcpwXFK6W7o2 (undefined, old balance 60, locked up 30, new balance 70.)
// Updating nteB75yCngPa4Ny69zu7fz3iTJu2 (undefined, old balance 93, locked up 0, new balance 100.)
// Updating p4tMI6Lx69gmdIswAb7FRObyMKX2 (undefined, old balance 25, locked up 70, new balance 30.)
// Updating peMeI5hfhFdNRKRUUJwgMUKZH283 (bob, old balance 0, locked up 0, new balance 100.)
// Updating ptRgWMz2AqhoW77AzkWKjD0n4Fj1 (PNelly, old balance 65, locked up 20, new balance 80.)
// Updating qSFwsuJoXhcMXQB6vXyoyc1yoxD2 (HOTPIEWILLNEVERDIE, old balance 0, locked up 54, new balance 46.)
// Updating qcm5owwraTcgevYibjeE2LqJZb33 (undefined, old balance 8, locked up 60, new balance 40.)
// Updating rOa4MNZhRsRT0FyizJfyChraaSl1 (DrGrlFrnd, old balance 40, locked up 30, new balance 70.)
// Updating rWAxKAjQBzRqEscOwyoTPhYeVHv1 (undefined, old balance 20, locked up 40, new balance 60.)
// Updating t2JOnhduHDc5JznRF3z86vXJu9k1 (Suahol, old balance 0, locked up 0, new balance 100.)
// Updating tVCNE56YKsSoVaoNd3rShkxFG4h1 (undefined, old balance 70, locked up 0, new balance 100.)
// Updating tu9HRMg40GZb78hOuyrPcFYi9d62 (All Men Must Die, old balance 45, locked up 15, new balance 85.)
// Updating v8Bwqyw3mhPD2gmvsEs8osC5HUh1 (sportzak, old balance 0, locked up 25, new balance 75.)
// Updating w281lqKiBCSgwFTl4PTfu9NBL0A2 (undefined, old balance 0, locked up 90, new balance 10.)
// Updating xAoHcemyayQ0wtEhc1TKsfoj5mB3 (WhatIsHypedMayNeverDie, old balance 60, locked up 30, new balance 70.)
// Updating xUpKU4k5voPzslRXnnmCpoYE52k1 (Bumwell Fartly, old balance 45, locked up 0, new balance 100.)
// Updating xyTLjwPsFGNqMdIR0A0JFR84zkt2 (undefined, old balance 95, locked up 0, new balance 100.)
// Updating yn2Py5rZ7qYdJw06Pon806bUR7b2 (undefined, old balance 75, locked up 0, new balance 100.)
// Processed 81 accounts.

// SEASON 7 EPISODE 02
// Updating 06GflVliFUhR6wBZoYsdKqi2EU13 (Krystle, old balance -40, locked up 80, new balance 20.)
// Updating 0e3JCpSWy8NNxqwGNHOJwWifRyX2 (Gelatine Bucketful, old balance 90, locked up 0, new balance 100.)
// Updating 0p2bdcvtklhD73L3zwNEFwGauv33 (FuturePhronesis, old balance 50, locked up 40, new balance 60.)
// Updating 0ptaUzLyLVQPL6oZ9RAm9qX7B4I3 (Wobbie, old balance 53, locked up 24, new balance 76.)
// Updating 1Mo1oNQnUmZnpZ7yYkWwVFRJzOD3 (WhitneyJoeAhn, old balance 93, locked up 0, new balance 100.)
// Updating 1PSUqjrv8xS7XXUY7IDevfWnPw12 (Logahmmed, First of His Name, old balance 23, locked up 46, new balance 54.)
// Updating 1nyBZKElklaBYD4vOmGbKvPkeIK2 (undefined, old balance 30, locked up 20, new balance 80.)
// Updating 23zDeh8ZonXNL0wHEmLN4FFE7bR2 (Fabio Naharis, old balance 45, locked up 20, new balance 80.)
// Updating 2NVH1sXfXIeaIYqq4srx1SQgDCS2 (undefined, old balance 42, locked up 38, new balance 62.)
// Updating 2Q2dBKhemKSSy8OLw9f8EUJCDBn2 (undefined, old balance 20, locked up 41, new balance 59.)
// Updating 2Sw3abwem0Q89ZzV0KHok1Ugkdw1 (Joeltronics, old balance 5, locked up 44, new balance 56.)
// Updating 2XASgaZfsMVuJqG7zinJabPFrAh2 (daveshayne first of his name, old balance 75, locked up 10, new balance 90.)
// Updating 2wAjrXUAivSsjHQlCKCcn7jDe5q2 (undefined, old balance 80, locked up 5, new balance 95.)
// Updating 3rZOWhC1kQVmN3PoJKW8nsGATjC2 (undefined, old balance 79, locked up 20, new balance 80.)
// Updating 5Dll4hzLW8WXrhv425yYgsdkf203 (Nene's Coffee Cup, old balance 25, locked up 60, new balance 40.)
// Updating 6ZmYf0tgb9PKpnWXL0DBSAVeRtz1 (undefined, old balance 50, locked up 0, new balance 100.)
// Updating 72IgaPGqL7aEGXU5JJFE2m6UhuH3 (Drewski, old balance 0, locked up 30, new balance 70.)
// Updating 73CwZDftCZRViZtvivRr7fbEWuz2 (Ally MacKenzie, old balance 14, locked up 42, new balance 58.)
// Updating 7GQJIhCzJIdlFXpPlIidPXiPHQh2 (B Timbish, old balance 0, locked up 0, new balance 100.)
// Updating 7ZawU455oNVhsjDl20NU75v3vNF2 (Carter T, old balance 96, locked up 3, new balance 97.)
// Updating 7g8uxJ21jlcoGVB41UCcwF7gd6G3 (A girl has no game, old balance 70, locked up 5, new balance 95.)
// Updating 7mcNacmR2TcddLpUscGKE2QpYRB3 (The Prince of the Streets, old balance 44, locked up 20, new balance 80.)
// Updating 7oDKfiECz2aR78WHco3sJHHSvLh1 (undefined, old balance 80, locked up 0, new balance 100.)
// Updating 85YRw0ltNxUQwtNFB48bzxqljwH2 (Chester Hangington, old balance 60, locked up 0, new balance 100.)
// Updating 87OhTEb9hTbmgb9ACzApSDqwCCs2 (undefined, old balance -60, locked up 40, new balance 60.)
// Updating 8JSpN2zdAgdEYzph2165T7UvidQ2 (Kg, old balance 75, locked up 5, new balance 95.)
// Updating 8UqbmHoTitdVx9hba68nxnQmPM93 (Boats Botes, old balance 80, locked up 10, new balance 90.)
// Updating 8uFul5mwtOPYOzRIS38ZGazyPOq1 (Weak Belwas, old balance 33, locked up 10, new balance 90.)
// Updating 9BLFEiSENyT8u80flN6KMrZPqX13 (Swamp Queen of House Reed, old balance 80, locked up 11, new balance 89.)
// Updating 9J5YqE5ZU6WILUVsfx2emo3cb8b2 (efreed52, old balance 45, locked up 35, new balance 65.)
// Updating 9XkydKunZZMGSykLgrDhu5wy4252 (undefined, old balance 0, locked up 40, new balance 60.)
// Updating 9fA80eNs5Uhtds5LG9vNUC2mRO03 (undefined, old balance 20, locked up 70, new balance 30.)
// Updating AXOV3AdDFFVdMuCI9iv1uOyNy232 (undefined, old balance 25, locked up 20, new balance 80.)
// Updating B5gKh8qGu5V8MAatoGh3Y8Rww1D2 (undefined, old balance 20, locked up 70, new balance 30.)
// Updating C3YfZlzdt0a8oKuH8lbjFhg9ECg2 (undefined, old balance 0, locked up 40, new balance 60.)
// Updating CKZljg30GDVzekBaeqOBs2q8puk2 (ivoryeyes, old balance 0, locked up 40, new balance 60.)
// Updating Ci7Onbue6cd4XN3u8MQZKl0RXVn1 (WinOrDie, old balance 0, locked up 40, new balance 60.)
// Updating D1hUxDnIaTaJqfGqRpIGmQeDd4q1 (undefined, old balance 0, locked up 0, new balance 100.)
// Updating D6jmE08NYLepkYA2mXA9mmjfYqt2 (Lord Eddard Sheerhan, old balance 40, locked up 30, new balance 70.)
// Updating Ed15ylDJeWTel6YxmzPPhqaO7F52 (Ginge, old balance 63, locked up 0, new balance 100.)
// Updating En8DAKA1Ppg9itX5duBlnemHrkO2 (undefined, old balance -20, locked up 0, new balance 100.)
// Updating EqqZ0yPPekcPjN2IZGu2YPQwdIE2 (undefined, old balance 78, locked up 20, new balance 80.)
// Updating F1tN8E5wa7QUpprfidc3Xl6MIbk1 (undefined, old balance 90, locked up 5, new balance 95.)
// Updating F3EskfTWFjSjzZbceR9tRDen3mY2 (KBLU, old balance 0, locked up 0, new balance 100.)
// Updating G47ye4gLhyWt2qVAOlV8NjZgyNI3 (Beer Sandwich, old balance 60, locked up 20, new balance 80.)
// Updating GaYflPvpiefFhVVP9m1xsAkA9sr2 (WardenoftheNorth, old balance 25, locked up 0, new balance 100.)
// Updating GpgVwohDxyNgY26aNb1ByFa8JG43 (undefined, old balance 94, locked up 4, new balance 96.)
// Updating H3UtwFrEOdcG9fbkN3GV0lKFF3z2 (undefined, old balance 30, locked up 0, new balance 100.)
// Updating HSVmroK1Awd9Jll9FpEUHAAX7yt2 (Maester Dann, old balance 80, locked up 0, new balance 100.)
// Updating HW6qjK8Cagc7QHeM8W2v3sf32lW2 (Ianki, old balance 90, locked up 0, new balance 100.)
// Updating Hlloa0S4gSPEZGc24EJeyiKqs0S2 (Rotoflix, old balance 70, locked up 0, new balance 100.)
// Updating HqfTiOVoFuhVDWgMRxVdsW0Ki5C2 (undefined, old balance 35, locked up 60, new balance 40.)
// Updating IBlO30ZfEhUK5EaH5EHlC4EWYXV2 (Cyndersteller, old balance 0, locked up 35, new balance 65.)
// Updating IKoVHoLaK9gEVzvk59mnGLJFq6v1 (Syrio Forel Fights On, old balance 65, locked up 20, new balance 80.)
// Updating IwcNbOxkp5UENmF8ii4ProQlkVV2 (Hodor Mormont, old balance 30, locked up 0, new balance 100.)
// Updating JCodBw5KmHO4oWf7A82FB0q1VRY2 (I drink and I know things, old balance -20, locked up 0, new balance 100.)
// Updating JOetXP5nBVWnIkCzzhHj93ZUhz52 (Owen Meany, old balance 55, locked up 10, new balance 90.)
// Updating Ju9X70dGnsN5Wq5Tvc5WcWThXE43 (undefined, old balance 44, locked up 16, new balance 84.)
// Updating JyFV2ThXbbeJ5MEKBhsiUAqLXtF2 (Dothraki Scum, old balance 80, locked up 5, new balance 95.)
// Updating K2yfJaFHtxY794qvE8tf79XYU0K3 (undefined, old balance 50, locked up 20, new balance 80.)
// Updating KL4svftcLGQRAFZknX9LEvvLK8g1 (Jesus H Stark, old balance -40, locked up 15, new balance 85.)
// Updating KNgygE1PiUgsh4WrjRBw9WV9KrB2 (Khaleesi Frodo, old balance 60, locked up 0, new balance 100.)
// Updating Klnl94T4oQMjeUKZMK4tXSB7niP2 (undefined, old balance 84, locked up 15, new balance 85.)
// Updating LCp4K3EDcIXqdsdZTSieMuN5VdV2 (undefined, old balance 20, locked up 25, new balance 75.)
// Updating MfkQ3ihzzvftaoWDnJC5xQSjDlB3 (undefined, old balance 40, locked up 50, new balance 50.)
// Updating MyLXVkYIp2V52sTsEi1vGeQlMnc2 (undefined, old balance 70, locked up 0, new balance 100.)
// Updating Mzk1cqnOwUQYcvaiCN5DAwUFy7u1 (undefined, old balance 20, locked up 75, new balance 25.)
// Updating NLA9qeY8nbh6R0CDWHf2iMD4wNp1 (Partially Bigoted Zealot, old balance 60, locked up 0, new balance 100.)
// Updating OjnOXoAUKJOBCVjqDIHYMeBXudF2 (Bronn Snow, old balance 70, locked up 25, new balance 75.)
// Updating OzsJkt8UEhQtlprrIPvzATASnUc2 (PrettyMama, old balance 0, locked up 20, new balance 80.)
// Updating PGjS2FZqHzegNP27MnqLsG2aXkn2 (Katricus, old balance 0, locked up 75, new balance 25.)
// Updating PeXmoU7kXcQX73RIut2rrjkVB153 (JIFeldman, old balance 48, locked up 31, new balance 69.)
// Updating QFlXTZ8vRzPQ1m03F97fEmGp0he2 (undefined, old balance 89, locked up 10, new balance 90.)
// Updating RzG5iC3qLDM95BY5TcH4D2pYSmn1 (undefined, old balance 27, locked up 32, new balance 68.)
// Updating SfJl6yfIBYOwZmwRLZEL78lmMGb2 (thebugman10, old balance 80, locked up 0, new balance 100.)
// Updating SjHxMv4PgUZOj7AlxY5SnLZUcBh1 (The Hound and the Fury, old balance 85, locked up 0, new balance 100.)
// Updating TPuEvOqAzxWmAfmZ7hdlxDJSuvy1 (Zombie Mountain, old balance 45, locked up 10, new balance 90.)
// Updating TniGNlQHuEakAF1UPZEDZsPOCBJ3 (undefined, old balance 35, locked up 25, new balance 75.)
// Updating U0GBrdHfRYeg0gBSTeYdYs4u6Cb2 (Sir Garmonbozia, old balance 90, locked up 0, new balance 100.)
// Updating UOQzTUJzkLavQErHBVnhOGMSq1h2 (bran2late, old balance 70, locked up 15, new balance 85.)
// Updating Uk8QYphl1PQPc8fLSwcO0SOyJKl2 (ChildofWinter, old balance 50, locked up 20, new balance 80.)
// Updating VXGThNj3llTSi2DhdDRfiPF2NOm2 (undefined, old balance 75, locked up 0, new balance 100.)
// Updating VfDQ7IKX9MeK1OeyiYbfeRZeHm23 (Al, old balance -100, locked up 0, new balance 100.)
// Updating Vtc8rd0CjATAtHp6fBOh7Z0kpQJ2 (Othervixen , old balance 45, locked up 5, new balance 95.)
// Updating WKZuiw2WGaOWdRy2EqgOwsDv5Qd2 (undefined, old balance 0, locked up 0, new balance 100.)
// Updating WiVoYPdPmza9zXA4tgVHHccfMOv1 (undefined, old balance -4, locked up 21, new balance 79.)
// Updating XGnQKVOnzfgZXbsBUizRLN8Qunm1 (undefined, old balance 46, locked up 20, new balance 80.)
// Updating XnxD12iRkRYYY7gWPjEuKZMgUQk1 (undefined, old balance 5, locked up 60, new balance 40.)
// Updating Xt56N9Bl3jhqFiGXjEUReKKMLIR2 (undefined, old balance 94, locked up 0, new balance 100.)
// Updating YJioqoAOSjehBiuc88CbsdKAoTy1 (undefined, old balance 0, locked up 25, new balance 75.)
// Updating ZGOmWfPx9cN7ZQYWSDOvejqoqkI2 (undefined, old balance 0, locked up 0, new balance 100.)
// Updating ZqkJgYRgusSC07duQfYLNRB3hnW2 (Narc Twain, old balance 90, locked up 0, new balance 100.)
// Updating ZsGWrOdZsYh5R5NhP7aWtkHetix1 (Lem Lemoncloak, old balance 0, locked up 30, new balance 70.)
// Updating aRh4CmygVpRrE3hRM4oOQ9WiSRz1 (gameofthronesfactsig, old balance 97, locked up 0, new balance 100.)
// Updating bDzNPP0fbAeoVEDw0mXaNfBQ8gf2 (undefined, old balance 51, locked up 15, new balance 85.)
// Updating bbcxEVjDyPWxUcCIpfQwEhf9Bz43 (Your Friendly Hound, old balance 40, locked up 20, new balance 80.)
// Updating cEf6tRbnx6Xh6Z8NrNrNl2bLoyn2 (undefined, old balance 68, locked up 15, new balance 85.)
// Updating cLxVlYzmQrOnCU6vdIEMly6uxVi2 (Baron Werner Ünderbheit, old balance -5, locked up 55, new balance 45.)
// Updating cgBfnrfF8AQKwwmXQGGyVBSENym2 (undefined, old balance 70, locked up 15, new balance 85.)
// Updating e4lIFutwLQchss5SFEa3JEKauM52 (Luxtizer, old balance 55, locked up 0, new balance 100.)
// Updating ef9nuv9SbTZanetsVHRwlM5Ovbr2 (undefined, old balance 45, locked up 10, new balance 90.)
// Updating f8gMEjad7zez0IJLOP09Sh5Tgsz1 (undefined, old balance 0, locked up 5, new balance 95.)
// Updating fOnFF9km1zcagr8cl0THkULomvg1 (SShinson, old balance 76, locked up 15, new balance 85.)
// Updating fW6biipMt6Xn5qx7SJMbnC8miES2 (Vadim Mo, old balance 80, locked up 0, new balance 100.)
// Updating g2tqtRsTZhZfT5J1JjSQdlbdAO52 (Hipster Ariel, old balance -25, locked up 50, new balance 50.)
// Updating gdDhbd0cJXg4gUX2febNMkyP8Ul1 (undefined, old balance -20, locked up 20, new balance 80.)
// Updating hGZJgr46Twb4J0d65h2IMQYl01F2 (Born to be Wildling, old balance -50, locked up 0, new balance 100.)
// Updating hJ5lKhAnTWOj7jJhFmZ5vFzyjG72 (undefined, old balance 55, locked up 20, new balance 80.)
// Updating hz9NYEdvzygqx9pDqziRjLrl00h2 (Dr. Boots's List, old balance 59, locked up 0, new balance 100.)
// Updating i1Rk02ATs0WUBdO2ebehawdQoHk1 (Robert, old balance 83, locked up 7, new balance 93.)
// Updating i2PUge34pqckbIIVa9jOgTaPRMZ2 (Queen's Blood, old balance 35, locked up 20, new balance 80.)
// Updating iKw2WAVmU7U5LR6QONGiCEOg5yF2 (The Dude, old balance 65, locked up 30, new balance 70.)
// Updating jaZoeeSTlXb3HD4YWfZbyfGPvmm2 (Jag, old balance 40, locked up 50, new balance 50.)
// Updating jeKL7rLvT8SsV1b8ifMXGAj4mVV2 (Andy of House Beesbury, old balance 60, locked up 25, new balance 75.)
// Updating kssANClegyTv8PFsrqNj4Mbmo9S2 (undefined, old balance 1, locked up 0, new balance 100.)
// Updating m1U5No5AnVRu7dC2cvxfEKNhka52 (undefined, old balance 39, locked up 40, new balance 60.)
// Updating mAzBJS7sW2NzGsFdEpeOoM94NQP2 (undefined, old balance 49, locked up 30, new balance 70.)
// Updating mDRM5de7gxOqIJkpYmntkzRmcs72 (GeOHUdson93, old balance 82, locked up 14, new balance 86.)
// Updating mcbLQf1vOUdwKUYbEcAKNqM3IAE2 (@c0diator, old balance 7, locked up 2, new balance 98.)
// Updating mzJa4XH7skdHnAOYUcpwXFK6W7o2 (InvisibleThrill, old balance 50, locked up 30, new balance 70.)
// Updating n0ZxNqIkBVbxLqMMTkJBSRlJMtn2 (undefined, old balance 75, locked up 10, new balance 90.)
// Updating nteB75yCngPa4Ny69zu7fz3iTJu2 (undefined, old balance 93, locked up 0, new balance 100.)
// Updating oQk8dSGwnPb4u7xhA3qAbsrpzgE2 (The 1st Sword of Hoboken, old balance 70, locked up 10, new balance 90.)
// Updating pK7nZyjWEaPVrJGxQyoHesOtucp1 (undefined, old balance 30, locked up 0, new balance 100.)
// Updating palwVA6dSZgvaWxFCBaAHyDNkiU2 (Adopt me Cersei, old balance 20, locked up 16, new balance 84.)
// Updating peMeI5hfhFdNRKRUUJwgMUKZH283 (bob, old balance 0, locked up 0, new balance 100.)
// Updating ptRgWMz2AqhoW77AzkWKjD0n4Fj1 (PNelly, old balance -15, locked up 20, new balance 80.)
// Updating pz2rwy28KYZ9fhIxHZpDkbIE12K2 (Sara Stone, old balance 20, locked up 10, new balance 90.)
// Updating q9US16QvFyP2GJx2kO5abWIBl1O2 (Hopechka, old balance 95, locked up 0, new balance 100.)
// Updating qILAi8uL4acEmfksNssyeCtaEYx2 (Ser Bill McNeal of WNYX, old balance 20, locked up 14, new balance 86.)
// Updating qSFwsuJoXhcMXQB6vXyoyc1yoxD2 (HOTPIEWILLNEVERDIE, old balance 0, locked up 54, new balance 46.)
// Updating qYcdZqVsX9Rp8mSSfZLTiH79DUD2 (Green Ralph, old balance 60, locked up 30, new balance 70.)
// Updating qcm5owwraTcgevYibjeE2LqJZb33 (undefined, old balance 8, locked up 60, new balance 40.)
// Updating qgZUbkMFmcSkCHQZ8dcEoVKxNHJ3 (undefined, old balance 50, locked up 10, new balance 90.)
// Updating qjBvxURzv4f9Zgd1luetcoq1KXq1 (Big Dick Podrick First Of His Name, old balance 0, locked up 29, new balance 71.)
// Updating rOa4MNZhRsRT0FyizJfyChraaSl1 (DrGrlFrnd, old balance 30, locked up 40, new balance 60.)
// Updating rR48UHxNTrSxREcpQtL6lTZxP2w1 (undefined, old balance 39, locked up 20, new balance 80.)
// Updating rV8IvLOL6IbrGamQyXOQ3UV38k02 (undefined, old balance 70, locked up 25, new balance 75.)
// Updating rWAxKAjQBzRqEscOwyoTPhYeVHv1 (undefined, old balance 20, locked up 40, new balance 60.)
// Updating rnbH1i64aZgcRG9KoiTnsB1wuKM2 (undefined, old balance 65, locked up 0, new balance 100.)
// Updating rshI6AqqvMfrG2146f5pytfwNkd2 (undefined, old balance 50, locked up 0, new balance 100.)
// Updating s2nBIez7U5RBTxnslTAksiiGhwD2 (Looking Westward, old balance 70, locked up 0, new balance 100.)
// Updating t1lLXKWHA5bwiMn9851qa6hctup2 (Steadybuffalo237 , old balance 40, locked up 40, new balance 60.)
// Updating t2JOnhduHDc5JznRF3z86vXJu9k1 (Suahol, old balance 0, locked up 0, new balance 100.)
// Updating t6oTYtVXV3O5cPXfVooIKoLOU3n2 (TheManInBlack, old balance 65, locked up 15, new balance 85.)
// Updating tVCNE56YKsSoVaoNd3rShkxFG4h1 (undefined, old balance 70, locked up 0, new balance 100.)
// Updating tu9HRMg40GZb78hOuyrPcFYi9d62 (All Men Must Die, old balance 55, locked up 25, new balance 75.)
// Updating uERxojE7zLP4Eav6u8wORzcADo22 (atlashugged, old balance 60, locked up 20, new balance 80.)
// Updating uFOTfb5600Wi99XzwFCzTiGAWrq1 (undefined, old balance 70, locked up 15, new balance 85.)
// Updating uI1fdSy9gicbXgOKQxM2Rf9tXrD2 (Ser Homer, old balance 70, locked up 0, new balance 100.)
// Updating ux3rVIEht6VINZaU73AezwATQ1w2 (qfwfq, old balance 75, locked up 0, new balance 100.)
// Updating v8Bwqyw3mhPD2gmvsEs8osC5HUh1 (sportzak, old balance -50, locked up 25, new balance 75.)
// Updating vJe1xrqJhceHLM6jhn4g9IRPpx12 (undefined, old balance 30, locked up 20, new balance 80.)
// Updating vcgellZtCMaOYjl1i8Svw0ImHWy2 (undefined, old balance 0, locked up 0, new balance 100.)
// Updating vfEJ7FQ3T9US6mMAAbWF0ATTOYj2 (undefined, old balance 0, locked up 0, new balance 100.)
// Updating vvo92ogGDCXXXlxFRAIVfptTxCt2 (B Thimmesch, old balance 68, locked up 9, new balance 91.)
// Updating w281lqKiBCSgwFTl4PTfu9NBL0A2 (undefined, old balance 0, locked up 90, new balance 10.)
// Updating w8ivO4KxbGSHtpcKALZ0SIMOyfe2 (Trix are for Kids say the Darndest Things that Make You Go Hmmm, old balance 70, locked up 0, new balance 100.)
// Updating wKVjzLggaQRGQrA3w4l5OOyDrV43 (A Girl Has No Name, old balance 0, locked up 65, new balance 35.)
// Updating x4Zln9WMy0TcMOdNrS4T3gTais02 (Lommy Greenhands, old balance 55, locked up 20, new balance 80.)
// Updating x4wJoGj5k6bQnU90Jpk48Tq4mhj2 (El Zilcho!, old balance 45, locked up 0, new balance 100.)
// Updating xAoHcemyayQ0wtEhc1TKsfoj5mB3 (WhatIsHypedMayNeverDie, old balance 63, locked up 32, new balance 68.)
// Updating xUpKU4k5voPzslRXnnmCpoYE52k1 (Bumwell Fartly, old balance 45, locked up 0, new balance 100.)
// Updating xg4T5Y3zFMSUGf5KqvNfKbduVNx1 (Jaya Ballard, Taskmistress of Light, old balance 80, locked up 0, new balance 100.)
// Updating xyTLjwPsFGNqMdIR0A0JFR84zkt2 (undefined, old balance 95, locked up 0, new balance 100.)
// Updating yIOkLfOcXUQlz5W0krYIfNsFHFd2 (Owler, old balance 76, locked up 9, new balance 91.)
// Updating yInZPeEwYgQEP7rneKgghbdOkCD2 (undefined, old balance 80, locked up 0, new balance 100.)
// Updating yn2Py5rZ7qYdJw06Pon806bUR7b2 (saoro, old balance 55, locked up 0, new balance 100.)
// Updating zk7i0K6ZdYPEZTA60Sd0HBo0uwr2 (Roody, old balance 70, locked up 10, new balance 90.)
// Processed 169 accounts.