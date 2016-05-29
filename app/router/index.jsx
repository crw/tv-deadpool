import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
// App components
import App from 'App';
import GameBoard from 'GameBoard';
import Profile from 'Profile';


export default (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={GameBoard}/>
      <Route path="profile" component={Profile}/>
    </Route>
  </Router>
);