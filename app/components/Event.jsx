import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
// App imports
import { now, getKey, toCurrencyString } from 'app/utils';
import { PRETTY_DATE_FORMAT, LOCALE, CURRENCY_FORMAT } from 'app/constants/formats'
import * as url from 'constants/urls';
import * as str from 'constants/strings';
import BetsList from 'BetsList';
import Episode from 'Episode';


export class Event extends React.Component {
  static propTypes = {
    episode: PropTypes.object.isRequired,
    results: PropTypes.object,
    userId: PropTypes.string,
    context: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { episode, userId, results, context } = this.props;

    var renderResults = () => {
      return (
        <div className="results row ">
          <div className="result winnings small-4 columns">
            <div className="title">
              Winnings
            </div>
            <div className="body">
              {toCurrencyString(results.winnings)}
            </div>
          </div>
          <div className="result losses small-4 columns">
            <div className="title">
              Losses
            </div>
            <div className="body">
              {toCurrencyString(results.losses)}
            </div>
          </div>
          <div className="result balance small-4 columns">
            <div className="title">
              Result
            </div>
            <div className="body">
              {toCurrencyString(results.balance)}
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="event">
        <Episode { ...episode }/>
        { episode.resolved && userId && results ? renderResults() : <div className="noresults"/> }
        <BetsList episodeId={ episode.id } userId={ userId } context={ context }/>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { id } = props;
  const userId = props.userId || getKey(state.login, 'uid', null);
  const episode = getKey(state.episodes, id, {});
  let results = getKey(state.leaderboard, `${episode.season}.${userId}.episodes.${episode.id}`, null);

  return {
    context: props.context + '/Event',
    userId,
    results,
    episode
  };
};

export default connect(mapStateToProps)(Event);