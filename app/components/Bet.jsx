import React from 'react';
import {connect} from 'react-redux';
// App imports
import Wager from 'Wager';
import WagerForm from 'WagerForm';


export default class Bet extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
  }


  render() {
    var {id, odds, name, desc} = this.props;

    return (
      <div className="bet">
        <div>
          <span className="odds"> {odds.payout}:{odds.wager} </span>
          <span className="name">{name}</span>
        </div>
        <div>
          <span className="desc">{desc}</span>
        </div>
        <Wager id={id}/>
        <WagerForm id={id}/>
      </div>
    );
  }
}
