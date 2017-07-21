import React from 'react';
import { connect } from 'react-redux';
import { toArray, sortObjectsByKey } from 'utils';


export class SelectSeason extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  componentWillMount() {
    this.updateValue(this.props.seasons[0].id);
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

    const { series, seasons } = this.props;

    const options = seasons.map(season => (
      <option key={ season.id } value={ season.id }>
        { series[season.series].title } Season { season.season }
      </option>
    ))

    return (
      <div className="select-season" >
        <select onChange={ this.handleChange }>
          {options}
        </select>
      </div>
    );
  }
}


function mapStateToProps(state, props) {
  const { series, seasons } = state;
  return {
    series,
    seasons: toArray(seasons).sort(sortObjectsByKey('season', true))
  };
};

export default connect(mapStateToProps)(SelectSeason);