import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { getKey } from 'utils';
import { SimpleInput } from 'redux/form/components';
import { required, greaterThanZero, nonNegative, isValidDatetime } from 'redux/form/validators';
import { toInt } from 'redux/form/normalizers';
import { betDefaults, betFormName } from 'redux/form/details.jsx';
import * as str from 'app/constants/strings';


export const BetForm = (props) => {

  const { handleSubmit, onCancel, pristine, submitting, invalid, reset, editing } = props;
  const cls_btn_submit = submitting ? str.CLS_ICON_SUBMITTING : str.CLS_ICON_SUBMIT;
  const lbl_btn_submit = editing ? str.BTN_LABEL_UPDATE : str.BTN_LABEL_CREATE;


  function handleBetSubmit(values) {
    handleSubmit(values).then(reset);
  }

  return (
    <form onSubmit={handleBetSubmit} className="">
      <Field component={SimpleInput} type="number" name="order"
        validate={[required]} normalize={toInt} label={str.LABEL_BET_ORDER}/>
      <Field component={SimpleInput} type="number" name="odds_payout"
        validate={[required, nonNegative]} normalize={toInt} label={str.LABEL_BET_ODDS_PAYOUT}/>
      <Field component={SimpleInput} type="number" name="odds_wager"
        validate={[required, greaterThanZero]} normalize={toInt} label={str.LABEL_BET_ODDS_WAGER}/>
      <Field component={SimpleInput} type="text" name="name"
        validate={[required]} label={str.LABEL_BET_NAME}/>
      <Field component={SimpleInput} type="text" name="desc" label={str.LABEL_BET_DESCRIPTION}/>
      <div className="buttons">
        <button type="submit" className="button success" disabled={pristine || submitting || invalid}>
          <i className={cls_btn_submit}/> {lbl_btn_submit}
        </button>
        <button
          type="button"
          className="button alert"
          disabled={ (!onCancel && pristine) || submitting}
          onClick={ onCancel || reset }>
          <i className={str.CLS_ICON_CANCEL}/> {str.BTN_LABEL_CANCEL}
        </button>
      </div>
    </form>
  );
};


function mapStateToProps(state, ownProps) {
  const { betId, order } = ownProps;
  const editing = !!betId;
  const defaults = {
    ...betDefaults,
    order
  };
  const initialValues = getKey(state.bets, betId) || defaults;

  return { initialValues, editing };
}

export default connect(mapStateToProps)(reduxForm({ enableReinitialize: true, form: betFormName })(BetForm));
