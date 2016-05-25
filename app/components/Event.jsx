import React from 'react';
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
    var {id, season, episode, series, name, article} = this.props;

    return (
      <div className="event">
        <div className="header">
          <div className="episode-number">Season {season}, Episode {episode}</div>
          <div className="episode-title"><a href={article} target="_blank">"{name}"</a></div>
        </div>
        <div>
          <BetsList eventid={id} />
        </div>
      </div>
    );
  }
}
