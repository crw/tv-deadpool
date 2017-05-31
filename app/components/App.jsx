import React from 'react';
import Navigation from 'Navigation';


export default class App extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
  }
 // location={this.props.location.pathname}
  render() {
    return (
      <div>
        <Navigation/>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
};
