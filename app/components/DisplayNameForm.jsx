import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { getKey } from 'app/utils';
import BAD_WORDS from 'app/constants/bad_words';
import * as str from 'app/constants/strings';


// Validators!
const required = value => (value ? undefined : 'Required');
const isNotBadWord = value => (
  getKey(BAD_WORDS, value, false) ?
    `"${value}" is not available.` :
    undefined
  );

// Form!
export const DisplayNameForm = (props) => {
  const { handleSubmit, onCancel, reset, pristine, invalid, submitting, error } = props;
  const cls_btn_submit = submitting ? str.CLS_ICON_SUBMITTING : str.CLS_ICON_SUBMIT;

  function handleCancel(e) {
    e.preventDefault();
    reset();
    onCancel();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field component="input" type="hidden" name="userId"/>
      <div className="display-name-form">
        <div className="input-group">
          <span className="input-group-label">
            <i className={str.CLS_ICON_USER}/>
          </span>
          <Field
            component="input"
            type="text"
            name="displayName"
            className="input-group-field"
            placeholder={str.INPUT_PLACEHOLDER_DISPLAYNAME}
            validate={[required, isNotBadWord]}
          />
          <div className="input-group-button">
            <button
              type="submit"
              disabled={submitting || pristine || invalid}
              className="button success"
            ><i className={cls_btn_submit}/> { str.BTN_LABEL_SUBMIT }</button>
          </div>
        </div>
        { error && <div className="error">{error}</div> }
        <button
          disabled={submitting}
          className="button secondary"
          onClick={handleCancel}
        ><i className={str.CLS_ICON_CANCEL}/> { str.BTN_LABEL_CANCEL }</button>
      </div>
    </form>
  );
}

// Produces the "error" object used to display out-of-element errors.
// Should probably clean up the elements so they can display their own errors,
// maybe with pop-overs? Something like that.
const validate = ({displayName}) => {
  const message = required(displayName) || isNotBadWord(displayName);
  if (message) {
    return { _error: message };
  }
}

export default reduxForm({ form: 'displayName', validate })(DisplayNameForm);
