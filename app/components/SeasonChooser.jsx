import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toArray } from 'utils';


export class SeasonChooser extends React.Component {

  render() {
    var { series, seasons } = this.props;

    const now = Date.now();

    const seasonItem = (season) => (
      <div className="season-list-item" key={season.id}>
        <Link to={`/game/season/${season.id}`}>
          <div className="series-title">
            { series[season.series].title }
          </div>

          <div className="season-title">
            Season { season.season }
          </div>
        </Link>
      </div>
    );

    const currentSeasons = toArray(seasons)
      .filter(season => season.lock_at >= now)
      .map(season => seasonItem(season));

    const pastSeasons = toArray(seasons)
      .filter(season => season.lock_at < now)
      .map(season => seasonItem(season));

    return (
      <div className="row">
        <div className="small-12 columns">
          <h3>Current Seasons</h3>
          { currentSeasons }
          <h3>Past Seasons</h3>
          { pastSeasons }
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { series, seasons } = state;
  return { series, seasons };
};

export default connect(mapStateToProps)(SeasonChooser);