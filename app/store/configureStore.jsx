import * as redux from 'redux';
import thunk from 'redux-thunk';
import * as reducers from 'reducers';


export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    user:    reducers.userReducer,
    events:  reducers.eventsReducer,
    bets:    reducers.betsReducer,
    players: reducers.playersReducer,
    login:   reducers.loginReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    (process.env.NODE_ENV !== 'production' && window.devToolsExtension) ? window.devToolsExtension() : f => f
  ));

  return store;
};