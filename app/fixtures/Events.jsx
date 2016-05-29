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
    air_at: moment('2016-05-29T06:00:00Z').unix(),
    lock_at: moment('2016-05-29T06:00:00Z').unix(),
    article: '',
    order: 5,
    closed: false,
    published: false,
    created_at: moment('2016-05-27T00:00:00Z').unix(),
    updated_at: moment('2016-05-27T00:00:00Z').unix()
  },{
    id: '6',
    type: 'TV_EPISODE',
    season: 6,
    episode: 6,
    series: 'Game of Thrones',
    name: 'Blood of My Blood',
    aired: false,
    air_at: moment('2016-05-29T06:00:00Z').unix(),
    lock_at: moment('2016-05-29T06:00:00Z').unix(),
    article: '',
    order: 5,
    closed: false,
    published: true,
    created_at: moment('2016-05-27T09:00:00Z').unix(),
    updated_at: moment('2016-05-27T09:00:00Z').unix()
  },{
    id: '5',
    type: 'TV_EPISODE',
    season: 6,
    episode: 5,
    series: 'Game of Thrones',
    name: 'The Door',
    aired: true,
    air_at: moment('2016-05-15T06:00:00Z').unix(),
    lock_at: moment('2016-05-15T06:00:00Z').unix(),
    article: 'http://www.avclub.com/article/beware-greyscale-here-are-weeks-game-thrones-dead--236988',
    order: 4,
    closed: true,
    published: true,
    created_at: moment('2016-05-20T00:00:00Z').unix(),
    updated_at: moment('2016-05-20T00:00:00Z').unix()
  }, {
    id: '4',
    type: 'TV_EPISODE',
    season: 6,
    episode: 4,
    series: 'Game of Thrones',
    name: 'Book of the Stranger',
    aired: true,
    air_at: moment('2016-05-15T06:00:00Z').unix(),
    lock_at: moment('2016-05-15T06:00:00Z').unix(),
    article: 'http://www.avclub.com/article/all-boltons-must-die-here-are-weeks-game-thrones-d-236628',
    order: 3,
    closed: true,
    published: true,
    created_at: moment('2016-05-13T00:00:00Z').unix(),
    updated_at: moment('2016-05-13T00:00:00Z').unix()
  }, {
    id: '3',
    type: 'TV_EPISODE',
    season: 6,
    episode: 3,
    series: 'Game of Thrones',
    name: 'Oathbreaker',
    aired: true,
    air_at: moment('2016-05-08T06:00:00Z').unix(),
    lock_at: moment('2016-05-08T12:00:00Z').unix(),
    article: 'http://www.avclub.com/article/watch-out-waif-here-are-weeks-game-thrones-dead-po-236278',
    order: 2,
    closed: true,
    published: true,
    created_at: moment('2016-05-06T00:00:00Z').unix(),
    updated_at: moment('2016-05-06T00:00:00Z').unix()
  }, {
    id: '2',
    type: 'TV_EPISODE',
    season: 6,
    episode: 2,
    series: 'Game of Thrones',
    name: 'Home',
    aired: true,
    air_at: moment('2016-05-01T06:00:00Z').unix(),
    lock_at: moment('2016-05-01T12:00:00Z').unix(),
    article: 'http://www.avclub.com/article/heres-weeks-game-thrones-dead-pool-complete-profes-235929',
    order: 1,
    closed: true,
    published: true,
    created_at: moment('2016-04-29T00:00:00Z').unix(),
    updated_at: moment('2016-04-29T00:00:00Z').unix()
  }
];


export default Events;
