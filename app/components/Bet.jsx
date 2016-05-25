import React from 'react';
import {connect} from 'react-redux';
import {placeBet} from 'actions';


export class Bet extends React.Component {
  static propTypes = {
    // name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var wager = parseInt(this.refs.wager.value, 10);
    var comment = this.refs.comment.value;

    if (typeof wager === 'number' && wager >= 0) {
      this.props.dispatch(placeBet(this.props.id, wager, comment));
      this.refs.wager.value = '';
      this.refs.comment.value = '';
    }
  }

  render() {
    var {id, odds, name, desc, userBets} = this.props;

    var userBet = userBets.find((bet) => {return bet.id === id});
    var userBetAmount = () => {
      if (userBet) {
        return (
          <span className="user-bet">
            [${userBet.amount.toLocaleString()}]
          </span>
        );
      }
    };
    var userBetComment = () => {
      if (userBet && userBet.comment !== '') {
        return (
          <div>
            <span className="bet-comment"><i>"{userBet.comment}"</i></span>
          </div>
        );
      }
    };

    return (
      <div className="bet">
        <div>
          {userBetAmount()}
          <span className="odds"> {odds.payout}:{odds.wager} </span>
          <span className="name">{name}</span>
        </div>
        <div>
          <span className="desc">{desc}</span>
        </div>
        {userBetComment()}
        <div>
          <form ref="form" onSubmit={this.handleSubmit}>
            <label>
              <input type="text" ref="wager" placeholder="Wager in dollars."/>
            </label>
            <label>
              <input type="text" ref="comment" placeholder="Notes about this wager."/>
            </label>
            <button type="submit" className="button">Wager</button>
          </form>
        </div>
      </div>
    );
  }
}


export default connect((state) => {
  return {
    userBets: state.user.bets
  };
})(Bet);
