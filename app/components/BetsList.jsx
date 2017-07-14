import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// App components
import { getKey, sortObjectsByKey } from 'utils';
import { BETSLIST_SORTBY as SORTBY } from 'constants/strings';
import { setPreference, setPreferences } from 'actions';
import { getBetsForEpisode } from 'api/redux';
import Bet from 'Bet';


export class BetsList extends React.Component {
  static propTypes = {
    bets: PropTypes.array.isRequired,
    episodeId: PropTypes.string.isRequired
  };


  constructor(props) {
    super(props);

    const { context, prefs: { sortBy, filterByWagers, showStats } } = props;


    let defaultSortBy = SORTBY.ARTICLE;
    let defaultShowStats = true;
    let defaultFilterByWagers = false;

    if (context.indexOf('ProfileBoard') > -1) {
      defaultShowStats = false;
      defaultFilterByWagers = true;
    }

    const sortByPref = (typeof sortBy !== 'undefined') ? sortBy : defaultSortBy;
    const showStatsPref = (typeof showStats !== 'undefined') ? showStats : defaultShowStats;
    const filterByWagersPref = (typeof filterByWagers !== 'undefined') ? filterByWagers : defaultFilterByWagers;

    this.state = {
      sortBy: props.sortBy || sortByPref,
      filterByWagers: props.filterByWagers || filterByWagersPref,
      showStats: props.showStats || showStatsPref
    };

    this.getSortedBets  = this.getSortedBets.bind(this);
    this.getFilterFunc  = this.getFilterFunc.bind(this);
    this.handleSort     = this.handleSort.bind(this);
    this.handleFilterBy = this.handleFilterBy.bind(this);
    this.handleToggleStats = this.handleToggleStats.bind(this);
  }

  sortByAVC(bets) {
    return bets.sort(sortObjectsByKey());
  }

  sortByWinLoss(bets) {
    return bets.sort((a, b) => {
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
    const { filterByWagers } = this.state;
    const { wagers } = this.props;
    const wagerIds = Object.keys(wagers);
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
    const { bets, episodeId, resolved, userId } = this.props;
    const { sortBy, filterByWagers, showStats } = this.state;

    const renderBets = () => {

      let sortedBets = this.getSortedBets(bets, sortBy);
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

function mapStateToProps(state, ownProps) {
  const userId = ownProps.userId || getKey(state, 'login.uid', null);
  const user = getKey(state, `users.${userId}`, null);
  const wagers = getKey(user, 'wagers', {});
  const context = ownProps.context + '/BetsList';
  const prefs = getKey(state, `prefs.${context}`, {});
  const { episodeId } = ownProps;
  const bets = getBetsForEpisode(state, episodeId);

  return {
    context,
    prefs,
    wagers,
    bets,
    resolved: state.episodes[episodeId].resolved
  };
};

export default connect(mapStateToProps)(BetsList);
