import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux';

const LABEL_SERIES_TITLE = 'Title:';
const LABEL_SERIES_DESCRIPTON = 'Description:';
const LABEL_SERIES_PUBLISHED = 'Published?';
const BUTTON_SUBMIT = 'Create';

export class SeriesForm extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { handleSubmit, cancel, pristine, submitting, initialValues } = this.props;
    const button_text = (submitting) ? <i className="fa fa-fw fa-pulse fa-spinner"/> : BUTTON_SUBMIT;

    return (
      <form onSubmit={handleSubmit}>
        <h3>Series Form</h3>
        <div>
          <label htmlFor="title">{LABEL_SERIES_TITLE}</label>
          <Field component="input" type="text" name="title"/>
        </div>
        <div>
          <label htmlFor="description">{LABEL_SERIES_DESCRIPTON}</label>
          <Field component="input" type="text" name="description"/>
        </div>
        <div>
          <label htmlFor="published">{LABEL_SERIES_PUBLISHED}</label>
          <Field component="input" type="checkbox" name="published"/>
        </div>
        <div>
          <button type="submit" className="button" disabled={pristine || submitting}>{button_text}</button>
        </div>
      </form>
    );
  }
}

// function mapStateToProps(state, ownProps) {
  // const shows =
// };

export default reduxForm({
  // a unique name for the form
  form: 'series'
})(SeriesForm);
