import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { toArray, isEmpty } from 'app/utils';
import * as api from 'api/redux';
import * as str from 'app/constants/strings';
import Episode from 'Episode';


export const EpisodeList = props => {

  const { episodes, match: { url } } = props;

  const html = episodes.map((item) => (
    <div className="list-episodes" key={ item.id }>
      <Link className="list-item" to={`${url}/episode/${item.id}`}>
        Episode { item.episode }: { item.name } ({ item.id })
      </Link>
    </div>
  ));

  return (
    <div>
      <h3>Select Episode:</h3>
      { !isEmpty(episodes) ? html : 'No episodes found for this season!' }
    </div>
  );
}


function mapStateToProps(state, ownProps) {
  const { seasonId } = ownProps;
  const episodes = api.getEpisodesForSeason(state, seasonId);
  return { episodes };
};

export default withRouter(connect(mapStateToProps)(EpisodeList));
