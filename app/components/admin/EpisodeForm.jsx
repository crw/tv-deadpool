import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { getKey } from 'utils';
import { SimpleInput } from 'redux/form/components';
import { required, isValidDatetime } from 'redux/form/validators';
import { toInt } from 'redux/form/normalizers';
import { episodeDefaults, episodeFormName } from 'redux/form/details.jsx';
import * as str from 'app/constants/strings';



export const EpisodeForm = (props) => {

  const { handleSubmit, onCancel, pristine, submitting, invalid, editing } = props;
  const cls_btn_submit = submitting ? str.CLS_ICON_SUBMITTING : str.CLS_ICON_SUBMIT;
  const lbl_btn_submit = editing ? str.BTN_LABEL_UPDATE : str.BTN_LABEL_CREATE;

  return (
    <form onSubmit={handleSubmit} className="display-name-form">
      <h3>{str.NEW_EPISODE}</h3>
      <Field component={SimpleInput} type="number" name="episode"
        validate={[required]} normalize={toInt} label={str.LABEL_EPISODE_NUMBER}/>
      <Field component={SimpleInput} type="text" name="air_at"
        validate={[required, isValidDatetime]} label={str.LABEL_AIR_AT}/>
      <Field component={SimpleInput} type="text" name="lock_at"
        validate={[required, isValidDatetime]} label={str.LABEL_LOCK_AT}/>
      <Field component={SimpleInput} type="text" name="name"
        validate={[required]} label={str.LABEL_TITLE}/>
      <Field component={SimpleInput} type="text" name="description" label={str.LABEL_DESCRIPTION}/>
      <Field component={SimpleInput} type="text" name="article" label={str.LABEL_ARTICLE_URI}/>
      <Field component={SimpleInput} type="text" name="hbo" label={str.LABEL_OFFICIAL_URI}/>
      <Field component={SimpleInput} type="text" name="preview" label={str.LABEL_PREVIEW_URI}/>
      <Field component={SimpleInput} type="text" name="confirmation" label={str.LABEL_CONFIRMATION_URI}/>
      <Field component={SimpleInput} type="checkbox" name="published" label={str.LABEL_PUBLISHED}/>
      <div>
        <button type="submit" className="button success" disabled={pristine || submitting || invalid}>
          <i className={cls_btn_submit}/> {lbl_btn_submit}
        </button>
      </div>
    </form>
  );
};


function mapStateToProps(state, ownProps) {
  const { episodeId, nextEpisode } = ownProps;
  const editing = !!episodeId;
  // Auto-fill the next episode number, if it has been provided.
  if (nextEpisode) {
    episodeDefaults.episode = nextEpisode;
  }
  const initialValues = getKey(state.episodes, episodeId) || episodeDefaults;
  return {
    initialValues: {
      ...initialValues,
      air_at: moment(initialValues.air_at).format(),
      lock_at: moment(initialValues.lock_at).format()
    },
    editing
  };
}

export default connect(mapStateToProps)(reduxForm({ form: episodeFormName })(EpisodeForm));
