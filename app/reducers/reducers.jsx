import moment from 'moment';


export var eventsReducer = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_EVENTS_DATA':
      return action.updatedData;
    default:
      return state;
  };
};

// export var playersReducer = (state = [], action) => {
//   switch(action.type) {
//     case 'UPDATE_PLAYERS_DATA':
//       return action.updatedData;
//     default:
//       return state;
//   };
// };

export var betsReducer = (state = {}, action) => {
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
    case 'PLACE_WAGER':
      if (!state) {
        return state;
      } else {
        let betId = action.bet.id;
        let prevWager = state[betId] ? state[betId].wager : 0;
        let balance = state.balance + prevWager - action.bet.wager;
        let wagers = {
          ...state.wagers
        };
        wagers[betId] = action.bet;
        return {
          ...state,
          balance,
          wagers
        };

      }
      return state;
    case 'LOGOUT':
      return {};
    default:
      return state;
  };
};


export var loginReducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        token: action.token,
        uid: action.uid
      };
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};