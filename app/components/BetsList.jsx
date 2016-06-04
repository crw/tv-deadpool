import React from 'react';
import {connect} from 'react-redux';
// App components
import Bet from 'Bet';
import {sortObjectsByKey, toArray as firebaseToArray} from 'app/utils';


export class BetsList extends React.Component {
  static propTypes = {
    bets: React.PropTypes.object.isRequired,
    eventId: React.PropTypes.string.isRequired
  };


  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'avc',
      filterByWagers: false
    };

    this.getSortedBets  = this.getSortedBets.bind(this);
    this.getFilterFunc  = this.getFilterFunc.bind(this);
    this.handleSort     = this.handleSort.bind(this);
    this.handleFilterBy = this.handleFilterBy.bind(this);
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

  getSortedBets(bets, sortBy='avc') {
    switch(sortBy) {
      case 'winloss':
        return this.sortByWinLoss(bets);
      case 'avc':
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
    let sortBy = e.target.dataset.sortby;
    this.setState({
      sortBy
    });
  }

  handleFilterBy(e) {
    e.preventDefault();
    let filterBy = e.currentTarget.dataset.filterby;
    switch(filterBy) {
      case 'wagers':
        let filterByWagers = !this.state.filterByWagers;
        this.setState({filterByWagers});
    }
  }

  render() {
    let {bets, eventId, resolved} = this.props;
    let {sortBy, filterByWagers} = this.state;

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
        return <Bet key={bet.id} id={bet.id}/>;
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
                        data-sortby="avc"
                        onClick={this.handleSort}>Article Order</a>
                      {' - '}
                      <a href="#"
                        className={sortBy === 'winloss' ? 'sortby-link active' : 'sortby-link'}
                        data-sortby="winloss"
                        onClick={this.handleSort}>Win/Loss</a>
                  </div>
                )
                : ''
              }
          </div>
          <div className="bets__filterby small-6 columns align-right">
            <label data-filterby="wagers" onClick={this.handleFilterBy}>
              <input type="checkbox" checked={filterByWagers}/>
              Hide Bets Without Wagers
            </label>
          </div>
        </div>
        {renderBets()}
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  let user = (state.login && state.login.user) || null;
  let wagers = (user && user.wagers) || {};
  return {
    wagers,
    bets: state.bets || {},
    resolved: state.events[ownProps.eventId].resolved
  };
})(BetsList);
