import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { toArray, isEmpty } from 'app/utils';
import * as str from 'app/constants/strings';


export const SeriesList = props => {

  const { series, match: { url } } = props;

  const seriesHtml = toArray(series).map((item) => (
    <div key={item.id} className="series">
      <Link to={ `${url}/${item.id}` } className="list-item">{ item.title }</Link>
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
  return { series: state.series };
};

export default withRouter(connect(mapStateToProps)(SeriesList));
