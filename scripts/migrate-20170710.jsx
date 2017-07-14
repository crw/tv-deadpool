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


function convertName(name) {

    const parts = name.split('-');
    const series = parts[0];
    const season = parts[1].padStart(2, "0");
    const episode = parts[2].padStart(2, "0");
    const episodeName = [series, season, episode].join('-');
    const seasonName = [series, season].join('-');

    return { series, season, episode, episodeName, seasonName };

};

function failure(err) {
  console.log('error:', err);
};

function doUpdates(updates) {
  const success = () => { console.log('...done'); };
  return fb.ref().update(updates).then(success, failure);
};

// Events migration
fb.ref('/events/').once('value').then(function(snapshot) {
  const events = snapshot.val();
  let updates = {};

  for (let key in events) {

    const v = convertName(key);

    updates[`/episodes/${v.episodeName}`] = {
      ...events[key],
      series: v.series,
      season: v.seasonName,
      id: v.episodeName
    };
    updates[`/seasons/gameofthrones-06/episodes/${v.episodeName}`] = true;
  }
  doUpdates(updates);
}, failure);

// User balance migration
fb.ref('/users/').once('value').then((snapshot) => {

  const users = snapshot.val();
  let updates = {};

  for (let key in users) {
    updates[`/users/${key}/balance/gameofthrones-06`] = users[key].balance;
    updates[`/users/${key}/balance/gameofthrones-07`] = 100;
  }
  doUpdates(updates);
}, failure);

// Leaderboard migration
fb.ref('/leaderboard/').once('value').then((snapshot) => {

  const leaders = snapshot.val();
  let updates = {};
  let post_updates = {};

  for (let key in leaders) {
    const { events } = leaders[key];
    let episodes = {};
    for (let name in events) {
      let v = convertName(name);
      episodes[v.episodeName] = events[name];
    }
    updates[`/leaderboard/gameofthrones-06/${key}`] = leaders[key];
    post_updates[`/leaderboard/gameofthrones-06/${key}/episodes`] = episodes;
    updates[`/leaderboard/${key}`] = null;
    post_updates[`/leaderboard/gameofthrones-06/${key}/events`] = null;
  }
  doUpdates(updates).then(doUpdates(post_updates));
}, failure);


// Bets migration
fb.ref('/bets/').once('value').then((snapshot) => {

  const bets = snapshot.val();
  let updates = {};

  for (let key in bets) {
    const bet = bets[key];
    if (bet.event_id) {
      const { series, seasonName, episodeName } = convertName(bet.event_id);
      updates[`/bets/${key}/episode`] = bet.episode || episodeName;
      updates[`/bets/${key}/season`] = bet.season || seasonName;
      updates[`/bets/${key}/series`] = bet.series || series;
      updates[`/bets/${key}/event_id`] = null;
    }
  }
  doUpdates(updates);
}, failure);

