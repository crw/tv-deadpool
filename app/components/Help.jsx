import React from 'react';

export default class Help extends React.Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
      <div className="small-12 medium-8 medium-centered columns">
        <h2>Help</h2>
        <h3>Change your User Name</h3>
        <p>
          To change your name, click on your username in the upper-right on the home screen. You cannot change your name from the "You" page.
          If you have wagered in the past, this will update the leaderboard with your new name.
          If you are a new user, the next time the leaderboards are updated, your chosen name will be used (instead of the default "A Faceless Man").
          It is not possible to use the same name as another user.
        </p>
        <h2>Legend</h2>
        <p>
          <i className="fa fa-fw fa-user"/>: You!
        </p>
        <p>
          <i className="fa fa-fw fa-question"/>: Anonymous user with randomly-generated name.
        </p>
        <h2>Having difficulties?</h2>
        <p>
          This site is barely tested. Please report issues to <a href="mailto:bugs@tvdeadpool.xyz">bugs@tvdeadpool.xyz</a>.
        </p>
        <p className="callout">
          <i><b>Valar morghulis.</b></i>
        </p>
      </div>
      </div>
    );
  }
}
