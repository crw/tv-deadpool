import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { getKey } from 'utils';
import { SimpleInput } from 'redux/form/components';
import { required, isValidDatetime } from 'redux/form/validators';
import { seasonFormName, seasonInitialValues } from 'redux/form/details';
import * as str from 'app/constants/strings';


export const SeasonForm = (props) => {

  const { handleSubmit, onCancel, pristine, submitting, invalid } = props;
  const cls_btn_submit = submitting ? str.CLS_ICON_SUBMITTING : str.CLS_ICON_SUBMIT;

  return (
    <form onSubmit={handleSubmit} className="display-name-form">
      <Field component={SimpleInput} type="number" name="season" validate={[required]} label={str.LABEL_SEASON_NUMBER}/>
      <Field component={SimpleInput} type="checkbox" name="published" label={str.LABEL_PUBLISHED}/>
      <Field component={SimpleInput} type="text" name="hero" label={str.LABEL_HERO}/>
      <Field component={SimpleInput} type="text" name="lock_at"
        validate={[required, isValidDatetime]} label={str.LABEL_SEASON_LOCK_AT}/>
      <div>
        <button type="submit" className="button success" disabled={pristine || submitting || invalid}>
          <i className={cls_btn_submit}/> {str.BTN_LABEL_CREATE}
        </button>
      </div>
    </form>
  );
};


function mapStateToProps(state, ownProps) {
  const season = getKey(state.seasons, ownProps.seasonId);
  const initialValues = seasonInitialValues(season);
  return { initialValues };
};

export default connect(mapStateToProps)(reduxForm({ form: seasonFormName })(SeasonForm));
