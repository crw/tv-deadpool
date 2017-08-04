import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toCurrencyString } from 'app/utils';
import * as str from 'constants/strings';


export default class LeaderboardEntry extends React.Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    userId: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    anon: PropTypes.bool.isRequired,
    profileUser: PropTypes.bool.isRequired,
    authUser: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
    renderKey: PropTypes.oneOf(['balance', 'winnings', 'losses']).isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      index, userId, displayName, anon,
      profileUser, authUser, value, renderKey, season
    } = this.props;

    const rowCls = authUser ? 'login-user' : profileUser ? 'current-user' : '';
    const displayNameCls = !profileUser && anon ? 'anon' : '';
    const userIcon = authUser ?
      str.ICON_USER_YOU :
      anon ?
        str.ICON_USER_ANON :
        str.ICON_USER_DEFAULT;
    const userIconDesc = authUser ?
      str.TXT_USER_ICON_DESC_YOU :
      anon ?
        str.TXT_USER_ICON_DESC_ANON :
        str.TXT_USER_ICON_DESC_DEFAULT;

    return (
      <div className={'result-row ' + rowCls}>
        <Link className="user-link" to={`/profile/${season}/${userId}`}>
          <div className="number-order small-1 columns">
            {index}.
          </div>
          <div className="align-right small-3 columns">
            <span className={value < 0 ? 'losses' : renderKey}>{toCurrencyString(value)}</span>
          </div>
          <div className="username small-8 columns">
              <span title={userIconDesc}>
                <i className={userIcon}/>
              </span>{' '}
              <span className={displayNameCls}>{displayName}</span>
          </div>
        </Link>
      </div>
    );
  }
}

