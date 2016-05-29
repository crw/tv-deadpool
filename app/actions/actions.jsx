import moment from 'moment';
// App imports
import {now} from 'app/utils';
import {getUserRef} from 'app/api/firebase';
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

/********************************
 * User Data Manipulation Actions
 ********************************/

export var updateUserData = (updatedData) => {
  return {
    type: 'UPDATE_USER_DATA',
    updatedData
  };
};

export var startFetchUser = () => {
  return (dispatch, getStore) => {
    var uid = getStore().login.uid;
    var userRef = getUserRef(uid);

    return userRef.on('value', (snapshot) => {
      var val = snapshot.val() || {};
      dispatch(updateUserData(val));
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
    var user = getStore().user;
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
      userRef.update(updateData).then(() => {
        userRef.child(`wagers/${betId}`).once('value').then((snapshot) => {
          let val = snapshot.val();
          // dispatch(placeWager(snapshot.val()));
        });
      }, (e) => {
        console.log('Error placing wager:', e);
      });
    };
  };
};


/********************************
 * Authentication Actions
 ********************************/

export var login = (uid, token) => {
  return {
    type: 'LOGIN',
    token,
    uid
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  }
};

export var startLoginWith = (providerData) => {
  return (dispatch, getStore) => {
    var provider = new providerData.provider();
    providerData.scope.forEach((scope) => {
      provider.addScope(scope);
    });

    return firebase.auth().signInWithPopup(provider).then((result) => {
      var userRef = getUserRef(result.user.uid);

      // On successful authentication, we need to store this fresh user data.
      // This may be a new OR an existing user. Transaction lets us
      // create or update based on existing state.
      //
      // Note that actually retrieving the new user data happens in the
      // observer, registered in app.jsx.
      userRef.transaction((user) => {
        var newUserData = {
            uid: result.user.uid,
            displayName: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
            credential: result.credential
        };
        if (user === null) {
          // Brand new user, need to set new user data
          return {
            ...newUserData,
            balance: 100,
            created_at: now()
          };
        } else {
          // Existing user, just updating to latest data
          return {
            ...user,
            ...newUserData,
            updated_at: now()
          };
        }
      }, (error, committed) => {
        if (!committed) {
          console.log(error);
        }
      });
    });
  }
}

export var startLoginGoogle = () => {
  return startLoginWith(PROVIDERS.google);
};

export var startLoginFacebook = () => {
  return startLoginWith(PROVIDERS.facebook);
};

export var startLoginGithub = () => {
  return startLoginWith(PROVIDERS.github);
};

export var startLogout = () => {
  return (dispatch, getStore) => {
    return firebase.auth().signOut();
  };
};
