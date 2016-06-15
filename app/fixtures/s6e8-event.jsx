import moment from 'moment';

export const Events = [
  {
    id: '9',
    type: 'TV_EPISODE',
    season: 6,
    episode: 9,
    order: 9,
    series: 'Game of Thrones',
    name: 'Battle of the Bastards',
    air_at: moment('2016-06-20T01:00:00Z').unix()*1000,
    lock_at: moment('2016-06-20T00:50:00Z').unix()*1000,
    article: '',
    confirmation: false,
    preview: '',
    published: false,
    resolved: false,
    created_at: Date.now(),
    updated_at: Date.now()
  }, {
    id: '10',
    type: 'TV_EPISODE',
    season: 6,
    episode: 10,
    order: 10,
    series: 'Game of Thrones',
    name: 'The Winds of Winter',
    air_at: moment('2016-06-27T01:00:00Z').unix()*1000,
    lock_at: moment('2016-06-27T00:50:00Z').unix()*1000,
    article: '',
    confirmation: false,
    preview: '',
    published: false,
    resolved: false,
    created_at: Date.now(),
    updated_at: Date.now()
  }
];


export default Events;