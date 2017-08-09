/**
 * firebase-import.jsx - imports weekly raw data into the database
 *
 * Used to import wagers on GOTS7EP01. Ideally, the FE interface will be finished
 * in time for Episode 2, because this process suuuuuucks.
 *
 * DANGEROUS TO RUN! MODIFIES DATA!
 */
 import firebaseApp from './firebase-app';

//// S07 E01
// import Users from '../app/fixtures/s7e01-avclub-wagers';

console.log('Updating Firebase database', process.env.FIREBASE_DATABASE_URL);

// The app only has access as defined in the Security Rules
var db = firebaseApp.database();
var ref = db.ref();


if (typeof Users !== "undefined") {

  // User:
    // id: 'avclub-staffer-1',
    // balance: {
    //   gameofthrones-07: 100
    // }
    // created_at: Date.now(),
    // updated_at: Date.now(),
    // wagers:
        // id: 'gameofthrones-6-2-1',
        // created_at: Date.now(),
        // updated_at: Date.now()

  console.log('Processing users...');

  const userIds = Object.keys(Users);

  let updatedData = {};

  for (let userId of userIds) {
    let user = Users[userId];

    console.log(`...${userId}`);

    updatedData[`${userId}/updated_at`] = Date.now();

    let wagerIds = Object.keys(user.wagers);

    for (let wagerId of wagerIds) {
      let wager = user.wagers[wagerId];

      wager.created_at = Date.now();
      wager.updated_at = Date.now();
      wager.id = wagerId;

      updatedData[`${userId}/wagers/${wagerId}`] = wager;
    }
  }
  // console.log(updatedData);
  ref.child('users').update(updatedData).then((snapshot) => {
    // console.log(snapshot.val());
    console.log('...done.');
  });
}

