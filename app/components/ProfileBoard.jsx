import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getKey } from 'app/utils';
import Board from 'Board';
import Profile from 'Profile';


export class ProfileBoard extends React.Component {
  static propTypes = {
    userId: PropTypes.string,
    seasonId: PropTypes.string,
    context: PropTypes.string
  };

  render() {
    var { userId, context, seasonId } = this.props;

    return (
      <Board seasonId={ seasonId }>
        <Profile season={ seasonId } userId={ userId } context={ context }/>
      </Board>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { userId, seasonId } = ownProps.match.params;
  return {
    seasonId,
    context:  'ProfileBoard',
    userId: userId || getKey(state.login, 'uid')
  };
}

export default withRouter(connect(mapStateToProps)(ProfileBoard));