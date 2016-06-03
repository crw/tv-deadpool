import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// App imports
import {now} from 'app/utils';
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
    login: PropTypes.object.isRequired,
    paid: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
  }


  render() {
    var {id, odds_payout, odds_wager, name, desc, note, closed, login, paid, resolved} = this.props;

    var renderWinLose = () => {
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
            {odds_payout}:{odds_wager} {name} {id}
          </div>
          <div className="body">
            { (desc) ? <div className="desc">{desc}</div> : '' }
            { (note) ? <div className="note">Editor's Note: {note}</div> : '' }
          </div>
        </div>
        { login ? <Wager id={id}/> : ''}
        { login && !closed ? <WagerForm id={id}/> : ''}
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  let bet = state.bets[ownProps.id];
  let event = state.events[bet.event_id];
  return {
    ...bet,
    closed: event.lock_at < now(),
    login: state.login
  };
})(Bet);