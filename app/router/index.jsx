import React from 'react';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';
// App components
import App from 'App';
import GameBoard from 'GameBoard';
import ProfileBoard from 'ProfileBoard';
import About from 'About';
import Help from 'Help';


var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/');
  }
  next();
};

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={GameBoard}/>
      <Route path="profile" component={ProfileBoard} onEnter={requireLogin}/>
      <Route path="profile/:userId" component={ProfileBoard} onEnter={requireLogin}/>
      <Route path="help" component={Help}/>
      <Route path="about" component={About}/>
    </Route>
  </Router>
);