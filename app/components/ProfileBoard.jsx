import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// App components
import { getKey } from 'app/utils';
import Profile from 'Profile';
import Leaderboard from 'Leaderboard';
import SeasonHero from 'SeasonHero';


export class ProfileBoard extends React.Component {
  static propTypes = {
    userId: PropTypes.string,
    seasonId: PropTypes.string,
    context: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    var { userId, context, season, seasonId } = this.props;

    return (
      <div className="row">
        <div className="small-12 medium-4 medium-push-8 columns">
          <Leaderboard label="AVClub Staffers" seasonId={ seasonId } userId={ userId }/>
          <Leaderboard label="The Field" seasonId={ seasonId } userId={ userId }/>
        </div>
        <div className="small-12 medium-8 medium-pull-4 columns">
          <SeasonHero season={ season }/>
          <Profile season={ seasonId } userId={ userId } context={ context }/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { userId, seasonId } = ownProps.match.params;
  const uid = userId || getKey(state.login, 'uid');
  const context = "ProfileBoard";
  const season = getKey(state.seasons, seasonId, {});
  return {
    season,
    seasonId,
    context,
    userId: uid
  };
}

export default withRouter(connect(mapStateToProps)(ProfileBoard));