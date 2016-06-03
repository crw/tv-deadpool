import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// App imports
import {getKey} from 'app/utils';
import {startGetUser} from 'actions';
import EventList from 'EventList';


export class Profile extends React.Component {
  static propTypes = {
    // name: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let {id, dispatch, userId} = this.props;

    if (!id) {
      dispatch(startGetUser(userId));
    }
  }

  render() {
    let {id, balance, winnings, losses} = this.props;

    return (id) ?
      <div>
        <div className="score row">
          <div className="balance">
            Balance: {balance}
          </div>
          <div className="winnings">
            Winnings: {winnings}
          </div>
          <div className="losses">
            Losses: {losses}
          </div>
        </div>
        <EventList userId={id}/>
      </div>
      : <div/>;
  }
}
/*
            <div className="header ">
              <div className="user-photo">
                <img src={photo}/>
              </div>
              <div className="username">
                {displayName || 'A man with no name'}
              </div>
            </div>
*/

export default connect((state, ownProps) => {
  let userId = ownProps.userId || getKey(state, 'login.uid');
  let user = getKey(state, `users.${userId}`, {});
  let winnings = getKey(state, `leaderboard.${userId}.winnings`, 0);
  let losses = getKey(state, `leaderboard.${userId}.losses`, 0);
  return {
    ...user,
    winnings,
    losses
  };
})(Profile);