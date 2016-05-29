import React from 'react';
import {connect} from 'react-redux';
// App imports
import {sortObjectsByKey} from 'app/utils';
import {toArray as firebaseToArray} from 'app/api/firebase';
import Event from 'Event';


export class EventList extends React.Component {
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


export default connect((state) => {
  let events = state.events || {};
  let sortedEvents = firebaseToArray(events).sort(sortObjectsByKey('order', true)).filter(
    (event) => { return event.published; });
  return {
    events: sortedEvents
  };
})(EventList);