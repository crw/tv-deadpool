import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EpisodeList from 'admin/EpisodeList';
import EpisodeForm from 'admin/EpisodeForm';
import { getKey } from 'app/utils';
import { startCreateEpisode, startCreateBet } from 'actions';
import { episodeValidation } from 'redux/form/details';


export class Season extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { id, dispatch } = this.props;

    values = episodeValidation(values);
    values.season = id;

    dispatch(startCreateEpisode(values));
  }

  render() {
    const { id, title, description, published  } = this.props;

    if (id === undefined) {
      return (
        <div>
          <div className="error">Error: Season not found.</div>
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
        <EpisodeList seasonId={id} />
        <EpisodeForm onSubmit={this.handleSubmit}/>
      </div>
    );
  }
};

function mapStateToProps(state, ownProps) {
  const { seriesId, seasonId } = ownProps.match.params;
  const season = getKey(state.seasons, seasonId, undefined);
  return { ...season };
}

export default connect(mapStateToProps)(Season);