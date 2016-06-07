import moment from 'moment';

export const Events = [
  {
    id: '8',
    type: 'TV_EPISODE',
    season: 6,
    episode: 8,
    order: 8,
    series: 'Game of Thrones',
    name: 'No One',
    air_at: moment('2016-06-13T01:00:00Z').unix()*1000,
    lock_at: moment('2016-06-13T00:50:00Z').unix()*1000,
    article: '',
    confirmation: '',
    preview: 'https://youtu.be/fIOiAfEIk_g',
    published: true,
    resolved: false,
    created_at: Date.now(),
    updated_at: Date.now()
  }
];


export default Events;