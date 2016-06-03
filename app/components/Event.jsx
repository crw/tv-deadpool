import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
// App imports
import {now} from 'app/utils';
import {prettyDateFormat} from 'app/constants/formats'
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
    let {id, season, episode, series, name, article, air_at, lock_at} = this.props;

    let closed = now() > lock_at;

    var renderStatus = () => {
      return closed ?
        <div className="float-right episode-status closed">Closed</div> :
        <div className="float-right episode-status open">Open</div>;
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
          <div className="episode-aired">{closed? 'Aired' : 'Airs'}: {moment(air_at).format(prettyDateFormat)}</div>
          <div className="episode-locked">{closed? 'Closed' : 'Closes'}: {moment(lock_at).format(prettyDateFormat)}</div>
        </div>
        <BetsList eventId={id}/>
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  return {
    ...state.events[ownProps.id]
  };
})(Event);