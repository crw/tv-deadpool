import React from 'react';
import Navigation from 'Navigation';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'utils';
import SiteLoading from 'SiteLoading';


export const App = props => {

  const { sync, seasons, series, location, children } = props;

  if ( !sync || isEmpty(seasons) || isEmpty(series) ) {
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
  const { seasons, series } = state;
  return { sync: state.api.sync, seasons, series };
};

export default withRouter(connect(mapStateToProps)(App));