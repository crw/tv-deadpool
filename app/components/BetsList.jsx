import React from 'react';
// App components
import Bet from 'Bet';
import {Bets} from 'app/fixtures';


export default class BetsList extends React.Component {
  static propTypes = {
    bets: React.PropTypes.array.isRequired,
    eventid: React.PropTypes.string.isRequired
  };

  static defaultProps = {
    bets: Bets
  };

  constructor(props) {
    super(props);
  }

  render() {
    var {bets, eventid} = this.props;

    bets = bets.filter((bet) => {
      if (bet.event_id === eventid) {
        return bet;
      }
    });

    var renderBets = () => {
      if (bets.length === 0) {
        return (
          <p className="container__message">No bets have been created for this event.</p>
        );
      }
      return bets.map((bet) => {
        return (
          <Bet key={bet.id} {...bet}/>
        );
      });
    };

    return (
      <div className="bets-list">
        {renderBets()}
      </div>
    );
  }
}
