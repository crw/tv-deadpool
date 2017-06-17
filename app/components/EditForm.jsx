import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

export const EditForm = props => {

  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="tvshow">Select show:</label>
        <Field component="select" name="tvshow">
          <option>Game of Thrones</option>
        </Field>
      </div>
      <div>
        or <Link to="/edit/series" className="button">Create New Show</Link>
      </div>
      <div>
        <button type="submit" className="button">Next Step</button>
      </div>
    </form>
  );
}

// function mapStateToProps(state, ownProps) {
  // const shows =
// };

export default reduxForm({
  // a unique name for the form
  form: 'edit'
})(EditForm);
