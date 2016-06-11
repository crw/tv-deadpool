import firebase from 'firebase';
//// EVENTS
// import Events from '../app/fixtures/Events.jsx';
// import Events from '../app/fixtures/s6e7-event.jsx';
// import Events from '../app/fixtures/s6e8-event.jsx';
//// BETS
// import Bets from '../app/fixtures/Bets.jsx';
// import Bets from '../app/fixtures/s6e7-bets.jsx';
// import Bets from '../app/fixtures/s6e8-bets.jsx';
//// USERS
// import Users from '../app/fixtures/Users.jsx';
// import Users from '../app/fixtures/Users-drbootslist';
// import Users from '../app/fixtures/s6e8-users.jsx';



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
var db = firebase.database();
var ref = db.ref();

var normalizeEventId = (event) => {
  return [
    event.series.replace(/ /g, '').toLowerCase(),
    event.season,
    event.episode
  ].join('-')
};

var normalizeBetId = (season, episode, order) => {
  return [
    season,
    episode,
    order
  ].join('-');
};

// The app only has access as defined in the Security Rules
var db = firebase.database();
var ref = db.ref();


if (typeof Events !== "undefined" && typeof Bets !== "undefined") {

  var eventsRef = ref.child('events');
  var betsRef = ref.child('bets');

  // REMOVE ALL BETS && EVENTS DATA?
  // eventsRef.remove();
  // betsRef.remove();

  var eventKeys = {};
  Events.forEach((event) => {
    let originalId = event.id;
    let id = normalizeEventId(event);
    let updateData = {
      ...event,
      id
    };
    eventsRef.child(id).update(updateData);
    eventKeys[originalId] = id;
  });


  var betsEventMap = {};
  Object.keys(Bets).forEach((eventId) => {
    let bets = Bets[eventId];
    betsEventMap[eventKeys[eventId]] = [];

    bets.forEach((bet) => {
      let event_id = eventKeys[eventId];
      let id = normalizeBetId('gameofthrones-6', eventId, bet.order);
      let updateData = {
        ...bet,
        id,
        event_id,
        paid: false,
        note: '',
        official: true,
        published: true,
        resolved: false,
        created_at: Date.now(),
        updated_at: Date.now()
      };
      betsRef.child(id).update(updateData);
      betsEventMap[event_id].push(id);
    });
  });

  Object.keys(betsEventMap).forEach((eventKey) => {
    let updateData = {};
    betsEventMap[eventKey].forEach((betKey) => {
      updateData[betKey] = true;
    });
    eventsRef.child(eventKey).update({ bets: updateData });
  });

}


if (typeof Users !== "undefined") {

  // User:
    // id: 'avclub-staffer-1',
    // balance: 375,
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

