import React from 'react';
import {connect} from 'react-redux';
// App components
import Bet from 'Bet';
import {sortObjectsByKey} from 'app/utils';
import {toArray as firebaseToArray} from 'app/api/firebase';


export class BetsList extends React.Component {
  static propTypes = {
    bets: React.PropTypes.array.isRequired,
    eventId: React.PropTypes.string.isRequired
  };


  constructor(props) {
    super(props);
  }

  render() {
    var {bets, eventId} = this.props;

    var renderBets = () => {
      if (bets.length === 0) {
        return (
          <p className="container__message">No bets have been created for this event.</p>
        );
      }
      return bets.map((bet) => {
        return (
          <Bet key={bet.id} id={bet.id}/>
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

export default connect((state, ownProps) => {
  let bets = state.bets || {};
  let sortedBets = firebaseToArray(state.bets).sort(sortObjectsByKey()).filter(
    (bet) => { return (bet.event_id === ownProps.eventId) ? bet : undefined; });
  return {
    bets: sortedBets
  };
})(BetsList);