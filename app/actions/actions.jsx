import moment from 'moment';
// App imports
import {now} from 'app/utils';
import {getUserRef, getSecureRef} from 'app/api/firebase';
import PROVIDERS from 'app/constants/providers';


export var updateBetsData = (updatedData) => {
  return {
    type: 'UPDATE_BETS_DATA',
    updatedData
  };
};

export var startBetsData = () => {
  return (dispatch, getStore) => {
    let betsRef = firebase.database().ref('bets');
    betsRef.on('value', (snapshot) => {
      dispatch(updateBetsData(snapshot.val()));
    });
  };
}

export var updateEventsData = (updatedData) => {
  return {
    type: 'UPDATE_EVENTS_DATA',
    updatedData
  };
};

export var startEventsData = () => {
  return (dispatch, getStore) => {
    let eventsRef = firebase.database().ref('events');
    eventsRef.on('value', (snapshot) => {
      dispatch(updateEventsData(snapshot.val()));
    });
  };
}

export var updateLeaderboardData = (updatedData) => {
  return {
    type: 'UPDATE_LEADERBOARD_DATA',
    updatedData
  };
};

export var startLeaderboardData = () => {
  return (dispatch, getStore) => {
    let lbRef = firebase.database().ref('leaderboard');
    lbRef.on('value', (snapshot) => {
      dispatch(updateLeaderboardData(snapshot.val()));
    });
  };
};

export var updateLabel = (label, data) => {
  return {
    type: 'UPDATE_LABEL',
    label,
    data
  };
};

export var startFetchLabel = (label) => {
  return (dispatch, getStore) => {
    let labelRef = firebase.database().ref(`labels/${label}`);
    labelRef.once('value').then((snapshot) => {
      dispatch(updateLabel(label, snapshot.val()));
    });
  };
};


/********************************
 * User Data Manipulation Actions
 ********************************/

export var updateUser = (data) => {
  return {
    type: 'UPDATE_USER',
    data
  };
}

export const startGetUser = (uid) => {
  return (dispatch, getStore) => {
    var userRef = getUserRef(uid);

    return userRef.once('value').then(
      (snapshot) => {
        dispatch(updateUser(snapshot.val() || {}));
      },
      (e) => {
        console.log('startGetUser error:', e);
      }
    );
  };
};

export var startFetchLoginUser = () => {
  return (dispatch, getStore) => {
    var uid = getStore().login.uid;
    var userRef = getUserRef(uid);

    return userRef.on('value', (snapshot) => {
      try {
        dispatch(updateUser(snapshot.val() || {}));
      } catch (e) {
        console.log(e);
      }
    });
  };
};

export var placeWager = (bet) => {
  return {
    type: 'PLACE_WAGER',
    bet
  };
};


export var startPlaceWager = (betId, wager, comment) => {
  return (dispatch, getStore) => {
    var userRef = getUserRef(getStore().login.uid);
    var user = getStore().login.user;
    var prevWager = (user.wagers && user.wagers[betId]) ? user.wagers[betId] : null;
    var prevWagerAmount = (prevWager) ? prevWager.wager : 0;
    // Refund the previous wager, charge the new wager.
    var newBalance = user.balance + prevWagerAmount - wager;

    if (newBalance >= 0) {
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
      userRef.update(updateData);
    };
  };
};


/********************************
 * Authentication Actions
 ********************************/

export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  }
};

export var updateSecure = (data) => {
  return {
    type: 'UPDATE_SECURE',
    data
  };
};


export var startLoginWith = (providerData) => {

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
            balance: 100,
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

export var startLoginGoogle = () => {
  return startLoginWith(PROVIDERS.google);
};

export var startLoginFacebook = () => {
  return startLoginWith(PROVIDERS.facebook);
};

export var startLoginTwitter = () => {
  return startLoginWith(PROVIDERS.twitter);
};

export var startLogout = () => {
  return (dispatch, getStore) => {
    return firebase.auth().signOut();
  };
};
