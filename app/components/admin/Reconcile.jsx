import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as api from 'api/redux';
import * as str from 'constants/strings';
import { toArray } from 'utils';
import ReconcileEpisodeFormContainer from 'admin/ReconcileEpisodeFormContainer';


export class Reconcile extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { resolved, unresolved, series, seasons } = this.props;

    const epsToLinks = episodes => episodes.map(ep => (
      <div key={ ep.id }>
        <Link to={`/admin/reconcile/${ep.id}`}>
          { series[ep.series].title }{' '}
          S{ seasons[ep.season].season }
          E{ `${ep.episode}`.padStart(2, '0') }{' '}
          { ep.name }
        </Link>
      </div>
    ));

    if (unresolved.length === 0 && resolved.length === 0) {
      return <div>{ str.NO_EPS_TO_DISPLAY }</div>
    }

    return (
      <div>
        <h3>Unresolved Episodes</h3>
        <div>
          { epsToLinks(unresolved) }
        </div>
        <h3>Resolved Episodes</h3>
        <div>
          { epsToLinks(resolved) }
        </div>
      </div>
    );
  }
}
/*

            <ReconcileEpisodeFormContainer episode={ episode } key={ episode.id }/>
            <ReconcileEpisodeFormContainer episode={ episode } key={ episode.id }/>
  */


function mapStateToProps(state, ownProps) {
  const { episodes, series, seasons } = state;
  const unresolved = toArray(episodes).filter(
    item => !item.resolved && item.air_at < Date.now());
  const resolved = toArray(episodes).filter(
    item => item.resolved);

  return { unresolved, resolved, series, seasons };
};

export default connect(mapStateToProps)(Reconcile);