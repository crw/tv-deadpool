import firebase from 'firebase';
import Events from '../app/fixtures/Events.jsx';
import Bets from '../app/fixtures/Bets.jsx';

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

var eventKeys = {};
var eventsRef = ref.child('events');
eventsRef.remove();
Events.forEach((event) => {
  let key = eventsRef.push(event).key;
  eventKeys[event.id] = key;
  eventsRef.child(key).update({id: key});
});


var betsRef = ref.child('bets');
betsRef.remove();
var betsEventMap = {};

Object.keys(Bets).forEach((eventId) => {
  let bets = Bets[eventId];
  betsEventMap[eventKeys[eventId]] = [];

  bets.forEach((bet) => {
    let eventKey = eventKeys[eventId];
    let key = betsRef.push(bet).key;
    betsRef.child(key).update({
      id: key,
      event_id: eventKey
    });
    betsEventMap[eventKey].push(key);
  });
});


Object.keys(betsEventMap).forEach((eventKey) => {
  let updateData = {};
  betsEventMap[eventKey].forEach((betKey) => {
    updateData[betKey] = true;
  });
  eventsRef.child(eventKey).update({ bets: updateData });
});


ref.child('events').once("value", function(snapshot) {
  console.log(snapshot.val());
});

ref.child('bets').once("value", function(snapshot) {
  console.log(snapshot.val());
});
