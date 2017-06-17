import React from 'react';
import Navigation from 'Navigation';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SiteLoading from 'SiteLoading';


export class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.sync) {
      return <SiteLoading/>;
    }

    return (
      <div>
        <Navigation location={this.props.location.pathname} />
        <div className="content">
          { this.props.children }
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {sync: state.api.sync};
};

export default withRouter(connect(mapStateToProps)(App));