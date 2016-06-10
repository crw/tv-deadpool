import React, {PropTypes} from 'react';
import {reduxForm} from 'redux-form';
//App imports
import {startUpdateDisplayName} from 'actions';
import {BAD_WORDS} from 'app/constants/strings';
import {getKey} from 'app/utils';

export const fields = [ 'displayName', 'userId' ];

const validate = values => {
  const errors = {};
  if (!values.displayName) {
    errors.displayName= '';
  } else if (getKey(BAD_WORDS, values.displayName, false)) {
    errors.displayName = `"${values.displayName}" is not available.`;
  }
  return errors;
}


export class DisplayNameForm extends React.Component {
  static propTypes = {
    fields:      PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm:   PropTypes.func.isRequired,
    submitting:  PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.doCancel = this.doCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit(values, dispatch) {
    return new Promise((resolve, reject) => {
      const newResolve = () => {
        this.doCancel();
        resolve();
      };
      if (!values.displayName) {
        reject({
          displayName: 'Please enter a name.'
        });
      } else {
        try {
          dispatch(startUpdateDisplayName(newResolve, reject, values.userId, values.displayName));
        } catch (err) {
          console.log(err);
          reject({
            _error: err.toString()
          });
        }
      }
    });
  }

  doCancel() {
    const {resetForm, onCancel} = this.props;
    resetForm();
    onCancel();
  }

  handleCancel(e) {
    e.preventDefault();
    this.doCancel();
  }

  render() {
    const { fields: { displayName, userId }, error, handleSubmit, submitting, nameValue} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <input type="hidden" ref="userIdInput" {...userId}/>
        <div className="display-name-form">
              <div className="input-group">
                <span className="input-group-label">
                  <i className="fa fa-fw fa-user"/>
                </span>
                <input type="text" className="input-group-field"
                    ref="displayName" placeholder="Change your name."
                    initialValue={nameValue} {...displayName} />
                <div className="input-group-button">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="button secondary">
                      { submitting ? <i className="fa fa-fw fa-spin fa-cog"/> : <i className="fa fa-fw fa-cog"/> } Save
                  </button>
                </div>
              </div>
              { displayName.touched && displayName.error && <div className="error">{displayName.error}</div>}
              <button disabled={submitting} className="button secondary" onClick={this.handleCancel}>
                <i className="fa fa-fw fa-ban"/> Cancel
              </button>
            </div>
      </form>
    );
  }
}
            // { error && <div className="error">{error}</div>}

export default reduxForm({
  form: 'displayName',
  fields,
  validate
})(DisplayNameForm);
