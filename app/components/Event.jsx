import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
// App imports
import {now, getKey, toCurrencyString} from 'app/utils';
import {PRETTY_DATE_FORMAT, LOCALE, CURRENCY_FORMAT} from 'app/constants/formats'
import * as urls from 'app/constants/urls';
import BetsList from 'BetsList';


export class Event extends React.Component {
  static propTypes = {
    id:  PropTypes.string.isRequired,
    series: PropTypes.string.isRequired,
    season: PropTypes.number.isRequired,
    episode: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    article: PropTypes.string.isRequired,
    air_at: PropTypes.number.isRequired,
    lock_at: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    let {
      id, season, episode, series, name, description, air_at, lock_at, resolved,
      article, confirmation, hbo, reddit, preview,
      userId, results, context
    } = this.props;

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
              {toCurrencyString(results.balance)}
            </div>
          </div>
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
          <div className="episode-title">
            { hbo ? <a href={hbo} target="_blank">"{name}"</a> : <span>"{name}"</span>}
          </div>
        </div>
        <div className="body">
          <div className="episode-number">Season {season}, Episode {episode}</div>
          { description ? <div className="episode-description">{description}</div> : ''}
          <div className="episode-links">
            Links: { article ? <span><a href={article} target="_blank">A.V. Club <i>You Win Or You Die</i></a></span> : ''}
            { preview ? <span> - <a href={preview} target="_blank">Preview</a></span> : ''}
          </div>
          <div className="episode-aired">{closed? 'Aired' : 'Airs'}: {moment(air_at).format(PRETTY_DATE_FORMAT)}</div>
          <div className="episode-locked">{closed? 'Closed' : 'Closes'}: {moment(lock_at).format(PRETTY_DATE_FORMAT)}</div>
          {renderConfirmation()}
        </div>
        { resolved && userId && results ? renderResults() : <div className="noresults"/> }
        <BetsList eventId={id} userId={userId} context={context}/>
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  let eventId = ownProps.id;
  let userId = ownProps.userId || getKey(state, 'login.uid', null);
  let results = getKey(state, `leaderboard.${userId}.events.${eventId}`, null);
  return {
    context: ownProps.context + '/Event',
    userId,
    results,
    ...state.events[eventId]
  };
})(Event);