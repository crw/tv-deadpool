import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as api from 'api/redux';
import { startPlaceWagerAdmin } from 'actions';
import { wagerDefaults } from 'redux/form/details';
import AdminWagerForm from 'admin/WagerForm';


export class AdminWagerFormContainer extends React.Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    bets: PropTypes.array.isRequired,
    initialValues: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, reset) {
    const { user, startPlaceWagerAdmin } = this.props;
    const { wager, comment, betId } = values;
    return startPlaceWagerAdmin(user, betId, wager, comment);
  }

  render() {
    const { user } = this.props;

    return <AdminWagerForm { ...this.props }
              onSubmit={ this.handleSubmit }
              exceptWagers={ Object.keys(user.wagers) }/>;
  }
}



function mapStateToProps(state, props) {
  const { formId, episodeId, initialValues } = props;
  const bets = api.getBetsForEpisode(state, episodeId).reverse();

  const betId = bets[0].id;
  const defaultValues = initialValues || { ...wagerDefaults, betId };

  return {
    form: formId,
    bets,
    initialValues: defaultValues
  };
}

export default connect(mapStateToProps, { startPlaceWagerAdmin })(AdminWagerFormContainer);

