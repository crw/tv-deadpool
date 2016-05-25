import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
// App imports
import GoTApp from 'GoTApp';
import Main from 'Main';
import Profile from 'Profile';
import * as actions from 'actions';
var store = require('configureStore').configure();

// Load fixtures
import * as fixtures from 'fixtures';

// Load Foundation
$(document).foundation();

// App CSS
require('style!css!sass!applicationStyles');

// Redux testing
store.subscribe(() => {
  var state = store.getState();
  console.log('State updated:', state);
})

// Redux fixtures setup
store.dispatch(actions.updateEventsData(fixtures.Events));
store.dispatch(actions.updateBetsData(fixtures.Bets));
store.dispatch(actions.updateUserData(fixtures.User));


ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={GoTApp}>
        <Route path="profile" component={Profile}/>
        <IndexRoute component={Main}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);


