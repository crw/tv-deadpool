import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// App components
import App from 'App';
import GameBoard from 'GameBoard';
import ProfileBoard from 'ProfileBoard';
import About from 'About';
import Help from 'Help';
import Edit from 'Edit';
import firebase from 'app/api/firebase';


var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/');
  }
  next();
};


export default (
  <Router basename='/'>
    <App>
      <Route exact path="/" component={GameBoard}/>
      <Route exact path="/profile" component={ProfileBoard} onEnter={requireLogin}/>
      <Route exact path="/profile/:userId" component={ProfileBoard} onEnter={requireLogin}/>
      <Route exact path="/help" component={Help}/>
      <Route exact path="/about" component={About}/>
      <Route exact path="/edit" component={Edit}/>
    </App>
  </Router>
);


// export default (
//   <Router basename='/'>
//     <SiteContainer>
//       <Route exact path="/topics/" component={ TopicsContainer } />
//       <Route path="/topics/:topicId/posts" component={ PostsPageContainer } />
//     </SiteContainer>
//   </Router>
// );
