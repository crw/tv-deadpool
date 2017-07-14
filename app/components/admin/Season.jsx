import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getKey, toArray } from 'app/utils';
import { startCreateEpisode, startEditSeason } from 'actions';
import { episodeValidation, seasonValidation } from 'redux/form/details';
import EpisodeList from 'admin/EpisodeList';
import EpisodeForm from 'admin/EpisodeForm';
import SeasonForm from 'admin/SeasonForm';
import * as str from 'constants/strings';


export class Season extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitSeason = this.handleSubmitSeason.bind(this);
  }

  handleSubmit(values) {
    const { season, dispatch } = this.props;

    values = episodeValidation(values);
    values.season = season.id;
    values.series = season.series;

    dispatch(startCreateEpisode(values));
  }

  handleSubmitSeason(values) {
    const { season: { id }, dispatch } = this.props;
    values = seasonValidation(values);
    dispatch(startEditSeason(id, values));
  }

  render() {
    const { season } = this.props;

    if (season === undefined || season.id === undefined) {
      return (
        <div>
          <div className="error">Error: Season not found.</div>
        </div>
      )
    }

    return (
      <div className="row">
        <h3>{str.UPDATE_SEASON}</h3>
        <SeasonForm seasonId={season.id} onSubmit={this.handleSubmitSeason}/>
        <EpisodeList seasonId={season.id}/>
        <EpisodeForm onSubmit={this.handleSubmit} nextEpisode={toArray(season.episodes).length+1}/>
      </div>
    );
  }
};

function mapStateToProps(state, ownProps) {
  const { seasonId } = ownProps.match.params;
  const season = getKey(state.seasons, seasonId, undefined);
  return { season };
}

export default connect(mapStateToProps)(Season);