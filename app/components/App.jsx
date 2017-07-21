import React from 'react';
import Navigation from 'Navigation';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'utils';
import SiteLoading from 'SiteLoading';


export const App = props => {

  const { sync, seasons, series, leaderboard, location, children } = props;

  if ( sync > 0 ) {
    return <SiteLoading/>;
  }

  return (
    <div>
      <Navigation location={ location.pathname } />
      <div className="content">
        { children }
      </div>
    </div>
  );
};


function mapStateToProps(state) {
  const { seasons, series, leaderboard } = state;
  return { sync: state.api.syncing, seasons, series, leaderboard };
};

export default withRouter(connect(mapStateToProps)(App));
