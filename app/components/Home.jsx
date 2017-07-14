import React from 'react';
import { connect } from 'react-redux';
import { isLoggedIn } from 'api/firebase';
import { getKey } from 'utils';
import Login from 'Login';
import DisplayName from 'DisplayName';
import SeasonChooser from 'SeasonChooser';


export class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var { user, context } = this.props;

    return (
      <div className="row">
        <div className="small-12 medium-4 medium-push-8 columns">
          { isLoggedIn() && user ? <div><DisplayName/></div> : <Login/> }
        </div>
        <div className="small-12 medium-8 medium-pull-4 columns">
          <SeasonChooser/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const user = getKey(state.login, 'user', null);
  return { user };
}

export default connect(mapStateToProps)(Home);