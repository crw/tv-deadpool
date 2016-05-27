import React from 'react';
import {connect} from 'react-redux';
// App components
import Login from 'Login';
import EventList from 'EventList';
import Balance from 'Balance';


export class GameBoard extends React.Component {
  static propTypes = {
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    var {user} = this.props;

    return (
      <div>
        { jQuery.isEmptyObject(user) ? <Login/> : <Balance/> }
        <EventList/>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    user: state.user,
    login: state.login
  };
})(GameBoard);