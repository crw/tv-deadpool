import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { toArray, isEmpty } from 'app/utils';
import * as api from 'api/redux';
import * as str from 'app/constants/strings';
import Bet from 'Bet';


export const BetList = props => {

  const { bets, match: { url } } = props;

  const html = bets.map((item) => (
    <div className="list-item" key={ item.id }>
      <Link to={`${url}/bet/${item.id}`}>
        [{ item.order }] { item.odds_payout }:{ item.odds_wager } { item.name }
      </Link>
      {' '}<i>{ item.desc }</i>
    </div>
  ));

  return (
    <div>
      <h3>Select Bet:</h3>
      { !isEmpty(bets) ? html : 'No bets found for this season!' }
    </div>
  );
}


function mapStateToProps(state, ownProps) {
  const { episodeId } = ownProps;
  const bets = api.getBetsForEpisode(state, episodeId);
  return { bets };
};

export default withRouter(connect(mapStateToProps)(BetList));
