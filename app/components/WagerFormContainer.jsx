import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startPlaceWager } from 'actions';
import { getKey } from 'utils';
import { wagerValidation, wagerDefaults } from 'redux/form/details';
import WagerForm from 'WagerForm';


export class WagerFormContainer extends React.Component {
  static propTypes = {  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { id, balance, startPlaceWager } = this.props;
    const oldWager = this.props.wager;
    const { wager, comment } = wagerValidation(values, oldWager, balance);
    return startPlaceWager(id, wager, comment);
  }

  render() {
    const { id, wager } = this.props;
    return (
      <div className="wager-form-container">
        <WagerForm
          form={`wager-${id}`}
          initialValues={ wager }
          onSubmit={ this.handleSubmit }/>
      </div>
    );
  }
}


function mapStateToProps(state, props) {
  const uid = getKey(state.login, 'uid', null);
  const { id } = props;
  const { season } = state.bets[id];
  const balance = getKey(state.users, `${uid}.balance.${season}`);
  const wager = getKey(state.users, `${uid}.wagers.${id}`, wagerDefaults);
  console.log(wager, balance);
  return { wager, balance };
}

export default connect(mapStateToProps, { startPlaceWager })(WagerFormContainer);