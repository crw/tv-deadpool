import React from 'react';
import { connect } from 'react-redux';
import { getKey, toCurrencyString } from 'app/utils';
import { DEFAULT_DISPLAY_NAME } from 'constants/strings';
import { LOCALE, CURRENCY_FORMAT } from 'constants/formats';
import { INITIAL_BALANCE } from 'constants/numbers';
import { startGetUser } from 'actions';
import EpisodeList from 'EpisodeList';
import * as str from 'constants/strings';


export class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.fetchUserData = this.fetchUserData.bind(this);
  }

  fetchUserData() {
    const {id, userId, dispatch} = this.props;
    if (!id) {
      dispatch(startGetUser(userId));
    }
  }

  componentDidMount() {
    this.fetchUserData();
  }

  componentDidUpdate() {
    this.fetchUserData();
  }

  render() {
    let { id, userId, displayName, results, context, season } = this.props;

    const balance = results ?
      !results.balance && results.balance !== 0 ? INITIAL_BALANCE : results.balance
      : 0;

    const cls_columns = str.SHOW_WINLOSS_RATIO ? 'small-3' : 'small-4';

    var renderResults = () => {
      return (
        <div className="profile__body">
          <div className="results row">
            <div className={"result balance columns " + cls_columns}>
              <div className="title">
                Balance
              </div>
              <div className="body">
                {toCurrencyString(balance)}
              </div>
            </div>
            <div className={"result winnings columns " + cls_columns}>
              <div className="title">
                Winnings
              </div>
              <div className="body">
                {toCurrencyString(results.winnings)}
              </div>
            </div>
            <div className={"result losses columns " + cls_columns}>
              <div className="title">
                Losses
              </div>
              <div className="body">
                {toCurrencyString(results.losses)}
              </div>
            </div>
            { str.SHOW_WINLOSS_RATIO ? (
                <div className={"result balance columns " + cls_columns}>
                  <div className="title">
                    W/L Ratio
                  </div>
                  <div className="body">
                    { results.ratio.toFixed(2) }
                  </div>
                </div>
              ) :
              ''
            }
          </div>
        </div>
      );
    };

    return (id) ?
      <div className="profile ">
        <div className="profile__header">
          <div className="username">
            {displayName || DEFAULT_DISPLAY_NAME }
          </div>
        </div>
        { results ? renderResults() : '' }
        <EpisodeList userId={ userId } seasonId={ season } context={ context }/>
      </div>
      :
      <div className="profile ">
        <div className="loading">
          <i className="fa fa-spinner fa-spin fa-3x fa-fw"/>
        </div>
      </div>;

  }
}


function mapStateToProps(state, ownProps) {
  const { userId, season, context } = ownProps;
  const user = getKey(state, `users.${userId}`, null);
  const results = getKey(state.leaderboard, `${season}.${userId}`, null);
  const localContext = context + '/Profile';

  return {
    ...user,
    results,
    season,
    context: localContext
  };
};

export default connect(mapStateToProps)(Profile);