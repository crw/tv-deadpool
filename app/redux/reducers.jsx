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

function clearForm(state, action, trigger) {
  switch (action.type) {
    case trigger:
      return undefined;
    default:
      return state;
  }
};


export const series = createSimpleReducer(actions.updateSeriesData, {});
export const seasons = createSimpleReducer(actions.updateSeasonsData, {});
export const episodes = createSimpleReducer(actions.updateEpisodesData, {});
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

export var login = (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        uid: action.payload
      };
    case 'UPDATE_USER': {
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
    case 'UPDATE_LABEL':
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
  updatedAt: undefined // timestamp of most recent update
};
export const api = (state = defaultAPIState, action) => {
  switch(action.type) {
    case action_type.API_UPDATED: {
      return {
        ...state,
        sync: true
      }
    };
    default:
      return state;
  };
};

export const form = formReducer.plugin({
  series: (state, action) => clearForm(state, action, action_type.SERIES_CREATED),
  season: (state, action) => clearForm(state, action, action_type.SEASON_CREATED),
  epidode: (state, action) => clearForm(state, action, action_type.EPISODE_CREATED),
  bet: (state, action) => clearForm(state, action, action_type.BET_CREATED)
});
