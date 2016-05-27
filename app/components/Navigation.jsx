import React from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';
// App imports
import {startLogout} from 'actions';


export class Navigation extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    var {dispatch} = this.props;
    e.preventDefault();
    dispatch(startLogout());
  }

  render() {
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
            <li>
              <Link to="/profile" activeClassName="link-active">You</Link>
            </li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            <li>
              <a href="#" onClick={this.handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}


export default connect()(Navigation);
