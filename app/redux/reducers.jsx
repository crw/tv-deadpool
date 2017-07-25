import {handleActions} from 'redux-actions';
import {reducer as formReducer} from 'redux-form';
// App imports
import * as action_type from 'redux/action_types';
import * as actions from 'actions';


function createSimpleReducer(action, defaultState) {
  return handleActions({
    [action]: (state, action) => {
      return action.payload;
    }
  }, defaultState);
};

function clearForm(trigger) {
  return (state, action) => {
    switch (action.type) {
      case trigger:
        return undefined;
      default:
        return state;
    }
  }
};


export const series = createSimpleReducer(actions.updateSeriesData, {});
export const seasons = createSimpleReducer(actions.updateSeasonsData, {});
export const episodes = createSimpleReducer(actions.updateEpisodesData, {});
export const bets = createSimpleReducer(actions.updateBetsData, {});
export const stats = createSimpleReducer(actions.updateStatsData, {});
export const leaderboard = createSimpleReducer(actions.updateLeaderboardData, {});


export var users = (state = {}, action) => {

  switch(action.type) {
    case action_type.USERS_UPDATE_DATA: {
      return action.payload;
    }
    case action_type.UPDATE_USER: {
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    }
    case action_type.UPDATE_DISPLAY_NAME: {
      const {uid, displayName} = action.payload;
      return {
        ...state,
        [uid]: {
          ...state[uid],
          displayName
        }
      }
    }
    case action_type.LOGOUT:
      return {};
    default:
      return state;
  };
};

export var login = (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        uid: action.payload
      };
    case action_type.UPDATE_USER: {
      const user = action.payload;
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
      return {};
    default:
      return state;
  }
};


export var labels = (state = {}, action) => {
  switch(action.type) {
    case action_type.UPDATE_LABEL:
      let newState = {...state};
      newState[action.payload.label] = action.payload.data;
      return newState;
    default:
      return state;
  }
};


export const prefs = (state = {}, action) => {
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


const defaultAPIState = {
  sync: false,    // State updated from server at least once
  syncing: 0, // Number of outbound sync requests
  updatedAt: undefined // timestamp of most recent update
};
export const api = (state = defaultAPIState, action) => {
  switch(action.type) {
    case action_type.API_UPDATED: {
      return {
        ...state,
        sync: true
      };
    };
    case action_type.API_WATCH_DATA:
      return {
        ...state,
        syncing: state.syncing + 1
      };
    case action_type.API_WATCH_CONFIRM:
      return {
        ...state,
        syncing: state.syncing > 0 ? state.syncing - 1 : 0
      };
    default:
      return state;
  };
};

export const form = formReducer.plugin({
  series: clearForm(action_type.SERIES_CREATED),
  season: clearForm(action_type.SEASON_CREATED),
  epidode: clearForm(action_type.EPISODE_CREATED)
});
