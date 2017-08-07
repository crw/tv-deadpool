import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LOCALE, CURRENCY_FORMAT} from 'app/constants/formats';
import {getKey, toCurrencyString} from 'app/utils';


Balance.propTypes = {
  balance: PropTypes.number
};

export function Balance (props) {
  const { balance } = props;
  const cls_balance = balance < 0 ? 'loss' : 'win';

  return (
    <div className="player-balance container">
      <div className="balance-label">
        Balance
      </div>
      <div className={ "balance-value " + cls_balance }>
        {toCurrencyString(props.balance)}
      </div>
    </div>
  );
};


const mapStateToProps = (state, ownProps) => {
  const { seasonId } = ownProps;
  const balance = getKey(state.login, `user.balance.${seasonId}`, 0);
  return { balance };
};

export default connect(mapStateToProps)(Balance);