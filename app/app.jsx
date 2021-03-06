import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
// App imports
import firebase from 'app/api/firebase';
import { getCurrentUser } from 'app/api/firebase';
import router from 'app/router/index';
import * as actions from 'actions';
import * as str from 'constants/strings';

// Load Foundation
$(document).foundation();

// App CSS
require('font-awesome/css/font-awesome.css');
require('./styles/fonts/gameofthrones/stylesheet.css');
require('app/styles/app.scss');

let state = {};

// try {
//   state = JSON.parse(localStorage.getItem('state')) || {};
// } catch (err) {
//   console.log(err);
// }

var store = require('configureStore').configure(state);

store.subscribe(() => {
  const state = store.getState();
  const storedState = {
    ...state,
    users: undefined
  };
  // localStorage.setItem('state', JSON.stringify(storedState));
});

// Initialize Firebase; start watching data sources
store.dispatch(actions.startFetchLabel(str.EXCLUDE_LIST));
store.dispatch(actions.startFetchLabel(str.THREE_EYED_RAVEN));
store.dispatch(actions.watchEpisodesData());
store.dispatch(actions.watchBetsData());
store.dispatch(actions.watchLeaderboardData());
store.dispatch(actions.watchStatsData());
store.dispatch(actions.watchSeriesData());
store.dispatch(actions.watchSeasonsData());

firebase.auth().onAuthStateChanged((authData) => {
  if (authData) {
    try {
      store.dispatch(actions.login(authData.uid));
      store.dispatch(actions.startFetchLoginUser());
    } catch (e) {
      console.log('Login error:', e);
    }
  } else {
    try {
      store.dispatch(actions.logout());
    } catch (e) {
      console.log('Logout error:', e);
    }
  }
  store.dispatch(actions.apiUpdated());
});

const reactRootEl = document.getElementById('app');

if (reactRootEl) {
  ReactDOM.render((
    <Provider store={store}>
      { router }
    </Provider>
    ), reactRootEl
  );
}
