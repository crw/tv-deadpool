import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { toArray, isEmpty } from 'app/utils';
import * as str from 'app/constants/strings';


export const EditForm = props => {

  const { series, handleSubmit } = props;

  console.log(series);

  const SelectInput = (options) => ({ input, label, type, meta: { touched, error, warning } }) => {

    console.log('here');
    const optionsHtml = toArray(options).map((item) => (
      <option key={ item.id } value={ item.id }>{ item.title }</option>
    ));

    return (
      <div>
        <label htmlFor={input.name}>Select Series:</label>
        <select { ...input }>
          { optionsHtml }
        </select>
        {touched &&
          ((error && <div className="error">{error}</div>) ||
            (warning && <div className="error">{warning}</div>))}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      { !isEmpty(series) ? <Field component={SelectInput(series)} name="series"/> : '' }
      <div>
         <Link to="/edit/series" className="button">{str.BTN_LABEL_NEW}</Link>
      </div>
      <div>
        <button type="submit" className="button">Next Step</button>
      </div>
    </form>
  );
}



function mapStateToProps(state) {
  return {
    series: state.series
  };
};

export default connect(mapStateToProps)(reduxForm({form: 'edit'})(EditForm));
