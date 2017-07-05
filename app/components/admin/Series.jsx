import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SeasonList from 'admin/SeasonList';
import SeasonForm from 'admin/SeasonForm';
import { getKey } from 'app/utils';
import { startCreateSeason } from 'actions';
import { SubmissionError } from 'redux-form';


export class Series extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmitSeason = this.handleSubmitSeason.bind(this);
  }

  handleSubmitSeason(values) {
    const { id, dispatch } = this.props;
    const { season, title, description, published } = values;
    const _title = title.trim() || '';
    const _description = description.trim() || '';
    const _published = !!published;
    dispatch(startCreateSeason(id, season, _title, _description, _published));
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