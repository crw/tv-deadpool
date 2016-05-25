import React from 'react';


export default class Profile extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>Profile.jsx</div>
    );
  }
}
