import {now} from 'app/utils';
import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
// App imports


export class Wager extends Component {
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


    let renderClass = (defaultClasses) => {
      let statusClass = '';
      if (resolved) {
        statusClass = (paid) ?
          'wager__won' :
          'wager__lost';
      }
      return defaultClasses + ' ' + statusClass;
    };

    let renderPayout = () => {
      if (resolved) {
        return (paid) ?
          <span className={renderClass("wager-payout")}> Winnings: ${payout.toLocaleString()}</span> :
          ''; //<span className={renderClass("wager-payout")}> Losses: ${wager.toLocaleString()}</span> ;
      }
    };

    if (typeof wager === "undefined") return <span/>;

    return (
      <div className="wager">
        {(wager) ? <span className={renderClass("amount")}>${wager.toLocaleString()}</span> : ''}
        {(wager) ? renderPayout() : ''}
        {(comment) ? <span className="comment"> Note: {comment}</span> : ''}
      </div>
    );
  }
}


export default connect((state, ownProps) => {
  let betId = ownProps.id;
  let bet = state.bets[betId];
  let wager = (state.user && state.user.wagers && state.user.wagers[betId]) || {};
  let payout = (wager.wager) ? ((wager.wager * bet.odds_payout) / bet.odds_wager) + wager.wager : 0;
  return {
    ...wager,
    paid: bet.paid,
    resolved: bet.resolved,
    payout
  }
})(Wager);
