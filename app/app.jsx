import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory} from 'react-router';
// App imports
import * as actions from 'actions';
import router from 'app/router';
// App fixtures
import * as fixtures from 'fixtures';

// Load Foundation
$(document).foundation();

// App CSS
require('style!css!sass!applicationStyles');

var store = require('configureStore').configure();
// Redux testing
store.subscribe(() => {
  var state = store.getState();
  console.log('State updated:', state);
})

// Redux fixtures setup
store.dispatch(actions.updateEventsData(fixtures.Events));
store.dispatch(actions.updateBetsData(fixtures.Bets));
store.dispatch(actions.updateUserData(fixtures.User));



//// Login / Logout functionality
//// Saving for later.

// firebase.auth().onAuthStateChanged((authData) => {
//   if (authData) {
//     // Logged in
//     store.dispatch(actions.login(authData.ma, authData.uid));
//     store.dispatch(actions.startAddTodos());
//     hashHistory.push('/todos');
//   } else {
//     store.dispatch(actions.logout());
//     hashHistory.push('/');
//     // logged out
//   }
// });



ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);


