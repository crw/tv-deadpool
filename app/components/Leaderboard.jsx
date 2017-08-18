import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { sortObjectsByKey, isElementInViewport, toCurrencyString } from 'utils';
import { startFetchLabel } from 'actions';
import * as str from 'constants/strings';
import LeaderboardEntry from 'LeaderboardEntry';
const KEY = str.LEADERBOARD_DISPLAY_KEY;


export class Leaderboard extends React.Component {

  static propTypes = {
    leaders: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    userId: PropTypes.string,
    authUserId: PropTypes.string.isRequired,
    season: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  }

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
    const { leaders, label, userId, authUserId, season } = this.props;
    const { key } = this.state;

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
          <LeaderboardEntry { ...leader }
            userId={ leader.key }
            value={ leader[key] }
            index={ i++ }
            profileUser={ leader.key === userId }
            authUser={ leader.key === authUserId }
            renderKey={ key }
            season={ season }
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
          { process.env.NODE_ENV === 'development' ? ' - ' : '' }
          { process.env.NODE_ENV === 'development' ? navLink(KEY.RATIO, str.RATIO) : '' }

        </div>
        <div className="standings row">
          { renderLeaders() }
        </div>
      </div>
    );
  }
}

export default Leaderboard;
