import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { BAD_WORDS } from 'app/constants/strings';
import { getKey } from 'app/utils';

export const fields = [ 'displayName', 'userId' ];

// Constants!
const CLS_ICON_USER = 'fa fa-fw fa-user';
const CLS_ICON_SUBMIT = 'fa fa-fw fa-cog';
const CLS_ICON_SUBMITTING = CLS_ICON_SUBMIT + ' fa-spin';
const CLS_ICON_CANCEL = 'fa fa-fw fa-ban';
const INPUT_PLACEHOLDER_DISPLAYNAME = 'Change your name.';
const BTN_LABEL_SUBMIT = 'Save';
const BTN_LABEL_CANCEL = 'Cancel';

// Validators!
const required = value => (value ? undefined : 'Required');
const notBadWord = value => (
  getKey(BAD_WORDS, value, false) ?
    `"${value}" is not available.` :
    undefined
  );

// Form!
export const DisplayNameForm = (props) => {
  const { handleSubmit, onCancel, reset, pristine, invalid, submitting, error } = props;
  const cls_btn_submit = submitting ? CLS_ICON_SUBMITTING : CLS_ICON_SUBMIT;

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
            <i className={CLS_ICON_USER}/>
          </span>
          <Field
            component="input"
            type="text"
            name="displayName"
            className="input-group-field"
            placeholder={INPUT_PLACEHOLDER_DISPLAYNAME}
            validate={[required, notBadWord]}
          />
          <div className="input-group-button">
            <button
              type="submit"
              disabled={submitting || pristine || invalid}
              className="button success"
            ><i className={cls_btn_submit}/> { BTN_LABEL_SUBMIT }</button>
          </div>
        </div>
        { error && <div className="error">{error}</div> }
        <button
          disabled={submitting}
          className="button secondary"
          onClick={handleCancel}
        ><i className={CLS_ICON_CANCEL}/> { BTN_LABEL_CANCEL }</button>
      </div>
    </form>
  );
}

// Produces the "error" object used to display out-of-element errors.
// Should probably clean up the elements so they can display their own errors,
// maybe with pop-overs? Something like that.
const validate = (values) => {
  const message = required(values.displayName) || notBadWord(values.displayName);
  if (message) {
    return { _error: message };
  }
}

export default reduxForm({ form: 'displayName', validate })(DisplayNameForm);
