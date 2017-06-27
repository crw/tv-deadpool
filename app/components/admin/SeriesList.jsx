import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { toArray, isEmpty } from 'app/utils';
import * as str from 'app/constants/strings';


export const SeriesList = props => {

  const { series, handleSubmit } = props;

  const seriesHtml = toArray(series).map((item) => (
    <div key={item.id} className="series">
      <Link to={ "/edit/series/" + item.id } className="title">{ item.title }</Link>
    </div>
  ));

  return (
    <div>
      <h3>{str.SELECT_SERIES}</h3>
      { !isEmpty(series) ? seriesHtml : '' }
    </div>
  );
}



function mapStateToProps(state) {
  return {
    series: state.series
  };
};

export default connect(mapStateToProps)(SeriesList);
