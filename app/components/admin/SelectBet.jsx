import React from 'react';
import { connect } from 'react-redux';
import * as api from 'api/redux';


export class SelectBet extends React.Component {


  render() {
    const { bets, input: { name, value, onChange }, initialValues: { betId } } = this.props;

    if (!bets) return (
      <div className="select-bet" >
        <div className="warn">No Episode Selected.</div>
      </div>
    );

    const options = bets.map(({ id, order, odds_payout, odds_wager, name }) => (
      <option key={ id } value={ id }>
        {`[${order}] ${odds_payout}:${odds_wager} ${name}`}
      </option>
    ))

    return (
      <div className="select-bet" >
        <select
          name={ name }
          onChange={ (e) => onChange(e.target.value) }>
          { options }
        </select>
      </div>
    );
  }
}


function mapStateToProps(state, props) {
  const { episodeId, initialValues, input: { value } } = props;
  if (!episodeId) return { initialValues: { betId: '' }};
  const bets = api.getBetsForEpisode(state, episodeId).reverse();
  const defaultValues = initialValues || { betId: bets[0] };
  return {
    bets,
    initialValues: defaultValues
  };
};

export default connect(mapStateToProps)(SelectBet);