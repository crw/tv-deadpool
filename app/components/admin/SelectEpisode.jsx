import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as api from 'api/redux';


export class SelectEpisode extends React.Component {

  static propTypes = {
    seasonId: PropTypes.string.isRequired,
    episodes: PropTypes.array.isRequired
  }


  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  /**
   * Set the latest episode as the value on first mount
   */
  componentDidMount() {
    const { seasonId, episodes } = this.props;

    if (episodes && episodes.length > 0) {
      this.updateValue(episodes[0].id);
    }
  }

  /**
   * Set the latest episode as the value on subsequent updates ONLY IF the
   * seasonId changes.
   */
  componentDidUpdate(prevProps) {
    const { seasonId, episodes } = this.props;
    const prevSeasonId = prevProps.seasonId

    if (seasonId !== prevSeasonId && episodes && episodes.length > 0) {
      this.updateValue(episodes[0].id);
    }
  }

  updateValue(value) {
    const { onChange } = this.props;
    return onChange(value);

  }

  handleChange(e) {
    e.preventDefault();
    this.updateValue(e.target.value);
  }

  render() {
    const { episodes } = this.props;

    if (!episodes) return (
      <div className="select-episode" >
        <div className="warn">No Season Selected</div>
      </div>
    );

    const options = episodes.map(({ id, episode, name }) => (
      <option key={ id } value={ id }>
        E{ (episode + '').padStart(2, "0") }{': '}{ name }
      </option>
    ))

    return (
      <div className="select-episode" >
        <select onChange={ this.handleChange }>
          { options }
        </select>
      </div>
    );
  }
}


function mapStateToProps(state, props) {
  const { seasonId } = props;
  if (!seasonId) return {};
  return {
    episodes: api.getEpisodesForSeason(state, seasonId)
  };
};

export default connect(mapStateToProps)(SelectEpisode);