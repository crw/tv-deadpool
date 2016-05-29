import {now} from 'app/utils';
import React from 'react';
import {connect} from 'react-redux';
// App imports


export class Wager extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    wager: React.PropTypes.number.isRequired,
    payout: React.PropTypes.number.isRequired,
    comment: React.PropTypes.string,
    created_at: React.PropTypes.number,
    updated_at: React.PropTypes.number,
    paid: React.PropTypes.bool.isRequired,
    closed: React.PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    let {id, wager, payout, comment, paid, closed} = this.props;

    var renderPayout = () => {
      if (closed) {
        if (paid) {
          return (
            <span className="wager-payout win">Winnings: ${payout.toLocaleString()}</span>
          );

        } else {
          return (
            <span className="wager-payout lose">Losses: ${wager.toLocaleString()}</span>
          );
        }
      }
    };

    return (
      <div className="wager">
        <span className="paid">{(closed) ? ((paid) ? 'Win!' : 'Lost') : ''}</span>
        <span className="amount">Wager: ${wager.toLocaleString()}</span>
        {renderPayout()}
        {
          (comment) ? (
            <span className="comment">Note: {comment}</span>
          ) : ''
        }
      </div>
    );
  }
}


export default connect((state, ownProps) => {
  let betId = ownProps.id;
  let bet = state.bets[betId];
  let event = state.events[bet.event_id];
  let wager = (state.user && state.user.wagers && state.user.wagers[betId]) ?
    state.user.wagers[betId] :
    {
        id: betId,
        wager: 0,
        comment: '',
        created_at: 0,
        updated_at: 0
    };
  let paid = bet.paid;
  let payout = (wager.wager * bet.odds_payout) / bet.odds_wager;
  let closed = event.lock_at < now();
  return {
    ...wager,
    paid,
    payout,
    closed
  }
})(Wager);
