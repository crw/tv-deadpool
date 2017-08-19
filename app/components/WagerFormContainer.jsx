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
    const { id, wager, canComment } = this.props;
    return (
      <div className="wager-form-container">
        <WagerForm
          form={`wager-${id}`}
          initialValues={ wager }
          canComment={ canComment }
          onSubmit={ this.handleSubmit }/>
      </div>
    );
  }
}


function mapStateToProps(state, props) {
  const user = getKey(state.login, 'user', null);
  const { id } = props;
  const { season } = state.bets[id];
  const balance = getKey(user, `balance.${season}`);
  const wager = getKey(user, `wagers.${id}`, wagerDefaults);
  const canComment = getKey(user, 'canComment', true);
  return { wager, balance, canComment };
}

export default connect(mapStateToProps, { startPlaceWager })(WagerFormContainer);