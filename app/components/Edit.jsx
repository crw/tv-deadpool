import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import EditForm from 'EditForm';
import SeriesForm from 'SeriesForm';
import {normalizeName} from 'app/utils';


export class Edit extends React.Component {
  // static propTypes = {
  //   userId: PropTypes.string
  // };

  constructor(props) {
    super(props);
    this.handleSubmitSeries = this.handleSubmitSeries.bind(this);
  }

  handleSubmitSeries(values) {
    const {dispatch} = this.props;
    console.log(normalizeName(values.title), values.title, values.description, values.published);
    // dispatch(createSeries(values.name, values.description));
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