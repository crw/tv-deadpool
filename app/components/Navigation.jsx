import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { startLogout } from 'actions';
import { isLoggedIn } from 'api/firebase';
import { getKey } from 'utils';
import * as str from 'constants/strings';


export class Navigation extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    var { dispatch } = this.props;
    e.preventDefault();
    dispatch(startLogout());
  }

  render() {
    const { login } = this.props;
    const __DEV__ = process.env.NODE_ENV === 'development';

    const logoutHtml = (
      <div className="top-bar-right">
        <ul className="menu">
          <li>
            <a href="#" onClick={this.handleLogout}>
              <i className="fa fa-fw fa-sign-out"/>Logout</a>
          </li>
        </ul>
      </div>
    );

    return (
      <div className="top-bar navigation">
        <div className="row">
          <div className="small-12 columns">
            <div className="top-bar-left">
              <ul className="menu">
                <li>
                  <Link to="/" className="brand-icon">
                    <img src="/favicon-32x32.png"/>
                  </Link>
                </li>
                <li>
                  <NavLink to="/" activeClassName="link-active">{ str.NAV_SEASONS }</NavLink>
                </li>
                <li>
                  <NavLink to="/help" activeClassName="link-active">{ str.NAV_HELP }</NavLink>
                </li>
                <li>
                  <NavLink to="/about" activeClassName="link-active">{ str.NAV_ABOUT }</NavLink>
                </li>
                { __DEV__ ? (<li>{ login.uid }</li>) : '' }
              </ul>
            </div>
            { isLoggedIn() ? logoutHtml : ''}
          </div>
        </div>
      </div>
    );
  }
}

//                <li>
//                  <NavLink to="/admin" activeClassName="link-active">{ str.NAV_ADMIN }</NavLink>
//                </li>


function mapStateToProps(state, ownProps) {
  const { login } = state;
  return { login };
}

export default connect(mapStateToProps)(Navigation);
