import moment from 'moment';

export const Events = [
  {
    id: '7',
    type: 'TV_EPISODE',
    season: 6,
    episode: 7,
    series: 'Game of Thrones',
    name: 'The Broken Man',
    aired: false,
    air_at: moment('2016-06-06T01:00:00Z').unix()*1000,
    lock_at: moment('2016-06-06T00:50:00Z').unix()*1000,
    article: 'http://www.avclub.com/article/will-mountain-fall-here-are-weeks-game-thrones-dea-237654',
    order: 7,
    published: true,
    resolved: false,
    created_at: moment('2016-06-03T00:00:00Z').unix()*1000,
    updated_at: moment('2016-06-03T00:00:00Z').unix()*1000
  }
];


export default Events;