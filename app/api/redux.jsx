import { toArray, getKey } from 'utils';


function keyFilter(obj, key, filterval) {
  const arr = toArray(obj) || [];
  return arr.filter(item => item[key] === filterval);
};

function hydrate(keys, state) {
  let output = [];
  for (let id of Object.keys(keys)) {
    const obj = getKey(state, id);
    if (obj) output.push(obj);
  }
  return output;
}

export function getSeasonsForSeries(state, id) {
  return hydrate(state.series[id].seasons, state.seasons);
  // return keyFilter(state.seasons, 'series', seriesId);
}

export function getEpisodesForSeason(state, seasonId) {
  return keyFilter(state.episodes, 'season', seasonId);
};

export function getBetsForEpisode(state, episodeId) {
  return keyFilter(state.bets, 'episode', episodeId);
};