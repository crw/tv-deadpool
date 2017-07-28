import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { SimpleInput } from 'redux/form/components';
import { required } from 'redux/form/validators';
import * as str from 'constants/strings';
import { seriesFormName, seriesDefaults} from 'redux/form/details';


export const SeriesForm = (props) => {

  const { handleSubmit, onCancel, pristine, submitting, invalid } = props;
  const cls_btn_submit = submitting ? str.CLS_ICON_SUBMITTING : str.CLS_ICON_SUBMIT;

  return (
    <form onSubmit={handleSubmit} className="display-name-form">
      <h3>{str.NEW_SERIES}</h3>
      <Field component={SimpleInput} type="text" name="title" label={str.LABEL_TITLE} validate={[required]}/>
      <Field component={SimpleInput} type="checkbox" name="published" label={str.LABEL_PUBLISHED}/>
      <div>
        <button type="submit" className="button success" disabled={pristine || submitting || invalid}>
          <i className={cls_btn_submit}/> {str.BTN_LABEL_CREATE}
        </button>
      </div>
    </form>
  );
};


function mapStateToProps(state) {
  return { initialValues: seriesDefaults };
}

export default connect(mapStateToProps)(reduxForm({ form: seriesFormName })(SeriesForm));
