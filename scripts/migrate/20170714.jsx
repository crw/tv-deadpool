/**
 * migrate-20170714.jsx - last-minute fix for missing data in production
 *
 * Deployed to realize that dev database had series and season info populated by
 * hand and that info did not get migrated to production.
 * NEVER NEEDS TO BE RUN AGAIN.
 *
 */
import firebaseApp from './firebase-app';

const fb = firebaseApp.database();

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

fb.ref('/series/').update({
  gameofthrones: {
    created_at: 1498005569813,
    description: "",
    id: "gameofthrones",
    published: true,
    seasons: {
     ['gameofthrones-06']: true
    },
    title: "Game of Thrones",
    updated_at: 1498005569813
  }
}).then(() => console.log('...done'));

fb.ref('/seasons/gameofthrones-06').update({
  created_at: 1499473346966,
  description: "",
  episodes: {
   ['gameofthrones-06-02']: true,
   ['gameofthrones-06-03']: true,
   ['gameofthrones-06-04']: true,
   ['gameofthrones-06-05']: true,
   ['gameofthrones-06-06']: true,
   ['gameofthrones-06-07']: true,
   ['gameofthrones-06-08']: true,
   ['gameofthrones-06-09']: true,
   ['gameofthrones-06-10']: true
  },
 hero: "/GOT-Season6-Hero-200px.png",
 id: "gameofthrones-06",
 lock_at: 1467593400000,
 published: true,
 season: 6,
 series: "gameofthrones",
 title: "",
 type: "TV_SEASON",
 updated_at: 1499473346966
}).then(() => console.log('...done'));
