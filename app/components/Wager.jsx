import React from 'react';
import {connect} from 'react-redux';
// App imports


export class Bet extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }


  render() {
    // var {userBets} = this.props;

    // var userBetAmount = () => {
    //   if (userBet) {
    //     return (
    //       <span className="user-bet">
    //         [${userBet.amount.toLocaleString()}]
    //       </span>
    //     );
    //   }
    // };
    // var userBetComment = () => {
    //   if (userBet && userBet.comment !== '') {
    //     return (
    //       <div>
    //         <span className="bet-comment"><i>"{userBet.comment}"</i></span>
    //       </div>
    //     );
    //   }
    // };

    return (
      <div></div>
    );
    // (
    //   <div className="bet">
    //     <div>
    //       <span className="odds"> {odds.payout}:{odds.wager} </span>
    //       <span className="name">{name}</span>
    //     </div>
    //     <div>
    //       <span className="desc">{desc}</span>
    //     </div>
    //         {userBetAmount()}
    //         {userBetComment()}
    //     <div>
    //       <WagerForm id={id}/>
    //     </div>
    //   </div>
    // );
  }
}


export default connect((state) => {
  return {
    wager: (state.user) ? state.user.bets : []
  };
})(Bet);
