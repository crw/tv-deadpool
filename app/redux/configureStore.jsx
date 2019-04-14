import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from 'reducers';


export var configure = (initialState = {}) => {
  const reducer = combineReducers({ ...reducers });

  const middleware = compose(
    applyMiddleware(thunk),
    (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  );

  return createStore(reducer, initialState, middleware);
};