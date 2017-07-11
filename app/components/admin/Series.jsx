import React from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { getKey } from 'app/utils';
import { startCreateSeason } from 'actions';
import { seasonValidation } from 'redux/form/details'
import SeasonList from 'admin/SeasonList';
import SeasonForm from 'admin/SeasonForm';
import * as str from 'constants/strings';

export class Series extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmitSeason = this.handleSubmitSeason.bind(this);
  }

  handleSubmitSeason(values) {
    const { id, dispatch } = this.props;
    values = seasonValidation(values);
    values.series = id;
    dispatch(startCreateSeason(values));
  }

  render() {
    const { id, title, description, published  } = this.props;

    if (id === undefined) {
      return (
        <div>
          <div className="error">Error: Series not found.</div>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="small-12 columns">
          <h3>{ title }</h3>
          <div>{ description }</div>
          <div>{ published ? 'Published' : 'Not published' }</div>
        </div>
        <SeasonList seriesId={id} />
        <h3>{str.NEW_SEASON}</h3>
        <SeasonForm onSubmit={this.handleSubmitSeason}/>
      </div>
    );
  }
};

function mapStateToProps(state, ownProps) {
  const { seriesId } = ownProps.match.params;
  const series = getKey(state.series, seriesId, undefined);
  return { ...series };
}

export default connect(mapStateToProps)(Series);