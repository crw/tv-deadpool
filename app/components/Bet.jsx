import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// App imports
import {now, getKey, isEmpty, toCurrencyString, toArray} from 'app/utils';
import Wager from 'Wager';
import WagerForm from 'WagerForm';


export class Bet extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    odds_payout: PropTypes.number.isRequired,
    odds_wager: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    closed: PropTypes.bool.isRequired,
    validUser: PropTypes.bool.isRequired,
    paid: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showComments: false
    }
    this.handleToggleComments = this.handleToggleComments.bind(this);
  }

  handleToggleComments(e) {
    e.preventDefault();
    this.setState({
      showComments: !this.state.showComments
    });
  }

  render() {
    const {
      id, odds_payout, odds_wager, name, desc, note, paid, resolved,
      userId, showStats,
      stats, closed, validUser, loginUserId
    } = this.props;
    const {showComments} = this.state;

    const hasComments = !isEmpty(stats.comments) && Object.keys(stats.comments).filter((id) => {return id !== userId}).length > 0;

    const __DEV__ = process.env.NODE_ENV === 'development';

    const renderWinLose = () => {
      if (!closed || !resolved) {
        return '';
      }
      return (paid) ?
        <span className="bet__paid">Win!</span> :
        <span className="bet__lost">Lost</span> ;
    };

    const renderStats = () => {
      if (isEmpty(stats) || !showStats) {
        return '';
      }

      let comments = '';
      if (hasComments && showComments) {
        comments = Object.keys(stats.comments).map((commentId) => {
          if (commentId !== userId) {
            return (
              <div className="stats__comment" key={commentId}>
                <i className="fa fa-chevron-right"/> {stats.comments[commentId]}
              </div>
            );
          }
        });
        comments = (
          <div className="stats__comments">
            {comments}
          </div>
        );
      }

      return (
        <div className="stats">
          <span className="stats__text"><span className="stats__count">{stats.count}</span> user{stats.count === 1 ? ' has' : 's have'} placed wagers
          totalling <span className="stats__amount">{toCurrencyString(stats.amount)}</span> on
          this position.</span> { hasComments ? <a href="#" onClick={this.handleToggleComments}>user comments {
            showComments ?
              <i className="fa fa-minus-square-o"/>:
              <i className="fa fa-plus-square-o"/>
          }</a> : '' }
          {comments}
        </div>
      );

    };

    return (
      <div className="bet__container">
        <div className="bet">
          <div className="title">
            {renderWinLose()}{' '}
            {odds_payout}:{odds_wager} {name} { (__DEV__) ?  <span><br />{id}</span> : ''}
          </div>
          <div className="body">
            { (desc) ? <div className="desc">{desc}</div> : '' }
            { renderStats() }
            { (note) ? <div className="note">Editor's Note: {note}</div> : '' }
          </div>
        </div>
        { validUser || userId ? <Wager id={id} userId={userId}/> : ''}
        { validUser && !closed && userId === loginUserId ? <WagerForm id={id} userId={userId}/> : ''}
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  const loginUserId = getKey(state, 'login.uid', null);
  const userId = ownProps.userId || loginUserId;
  const bet = state.bets[ownProps.id];
  const event = state.events[bet.event_id];
  const stats = getKey(state, `stats.bets.${bet.id}`, {});
  return {
    ...bet,
    userId,
    loginUserId,
    stats,
    closed: event.lock_at < now(),
    validUser: !!state.login
  };
})(Bet);