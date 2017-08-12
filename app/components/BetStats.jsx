import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getKey, isEmpty, toCurrencyString } from 'utils';
import * as str from 'constants/strings';


export class BetStats extends React.Component {

  static propTypes = {
    count: PropType.number,
    amount: PropType.number,
    comments: PropType.object, // Comments indexed by user id
    names: PropType.object,    // Usernames indexed by user id
    profileUrl: PropType.string // base path to a user profile URL
  }

  constructor(props) {
    super(props);
    this.handleToggleComments = this.handleToggleComments.bind(this);

    this.state = {
      showComments: false
    }
  }

  handleToggleComments(e) {
    e.preventDefault();
    this.setState(() => {
      return { showComments: !this.state.showComments };
    });
  }

  render() {
    const { count, amount, comments, names, profileUrl } = this.props;
    const { showComments } = this.state;

    const cls_icon_show_hide = showComments ? str.CLS_ICON_HIDE : str.CLS_ICON_SHOW;

    const hasComments = !isEmpty(comments) && Object.keys(comments).length;

    if (count === 0) return <div/>;

    return (
      <div className="stats">
        {
          <span className="stats__text">
            <span className="stats__count">{ count }</span>{' '}
            { count === 1 ? 'user has' : 'users have' } placed wagers totalling{' '}
            <span className="stats__amount">{ toCurrencyString(amount) }</span>{' '}
            on this position.{' '}
          </span>
        }
        { hasComments ? (
          <a href="#" onClick={this.handleToggleComments}>
            { str.STATS_HAS_COMMENTS(hasComments) }{' '}
            <i className={ cls_icon_show_hide }/>
          </a>
        ) : '' }{' '}
        { hasComments && showComments ? (
          <div className="stats__comments">
            { Object.keys(comments).map(id => (
                <div className="stats__comment" key={ id }>
                  <Link className="name" to={ `${profileUrl}/${id}` }>{ names[id] }</Link>{': '}
                  <span className="comment">{ comments[id] }</span>
                </div>
            ))}
          </div>
        ) : '' }
      </div>
    );
  }
}


function mapStateToProps(state, props) {
  const { betId } = props;
  const bet = getKey(state.bets, betId, { id: null, season: null });
  const stats = getKey(state.stats.bets, bet.id, { count: 0, amount: 0, comments: {} });
  const leaderboard = getKey(state.leaderboard, bet.season, {});
  let names = {};
  for (const id in stats.comments) {
    names[id] = leaderboard[id].displayName;
  }
  return { ...stats, names, profileUrl: `/profile/${bet.season}` };
}


export default connect(mapStateToProps)(BetStats);
