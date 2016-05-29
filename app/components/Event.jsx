import React from 'react';
import moment from 'moment';
// App imports
import BetsList from 'BetsList';

export default class Event extends React.Component {
  static propTypes = {
    id:  React.PropTypes.string.isRequired,
    series: React.PropTypes.string.isRequired,
    season: React.PropTypes.number.isRequired,
    episode: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    var {id, season, episode, series, name, article, closed, air_at, lock_at} = this.props;

    var renderStatus = () => {
      return moment().unix() < lock_at ?
        <div className="float-right episode-status open">Open</div> :
        <div className="float-right episode-status closed">Closed</div>;
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
          <div className="episode-airs">Airs at {moment(air_at*1000).format()}</div>
          <div className="episode-airs">Closes at {moment(lock_at*1000).format()}</div>
        </div>
        <div>
          <BetsList eventId={id}/>
        </div>
      </div>
    );
  }
}
