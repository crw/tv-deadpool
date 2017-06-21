export const BETSLIST_SORTBY = {
  ARTICLE: 'avc',
  WIN_LOSS: 'winloss'
}

// Defaults
export const PRETTY_DATE_FORMAT = 'ddd, MMM Do YYYY, h:mm:ss a Z';
export const LOCALE = 'en-US';
export const CURRENCY_FORMAT = { style: 'currency', currency: 'USD', maximumFractionDigits: 0 };
export const DEFAULT_DISPLAY_NAME='A Faceless Man';


// Labels for specific form elements
export const LABEL_SERIES_TITLE = 'Title:';
export const LABEL_SERIES_DESCRIPTON = 'Description:';
export const LABEL_SERIES_PUBLISHED = 'Published?';


// Icons for common nouns
export const CLS_ICON_USER = 'fa fa-fw fa-user';
export const CLS_ICON_SUBMIT = 'fa fa-fw fa-cog';
export const CLS_ICON_SUBMITTING = CLS_ICON_SUBMIT + ' fa-spin';
export const CLS_ICON_CANCEL = 'fa fa-fw fa-ban';


// Input element placeholder text
export const INPUT_PLACEHOLDER_DISPLAYNAME = 'Change your name.';


// Button text
export const BTN_LABEL_NEW = 'New';
export const BTN_LABEL_CREATE = 'Create';
export const BTN_LABEL_SUBMIT = 'Save';
export const BTN_LABEL_CANCEL = 'Cancel';


// Errors
export const ERROR_DISPLAYNAME = 'Please enter a name.';
export const ERROR_DUPLICATE_FN = (value) => { return `Sorry, "${value}" is not available`};
