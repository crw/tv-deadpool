import admin from 'firebase-admin';


const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_FILE);
// Initialize the app with a custom auth variable, limiting the server's access
const config = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  databaseAuthVariableOverride: {
    uid: "secret-service-worker"
  }
};
const app = admin.initializeApp(config);

console.log('Using Firebase database', process.env.FIREBASE_DATABASE_URL);

export default app;
