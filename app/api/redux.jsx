import { isEmpty, toArray, getKey, sortObjectsByKey } from 'utils';


function keyFilter(obj, key, filterval) {
  const arr = toArray(obj) || [];
  return arr.filter(item => item[key] === filterval);
};

function hydrate(keys, state) {
  if (isEmpty(keys)) return [];
  let output = [];
  for (let id of Object.keys(keys)) {
    const obj = getKey(state, id);
    if (obj) output.push(obj);
  }
  return output;
}

export function published(arr) {
  return arr.filter(item => item.published);
}

export function ordered(arr, key='order') {
  return arr.sort(sortObjectsByKey(key, true));
}

export function getSeasonsForSeries(state, id) {
  return hydrate(state.series[id].seasons, state.seasons);
  // return keyFilter(state.seasons, 'series', seriesId);
}

export function getEpisodesForSeason(state, id) {
  return ordered(keyFilter(state.episodes, 'season', id), 'episode');
};

export function getBetsForEpisode(state, id) {
  return ordered(keyFilter(state.bets, 'episode', id));
};

export function getWagersForEpisode(state, userId, episodeId) {
  const user = state.users[userId];
  const bets = getBetsForEpisode(state, episodeId).map(item => item.id);

  if (!user) return [];
  return ordered(toArray(user.wagers).filter(item => bets.includes(item.id)));
}