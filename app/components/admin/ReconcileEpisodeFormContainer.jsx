import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as api from 'api/redux';
import { startReconcileEpisode } from 'actions';
import ReconcileEpisodeForm from 'admin/ReconcileEpisodeForm';


export class ReconcileEpisodeFormContainer extends React.Component {

  static propTypes = {
    episode: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {

    const keysToArray = (values, name) => Object.keys(values)
      .filter(item => item.indexOf(name) !== -1)
      .map(item => item.split('_')[1]);

    const { episode, dispatch } = this.props;
    const { confirmation } = values;

    const paid = keysToArray(values, 'paid');
    const resolved = keysToArray(values, 'resolved');
    const notes = keysToArray(values, 'note')
      .reduce((obj, item) => { obj[item] = values[`note_${item}`]; return obj; }, {});

    return dispatch(startReconcileEpisode(episode, paid, resolved, notes, confirmation));
  }

  render() {
    const { episode } = this.props;

    return <ReconcileEpisodeForm { ...this.props }
              form={ `reconcile-${episode.id}` }
              onSubmit={ this.handleSubmit }/>;
  }
}


function mapStateToProps(state, props) {
  const { episode } = props;
  const ep = api.hydrateByKey(state, episode, 'bets');

  let initialValues = ep.bets.reduce((obj, bet) => {
    const { id, resolved, paid, note } = bet;
    obj[`paid_${id}`] = paid;
    obj[`resolved_${id}`] = resolved;
    obj[`note_${id}`] = note;
    return obj;
  }, {});
  initialValues.confirmation = episode.confirmation;
  return { initialValues, episode: ep };
}

export default connect(mapStateToProps)(ReconcileEpisodeFormContainer);

