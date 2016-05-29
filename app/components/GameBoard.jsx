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
    var {login} = this.props;

    return (
      <div className="row">
        <div className="column small-12">
          { login ? <Login/> : <Balance/> }
          <EventList/>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    login: state.login
  };
})(GameBoard);