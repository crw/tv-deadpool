import React from 'react';
var {Link, IndexLink} = require('react-router');


export var Navigation = React.createClass({
  render: function () {
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">
              GoT/AVClub Deadpool
            </li>
            <li>
              <IndexLink to="/" activeClassName="link-active">Bets</IndexLink>
            </li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            <li>
              <Link to="/profile" activeClassName="link-active">Your Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});


export default Navigation;