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
import EpisodeUserStats from 'EpisodeUserStats';


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
    const { episode, userId, context } = this.props;

    return (
      <div className="event">
        <Episode { ...episode }/>
        {
          episode.resolved && userId ?
          <EpisodeUserStats episodeId={ episode.id }/> :
          <div className="noresults"/>
        }
        <BetsList episodeId={ episode.id } userId={ userId } context={ context }/>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { id } = props;
  const userId = props.userId || getKey(state.login, 'uid', null);
  const episode = getKey(state.episodes, id, {});

  return {
    context: props.context + '/Event',
    userId,
    episode
  };
};

export default connect(mapStateToProps)(Event);