import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { SimpleInput } from 'redux/form/components';
import * as str from 'constants/strings';


export class ReconcileEpisodeForm extends React.Component {

  static propTypes = {
    episode: PropTypes.object.isRequired
  }


  constructor(props) {
    super(props);

    const { initialValues } = props;

    this.toggle = this.toggle.bind(this);
    this.state = {};
    for (let key in initialValues) {
      if (key.indexOf('note_') !== -1 && initialValues[key] !== '') {
        this.state[key] = true;
      }
    }
  }

  toggle(id) {
    return () => {
      this.setState(() => {
        return { [id]: !this.state[id] };
      });
    };
  }

  render() {
    const { handleSubmit, onCancel, pristine, submitting, invalid, reset } = this.props;
    const { episode } = this.props;
    const cls_btn_submit = submitting ? str.CLS_ICON_SUBMITTING : str.CLS_ICON_SUBMIT;

    return (
      <div>
        <h3>{ episode.name }</h3>

        <Field component={SimpleInput} type="text" name="confirmation" label={str.LABEL_CONFIRMATION_URI}/>

        <div>Paid / Resolved</div>

        <form onSubmit={ handleSubmit }>
          { episode.bets.map(bet => (
            <div key={ bet.id }>
              <Field
                name={ `paid_${bet.id}` }
                component="input"
                type="checkbox"
                value={ bet.id }/>
              {' / '}
              <Field
                name={ `resolved_${bet.id}` }
                component="input"
                type="checkbox"
                value={ bet.id }/>

              {' '}{ bet.odds_payout }:{ bet.odds_wager } { bet.name }{' '}

              <a onClick={ this.toggle(`note_${bet.id}`) }>Add Note</a>
              { this.state[`note_${bet.id}`] ?
                <Field
                  name={ `note_${bet.id}` }
                  component={SimpleInput}
                  type="text"
                  label={str.LABEL_NOTE}/>
                : ''
              }
            </div>
          ))}
          <div className="buttons">
            <button
              type="submit"
              className="button success"
              disabled={pristine || submitting || invalid}>
              <i className={cls_btn_submit}/> {str.BTN_LABEL_UPDATE}
            </button>
            <button
              type="button"
              className="button alert"
              disabled={ (!onCancel && pristine) || submitting}
              onClick={ onCancel || reset }>
              <i className={str.CLS_ICON_CANCEL}/> {str.BTN_LABEL_CANCEL}
            </button>
          </div>

        </form>
      </div>
    );
  }
}

export default reduxForm({})(ReconcileEpisodeForm);