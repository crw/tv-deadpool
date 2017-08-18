import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LOCALE, CURRENCY_FORMAT} from 'app/constants/formats';
import {getKey, toCurrencyString} from 'app/utils';


Balance.propTypes = {
  balance: PropTypes.number
};

export function Balance (props) {
  const { balance, leaderboard } = props;
  const cls_balance = balance > -1 ? 'win' : 'loss';
  const cls_loan = leaderboard.loan === 0 ? 'win' : 'loss';
  const cls_score = leaderboard.balance >-1 ? 'win' : 'loss';

  return (
    <div className="player-balance container">
      <div className="balance-label">
        Balance
      </div>
      <div className={ "balance-item value " + cls_balance }>
        {toCurrencyString(balance)}
      </div>
      <div className={ "balance-item score " }>
        Score: <span className={ cls_score }>{toCurrencyString(leaderboard.balance)}</span>
      </div>
      <div className={ "balance-item loan " }>
        Iron Bank Loans: <span className={cls_loan}>{toCurrencyString(leaderboard.loan)}</span>
      </div>
    </div>
  );
};


const mapStateToProps = (state, ownProps) => {
  const { seasonId } = ownProps;
  const uid = getKey(state.login, 'uid', null);
  const balance = getKey(state.login, `user.balance.${seasonId}`, 0);
  const leaderboard = getKey(state.leaderboard, `${seasonId}.${uid}`, {});
  return { balance, leaderboard };
};

export default connect(mapStateToProps)(Balance);