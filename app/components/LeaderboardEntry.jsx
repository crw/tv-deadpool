import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {toCurrencyString} from 'app/utils';

const TXT_USER_ICON_DESC_YOU = 'You!';
const TXT_USER_ICON_DESC_ANON = 'Anonymous user with randomly-generated name.';
const TXT_USER_ICON_DESC_DEFAULT = '';
const ICON_USER_YOU = 'fa fa-user';
const ICON_USER_ANON = 'fa fa-question';
const ICON_USER_DEFAULT = '';

export default class LeaderboardEntry extends React.Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
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
    const { index, userId, displayName, anon, profileUser, authUser, value, renderKey } = this.props;

    const rowCls = authUser ? 'login-user' : profileUser ? 'current-user' : '';
    const displayNameCls = !profileUser && anon ? 'anon' : '';
    const userIcon = authUser ? ICON_USER_YOU : anon ? ICON_USER_ANON : ICON_USER_DEFAULT;
    const userIconDesc = authUser ? TXT_USER_ICON_DESC_YOU : anon ? TXT_USER_ICON_DESC_ANON : TXT_USER_ICON_DESC_DEFAULT;

    return (
      <div className={'result-row ' + rowCls}>
        <div className="number-order small-1 columns">
          {index}.
        </div>
        <div className="align-right small-3 columns">
          <span className={value < 0 ? 'losses' : renderKey}>{toCurrencyString(value)}</span>
        </div>
        <div className="username small-8 columns">
          <Link className="user-link" to={'/profile/' + userId}>
            <span title={userIconDesc}>
              <i className={userIcon}/>
            </span>{' '}
            <span className={displayNameCls}>{displayName}</span>
          </Link>
        </div>
      </div>
    );
  }
}

