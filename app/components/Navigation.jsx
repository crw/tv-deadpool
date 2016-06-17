import React from 'react';
import {connect} from 'react-redux';
import {IndexLink, Link} from 'react-router';
// App imports
import NavLink from 'NavLink';
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
    let {login} = this.props;

    let renderLogout = () => {
      if (login) {
        return (
          <div className="top-bar-right">
            <ul className="menu">
              <li>
                <a href="#" onClick={this.handleLogout}>
                  <i className="fa fa-fw fa-sign-out"/>Logout</a>
              </li>
            </ul>
          </div>
        );
      }
    };

    return (
      <div className="top-bar navigation">
        <div className="row">
          <div className="small-12 columns">
            <div className="top-bar-left">
              <ul className="menu">
                <li className="menu-text">
                  TVDeadpool.xyz
                </li>
                <li>
                  <IndexLink to="/" activeClassName="link-active">Bets</IndexLink>
                </li>
                <li>
                  <Link to="/help" activeClassName="link-active">Help</Link>
                </li>
                <li>
                  <Link to="/about" activeClassName="link-active">About</Link>
                </li>
              </ul>
            </div>
            {renderLogout()}
          </div>
        </div>
      </div>
    );
  }
}
/*
                { login ? (
                    <li>
                      <Link to="/profile" activeClassName="link-active">You</Link>
                    </li>
                  ) : <li/> }
*/

export default connect((state) => {
  return {
    login: state.login
  };
})(Navigation);
