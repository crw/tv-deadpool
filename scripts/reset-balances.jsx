import firebase from 'firebase';
import moment from 'moment';
// App imports
import {toArray} from '../app/utils';


// Initialize the app with a custom auth variable, limiting the server's access
var config = {
  serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT_FILE || undefined,
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
  databaseAuthVariableOverride: {
    uid: "secret-service-worker"
  }
};
firebase.initializeApp(config);

console.log('Updating Firebase database', process.env.FIREBASE_DATABASE_URL);

// The app only has access as defined in the Security Rules
const db = firebase.database();
const ref = db.ref();

const userRef = ref.child('users');

let users = {};
let secure = {};

  userRef.once('value').then((snapshot) => {

try {

    let users = snapshot.val();
    let usersArr = toArray(users);
    let updateData = {};

    for (let user of usersArr) {
      let userId = user.id;

      // console.log(`Processing ${userId}`);

      if (user.balance < 100 && userId.indexOf('avclub') === -1) {
        console.log(`Updating ${userId} (${user.displayName}, old balance ${user.balance}.)`);
        updateData[`users/${userId}/balance`] = 100;
      }
    }

    ref.update(updateData).then((snapshot) => {
      console.log('Update action complete.');
    });

} catch (err) {
  console.log(err);
}

  });

// EPISODE 9
// Updating 0sMvvo4KcFSDX0XYaDrcyn01lHx1 (undefined, old balance 0.)
// Updating 1G8mYolJNOZnZYqumkz8zh2qcsM2 (undefined, old balance 80.)
// Updating 2el6FeVKd1NlH2Ih3PnY9iG7KVT2 (undefined, old balance 80.)
// Updating 2jpIGSp4rQfFI6fxDh8M6z1p7bR2 (undefined, old balance 40.)
// Updating 47FgFUgvG8YwXz7EWCLCca8bhUE2 (undefined, old balance 0.)
// Updating 6ZmYf0tgb9PKpnWXL0DBSAVeRtz1 (undefined, old balance 50.)
// Updating 8Lpk7RpMqRfHCY4rc6aCvnrVsF63 (The Low Sparrow, old balance 0.)
// Updating De4i8zbLQHUAn05e4S6wLX4UBAR2 (undefined, old balance 70.)
// Updating DpunwOUleteMv9lRYq3uKI2SFQC2 (undefined, old balance 70.)
// Updating DxACgtP8NhaA55o1TBqoL1CxNbu2 (MaximumInteresting, old balance 0.)
// Updating FCvtXyO1xfUxE9RgnBALT5IeSXt2 (undefined, old balance 40.)
// Updating GnaXchgCeoNI5y3y80jkmptQCYJ3 (JaySnap73, old balance 0.)
// Updating MmnyXOtO7kaS4LNS7UJHZehjEID2 (undefined, old balance 0.)
// Updating Of3tnP42sePklJQfP5mgO21dUXV2 (undefined, old balance 55.)
// Updating QpcueBV5XlQFRgXmMm9rkoaw2pe2 (undefined, old balance 0.)
// Updating RC3ilkULIxOZdfrLn77PyqCnFm72 (undefined, old balance 75.)
// Updating TniGNlQHuEakAF1UPZEDZsPOCBJ3 (undefined, old balance 60.)
// Updating VtBnpCGls6QNThGcfJrTvirnuQG2 (No One, old balance 60.)
// Updating YPf5ogpbuodZHzMs1owvTgwObkP2 (undefined, old balance 0.)
// Updating YgADJzE2M6OdNn2TlvA9NAuHGEp1 (Daniel the Not Faceless, old balance 50.)
// Updating ZsGWrOdZsYh5R5NhP7aWtkHetix1 (Lem Lemoncloak, old balance 0.)
// Updating bQDFhutp8gTdYEAmMkGcuKxr71i1 (undefined, old balance 50.)
// Updating eeXuMDkG5hbi3LTyAnH6LPsKqWV2 (undefined, old balance 90.)
// Updating hSj5Iy48tgcDJ9rzL9CdjW4s6nG3 (undefined, old balance 90.)
// Updating kffcqBdDEAYjptPkMOYBOHCuSTR2 (undefined, old balance 90.)
// Updating niRbEwraicVXrvdMdF4IH0Sujyk2 (undefined, old balance 0.)
// Updating q2Ho3Ec7ZcUFoCt4EnIFE44k8493 (undefined, old balance 95.)
// Updating qJy3rvZderUdETlg8LRNceuiaja2 (undefined, old balance 84.)
// Updating wha9TdskYyUyhBI7aEIOTSIIfWp1 (undefined, old balance 0.)
// Updating xGhxsExt2bbK8rmGxT5nV5N2t3K2 (Jakob A, old balance 0.)
// Updating xWmSdfUK9sYRBKFdP5J9vfkwGXB3 (undefined, old balance 96.)
// Updating y9EFds5girbDl7SxnoWaKtxCqDg2 (undefined, old balance 0.)

// EPISODE 10