import {now} from 'app/utils';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// App imports
import {LOCALE, CURRENCY_FORMAT} from 'app/constants/formats';
import {getKey, toCurrencyString} from 'app/utils';

export class Wager extends React.Component {
  static propTypes = {
    // Props from Wager
    id: PropTypes.string,
    wager: PropTypes.number,
    comment: PropTypes.string,
    // Props derived from Bet
    payout: PropTypes.number.isRequired,
    paid: PropTypes.bool.isRequired,
    resolved: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    let {id, wager, payout, comment, paid, resolved} = this.props;

    const cls_won_lost = resolved ? (paid ? 'wager__won' : 'wager__lost') : '';

    if (typeof wager === "undefined") return <span/>;

    return (
      <div className="wager">
        { wager ? (
          <div>
            Your wager:
            <span className={ cls_won_lost + " amount" }>
              { toCurrencyString(wager) }
            </span>
            { resolved && paid ? (
                <span className={ cls_won_lost + " wager-payout" }>{' '}
                  Winnings: { toCurrencyString(payout) }
                </span>
              ) : ''
            }
          </div>
        ) : '' }
        { comment ? <div className="comment"> Your comment: { comment }</div> : '' }
      </div>
    );
  }
}


export default connect((state, ownProps) => {
  let betId = ownProps.id;
  let bet = state.bets[betId];
  let userId = ownProps.userId || getKey(state.login, 'uid', null);
  let user = getKey(state, `users.${userId}`, {});
  let wager = getKey(user, `wagers.${betId}`, {});
  let payout = (wager.wager) ? Math.floor((wager.wager * bet.odds_payout) / bet.odds_wager) : 0;
  return {
    ...wager,
    paid: bet.paid,
    resolved: bet.resolved,
    payout
  }
})(Wager);
