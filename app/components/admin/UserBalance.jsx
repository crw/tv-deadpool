import React from 'react';
import PropTypes from 'prop-types';
import { toCurrencyString } from 'app/utils';


const UserBalance = props => {

  const { balance } = props;

  return (
    <div className="user-balance">
      <span className="description">Balance: </span>
      <span className="balance">{ toCurrencyString(balance) }</span>
    </div>
  );
};

UserBalance.propTypes = {
  balance: PropTypes.number.isRequired
};

export default UserBalance;