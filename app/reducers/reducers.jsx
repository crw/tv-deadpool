import moment from 'moment';


export var eventsReducer = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_EVENTS_DATA':
      return action.updatedData;
    default:
      return state;
  };
};

export var betsReducer = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_BETS_DATA':
      return action.updatedData;
    default:
      return state;
  };
};

export var usersReducer = (state = {}, action) => {

  let id;
  let newUser = {};
  let actionKey = '';

  switch(action.type) {
    case 'UPDATE_USER_DATA':
      actionKey = 'updatedData';
    case 'UPDATE_USER':
      actionKey = actionKey || 'userData';
      newUser[action[actionKey].id] = action[actionKey];
      return {
        ...state,
        ...newUser
      }
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
        uid: action.uid
      };
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        user: action.updatedData
      }
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};
