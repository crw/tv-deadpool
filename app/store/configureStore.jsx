var redux = require('redux');
var {userReducer, eventsReducer, betsReducer, playersReducer} = require('reducers');

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    user: userReducer,
    events: eventsReducer,
    bets: betsReducer,
    players: playersReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};