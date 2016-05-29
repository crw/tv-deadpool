import React from 'react';
import {connect} from 'react-redux';
// App imports
import {now} from 'app/utils';
import Wager from 'Wager';
import WagerForm from 'WagerForm';


export class Bet extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }


  render() {
    var {id, odds_payout, odds_wager, name, desc, closed, login} = this.props;

    return (
      <div className="bet__container">
        <div className="bet">
          <div className="title">
            <span className="odds">{odds_payout}:{odds_wager}</span>
            <span className="name">{name}</span>
          </div>
          <div body>
            <span className="desc">{desc}</span>
          </div>
        </div>
        { login ? <Wager id={id}/> : ''}
        { login && !closed ? <WagerForm id={id}/> : ''}
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  return {
    ...state.bets[ownProps.id],
    closed: state.events[state.bets[ownProps.id].event_id].lock_at < now(),
    login: state.login
  };
})(Bet);