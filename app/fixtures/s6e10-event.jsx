import moment from 'moment';

export const Events = [
  {
    id: '10',
    type: 'TV_EPISODE',
    season: 6,
    episode: 10,
    order: 10,
    series: 'Game of Thrones',
    name: 'The Winds of Winter',
    description: 'Cersei faces her trial.',
    air_at: moment('2016-06-27T01:00:00Z').unix()*1000,
    lock_at: moment('2016-06-27T00:50:00Z').unix()*1000,
    hbo: 'http://www.hbo.com/game-of-thrones/episodes/6/60-60-the-winds-of-winter/index.html',
    article: '',
    confirmation: false,
    preview: 'https://youtu.be/MehJaeTVrxI',
    published: false,
    resolved: false,
    created_at: Date.now(),
    updated_at: Date.now()
  }
];


export default Events;