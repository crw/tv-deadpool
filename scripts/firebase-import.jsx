import firebase from 'firebase';
// import Events from '../app/fixtures/Events.jsx';
// import Bets from '../app/fixtures/Bets.jsx';
// import Events from '../app/fixtures/s6e7-event.jsx';
// import Bets from '../app/fixtures/s6e7-bets.jsx';
// import Users from '../app/fixtures/Users.jsx';
// import User_marahe from '../app/fixtures/User-marahe';
import User_mccown from '../app/fixtures/User-mccown-10';


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
        event_id
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
  ref.child('users').update(Users);
}

if (typeof User_marahe !== "undefined") {
  let id = Object.keys(User_marahe)[0];
  ref.child(`users/${id}/wagers`).update(User_marahe[id].wagers);
}

if (typeof User_mccown !== "undefined") {
  let id = Object.keys(User_mccown)[0];
  ref.child(`users/${id}/wagers`).update(User_mccown[id].wagers);
}
// ref.child('events').once("value", function(snapshot) {
//   console.log(snapshot.val());
// });

// ref.child('bets').once("value", function(snapshot) {
//   console.log(snapshot.val());
// });
