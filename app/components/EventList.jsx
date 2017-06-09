import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// App imports
import {getKey, sortObjectsByKey, toArray as firebaseToArray} from 'app/utils';
import Event from 'Event';
import ReactDisqusComments from 'react-disqus-comments';


export class EventList extends React.Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentEventIndex: 0
    }

    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
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
    const {events, userId, context} = this.props;
    const {currentEventIndex} = this.state;
    const profilePage = context.indexOf('ProfileBoard') !== -1;

    const renderDisqus = !profilePage && events;

    var renderEvents = () => {
      if (events.length === 0) {
        return (
          <p className="container__message">No events have been created.</p>
        );
      }
      return (
        <Event
          key={events[currentEventIndex].id}
          id={events[currentEventIndex].id}
          userId={userId}
          context={context}/>
      );
    };

    var renderPrevHandler = () => {
      if (events.length !== 0 && currentEventIndex !== events.length-1) {
        return (
          <button className="button secondary" onClick={this.handleClickPrev}>
            <i className="fa fa-fw fa-arrow-left"/> Previous Event
          </button>
        );
      }
    }

    var renderNextHandler = () => {
      if (events.length !== 0 && currentEventIndex !== 0) {
        return (
          <button className="button secondary" onClick={this.handleClickNext}>
            Next Event <i className="fa fa-fw fa-arrow-right"/>
          </button>
        );
      }
    }

    return (
      <div className="container event-list">

        <div className="row small-collapse container__navigation">
          <div className="small-6 align-left columns">
            {renderPrevHandler()}
          </div>
          <div className="small-6 align-right columns">
            {renderNextHandler()}
          </div>
        </div>
        {renderEvents()}

        { renderDisqus ? '' :
          <div className="disqus">
            <ReactDisqusComments
                shortname="tvdeadpoolxyz"
                identifier={events[currentEventIndex].id}
                title={events[currentEventIndex].name}
                url={"https://tvdeadpool.xyz/event/" + events[currentEventIndex].id}
            />
          </div>
        }
      </div>
    );
  }
}


export default connect((state, ownProps) => {
  let userId = ownProps.userId || getKey(state, 'login.uid', null);
  let events = state.events || {};
  let sortedEvents = firebaseToArray(events).sort(sortObjectsByKey('order', true)).filter(
    (event) => { return event.published; });
  return {
    userId,
    context: ownProps.context + '/EventList',
    events: sortedEvents
  };
})(EventList);