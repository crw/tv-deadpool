import React from 'react';
import { connect } from 'react-redux';
import BetList from 'admin/BetList';
import BetForm from 'admin/BetForm';
import { getKey } from 'app/utils';
import { startCreateBet } from 'actions';
import { betValidation } from 'redux/form/details';
import EpisodeView from 'Episode';
import * as str from 'constants/strings';


export class Episode extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { id, season, series, nextBetId, dispatch } = this.props;

    values = betValidation(values);
    values.episode = id;
    values.season = season;
    values.series = series;
    values.nextBetId = nextBetId;

    dispatch(startCreateBet(values));
  }

  render() {
    const { id, published, nextBetId  } = this.props;

    if (id === undefined) {
      return (
        <div>
          <div className="error">Error: Episode not found.</div>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="small-12 columns">
          <EpisodeView id={ id }/>
          <div>{ published ? 'Published' : 'Not published' }</div>
        </div>
        <BetList episodeId={ id }/>
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
  return { ...episode, nextBetId };
}

export default connect(mapStateToProps)(Episode);