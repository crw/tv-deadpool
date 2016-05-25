import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
// App components
import GoTApp from 'GoTApp';
import Main from 'Main';
import Profile from 'Profile';
// import firebase from 'TodoFirebase';


// var requireLogin = (nextState, replace, next) => {
//   if (!firebase.auth().currentUser) {
//     replace('/');
//   }
//   next();
// };

// var redirectIfLoggedIn = (nextState, replace, next) => {
//   if (firebase.auth().currentUser) {
//     replace('/');
//   }
//   next();
// };

export default (
  <Router history={hashHistory}>
    <Route path="/" component={GoTApp}>
      <Route path="profile" component={Profile}/>
      <IndexRoute component={Main}/>
    </Route>
  </Router>
);