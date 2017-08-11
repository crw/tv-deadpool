import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// App imports
import {now, getKey, isEmpty, toCurrencyString, toArray} from 'app/utils';
import Wager from 'Wager';
import WagerForm from 'WagerFormContainer';
import BetStats from 'BetStats';


export class Bet extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    odds_payout: PropTypes.oneOfType([
                  PropTypes.string,
                  PropTypes.number,
                ]).isRequired,
    odds_wager: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string,
    closed: PropTypes.bool.isRequired,
    validUser: PropTypes.bool.isRequired,
    paid: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
  }


  render() {
    const {
      id, odds_payout, odds_wager, name, desc, note, paid, resolved,
      userId, showStats, closed, validUser, loginUserId
    } = this.props;


    const renderWinLose = () => {
      if (!closed || !resolved) {
        return '';
      }
      return (paid) ?
        <span className="bet__paid">Win!</span> :
        <span className="bet__lost">Lost</span> ;
    };


    return (
      <div className="bet__container">
        <div className="bet">
          <div className="title">
            {renderWinLose()}{' '}
            {odds_payout}:{odds_wager} {name}
          </div>
          <div className={ desc || note ? "body" : '' }>
            { desc ? <div className="desc">{desc}</div> : '' }
            { note ? <div className="note">Editor's Note: {note}</div> : '' }
          </div>
          { validUser || userId ? <Wager id={id} userId={userId}/> : ''}
          { validUser && !closed && userId === loginUserId ? <WagerForm id={id}/> : ''}
          { showStats ? <BetStats betId={ id }/> : '' }
        </div>
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  const loginUserId = getKey(state.login, 'uid', null);
  const userId = ownProps.userId || loginUserId;
  const bet = state.bets[ownProps.id];
  const episode = state.episodes[bet.episode];
  return {
    ...bet,
    userId,
    loginUserId,
    closed: episode.lock_at < now(),
    validUser: !!state.login
  };
})(Bet);