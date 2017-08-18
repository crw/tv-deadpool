import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isLoggedIn } from 'api/firebase';
import { getKey } from 'utils';
import Login from 'Login';
import DisplayName from 'DisplayName';
import Balance from 'Balance';
import SeasonHero from 'SeasonHero';
import Score from 'Score';
import { default as Leaderboard } from 'LeaderboardContainer';
import * as str from 'constants/strings';


export class GameBoard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var { user, season } = this.props;

    return (
      <div className="row">
        <div className="small-12 medium-4 medium-push-8 columns">
          { isLoggedIn() && user ? (
              <div>
                <DisplayName/>
                <Balance seasonId={ season.id }/>
                <Score seasonId={ season.id }/>
              </div>
            ) : <Login/>
          }
          <Leaderboard label={ str.AVC_STAFFERS } seasonId={ season.id } userId="0"/>
          { getKey(user, `data.${season.id}.three_eyed_raven`, false)
              ? <Leaderboard label={ str.THREE_EYED_RAVEN } seasonId={ season.id } userId="0"/>
              : ''
          }
          <Leaderboard label={ str.THE_FIELD } seasonId={ season.id } userId="0"/>
        </div>
        <div className="small-12 medium-8 medium-pull-4 columns">
          <SeasonHero season={ season }/>
          { this.props.children }
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, props) {
  const user = getKey(state.login, 'user', null);
  const season = getKey(state.seasons, props.seasonId, {});
  return { user, season };
};

export default withRouter(connect(mapStateToProps)(GameBoard));