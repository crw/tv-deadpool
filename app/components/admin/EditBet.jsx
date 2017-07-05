import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getKey } from 'app/utils';
import { startEditBet } from 'actions';
import { betValidation } from 'redux/form/details';
import BetForm from 'admin/BetForm';


export class EditBet extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(values) {
    const { id, dispatch, history } = this.props;

    dispatch(startEditBet(id, betValidation(values))).then(() => {
      history.goBack();
    });
  }

  render() {
    const { id, history  } = this.props;

    if (id === undefined) {
      return (
        <div>
          <div className="error">Error: Bet not found.</div>
        </div>
      )
    }

    return (
      <div className="row">
        <BetForm betId={ id } onSubmit={ this.handleSubmit } onCancel={ history.goBack }/>
      </div>
    );
  }
};

function mapStateToProps(state, ownProps) {
  const { seriesId, seasonId, episodeId, betId } = ownProps.match.params;
  const bet = getKey(state.bets, betId);
  return { ...bet };
}

export default withRouter(connect(mapStateToProps)(EditBet));