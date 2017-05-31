import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// App components
import {getKey} from 'app/utils';
import Profile from 'Profile';
import Leaderboard from 'Leaderboard';


export class ProfileBoard extends React.Component {
  static propTypes = {
    userId: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    var {userId, context} = this.props;

    return (
      <div className="row">
        <div className="small-12 medium-4 medium-push-8 columns">
          <Leaderboard label="AVClub Staffers" userId={userId}/>
          <Leaderboard label="The Field" userId={userId}/>
        </div>
        <div className="small-12 medium-8 medium-pull-4 columns">
          <Profile userId={userId} context={context}/>
        </div>
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  let userId = ownProps.userId || ownProps.params.userId || getKey(state, 'login.uid');
  let context = "ProfileBoard";
  return {
    context,
    userId
  };
})(ProfileBoard);