import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Board from 'Board';
import EpisodeList from 'EpisodeList';


export const GameBoard = props => {
  var { seasonId, context } = props;

  return (
    <Board seasonId={ seasonId }>
      <EpisodeList seasonId={ seasonId } context={ context }/>
    </Board>
  );
}


function mapStateToProps(state, props) {
  const { seasonId } = props.match.params;
  return { seasonId, context: 'GameBoard' };
};

export default withRouter(connect(mapStateToProps)(GameBoard));