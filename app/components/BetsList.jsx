import React from 'react';
import {connect} from 'react-redux';
// App components
import {getKey, sortObjectsByKey, isEmpty, toArray as firebaseToArray} from 'app/utils';
import {BETSLIST_SORTBY as SORTBY} from 'app/constants/strings';
import {setPreference, setPreferences} from 'actions';
import Bet from 'Bet';


export class BetsList extends React.Component {
  static propTypes = {
    bets: React.PropTypes.object.isRequired,
    eventId: React.PropTypes.string.isRequired
  };


  constructor(props) {
    super(props);

    let {sortBy, filterByWagers, showStats} = props.prefs;

    const {context} = props;

    let defaultSortBy = SORTBY.ARTICLE;
    let defaultShowStats = true;
    let defaultFilterByWagers = false;

    if (context.indexOf('ProfileBoard') > -1) {
      defaultShowStats = false;
      defaultFilterByWagers = true;
    }

    sortBy = (typeof sortBy !== 'undefined') ? sortBy : defaultSortBy;
    showStats = (typeof showStats !== 'undefined') ? showStats : defaultShowStats;
    filterByWagers = (typeof filterByWagers !== 'undefined') ? filterByWagers : defaultFilterByWagers;

    this.state = {
      sortBy: props.sortBy || sortBy,
      filterByWagers: props.filterByWagers || filterByWagers,
      showStats: props.showStats || showStats
    };

    this.getSortedBets  = this.getSortedBets.bind(this);
    this.getFilterFunc  = this.getFilterFunc.bind(this);
    this.handleSort     = this.handleSort.bind(this);
    this.handleFilterBy = this.handleFilterBy.bind(this);
    this.handleToggleStats = this.handleToggleStats.bind(this);
  }

  sortByAVC(bets) {
    return firebaseToArray(bets).sort(sortObjectsByKey());
  }

  sortByWinLoss(bets) {
    return firebaseToArray(bets).sort((a, b) => {
        if (a.paid && !b.paid) {
          return -1;
        } else if (!a.paid && b.paid) {
          return 1;
        } else {
          return sortObjectsByKey()(a, b);
        }
      });
  }

  getSortedBets(bets, sortBy) {
    switch(sortBy) {
      case SORTBY.WIN_LOSS:
        return this.sortByWinLoss(bets);
      case SORTBY.ARTICLE:
      default:
        return this.sortByAVC(bets);
    }
  }

  getFilterFunc() {
    let {filterByWagers} = this.state;
    let {wagers} = this.props;
    let wagerIds = Object.keys(wagers);
    return (bet) => {
      return (!filterByWagers || wagerIds.find(el => el === bet.id));
    }
  }

  handleSort(e) {
    e.preventDefault();
    const {dispatch} = this.props;
    let sortBy = e.target.dataset.sortby;
    this.setState({sortBy});
    dispatch(setPreference(this.props.context, 'sortBy', sortBy));
  }

  handleFilterBy(e) {
    e.preventDefault();
    const {dispatch} = this.props;
    let filterBy = e.currentTarget.dataset.filterby;
    switch(filterBy) {
      case 'wagers':
        let filterByWagers = !this.state.filterByWagers;
        this.setState({filterByWagers});
        dispatch(setPreference(this.props.context, 'filterByWagers', filterByWagers));
    }
  }

  handleToggleStats(e) {
    e.preventDefault();
    const {dispatch} = this.props;
    const showStats = !this.state.showStats;
    this.setState({showStats});
    dispatch(setPreference(this.props.context, 'showStats', showStats));
  }

  render() {
    let {bets, eventId, resolved, userId} = this.props;
    let {sortBy, filterByWagers, showStats} = this.state;

    let renderBets = () => {
      let sortedBets = this.getSortedBets(bets, sortBy).filter(
        (bet) => { return (bet.event_id === eventId) ? bet : undefined; }
      );
      if (sortedBets.length === 0) {
        return <p className="container__message">No bets have been created for this event.</p>;
      }

      let filteredBets = sortedBets.filter(this.getFilterFunc());

      if (filteredBets.length === 0) {
        return <p className="container__message">No bets match your criteria.</p>;
      }
      return filteredBets.map((bet) => {
        return <Bet key={bet.id} id={bet.id} userId={userId} showStats={showStats}/>;
      });
    };

    return (
      <div className="bets-list">
        <div className="bets__navigation row">
          <div className="bets__sortby small-6 columns">
              { (resolved) ? (
                  <div>
                    Sort by:
                      {' '}
                      <a href="#"
                        className={ (sortBy === 'avc') ? 'sortby-link active' : 'sortby-link'}
                        data-sortby={SORTBY.ARTICLE}
                        onClick={this.handleSort}>Article Order</a>
                      {' - '}
                      <a href="#"
                        className={sortBy === 'winloss' ? 'sortby-link active' : 'sortby-link'}
                        data-sortby={SORTBY.WIN_LOSS}
                        onClick={this.handleSort}>Win/Loss</a>
                  </div>
                )
                : ''
              }
          </div>
          <div className="bets__filterby small-6 columns align-right">
            <label data-filterby="wagers" onClick={this.handleFilterBy}>
              { filterByWagers ? <i className="fa fa-fw fa-check-square-o"/> : <i className="fa fa-fw fa-square-o"/> }
              Hide Bets Without Wagers
            </label>
            <label onClick={this.handleToggleStats}>
              { showStats ? <i className="fa fa-fw fa-check-square-o"/> : <i className="fa fa-fw fa-square-o"/> }
              Show Bet Stats
            </label>
          </div>
        </div>
        {renderBets()}
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  const userId = ownProps.userId || getKey(state, 'login.uid', null);
  const user = getKey(state, `users.${userId}`, null);
  const wagers = getKey(user, 'wagers', {});
  const context = ownProps.context + '/BetsList';
  const prefs = getKey(state, `prefs.${context}`, {});

  return {
    context,
    prefs,
    wagers,
    bets: state.bets || {},
    resolved: state.events[ownProps.eventId].resolved
  };
})(BetsList);
