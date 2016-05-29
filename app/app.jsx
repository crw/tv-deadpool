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


var store = require('configureStore').configure();



// Fetch Events and Bets data
store.dispatch(actions.startEventsData());
store.dispatch(actions.startBetsData());


//// Login / Logout functionality
//// Saving for later.

firebase.auth().onAuthStateChanged((authData) => {
  if (authData) {
    // Logged in
    console.log('Authorizing:', authData.providerData[0].providerId, authData.uid);
    store.dispatch(actions.login(authData.uid));
    store.dispatch(actions.startFetchUser());
    // hashHistory.push('/todos');
  } else {
    console.log('Deauthorizing:', authData, getCurrentUser());
    store.dispatch(actions.logout());
    // hashHistory.push('/');
    // logged out
  }
});



ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
