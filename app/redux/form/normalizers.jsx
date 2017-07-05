import moment from 'moment';


export const toInt = value => value && parseInt(value, 10);

export const toUnixTime = value => value && moment(value).utc().valueOf();


