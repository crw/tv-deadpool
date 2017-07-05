import { toArray } from 'utils';


function keyFilter(obj, key, filterval) {
  const arr = toArray(obj) || [];
  return arr.filter(item => item[key] === filterval);
};


export function getSeasonsForSeries(state, seriesId) {
  return keyFilter(state.seasons, 'series', seriesId);
}

export function getEpisodesForSeason(state, seasonId) {
  return keyFilter(state.episodes, 'season', seasonId);
};

export function getBetsForEpisode(state, episodeId) {
  return keyFilter(state.bets, 'episode', episodeId);
};