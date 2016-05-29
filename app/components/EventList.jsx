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

    this.state = {
      currentEventIndex: 0
    }

    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    // this.setState({
    //   currentEventIndex: 0
    // });
  }

  handleClickNext(e) {
    e.preventDefault();
    let {currentEventIndex} = this.state;
    if (currentEventIndex > 0) {
      currentEventIndex = currentEventIndex - 1;
      this.setState({currentEventIndex});
    }
  }

  handleClickPrev(e) {
    e.preventDefault();
    let {currentEventIndex} = this.state;
    if (currentEventIndex < this.props.events.length - 1) {
      currentEventIndex = currentEventIndex + 1;
      this.setState({currentEventIndex});
    }
  }

  render() {
    let {events} = this.props;
    let {currentEventIndex} = this.state;

    var renderEvents = () => {
      if (events.length === 0) {
        return (
          <p className="container__message">No events have been created.</p>
        );
      }
      return (
        <Event key={events[currentEventIndex].id} id={events[currentEventIndex].id}/>
      );
    };

    var renderPrevHandler = () => {
      if (events.length !== 0 && currentEventIndex !== events.length-1) {
        return (
          <a href="#" onClick={this.handleClickPrev}><i className="fa fa-fw fa-arrow-left"/> Previous Event</a>
        );
      }
    }

    var renderNextHandler = () => {
      if (events.length !== 0 && currentEventIndex !== 0) {
        return (
          <a href="#" onClick={this.handleClickNext}>Next Event <i className="fa fa-fw fa-arrow-right"/></a>
        );
      }
    }

    return (
      <div className="container event-list">

        <div className="row container__navigation">
          <div className="small-6 align-left columns">
            {renderPrevHandler()}
          </div>
          <div className="small-6 align-right columns">
            {renderNextHandler()}
          </div>
        </div>

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