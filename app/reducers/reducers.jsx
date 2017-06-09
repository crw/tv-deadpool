import {handleActions} from 'redux-actions';
// App imports
import * as actions from 'actions';


function createSimpleReducer(action, defaultState) {
  return handleActions({
    [action]: (state, action) => {
      return action.payload;
    }
  }, defaultState);
}

export const bets = createSimpleReducer(actions.updateBetsData, {});
export const stats = createSimpleReducer(actions.updateStatsData, {});
export const events = createSimpleReducer(actions.updateEventsData, {});
export const leaderboard = createSimpleReducer(actions.updateLeaderboardData, {});


export var users = (state = {}, action) => {

  switch(action.type) {
    case 'UPDATE_USER': {
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    }
    case 'UPDATE_DISPLAY_NAME': {
      const {uid, displayName} = action.payload;
      return {
        ...state,
        [uid]: {
          ...state[uid],
          displayName
        }
      }
    }
    case 'LOGOUT':
      return {};
    default:
      return state;
  };
};

export var login = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        uid: action.payload
      };
    case 'UPDATE_USER': {
      let user = action.payload;
      if (state.uid === user.id) {
        return {
          ...state,
          user
        }
      } else {
        return state;
      }
    }
    case 'UPDATE_DISPLAY_NAME': {
      const {uid, displayName} = action.payload;
      return {
        ...state,
        [uid]: {
          ...state[uid],
          displayName
        }
      }
    }
    case 'UPDATE_SECURE':
      return {
        ...state,
        secure: action.payload
      }
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};


export var labels = (state = {}, action) => {
  switch(action.type) {
    case 'UPDATE_LABEL':
      let newState = {...state};
      newState[action.payload.label] = action.payload.data;
      return newState;
    default:
      return state;
  }
};


export var prefs = (state = {}, action) => {
  switch(action.type) {
    case 'SET_PREFERENCE': {
      let newState = {...state};
      const context = action.payload.context || 'default';
      newState[context] = newState[context] || {};
      newState[context][action.payload.pref] = action.payload.value;
      return newState;
    }
    case 'SET_PREFERENCES': {
      let newState = {...state};
      const context = action.payload.context || 'default';
      newState[context] = action.payload.prefs || {};
      return newState;
    }
    default:
      return state;
  }
};


