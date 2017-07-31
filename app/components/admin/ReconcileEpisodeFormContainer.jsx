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

    const saveFormat = (values, name, normalize=item=>item) => Object.keys(values)
      .filter(item => item.indexOf(name) !== -1)
      .map(item => item.split('_')[1])
      .reduce((obj, item) => {
        obj[item] = normalize(values[`${name}_${item}`]);
        return obj;
      }, {});

    const { episode, startReconcileEpisode } = this.props;
    const { confirmation } = values;

    const paid = saveFormat(values, 'paid', item => !!item);
    const resolved = saveFormat(values, 'resolved', item => !!item);
    const notes = saveFormat(values, 'note')


    console.log('values', values);
    console.log('paid', paid);
    console.log('resolved', resolved);

    return startReconcileEpisode(episode, paid, resolved, notes, confirmation);
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

export default connect(mapStateToProps, { startReconcileEpisode })(ReconcileEpisodeFormContainer);

