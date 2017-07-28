import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { toArray, isEmpty } from 'app/utils';
import * as api from 'api/redux';
import * as str from 'app/constants/strings';


export const SeasonList = props => {

  const { seasons, match: { url } } = props;

  const seasonsHtml = seasons.map((item) => (
    <div key={item.id} className="season">
      <Link to={ `${url}/season/${item.id}` } className="title">
        Season { item.season.padStart(2, "0") }
      </Link>
    </div>
  ));

  return (
    <div>
      <h3>Select Season:</h3>
      { !isEmpty(seasons) ? seasonsHtml : '' }
    </div>
  );
}


function mapStateToProps(state, ownProps) {
  const { seriesId } = ownProps;
  const seasons = seriesId ? api.getSeasonsForSeries(state, seriesId) : [];

  return { seasons };
};

export default withRouter(connect(mapStateToProps)(SeasonList));
