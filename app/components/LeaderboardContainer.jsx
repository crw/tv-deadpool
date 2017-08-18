import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getKey, toArray } from 'utils';
import * as str from 'constants/strings';
import Leaderboard from 'Leaderboard';


export function LeaderboardContainer (props) {
  return <Leaderboard {...props}/>;
}


function mapStateToProps(state, props) {
  const { label, seasonId } = props;
  const { labels, leaderboard, login: { uid } } = state;
  const seasonLeaders = getKey(leaderboard, seasonId, {});

  let members = Object.keys(getKey(labels, label, {}));


  // Special cases
  switch (label) {
    // Special case: The Field (all players excluding staff)
    case str.THE_FIELD: {
      const exclude_list = Object.keys(Object.assign({},
        getKey(labels, str.EXCLUDE_LIST, {}),
        getKey(labels, str.AVC_STAFFERS, {}),
        getKey(labels, str.THREE_EYED_RAVEN, {})
      ));
      members = Object.keys(seasonLeaders).filter(member => exclude_list.indexOf(member) < 0);
      break;
    }
  }

  // Always show the logged-in user in every category
  if (members.length !== 0 &&
    getKey(seasonLeaders, uid, false) &&
    members.indexOf(uid) === -1) {

      members.push(uid);
  }


  const leaders = toArray(seasonLeaders).filter(leader => members.indexOf(leader.key) > -1);

  return {
    authUserId: uid,
    leaders,
    season: seasonId
  };
};


export default connect(mapStateToProps)(LeaderboardContainer);
