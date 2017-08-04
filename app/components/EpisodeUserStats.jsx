import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { now, getKey, toCurrencyString } from 'app/utils';
import * as str from 'constants/strings';


export class EpisodeUserStats extends React.Component {

  static propTypes = {
    episode: PropTypes.object.isRequired,
    results: PropTypes.object,
    userId: PropTypes.string
  };


  render() {
    const { episode, userId, results, context } = this.props;

    const results = episode.resolved && userId && results ? (
      <div className="results row ">
        <div className="result winnings small-4 columns">
          <div className="title">
            Winnings
          </div>
          <div className="body">
            { toCurrencyString(results.winnings) }
          </div>
        </div>
        <div className="result losses small-4 columns">
          <div className="title">
            Losses
          </div>
          <div className="body">
            { toCurrencyString(results.losses) }
          </div>
        </div>
        <div className="result balance small-4 columns">
          <div className="title">
            Result
          </div>
          <div className="body">
            { toCurrencyString(results.balance) }
          </div>
        </div>
      </div>
    ) : <div className="noresults"/>;


    return <div className="episode-user-stats">{ results }</div>;
  }
}


function mapStateToProps(state, props) {
  const { id } = props;
  const userId = props.userId || getKey(state.login, 'uid', null);
  const { episodes } = state;

  const episode = getKey(state.episodes, id, {});

  seasonEps = toArray(episodes).filter(item )

  let results = getKey(state.leaderboard, `${episode.season}.${userId}.episodes.${episode.id}`, null);

  return {
    userId,
    results,
    episode
  };
};

export default connect(mapStateToProps)(EpisodeUserStats);