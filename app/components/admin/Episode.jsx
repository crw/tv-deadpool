import React from 'react';
import { connect } from 'react-redux';
import { getKey } from 'app/utils';
import { startCreateBet, startEditEpisode } from 'actions';
import { betValidation, episodeValidation } from 'redux/form/details';
import * as str from 'constants/strings';
import BetList from 'admin/BetList';
import BetForm from 'admin/BetForm';
import EpisodeForm from 'admin/EpisodeForm';
import EpisodeView from 'Episode';


export class Episode extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditEpisode = this.handleEditEpisode.bind(this);
  }

  handleSubmit(values) {
    const { episode: { id, season, series }, nextBetId, startCreateBet } = this.props;

    values = betValidation(values);
    values.episode = id;
    values.season = season;
    values.series = series;
    values.nextBetId = nextBetId;
    return startCreateBet(values);
  }

  handleEditEpisode(values) {
    const { startEditEpisode } = this.props;
    values = episodeValidation(values);
    startEditEpisode(values.id, values);
  }

  render() {
    const { episode, nextBetId  } = this.props;

    if (episode === undefined) {
      return (
        <div>
          <div className="error">Error: Episode not found.</div>
        </div>
      )
    }

    return (
      <div>
        <EpisodeView id={ episode.id }/>
        <div>{ episode.published ?
          <div className="published">Published</div> :
          <div className="not-published">Not published</div>
        }</div>
        <EpisodeForm onSubmit={ this.handleEditEpisode } episodeId={ episode.id }/>
        <BetList episodeId={ episode.id }/>
        <h3>{str.NEW_BET}</h3>
        <BetForm onSubmit={ this.handleSubmit } order={ nextBetId } />
      </div>
    );
  }
};

function mapStateToProps(state, ownProps) {
  const { seriesId, seasonId, episodeId } = ownProps.match.params;
  const episode = getKey(state.episodes, episodeId);
  const nextBetId = Object.keys(getKey(episode, 'bets', {})).length;
  return { episode, nextBetId };
}

function mapDispatchToProps(dispatch, props) {
  return {
    startCreateBet: values => dispatch(startCreateBet(values)),
    startEditEpisode: (id, values) => dispatch(startEditEpisode(id, values))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Episode);