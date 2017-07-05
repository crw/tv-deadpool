import moment from 'moment';


// Validators!
export const required = value => (value || value === 0 ? undefined : 'Required');

export const greaterThanZero = value => (value > 0) ? undefined : 'Value must be greater than zero.'

export const isValidDatetime = value => (moment(value).isValid() ? undefined : 'Invalid datetime format.');