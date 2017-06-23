import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux';
import * as str from 'app/constants/strings';

// Initial Values
const defaultValues = {
  title: '',
  description: '',
  published: false
};

// Validators!
const required = value => (value ? undefined : 'Required');


const SimpleInput = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label htmlFor={input.name}>{label}</label>
    <input {...input} type={type}/>
      {touched &&
        ((error && <div className="error">{error}</div>) ||
          (warning && <div className="error">{warning}</div>))}
  </div>
);


export const SeriesForm = (props) => {

  const { handleSubmit, onCancel, pristine, submitting, invalid } = props;
  const cls_btn_submit = submitting ? str.CLS_ICON_SUBMITTING : str.CLS_ICON_SUBMIT;

  return (
    <form onSubmit={handleSubmit} className="display-name-form">
      <h3>{str.NEW_SERIES}</h3>
      <Field
        component={SimpleInput}
        type="text"
        name="title"
        label={str.LABEL_SERIES_TITLE}
        validate={[required]}/>
      <Field component={SimpleInput} type="text" name="description" label={str.LABEL_SERIES_DESCRIPTON}/>
      <Field component={SimpleInput} type="checkbox" name="published" label={str.LABEL_SERIES_PUBLISHED}/>
      <div>
        <button type="submit" className="button success" disabled={pristine || submitting || invalid}>
          <i className={cls_btn_submit}/> {str.BTN_LABEL_CREATE}
        </button>
      </div>
    </form>
  );
};


function mapToReduxForm(form, name) {
  return reduxForm({ form: name })(form);
}

function mapStateToProps(state) {
  return { initialValues: defaultValues };
}

export default connect(mapStateToProps)(mapToReduxForm(SeriesForm, 'series'));
