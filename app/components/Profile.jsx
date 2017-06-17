import React from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// App imports
import {getKey, toCurrencyString} from 'app/utils';
import {DEFAULT_DISPLAY_NAME} from 'app/constants/strings'
import {LOCALE, CURRENCY_FORMAT} from 'app/constants/formats'
import {INITIAL_BALANCE} from 'app/constants/numbers'
import {startGetUser} from 'actions';
import EventList from 'EventList';


export class Profile extends React.Component {
  static propTypes = {
    // name: PropTypes.string,
  };

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
    let {id, userId, displayName, results, context} = this.props;

    const balance = !results.balance && results.balance !== 0 ? INITIAL_BALANCE : results.balance;

    var renderResults = () => {
      return (
        <div className="profile__body">
          <div className="results row">
            <div className="result balance small-6 small-centered columns">
              <div className="title">
                Balance
              </div>
              <div className="body">
                {toCurrencyString(balance)}
              </div>
            </div>
          </div>
          <div className="results row">
            <div className="result winnings small-4 small-offset-1 columns">
              <div className="title">
                Winnings
              </div>
              <div className="body">
                {toCurrencyString(results.winnings)}
              </div>
            </div>
            <div className="result losses small-4 small-offset-2 end columns">
              <div className="title">
                Losses
              </div>
              <div className="body">
                {toCurrencyString(results.losses)}
              </div>
            </div>
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
        <EventList userId={userId} context={context}/>
      </div>
      :
      <div className="profile ">
        <div className="loading">
          <i className="fa fa-spinner fa-spin fa-3x fa-fw"/>
        </div>
      </div>;

  }
}

export default connect((state, ownProps) => {
  let user = getKey(state, `users.${ownProps.userId}`, null);
  let results = getKey(state, `leaderboard.${ownProps.userId}`, null);
  let context = ownProps.context + '/Profile';

  return {
    ...user,
    results,
    context
  };
})(Profile);