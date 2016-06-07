import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
// App imports
import {now, getKey} from 'app/utils';
import {PRETTY_DATE_FORMAT, LOCALE, CURRENCY_FORMAT} from 'app/constants/formats'
import * as urls from 'app/constants/urls';
import BetsList from 'BetsList';


export class Event extends React.Component {
  static propTypes = {
    id:  React.PropTypes.string.isRequired,
    series: React.PropTypes.string.isRequired,
    season: React.PropTypes.number.isRequired,
    episode: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    article: React.PropTypes.string.isRequired,
    air_at: React.PropTypes.number.isRequired,
    lock_at: React.PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    let {id, season, episode, series, name, article, confirmation, air_at, lock_at, resolved, userId, results} = this.props;

    let closed = now() > lock_at;

    var renderStatus = () => {
      return closed ?
        <div className="float-right episode-status closed">Closed</div> :
        <div className="float-right episode-status open">Open</div>;
    };

    var renderResults = () => {
      return (
        <div className="results row ">
          <div className="result balance small-4 columns">
            <div className="title">
              Balance
            </div>
            <div className="body">
              {results.balance.toLocaleString(LOCALE, CURRENCY_FORMAT)}
            </div>
          </div>
          <div className="result winnings small-4 columns">
            <div className="title">
              Winnings
            </div>
            <div className="body">
              {results.winnings.toLocaleString(LOCALE, CURRENCY_FORMAT)}
            </div>
          </div>
          <div className="result losses small-4 columns">
            <div className="title">
              Losses
            </div>
            <div className="body">
              {results.losses.toLocaleString(LOCALE, CURRENCY_FORMAT)}
            </div>
          </div>
        </div>
      );
    };

    var renderConfirmation = () => {
      return closed && !resolved ?
        (
          <div>
            Results will be posted after being confirmed in <i><a href={urls.AVCLUB_ALL_MEN_MUST_DIE_URL} target="_blank">All Men Must Die</a></i>.
          </div>
        ) :
        (resolved ?
          (confirmation ? (
              <div>
                Results: <i><a href={confirmation} target="_blank">All Men Must Die</a></i>.
              </div>
            ) : (
              <div>
                Results: <i><a href={urls.AVCLUB_ALL_MEN_MUST_DIE_URL} target="_blank">No article this week.</a></i>
              </div>
            )) :
          '');
    };

    return (
      <div className="event">
        <div className="header">
          {renderStatus()}
          <div className="series-title">{series}</div>
          <div className="episode-title"><a href={article} target="_blank">"{name}"</a></div>
        </div>
        <div className="body">
          <div className="episode-number">Season {season}, Episode {episode}</div>
          <div className="episode-aired">{closed? 'Aired' : 'Airs'}: {moment(air_at).format(PRETTY_DATE_FORMAT)}</div>
          <div className="episode-locked">{closed? 'Closed' : 'Closes'}: {moment(lock_at).format(PRETTY_DATE_FORMAT)}</div>
          {renderConfirmation()}
        </div>
        { resolved && userId && results ? renderResults() : '' }
        <BetsList eventId={id} userId={userId}/>
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  let eventId = ownProps.id;
  let userId = ownProps.userId || getKey(state, 'login.uid', null);
  let results = getKey(state, `leaderboard.${userId}.events.${eventId}`, null);
  return {
    userId,
    results,
    ...state.events[eventId]
  };
})(Event);