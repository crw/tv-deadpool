import React from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router';
// App imports
import LeaderboardEntry from 'LeaderboardEntry';
import {LOCALE, CURRENCY_FORMAT} from 'app/constants/formats';
import {DEFAULT_DISPLAY_NAME} from 'app/constants/strings';
import {getKey, sortObjectsByKey, toArray, isElementInViewport, toCurrencyString} from 'app/utils';
import {startFetchLabel} from 'actions';
import * as str from 'constants/strings';

const KEY = {
  BALANCE: 'balance',
  WINNINGS: 'winnings',
  LOSSES: 'losses'
}


export class Leaderboard extends React.Component {

  constructor(props) {
    super(props);
    this.handleSetKey = this.handleSetKey.bind(this);
    this.state = { key: KEY.BALANCE };
  }

  handleSetKey(e) {
    e.preventDefault();
    let key = e.target.dataset.key;
    this.setState({ key });
  }

  componentDidMount() {
    let { dispatch, label, leaders } = this.props;
    let { userScore } = this.refs;
    if (leaders.length === 0 && label !== str.THE_FIELD) {
      dispatch(startFetchLabel(label));
    }
    if (userScore && !isElementInViewport(userScore)) {
      userScore.scrollIntoView();
    }

  }

  render() {
    const {leaders, label, userId, authUserId} = this.props;
    const {key} = this.state;

    const activeNavLink = keyLink => key === keyLink ? 'link-active ' : '';

    const navLink = (navkey, label) => (
      <a href="#"
        data-key={ navkey }
        className={ activeNavLink(navkey) }
        onClick={ this.handleSetKey }>{ label }</a>
    );

    const renderLeaders = () => {
      if (leaders.length === 0) {
        return <div className="container__message">No leaders!</div>;
      }

      const reverse = key !== KEY.LOSSES;
      let i = 1;

      return leaders.sort(sortObjectsByKey(key, reverse)).map(
        leader => (
          <LeaderboardEntry {...leader}
            userId={leader.key}
            value={leader[key]}
            index={i++}
            profileUser={leader.key === userId}
            authUser={leader.key === authUserId}
            renderKey={key}
          />
        )
      );
    };

    return (
      <div className="leaderboard">
        <div className="title">
          { label }
        </div>
        <div className="leaderboard__navigation">
          { navLink(KEY.BALANCE, str.BALANCE) }{' - '}
          { navLink(KEY.WINNINGS, str.WINNINGS) }{' - '}
          { navLink(KEY.LOSSES, str.LOSSES) }
        </div>
        <div className="standings row">
          { renderLeaders() }
        </div>
      </div>
    );
  }
}



function mapStateToProps(state, ownProps) {
  const { label, seasonId } = ownProps;
  const { labels, leaderboard, login: { uid } } = state;
  const seasonLeaders = getKey(leaderboard, seasonId, {});

  let members = Object.keys(getKey(labels, label, {}));


  // Special cases
  switch (label) {
    // Special case: show the logged-in user with the AVClub staffers
    case str.AVC_STAFFERS: {
      if (members.length !== 0 &&
        getKey(seasonLeaders, uid, false) &&
        members.indexOf(uid) === -1) {

          members.push(uid);
      }
      break;
    }
    // Special case: The Field (all players excluding staff)
    case str.THE_FIELD: {
      const exclude_list = Object.keys(Object.assign({},
        getKey(labels, str.EXCLUDE_LIST, {}),
        getKey(labels, str.AVC_STAFFERS, {})
      ));
      members = Object.keys(seasonLeaders).filter(member => exclude_list.indexOf(member) < 0);
      break;
    }
  }
  const leaders = toArray(seasonLeaders).filter(leader => members.indexOf(leader.key) > -1);
  return { authUserId: uid, leaders };
};


export default connect(mapStateToProps)(Leaderboard);
