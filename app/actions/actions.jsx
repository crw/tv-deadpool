import {createAction} from 'redux-actions';
import moment from 'moment';
// App imports
import * as action_type from 'app/constants/action_types';
import INITIAL_BALANCE from 'app/constants/numbers';
import PROVIDERS from 'app/constants/providers';
import {now, normalizeName} from 'app/utils';
import firebase, {getUserRef, getSecureRef} from 'app/api/firebase';
import { SubmissionError } from 'redux-form';


// Small error func for catch statements.
function errFunc(err) {
  console.log(this, 'ERR:', err);
};


// Mass Import
export const updateBetsData = createAction(action_type.UPDATE_BETS_DATA);
export const updateStatsData = createAction(action_type.UPDATE_STATS_DATA);
export const updateEventsData = createAction(action_type.UPDATE_EVENTS_DATA);
export const updateLeaderboardData = createAction(action_type.UPDATE_LEADERBOARD_DATA);
// Data Update
export const login = createAction(action_type.LOGIN);
export const logout = createAction(action_type.LOGOUT);
export const updateSecure = createAction(action_type.UPDATE_SECURE);
export const updateUser = createAction(action_type.UPDATE_USER);
export const updateLabel = createAction(action_type.UPDATE_LABEL, (label, data) => {return {label, data};});
export const updateDisplayName = createAction(action_type.UPDATE_DISPLAY_NAME, (uid, displayName) => { return {uid, displayName}; });
// Prefs Actions
export const setPreference = createAction(action_type.SET_PREFERENCE, (context, pref, value) => { return { context, pref, value }; });
export const setPreferences = createAction(action_type.SET_PREFERENCES, (context, prefs) => { return { context, prefs }; });

export const apiUpdated = createAction(action_type.API_UPDATED);


export const startBetsData = () => {
  return (dispatch, getStore) => {
    const betsRef = firebase.database().ref('bets');
    return betsRef.on('value', (snapshot) => {
      dispatch(updateBetsData(snapshot.val()));
    });
  };
}

export const startEventsData = () => {
  return (dispatch, getStore) => {
    const eventsRef = firebase.database().ref('events');
    return eventsRef.on('value', (snapshot) => {
      dispatch(updateEventsData(snapshot.val()));
    });
  };
}

export const startLeaderboardData = () => {
  return (dispatch, getStore) => {
    const lbRef = firebase.database().ref('leaderboard');
    return lbRef.on('value', (snapshot) => {
      dispatch(updateLeaderboardData(snapshot.val()));
    });
  };
};

export const startStatsData = () => {
  return (dispatch, getStore) => {
    const statsRef = firebase.database().ref('stats');
    return statsRef.on('value', (snapshot) => {
      dispatch(updateStatsData(snapshot.val()));
    }, (err) => {console.log(err);} );
  };
};

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

// export const startCreateSeries = () => {

// }

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
      ref.child(`users/${uid}/fakeDisplayName`).remove().catch(errFunc);
    });
  };
};

export const startPlaceWager = (betId, wager, comment) => {
  return (dispatch, getStore) => {
    var userRef = getUserRef(getStore().login.uid);
    var user = getStore().login.user;
    var prevWager = (user.wagers && user.wagers[betId]) ? user.wagers[betId] : null;
    var prevWagerAmount = (prevWager) ? prevWager.wager : 0;
    // Refund the previous wager, charge the new wager.
    var newBalance = user.balance + prevWagerAmount - wager;

    if (newBalance < 0) {
      return new Promise(resolve => resolve());
    }
    var createData = !prevWager ? {created_at: now()} : {created_at: prevWager.created_at};
    var updateData = { };
    updateData['balance'] = newBalance;
    updateData[`wagers/${betId}`] = {
      ...createData,
      id: betId,
      updated_at: now(),
      wager,
      comment
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
            created_at: now()
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
            created_at: now()
          } :
          // Existing user, just update to latest data
          {
            ...secure,
            ...secureData,
            updated_at: now()
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

