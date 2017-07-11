import admin from 'firebase-admin';


const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_FILE);

// Initialize the app with a custom auth variable, limiting the server's access
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  databaseAuthVariableOverride: {
    uid: "secret-service-worker"
  }
});

const fb = app.database();

console.log('Migration Script Running on:', process.env.FIREBASE_DATABASE_URL);


fb.ref('/events/').once('value').then(function(snapshot) {

  let updates = {};

  const events = snapshot.val();

  let eps = [];

  for (let key in events) {
    const parts = key.split('-');

    const series = parts[0];
    const season = parts[1].padStart(2, "0");
    const episode = parts[2].padStart(2, "0");

    const epName = [series, season, episode].join('-');
    const seasonName = [series, season].join('-');

    eps.push(epName);

    updates[`/episodes/${epName}`] = {
      ...events[key],
      series: series,
      season: seasonName,
      id: epName
    };
    updates[`/seasons/gameofthrones-06/episodes/${epName}`] = true;
  }

  fb.ref().update(updates).then(function() {
    console.log('...done');
  }, (err) => { console.log('error', err)});

});



fb.ref('/leaderboard/').once('value').then((snapshot) => {

  let updates = {};

  const leaders = snapshot.val();

  for (let key in leaders) {
    updates[`/leaderboard/gameofthrones-06/${key}`] = leaders[key];
    updates[`/leaderboard/${key}`] = null;
  }


  fb.ref().update(updates).then(function() {
    console.log('...done');
  }, (err) => { console.log('error', err)});

});