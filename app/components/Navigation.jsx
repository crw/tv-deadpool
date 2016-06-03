import React from 'react';
import {connect} from 'react-redux';
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
                <a href="#" onClick={this.handleLogout}>Logout</a>
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
                  <NavLink to="/" onlyActiveOnIndex={true}>Bets</NavLink>
                </li>
                <li>
                  <NavLink to="/profile">You</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About</NavLink>
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


export default connect((state) => {
  return {
    login: state.login
  };
})(Navigation);
