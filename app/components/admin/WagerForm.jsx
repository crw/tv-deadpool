import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { SimpleInput } from 'redux/form/components';
import { required } from 'redux/form/validators';
import { toInt } from 'redux/form/normalizers';
import * as str from 'app/constants/strings';


export class AdminWagerForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidUpdate(prevProps, prevState) {
    const { episodeId, bets, form, change } = this.props;
    const prevEpisodeId = prevProps.episodeId;

    if (episodeId !== prevEpisodeId) {
      change('betId', bets[0].id);
    }
  }


  handleSubmit(values) {
    const { handleSubmit, reset } = this.props;
    handleSubmit(values).then(reset);
  }


  render() {
    const { bets, exceptWagers } = this.props;
    const { onCancel, pristine, submitting, invalid } = this.props;
    const { initialValues: { id, betId } } = this.props;

    // If id is not present, this is a new wager form. id indicates an existing wager.
    const editingWager = !!id;

    const cls_btn_submit_icon = submitting ? str.CLS_ICON_SUBMITTING : str.CLS_ICON_SUBMIT;
    const cls_btn_submit = !editingWager ? "button primary" : "button secondary";
    const str_btn_label = !editingWager ? str.BTN_LABEL_CREATE : str.BTN_LABEL_UPDATE;


    const betLineItem = ({ id, order, odds_payout, odds_wager, name }) =>
      `[${order}] ${odds_payout}:${odds_wager} ${name}`;


    return (

      <form onSubmit={ this.handleSubmit } className="wager-form admin">

        { editingWager ? (
            <div className="title">
              <Field component="input" type="hidden" name="betId" value={betId}/>
              { betLineItem(bets.find(bet => bet.id === betId)) }
            </div>
          ) : (
          <Field component="select" name="betId">
            { bets.filter(bet => !exceptWagers.includes(bet.id)).map(bet =>
              <option key={ bet.id } value={ bet.id }>{ betLineItem(bet) }</option> )}
          </Field>
        )}

        <div className="row small-collapse">
          <div className="small-3 columns">
            <Field
              name="wager"
              component={ SimpleInput }
              type="number"
              normalize={toInt}
              placeholder={ str.PLACEHOLDER_WAGER }/>
          </div>
          <div className="small-6 columns">
            <Field component={ SimpleInput } type="text" name="comment" placeholder={ str.PLACEHOLDER_COMMENT }/>
          </div>
          <div className="small-3 columns">
            <button type="submit" className={ cls_btn_submit } disabled={ pristine || submitting || invalid }>
              <i className={ cls_btn_submit_icon }/> { str_btn_label }
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const formSettings = {
  enableReinitialize: true,
  keepDirtyOnReinitialize: false
};

export default reduxForm(formSettings)(AdminWagerForm);

