import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import EditForm from 'EditForm';
import SeriesForm from 'SeriesForm';
import {normalizeName} from 'app/utils';
import { startCreateSeries } from 'actions';
import { SubmissionError } from 'redux-form';


export class Edit extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmitSeries = this.handleSubmitSeries.bind(this);
  }

  handleSubmitSeries(values) {
    const { dispatch } = this.props;
    const { title, description, published } = values;
    const _title = title.trim() || '';
    const _description = description.trim() || '';
    const _published = !!published;
    if (!_title) {
      throw new SubmissionError({
        title: 'No title specified.'
      });
    }
    dispatch(startCreateSeries(_title, _description, _published));
  }

  render() {
    var {userId, context} = this.props;

    return (
      <div className="row">
        <div className="small-12 columns">
          <EditForm/>
          <SeriesForm onSubmit={this.handleSubmitSeries}/>
        </div>
      </div>
    );
  }
}


export default connect()(Edit);