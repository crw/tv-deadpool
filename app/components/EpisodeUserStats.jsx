import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { toArray, getKey, toCurrencyString } from 'app/utils';
import * as str from 'constants/strings';


export class EpisodeUserStats extends React.Component {

  static propTypes = {
    results: PropTypes.object,
  };


  render() {
    const { previousBalance, winnings, losses, balance } = this.props;
    const cls_prev_balance = previousBalance < 0 ? 'losses' : '';
    const cls_balance = balance < previousBalance ? 'losses' : 'winnings';

    const resultsHtml = balance !== undefined ? (
      <div className="results row ">
        <div className={"result prevbalance small-3 columns " + cls_prev_balance }>
          <div className="title">
            Previous Balance
          </div>
          <div className="body">
            { toCurrencyString(previousBalance) }
          </div>
        </div>
        <div className="result winnings small-3 columns">
          <div className="title">
            Winnings
          </div>
          <div className="body">
            { toCurrencyString(winnings) }
          </div>
        </div>
        <div className="result losses small-3 columns">
          <div className="title">
            Losses
          </div>
          <div className="body">
            { toCurrencyString(losses) }
          </div>
        </div>
        <div className={"result balance small-3 columns " + cls_balance }>
          <div className="title">
            Result
          </div>
          <div className="body">
            { toCurrencyString(balance) }
          </div>
        </div>
      </div>
    ) : <div className="noresults"/>;


    return <div className="episode-user-stats">{ resultsHtml }</div>;
  }
}


function mapStateToProps(state, props) {
  const { episodeId } = props;
  const userId = props.userId || getKey(state.login, 'uid', null);
  const episode = getKey(state.episodes, episodeId, {});
  const results = getKey(state.leaderboard, `${episode.season}.${userId}.episodes.${episodeId}`, {});

  return {
    ...results
  };
};

export default connect(mapStateToProps)(EpisodeUserStats);