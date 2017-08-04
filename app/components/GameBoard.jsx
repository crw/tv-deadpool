import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isLoggedIn } from 'api/firebase';
import { getKey } from 'utils';
import Login from 'Login';
import DisplayName from 'DisplayName';
import EpisodeList from 'EpisodeList';
import Balance from 'Balance';
import SeasonHero from 'SeasonHero';
import Score from 'Score';
import { default as Leaderboard } from 'LeaderboardContainer';


export class GameBoard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var { user, season, seasonId, context } = this.props;

    return (
      <div className="row">
        <div className="small-12 medium-4 medium-push-8 columns">
          { isLoggedIn() && user ? (
              <div>
                <DisplayName/>
                <Balance seasonId={ seasonId }/>
                <Score seasonId={ seasonId }/>
              </div>
            ) : <Login/>
          }
          <Leaderboard label="AVClub Staffers" seasonId={ seasonId } userId="0"/>
          <Leaderboard label="The Field" seasonId={ seasonId } userId="0"/>
        </div>
        <div className="small-12 medium-8 medium-pull-4 columns">
          <SeasonHero season={ season }/>
          <EpisodeList seasonId={ seasonId } context={ context }/>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, props) {
  const user = getKey(state.login, 'user', null);
  const { seasonId } = props.match.params;
  const season = getKey(state.seasons, seasonId, {});
  return { user, season, seasonId, context: 'GameBoard' };
};

export default withRouter(connect(mapStateToProps)(GameBoard));