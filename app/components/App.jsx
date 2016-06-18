import React from 'react';
import Navigation from 'Navigation';


export default class App extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navigation location={this.props.location.pathname}/>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
};
