import firebase from 'firebase';


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

let betsRef = ref.child('bets');

var bets = {};

betsRef.once('value').then((snapshot) => {
  bets = snapshot.val();

  console.log(bets);

  let updateData = {};

  Object.keys(bets).forEach((key) => {
    let bet = bets[key];

    if (!bet.resolved && bet.resolved !== false) {
      updateData[`${key}/resolved`] = true;
    }
  });

  betsRef.update(updateData);
  console.log(updateData);

}, (e) => {
  console.log('Get Bets failed:', e);
})

