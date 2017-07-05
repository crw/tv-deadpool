import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { SimpleInput } from 'redux/form/components';
import { required } from 'redux/form/validators';
import * as str from 'app/constants/strings';

// Initial Values
const defaultValues = {
  title: '',
  description: '',
  season: '',
  published: false
};


export const SeasonForm = (props) => {

  const { handleSubmit, onCancel, pristine, submitting, invalid } = props;
  const cls_btn_submit = submitting ? str.CLS_ICON_SUBMITTING : str.CLS_ICON_SUBMIT;

  return (
    <form onSubmit={handleSubmit} className="display-name-form">
      <h3>{str.NEW_SEASON}</h3>
      <Field component={SimpleInput} type="number" name="season" validate={[required]} label={str.LABEL_SEASON_NUMBER}/>
      <Field component={SimpleInput} type="checkbox" name="published" label={str.LABEL_PUBLISHED}/>
      <Field component={SimpleInput} type="text" name="title" label={str.LABEL_TITLE}/>
      <Field component={SimpleInput} type="text" name="description" label={str.LABEL_DESCRIPTION}/>
      <div>
        <button type="submit" className="button success" disabled={pristine || submitting || invalid}>
          <i className={cls_btn_submit}/> {str.BTN_LABEL_CREATE}
        </button>
      </div>
    </form>
  );
};


function mapStateToProps(state, ownProps) {
  return { initialValues: defaultValues };
}

export default connect(mapStateToProps)(reduxForm({ form: 'season' })(SeasonForm));
