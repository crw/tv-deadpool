import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as api from 'api/redux';
import * as str from 'constants/strings';
import { toArray } from 'utils';
import ReconcileEpisodeFormContainer from 'admin/ReconcileEpisodeFormContainer';


export class ReconcileEpisode extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { episode } = this.props;

    return <ReconcileEpisodeFormContainer episode={ episode }/>;
  }
}


function mapStateToProps(state, props) {
  const { episodes } = state;
  const episode = episodes[props.episodeId];

  return { episode };
};

export default connect(mapStateToProps)(ReconcileEpisode);