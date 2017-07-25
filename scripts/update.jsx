import firebaseApp from './firebase-app';

const updateData = {

};

console.log('Updating Firebase database', process.env.FIREBASE_DATABASE_URL);

// The app only has access as defined in the Security Rules
const db = firebaseApp.database();
const ref = db.ref();

ref.update(updateData).then((snapshot) => {
  console.log('Update complete.');
}, (e) => {
  console.log('Update error.');
  console.log(e);
}).then(process.exit);