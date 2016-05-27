import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory} from 'react-router';
// App imports
import {getCurrentUser} from 'app/api/firebase';
import * as actions from 'actions';
import router from 'app/router';
// App fixtures
import * as fixtures from 'app/fixtures';


// Load Foundation
$(document).foundation();

// App CSS
require('style!css!sass!applicationStyles');
require('font-awesome/css/font-awesome.css');


var store = require('configureStore').configure();
// Redux testing
// store.subscribe(() => {
//   var state = store.getState();
//   console.log('State updated:', state);
// })

// // Redux fixtures setup
store.dispatch(actions.updateEventsData(fixtures.Events));
store.dispatch(actions.updateBetsData(fixtures.Bets));


//// Login / Logout functionality
//// Saving for later.

firebase.auth().onAuthStateChanged((authData) => {
  if (authData) {
    // Logged in
    console.log('Authorizing:', authData);
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
