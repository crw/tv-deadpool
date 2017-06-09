import React from 'react';
import Navigation from 'Navigation';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { Route } from 'react-router-dom';


export class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
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


export default withRouter(connect()(App));