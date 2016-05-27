var firebase = require('firebase');
var fixtures = require('../app/fixtures');

console.log(process.env.FIREBASE_API_KEY);
console.log(process.env.FIREBASE_SERVICE_ACCOUNT_FILE);

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


// The app only has access as defined in the Security Rules
var db = firebase.database();
var ref = db.ref();

var eventKeys = [];
var eventsRef = ref.child('events');
eventsRef.remove();
fixtures.Events.forEach((event) => {
  eventKeys.push(eventsRef.push(event).key);
});

var betKeys = [];
var betsRef = ref.child('bets');
betsRef.remove();
fixtures.Bets.forEach((bet) => {
  betKeys.push(betsRef.push(bet).key);
});

console.log(eventKeys);
console.log(betKeys);

ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});
