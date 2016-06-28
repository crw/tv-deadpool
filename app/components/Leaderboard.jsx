import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
// App imports
import {LOCALE, CURRENCY_FORMAT} from 'app/constants/formats';
import {DEFAULT_DISPLAY_NAME} from 'app/constants/strings';
import {getKey, sortObjectsByKey, toArray, isElementInViewport, toCurrencyString} from 'app/utils';
import {startFetchLabel} from 'actions';


export class Leaderboard extends React.Component {
  static propTypes = {
    // name: React.PropTypes.string,
  };

  static defaultProps = { }

  constructor(props) {
    super(props);

    this.state = {
      key: 'balance'
    };

    this.setKey = this.setKey.bind(this);
    this.handleSetKey = this.handleSetKey.bind(this);
  }

  setKey(key) {
    this.setState({
      key
    });
  }

  handleSetKey(e) {
    e.preventDefault();
    let key = e.target.dataset.key;
    this.setKey(key);
  }

  componentDidMount() {
    let {dispatch, label, leaders} = this.props;
    let {userScore} = this.refs;
    if (leaders.length === 0) {
      dispatch(startFetchLabel(label));
    }
    if (userScore && !isElementInViewport(userScore)) {
      userScore.scrollIntoView();
    }

  }

  render() {
    const {leaders, label, userId, loginUserId} = this.props;
    const {key} = this.state;

    const renderLeaders = () => {
      if (leaders.length === 0) {
        return <div className="container__message">No leaders!</div>;
      }

      let reverse = key !== 'losses';
      let i = 1;


      return leaders.sort(sortObjectsByKey(key, reverse)).map(
        (leader) => {
          const thisUser = leader.key === userId;
          const loginUser = leader.key === loginUserId;
          let rowclass = '';
          if (loginUser) {
            rowclass = ' login-user ';
          } else if (thisUser) {
            rowclass = ' current-user';
          }

          const displayName = !thisUser && leader.anon ? <span className="anon">{leader.displayName}</span> : leader.displayName;

          const userIcon = loginUser ? (
              <span title="You!" ref="userScore">
                <i className="fa fa-user"/>
              </span>) :
            leader.anon ? (
              <span title="Anonymous user with randomly-generated name.">
                <i className="fa  fa-question"/>
              </span>) :
            leader.displayName === 'Caity PenzeyMoog' ? (
              <span title="Accidentally cheated. Shame!">
                🔔
              </span>
            ) : '';

          return (
            <div key={leader.key} className={'result-row ' + rowclass}>
              <div className="number-order small-1 columns">
                {i++}.
              </div>
              <div className="align-right small-3 columns">
                <span className={leader[key] < 0 ? 'losses' : key}>{toCurrencyString(leader[key])}</span>
              </div>
              <div className="username small-8 columns">
                { loginUserId ? (
                    <Link className="user-link" to={'/profile/' + leader.key}>
                      {userIcon} {displayName}
                    </Link>
                  ) : (
                    <span>{userIcon} {displayName}</span>
                  )}
              </div>
            </div>
          );
        }
      );
    };

    return (
      <div className="leaderboard">
        <div className="title">
          {label}
        </div>
        <div className="leaderboard__navigation">
          <a href="#"
            data-key="balance"
            className={(key==='balance') ? 'link-active' : ''}
            onClick={this.handleSetKey}>Balance</a>{' - '}
          <a href="#"
            data-key="winnings"
            className={(key==='winnings') ? 'link-active ' : ''}
            onClick={this.handleSetKey}>Total Won</a>{' - '}
          <a href="#"
            data-key="losses"
            className={(key==='losses') ? 'link-active ' : ''}
            onClick={this.handleSetKey}>Total Lost</a>
        </div>
        <div className="standings row">
          {renderLeaders()}
        </div>
      </div>
    );
  }
}


export default connect((state, ownProps) => {
  let label = ownProps.label;
  let members = Object.keys(getKey(state, `labels.${label}`, {}));
  let loginUserId = getKey(state, 'login.uid', null);
  // Special case; show the logged-in user against the AVClub staffers
  if (label === 'AVClub Staffers' && members.length !== 0 && loginUserId && getKey(state, `leaderboard.${loginUserId}`, false)) {
    if (members.indexOf(loginUserId) === -1) {
      members.push(loginUserId);
    }
  }

  // Special case: The Field (all players)
  if (label === 'The Field') {
    // let EXCLUDE = ['Jr9wO5CW1uX2li5HLFepQL9w5bn2', 'mcbLQf1vOUdwKUYbEcAKNqM3IAE2'];
    let avclub = Object.keys(getKey(state, 'labels.AVClub Staffers', {}));
    // if (EXCLUDE.indexOf(loginUserId) === -1) {
    //   avclub = avclub.concat(EXCLUDE);
    // }
    members = Object.keys(getKey(state, 'leaderboard'), {});
    members = members.filter((member) => { return avclub.indexOf(member) < 0; });
  }
  let leaders = toArray(state.leaderboard).filter(
    (leader) => {
      return members.indexOf(leader.key) !== -1;
    });
  return {
    loginUserId,
    leaders
  };
})(Leaderboard);
