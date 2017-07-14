import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// App imports
import {getKey, sortObjectsByKey, toArray as firebaseToArray} from 'app/utils';
import { ordered, published, getEpisodesForSeason } from 'api/redux';
import Event from 'Event';
import Episode from 'Episode';
import * as str from 'constants/strings';
import ReactDisqusComments from 'react-disqus-comments';


export class EpisodeList extends React.Component {
  static propTypes = {
    episodes: PropTypes.array.isRequired,
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
    if (currentEventIndex < this.props.episodes.length - 1) {
      currentEventIndex = currentEventIndex + 1;
      this.setState({currentEventIndex});
    }
  }

  render() {
    const { episodes, userId, context } = this.props;
    const { currentEventIndex } = this.state;
    const profilePage = context.indexOf('ProfileBoard') !== -1;

    const renderDisqus = !profilePage && episodes;

    var renderEpisode = () => {
      if (episodes.length === 0) {
        return (
          <p className="container__message">{str.NO_EPISODES}</p>
        );
      }
      return (
        <div>
          <Event
            key={episodes[currentEventIndex].id}
            id={episodes[currentEventIndex].id}
            userId={userId}
            context={context}/>
        </div>
      );
    };

    var renderPrevHandler = () => {
      if (episodes.length !== 0 && currentEventIndex !== episodes.length-1) {
        return (
          <button className="button secondary" onClick={this.handleClickPrev}>
            <i className={str.CLS_ICON_PREV}/> {str.PREV_EPISODE}
          </button>
        );
      }
    }

    var renderNextHandler = () => {
      if (episodes.length !== 0 && currentEventIndex !== 0) {
        return (
          <button className="button secondary" onClick={this.handleClickNext}>
            {str.NEXT_EPISODE} <i className={str.CLS_ICON_NEXT}/>
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
        {renderEpisode()}

        { renderDisqus ? '' :
          <div className="disqus">
            <ReactDisqusComments
                shortname="tvdeadpoolxyz"
                identifier={episodes[currentEventIndex].id}
                title={episodes[currentEventIndex].name}
                url={"https://tvdeadpool.xyz/event/" + episodes[currentEventIndex].id}
            />
          </div>
        }


      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  const { seasonId } = ownProps;
  const userId = ownProps.userId || getKey(state.login, 'uid', null);
  const episodes = published(getEpisodesForSeason(state, seasonId));

  return {
    userId,
    episodes,
    context: ownProps.context + '/EpisodeList'
  };
};

export default connect(mapStateToProps)(EpisodeList);
