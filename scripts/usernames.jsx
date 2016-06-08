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

let secureRef = ref.child('secure');

var users = {};

secureRef.once('value').then((snapshot) => {
  users = snapshot.val();

  Object.keys(users).forEach((key) => {
    let user = users[key];
    console.log(key, user.displayName, '\t\t', user.email || '');

  });


}, (e) => {
  console.log('Get failed:', e);
})

