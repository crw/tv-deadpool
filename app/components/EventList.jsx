import React from 'react';
import Event from 'Event';


export default class EventList extends React.Component {
  static propTypes = {
    events: React.PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    var {events} = this.props;

    var renderEvents = () => {
      if (events.length === 0) {
        return (
          <p className="container__message">No events have been created.</p>
        );
      }
      return events.map((event) => {
        return (
          <Event key={event.id} {...event}/>
        );
      });
    };

    return (
      <div>
        {renderEvents()}
      </div>
    );
  }
}
