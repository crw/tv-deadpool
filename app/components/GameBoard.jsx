import React from 'react';
import {connect} from 'react-redux';
// App components
import Login from 'Login';
import EventList from 'EventList';
import Balance from 'Balance';
import Leaderboard from 'Leaderboard';

export class GameBoard extends React.Component {
  static propTypes = {
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    var {login, context} = this.props;

    return (
      <div className="row">
        <div className="small-12 medium-4 medium-push-8 columns">
          { login ? <Balance/> : <Login/> }
          <Leaderboard label="AVClub Staffers"/>
          <Leaderboard label="The Field"/>
        </div>
        <div className="small-12 medium-8 medium-pull-4 columns">
          <EventList context={context}/>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    context: 'GameBoard',
    login: state.login
  };
})(GameBoard);