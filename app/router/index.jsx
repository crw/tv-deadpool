import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// App components
import App from 'App';
import GameBoard from 'GameBoard';
import ProfileBoard from 'ProfileBoard';
import About from 'About';
import Help from 'Help';
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
      <Route path="profile" component={ProfileBoard} onEnter={requireLogin}/>
      <Route path="profile/:userId" component={ProfileBoard} onEnter={requireLogin}/>
      <Route path="help" component={Help}/>
      <Route path="about" component={About}/>
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
