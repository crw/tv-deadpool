import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
// App imports
import { getKey, toCurrencyString } from 'app/utils';
import { PRETTY_DATE_FORMAT, LOCALE, CURRENCY_FORMAT } from 'app/constants/formats'
import * as urls from 'app/constants/urls';


export class Episode extends React.Component {

  static propTypes = {
    id:  PropTypes.string.isRequired,
    episode: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    article: PropTypes.string.isRequired,
    confirmation: PropTypes.oneOfType([
      PropTypes.bool, PropTypes.string
    ]),
    hbo: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    air_at: PropTypes.number.isRequired,
    lock_at: PropTypes.number.isRequired,
    resolved: PropTypes.bool.isRequired
  };


  render() {
    const {
      id, episode, name, description, air_at, lock_at, resolved,
      article, confirmation, hbo, reddit, preview
    } = this.props;

    const closed = Date.now() > lock_at;

    const renderStatus = closed ?
      <div className="episode-status closed">Closed</div> :
      <div className="episode-status open">Open</div>;

    const renderConfirmation = () => {
      return closed && !resolved ?
        (
          <div>
            Results will be posted after being confirmed in <i><a href={urls.AVCLUB_ALL_MEN_MUST_DIE_URL} target="_blank">All Men Must Die</a></i>.
          </div>
        ) :
        (resolved ?
          (confirmation ? (
              <div>
                Results: <i><a href={confirmation} target="_blank">All Men Must Die</a></i>.
              </div>
            ) : (
              <div>
                Results: <i><a href={urls.AVCLUB_ALL_MEN_MUST_DIE_URL} target="_blank">No article this week.</a></i>
              </div>
            )) :
          '');
    };

    return (
      <div className="episode">
        { renderStatus }
        <div className="header">
          <div className="episode-title">
            { hbo ? <a href={hbo} target="_blank">"{name}"</a> : <span>"{name}"</span>}
          </div>
        </div>
        <div className="body">
          <div className="episode-number">Episode {episode}</div>
          { description ? <div className="episode-description">{description}</div> : ''}
          <div className="episode-links">
            Links: { article ? <span><a href={article} target="_blank">A.V. Club <i>You Win Or You Die</i></a></span> : ''}
            { preview ? <span> - <a href={preview} target="_blank">Preview</a></span> : ''}
          </div>
          <div className="episode-aired">{closed? 'Aired' : 'Airs'}: {moment(air_at).format(PRETTY_DATE_FORMAT)}</div>
          <div className="episode-locked">
            { closed ? 'Closed' : 'Closes' }: { moment(lock_at).format(PRETTY_DATE_FORMAT) }
          </div>
          {renderConfirmation()}
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  const { id } = ownProps;
  const episode = state.episodes[id];
  return { ...episode };
};

export default connect(mapStateToProps)(Episode);