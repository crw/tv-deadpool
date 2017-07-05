import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { isLoggedIn, isAdmin } from 'api/firebase';
import App from 'App';
import GameBoard from 'GameBoard';
import ProfileBoard from 'ProfileBoard';
import About from 'About';
import Help from 'Help';
import Admin from 'admin/Admin';


function protectProfile() {
  return isLoggedIn() ? <Route exact path="/profile" component={ProfileBoard}/> : <Redirect to="/"/>;
}


export default (
  <Router basename='/'>
    <App>
      <Route exact path="/" component={GameBoard}/>
      <Route exact path="/profile" render={protectProfile}/>
      <Route exact path="/profile/:userId" component={ProfileBoard}/>
      <Route exact path="/help" component={Help}/>
      <Route exact path="/about" component={About}/>
      <Route path="/admin" component={Admin}/>
    </App>
  </Router>
);
