import React from 'react';
// App components
import EventList from 'EventList';
import Balance from 'Balance';
import {User, Bets, Events, Players} from 'fixtures';


export default class Main extends React.Component {
  static propTypes = {
    // name: React.PropTypes.string,
  };

  static defaultProps = {
    user: User,
    bets: Bets,
    events: Events,
    players: Players
  };

  constructor(props) {
    super(props);
  }

  render() {
    var {events, user} = this.props;

    return (
      <div>
        <Balance player={user}/>
        <EventList events={events}/>
      </div>
    );
  }
}

