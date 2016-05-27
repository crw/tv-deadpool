import moment from 'moment';
// App imports
import {getUserRef} from 'app/api/firebase';
import PROVIDERS from 'app/constants/providers';


export var updateBetsData = (updatedData) => {
  return {
    type: 'UPDATE_BETS_DATA',
    updatedData
  };
};

export var updateEventsData = (updatedData) => {
  return {
    type: 'UPDATE_EVENTS_DATA',
    updatedData
  };
};

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

    return userRef.once('value').then((snapshot) => {
      var val = snapshot.val() || {};
      dispatch(updateUserData(val));
    });
  };
};

export var placeBet = (bet_id, wager, comment) => {
  return {
    type: 'PLACE_BET',
    bet_id,
    wager,
    comment
  };
};

export var setMoney = (newBalance) => {
  return {
    type: 'SET_MONEY',
    newBalance
  };
};

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

      // On successful authentication, we need to store this data.
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
            credential: result.credential,
        };
        if (user === null) {
          // Brand new user, need to set new user data
          return {
            ...newUserData,
            balance: 100,
            created_at: moment().unix(),
          };
        } else {
          // Existing user, just updating to latest data
          return {
            ...user,
            ...newUserData,
            updated_at: moment().unix()
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



// export var updateLoggedinUser = (user_id) => {
//   return {
//     type: 'UPDATE_LOGGEDIN_USER',
//     user_id
//   };
// };
