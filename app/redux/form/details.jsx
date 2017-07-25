import moment from 'moment';
import { SubmissionError } from 'redux-form';
import { isEmpty } from 'utils';
import { toUnixTime } from 'redux/form/normalizers';

/*
 * Helper functions
 */
function trimObject(orig) {
  let obj = Object.assign({}, orig);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].trim();
      }
    }
  }
  return obj;
};

/**
 * SEASON create / update
 */

export const seasonFormName = 'season';

export const seasonDefaults = {
  title: '',
  description: '',
  season: '',
  lock_at: '',
  published: false
};

export function seasonInitialValues(season) {
  if (season) {
    return {
      ...season,
      lock_at: moment(season.lock_at).format()
    }
  } else {
    return seasonDefaults;
  }
};

export function seasonValidation(values) {
  let errors = {};
  let nvals = trimObject(values);

  const lock_at = moment(nvals.lock_at);
  if (!lock_at.isValid()) {
    errors.lock_at = 'Invalid lock date specified.';
  }
  nvals.lock_at = toUnixTime(lock_at);

  nvals.published = !!nvals.published;

  if (isEmpty(errors)) {
    return nvals;
  } else {
    throw new SubmissionError(errors);
  }
};

/**
 * EPISODE create / update
 */
export const episodeFormName = 'episode';

export const episodeDefaults = {
  episode: '',
  name: '',
  description: '',
  article: '',
  hbo: '',
  preview: '',
  published: false,
  air_at: moment({ hour: 18, minute: 0, second: 0 }).day(7),
  lock_at: moment({ hour: 17, minute: 55, second: 0 }).day(7)
};

export function episodeValidation(values) {

  let errors = {};
  let nvals = trimObject(values);

  // convert to bool
  nvals.published = !!nvals.published;

  const air_at = moment(nvals.air_at);
  if (!air_at.isValid()) {
    errors.air_at = 'Invalid air date specified.';
  }
  nvals.air_at = toUnixTime(air_at);

  const lock_at = moment(nvals.lock_at);
  if (!lock_at.isValid()) {
    errors.lock_at = 'Invalid lock date specified.';
  }
  nvals.lock_at = toUnixTime(lock_at);

  if (isEmpty(errors)) {
    return nvals;
  } else {
    throw new SubmissionError(errors);
  }
};


/**
 * BET create / update
 */
export const betFormName = 'bet';

export const betDefaults = {
  name: '',
  desc: '',
  odds_payout: '',
  odds_wager: '',
  order: '',
};

export function betValidation (values) {

  let errors = {};
  let nvals = trimObject(values);

  if (isEmpty(errors)) {
    return nvals;
  } else {
    throw new SubmissionError(errors);
  }
};


/**
 * Wager form defaults
 */

// Initial Values
export const wagerDefaults = {
  wager: 0,
  comment: '',
  betId: ''
};

