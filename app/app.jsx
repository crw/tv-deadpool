import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory} from 'react-router';
// App imports
import {getCurrentUser} from 'app/api/firebase';
import * as actions from 'actions';
import router from 'app/router';


// Load Foundation
$(document).foundation();

// App CSS
require('style!css!sass!applicationStyles');
require('font-awesome/css/font-awesome.css');
require('./styles/fonts/gameofthrones/stylesheet.css');

var store = require('configureStore').configure();



// Fetch Events and Bets data
store.dispatch(actions.startEventsData());
store.dispatch(actions.startBetsData());
store.dispatch(actions.startLeaderboardData());


//// Login / Logout functionality
//// Saving for later.

firebase.auth().onAuthStateChanged((authData) => {
  try {
    if (authData) {
      // Logged in
      console.log('Authorizing:', authData.providerData[0].providerId, authData.uid);
      try {
        store.dispatch(actions.login(authData.uid));
        store.dispatch(actions.startFetchLoginUser());
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('Deauthorizing:', authData, getCurrentUser());
      store.dispatch(actions.logout());
      // logged out
    }
  } catch (e) {
    console.log('onAuthStateChanged Exception:', e);
  }
});



ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
