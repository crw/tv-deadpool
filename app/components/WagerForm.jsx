import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { toInt } from 'redux/form/normalizers';
import { nonNegative } from 'redux/form/validators';
import * as str from 'constants/strings';


export class WagerForm extends React.Component {

  // static propTypes = {
  //   name: PropTypes.string,
  // };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { handleSubmit, reset } = this.props;
    try {
      handleSubmit(values).then(reset);
    } catch (e) {
      // If handleSubmit throws, it does not return a promise
    }
  }

  render() {
    const { pristine, submitting, invalid, error, canComment } = this.props;

    return (
      <div className="wager-form">
        <form onSubmit={ this.handleSubmit }>
          <div className="row small-collapse">
            <div className="small-3 columns">
              <Field
                component="input"
                type="number"
                name="wager"
                placeholder="Wager"
                normalize={ toInt }
                validate={ [ nonNegative ] }
              />
            </div>
            { canComment ? (
                <div className="small-6 columns">
                  <Field
                    component="input"
                    name="comment"
                    className=""
                    placeholder="Comment"
                    type="text"
                    />
                </div>
              ) : ''
            }
            <div className="small-3 columns">
              <button
                type="submit"
                className="secondary button"
                disabled={ pristine || submitting || invalid }>
                Place Bet
              </button>
            </div>
            { canComment ? '' : <div className="small-6 columns"/> }
          </div>
          { error ?
            <div className="error">{ error }</div>
            : ''
          }
        </form>

      </div>
    );
  }
}

export default reduxForm({ enableReinitialize: true })(WagerForm);