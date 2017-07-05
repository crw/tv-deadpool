import {createAction} from 'redux-actions';
import moment from 'moment';
import * as action_type from 'redux/action_types';
import INITIAL_BALANCE from 'constants/numbers';
import PROVIDERS from 'constants/providers';
import { normalizeName, getKey } from 'utils';
import firebase, { getUserRef, getSecureRef } from 'api/firebase';
import * as api from 'api/firebase';


// Small error func for catch statements.
function errFunc(err) {
  console.log(this, 'ERR:', err);
};


// API Success / Failure actions
export const seriesCreated = createAction(action_type.SERIES_CREATED);
export const seasonCreated = createAction(action_type.SEASON_CREATED);
export const episodeCreated = createAction(action_type.EPISODE_CREATED);
export const betCreated = createAction(action_type.BET_CREATED);
export const betUpdated = createAction(action_type.BET_UPDATED);
// Mass Import
export const updateSeriesData = createAction(action_type.SERIES_UPDATE_DATA);
export const updateSeasonsData = createAction(action_type.SEASONS_UPDATE_DATA);
export const updateEpisodesData = createAction(action_type.EPISODES_UPDATE_DATA);
export const updateBetsData = createAction(action_type.UPDATE_BETS_DATA);
export const updateStatsData = createAction(action_type.UPDATE_STATS_DATA);
export const updateEventsData = createAction(action_type.UPDATE_EVENTS_DATA);
export const updateLeaderboardData = createAction(action_type.UPDATE_LEADERBOARD_DATA);
// Data Update
export const login = createAction(action_type.LOGIN);
export const logout = createAction(action_type.LOGOUT);
export const updateSecure = createAction(action_type.UPDATE_SECURE);
export const updateUser = createAction(action_type.UPDATE_USER);
// @TODO fix these to not use "return".
export const updateLabel = createAction(action_type.UPDATE_LABEL, (label, data) => {return {label, data};});
export const updateDisplayName = createAction(action_type.UPDATE_DISPLAY_NAME, (uid, displayName) => { return {uid, displayName}; });
// Prefs Actions
export const setPreference = createAction(action_type.SET_PREFERENCE, (context, pref, value) => { return { context, pref, value }; });
export const setPreferences = createAction(action_type.SET_PREFERENCES, (context, prefs) => { return { context, prefs }; });

export const apiUpdated = createAction(action_type.API_UPDATED);


function watchFirebaseData(refName, actionFn) {
  return () => (dispatch, getStore) => {
    const ref = firebase.database().ref(refName);
    return ref.on('value', (snapshot) => {
      dispatch(actionFn(snapshot.val()));
    });
  };
};

export const watchSeriesData = watchFirebaseData('series', updateSeriesData);
export const watchSeasonsData = watchFirebaseData('seasons', updateSeasonsData);
export const watchEpisodesData = watchFirebaseData('episodes', updateEpisodesData);
export const watchBetsData = watchFirebaseData('bets', updateBetsData);
export const watchEventsData = watchFirebaseData('events', updateEventsData);
export const watchLeaderboardData = watchFirebaseData('leaderboard', updateLeaderboardData);
export const watchStatsData = watchFirebaseData('stats', updateStatsData);

export const startFetchLabel = (label) => {
  return (dispatch, getStore) => {
    const labelRef = firebase.database().ref(`labels/${label}`);
    return labelRef.once('value').then((snapshot) => {
      dispatch(updateLabel(label, snapshot.val()));
    });
  };
};

export const startGetUser = (uid) => {
  return (dispatch, getStore) => {
    var userRef = getUserRef(uid);

    return userRef.on('value', (snapshot) => {
      dispatch(updateUser(snapshot.val() || {}));
    });
  };
};

export const startFetchLoginUser = () => {
  return (dispatch, getStore) => {
    var uid = getStore().login.uid;
    return getUserRef(uid).on('value', (snapshot) => {
      try {
        dispatch(updateUser(snapshot.val() || {}));
      } catch (e) {
        console.log(e);
      }
    });
  };
};

export const startCreateSeries = (title, description, published) => {
  return (dispatch, getStore) => {
    return api.createSeries(title, description, published).then(() => {
      dispatch(seriesCreated());
    });
  };
};

export const startCreateSeason = (seriesId, season, title, description, published) => {
  return (dispatch, getStore) => {
    return api.createSeason(seriesId, season, title, description, published).then(() => {
      dispatch(seasonCreated());
    });
  };
};

export const startCreateEpisode = (values) => {
  return (dispatch, getStore) => {
    return api.createEpisode(values).then(() => {
      dispatch(episodeCreated());
    });
  };
};

export const startCreateBet = (values) => {
  return (dispatch, getStore) => {
    return api.createBet(values).then(() => {
      dispatch(betCreated());
    });
  };
};

export const startEditBet = (id, values) => {
  return (dispatch, getStore) => {
    return api.editBet(id, values).then(() => {
      dispatch(betUpdated());
    });
  };
};



export const startUpdateDisplayName = (uid, displayName) => {
  return (dispatch, getStore) => {
    const currentDisplayName = getStore().users[uid].displayName;

    // If the name isn't changing, return a clean resolved Promise.
    if (displayName === currentDisplayName) {
      return Promise.resolve();
    }

    const ref = firebase.database().ref();
    // Changes being made; several other side-effects happen later. :(
    const updateData = {
      [`users/${uid}/displayName`]: displayName,
      [`names/${normalizeName(displayName)}`]: uid
    };

    return ref.update(updateData).then((snapshot) => {
      // The other firebase actions don't matter and can fail, only this
      // initial update is important.
      dispatch(updateDisplayName(uid, displayName));

      // Updates the Leaderboard name; will also get picked up at next scores run.
      if (getStore().leaderboard[uid]) {
        ref.child(`leaderboard/${uid}/displayName`).set(displayName).catch(errFunc);
        ref.child(`leaderboard/${uid}/anon`).set(false).catch(errFunc);
      }

      // Frees their old displayName so others can use it.
      if (currentDisplayName) {
        ref.child(`names/${normalizeName(currentDisplayName)}`).remove().catch(errFunc);
      }
      // Removes the now-unnecessary fakeDisplayName
      ref.child(`users/${uid}/fakeDisplayName`).remove().catch(errFunc);
    });
  };
};

export const startPlaceWager = (betId, wager, comment) => {
  return (dispatch, getStore) => {
    const { uid, user } = getStore().login;
    const userRef = getUserRef(uid);
    const prevWager = getKey(user.wagers, betId, null);
    const prevWagerAmount = getKey(prevWager, wager, 0);
    // Refund the previous wager, charge the new wager.
    const newBalance = user.balance + prevWagerAmount - wager;

    if (newBalance < 0) {
      return Promise.resolve();
    }
    const updateData = {
      [`wagers/${betId}`]: {
        id: betId,
        wager,
        comment,
        created_at: getKey(prevWager, created_at, Date.now()),
        updated_at: Date.now()
      },
      balance: newBalance
    };
    return userRef.update(updateData).then(() => {
      if (wager === 0 && comment === '') {
        userRef.child(`wagers/${betId}`).remove();
      }
    });
  };
};

export const startLoginWith = (providerData) => {

  return (dispatch, getStore) => {
    var provider = new providerData.provider();
    providerData.scope.forEach((scope) => {
      provider.addScope(scope);
    });

    return firebase.auth().signInWithPopup(provider).then((result) => {
      // On successful authentication, we need to store this fresh user data.
      // This may be a new OR an existing user. Transaction lets us
      // create or update based on existing state.
      //
      // Note that actually retrieving the new user data happens in the
      // observer, registered in app.jsx.
      let id = result.user.uid;
      let errorFunc = (error) => {
        console.log('Transaction error occured:', error);
      };

      getUserRef(id).transaction((user) => {
        return (user === null) ?
          // Brand new user, need to set new user data
          {
            id,
            balance: INITIAL_BALANCE,
            created_at: Date.now()
          } : undefined;
      }).catch(errorFunc);

      getSecureRef(id).transaction((secure) => {
        var secureData = {
            displayName: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
            credential: result.credential
        };
        return (secure === null) ?
          // Brand new user, need to set new user data
          {
            ...secureData,
            id,
            created_at: Date.now()
          } :
          // Existing user, just update to latest data
          {
            ...secure,
            ...secureData,
            updated_at: Date.now()
          }
      }).then((result) => {
        if (result.committed) {
          dispatch(updateSecure(result.snapshot.val()));
        }
      }, errorFunc);
    });
  };
};

export const startLoginGoogle = () => {
  return startLoginWith(PROVIDERS.google);
};

export const startLoginFacebook = () => {
  return startLoginWith(PROVIDERS.facebook);
};

export const startLoginTwitter = () => {
  return startLoginWith(PROVIDERS.twitter);
};

export const startLogout = () => {
  return (dispatch, getStore) => {
    return firebase.auth().signOut();
  };
};

