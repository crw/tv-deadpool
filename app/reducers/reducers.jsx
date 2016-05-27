import moment from 'moment';
import {User} from 'app/fixtures';


export var eventsReducer = (state = [], action) => {
  switch(action.type) {
    case 'UPDATE_EVENTS_DATA':
      return action.updatedData;
    default:
      return state;
  };
};

export var playersReducer = (state = [], action) => {
  switch(action.type) {
    case 'UPDATE_PLAYERS_DATA':
      return action.updatedData;
    default:
      return state;
  };
};

export var betsReducer = (state = [], action) => {
  switch(action.type) {
    case 'UPDATE_BETS_DATA':
      return action.updatedData;
    default:
      return state;
  };
};

export var userReducer = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_USER_DATA':
      return action.updatedData;
    // case 'UPDATE_LOGGEDIN_USER':
    //   return state;
    case 'PLACE_BET':
      if (!state) {
        return state;
      } else {
        // If a bet was already placed for this line item, find it.
        var bet = (state.bets) ? state.bets.find((bet) => bet.id === action.bet_id) : null;
        var originalWager = (bet) ? bet.amount : 0;
        // Correct the balance to account for the return of the original wager.
        var balance = state.balance + originalWager;
        // If the balance is enough to support the wager, change state.
        if (balance >= action.wager) {
          balance = balance - action.wager;

          var createdAt = bet ? bet.created_at : moment().unix();
          var updatedAt = bet ? moment().unix() : createdAt;
          // Remove original bet
          var bets = state.bets.filter((bet) => bet.id !== action.bet_id);
          // Create or recreate bet
          bets = [
            ...bets,
            {
              id: action.bet_id,
              amount: action.wager,
              comment: action.comment,
              created_at: createdAt,
              updated_at: updatedAt
            }
          ];
          return {
            ...state,
            balance,
            bets
          };
        }
      }
      return state;
    case 'LOGOUT':
      return {};
    default:
      return state;
  };
};


export var loginReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        token: action.token,
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};