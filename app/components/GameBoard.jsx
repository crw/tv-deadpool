import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isLoggedIn } from 'api/firebase';
import Login from 'Login';
import DisplayName from 'DisplayName';
import EventList from 'EventList';
import Balance from 'Balance';
import Leaderboard from 'Leaderboard';



export class GameBoard extends React.Component {
  // static propTypes = {
  //   user: PropTypes.object
  // };

  constructor(props) {
    super(props);
  }

  render() {
    var { context } = this.props;

    return (
      <div className="row">
        <div className="small-12 medium-4 medium-push-8 columns">
          { isLoggedIn() ? <div><DisplayName/><Balance/></div> : <Login/> }
          <Leaderboard label="AVClub Staffers" userId="0"/>
          <Leaderboard label="The Field" userId="0"/>
        </div>
        <div className="small-12 medium-8 medium-pull-4 columns">
          <EventList context={context}/>
        </div>
      </div>
    );
  }
}


function mapStateToProps() {
  return { context: 'GameBoard' };
};

export default connect(mapStateToProps)(GameBoard);