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
      <div className="player-balance container">
        <div className="balance-label">
          Balance:
        </div>
        <div className="balance-value">
          ${balance.toLocaleString({currency: 'USD'})}
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  let user = (state.login && state.login.user) || null;
  return {
    balance: (user && user.balance) || 0
  };
})(Balance);