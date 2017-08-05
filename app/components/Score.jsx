import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getKey, toArray } from 'utils';
import * as str from 'constants/strings';
import Leaderboard from 'Leaderboard';


export function Score(props) {
  return (
    <div className="user-score">
      <Leaderboard {...props}/>
    </div>
  );
}


function mapStateToProps(state, props) {
  const { seasonId } = props;
  const { login: { uid } } = state;
  let userScore = getKey(state.leaderboard, `${seasonId}.${uid}`, {});
  userScore.key = uid;

  return {
    authUserId: uid,
    leaders: [userScore],
    season: seasonId,
    label: str.SCORE_TITLE
  };
};


export default connect(mapStateToProps)(Score);
