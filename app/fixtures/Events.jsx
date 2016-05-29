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
    lock_at: moment('2016-06-06T00:00:00Z').unix()*1000,
    article: '',
    order: 5,
    published: false,
    created_at: moment('2016-05-27T00:00:00Z').unix()*1000,
    updated_at: moment('2016-05-27T00:00:00Z').unix()*1000
  },{
    id: '6',
    type: 'TV_EPISODE',
    season: 6,
    episode: 6,
    series: 'Game of Thrones',
    name: 'Blood of My Blood',
    aired: false,
    air_at: moment('2016-05-30T01:00:00Z').unix()*1000,
    lock_at: moment('2016-05-30T00:00:00Z').unix()*1000,
    article: 'http://www.avclub.com/article/its-high-sparrow-time-here-are-weeks-game-thrones--237341',
    order: 5,
    published: true,
    created_at: moment('2016-05-27T09:00:00Z').unix()*1000,
    updated_at: moment('2016-05-27T09:00:00Z').unix()*1000
  },{
    id: '5',
    type: 'TV_EPISODE',
    season: 6,
    episode: 5,
    series: 'Game of Thrones',
    name: 'The Door',
    aired: true,
    air_at: moment('2016-05-23T01:00:00Z').unix()*1000,
    lock_at: moment('2016-05-23T00:00:00Z').unix()*1000,
    article: 'http://www.avclub.com/article/beware-greyscale-here-are-weeks-game-thrones-dead--236988',
    order: 4,
    published: true,
    created_at: moment('2016-05-20T00:00:00Z').unix()*1000,
    updated_at: moment('2016-05-20T00:00:00Z').unix()*1000
  }, {
    id: '4',
    type: 'TV_EPISODE',
    season: 6,
    episode: 4,
    series: 'Game of Thrones',
    name: 'Book of the Stranger',
    aired: true,
    air_at: moment('2016-05-16T01:00:00Z').unix()*1000,
    lock_at: moment('2016-05-16T00:00:00Z').unix()*1000,
    article: 'http://www.avclub.com/article/all-boltons-must-die-here-are-weeks-game-thrones-d-236628',
    order: 3,
    published: true,
    created_at: moment('2016-05-13T00:00:00Z').unix()*1000,
    updated_at: moment('2016-05-13T00:00:00Z').unix()*1000
  }, {
    id: '3',
    type: 'TV_EPISODE',
    season: 6,
    episode: 3,
    series: 'Game of Thrones',
    name: 'Oathbreaker',
    aired: true,
    air_at: moment('2016-05-09T01:00:00Z').unix()*1000,
    lock_at: moment('2016-05-09T00:00:00Z').unix()*1000,
    article: 'http://www.avclub.com/article/watch-out-waif-here-are-weeks-game-thrones-dead-po-236278',
    order: 2,
    published: true,
    created_at: moment('2016-05-06T00:00:00Z').unix()*1000,
    updated_at: moment('2016-05-06T00:00:00Z').unix()*1000
  }, {
    id: '2',
    type: 'TV_EPISODE',
    season: 6,
    episode: 2,
    series: 'Game of Thrones',
    name: 'Home',
    aired: true,
    air_at: moment('2016-05-02T01:00:00Z').unix()*1000,
    lock_at: moment('2016-05-02T00:00:00Z').unix()*1000,
    article: 'http://www.avclub.com/article/heres-weeks-game-thrones-dead-pool-complete-profes-235929',
    order: 1,
    published: true,
    created_at: moment('2016-04-29T00:00:00Z').unix()*1000,
    updated_at: moment('2016-04-29T00:00:00Z').unix()*1000
  }
];


export default Events;
