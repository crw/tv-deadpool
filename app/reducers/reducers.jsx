import uuid from 'node-uuid';
import moment from 'moment';


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
      // If a bet was already placed for this line item, find it.
      var bet = state.bets.find((bet) => bet.id === action.bet_id);
      var originalWager = (bet) ? bet.amount : 0;
      // Correct the balance to account for the return of the original wager.
      var balance = state.balance + originalWager;
      // If the balance is enough to support the wager, change state.
      if (balance >= action.wager) {
        balance = balance - action.wager;

        var createdAt = bet ? bet.created_at : moment().format();
        var updatedAt = bet ? moment().format() : createdAt;
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
      return state;
    case 'SET_MONEY':
      return {
        ...state,
        balance: action.newBalance
      };
    default:
      return state;
  };
}