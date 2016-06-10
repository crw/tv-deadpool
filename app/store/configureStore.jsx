import * as redux from 'redux';
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
// App imports
import * as reducers from 'reducers';


export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    users:   reducers.usersReducer,
    events:  reducers.eventsReducer,
    bets:    reducers.betsReducer,
    login:   reducers.loginReducer,
    leaderboard: reducers.leaderboardReducer,
    labels:  reducers.labelsReducer,
    form:   formReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    (process.env.NODE_ENV !== 'production' && window.devToolsExtension) ? window.devToolsExtension() : f => f
  ));

  return store;
};