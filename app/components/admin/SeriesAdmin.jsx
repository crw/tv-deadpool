import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SeriesList from 'admin/SeriesList';
import SeriesForm from 'admin/SeriesForm';
import { startCreateSeries } from 'actions';


export class SeriesAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmitSeries = this.handleSubmitSeries.bind(this);
  }

  handleSubmitSeries(values) {
    const { dispatch } = this.props;
    const { season, title, description, published } = values;
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

    const { match } = this.props;

    return (
      <div className="row">
        <div className="small-12 columns">
          <SeriesList/>
          <SeriesForm onSubmit={this.handleSubmitSeries}/>
        </div>
      </div>
    );
  }
}


export default connect()(SeriesAdmin);