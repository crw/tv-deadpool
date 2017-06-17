import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LOCALE, CURRENCY_FORMAT} from 'app/constants/formats';
import {getKey, toCurrencyString} from 'app/utils';


Balance.propTypes = {
  balance: PropTypes.number
};

export function Balance (props) {
    return (
      <div className="player-balance container">
        <div className="balance-label">
          Balance
        </div>
        <div className="balance-value">
          {toCurrencyString(props.balance)}
        </div>
      </div>
    );
};


const mapStateToProps = (state) => {
  const balance = getKey(state, 'login.user.balance', 0);
  return { balance };
};

export default connect(mapStateToProps)(Balance);