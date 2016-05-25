import React from 'react';
import {connect} from 'react-redux';


export class Balance extends React.Component {
  static propTypes = {
    balance: React.PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    var {balance} = this.props;

    return (
      <div className="player-balance">
        Balance: ${balance.toLocaleString({currency: 'USD'})}
      </div>
    );
  }
}

export default connect((state) => {
  return {
    balance: state.user.balance
  };
})(Balance);