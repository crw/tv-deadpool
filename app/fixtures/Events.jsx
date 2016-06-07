import moment from 'moment';

export const Events = [
  {
    id: '6',
    type: 'TV_EPISODE',
    season: 6,
    episode: 6,
    series: 'Game of Thrones',
    name: 'Blood of My Blood',
    air_at: moment('2016-05-30T01:00:00Z').unix()*1000,
    lock_at: moment('2016-05-30T00:00:00Z').unix()*1000,
    article: 'http://www.avclub.com/article/its-high-sparrow-time-here-are-weeks-game-thrones--237341',
    confirmation: '',
    order: 5,
    published: true,
    resolved: true,
    created_at: moment('2016-05-27T09:00:00Z').unix()*1000,
    updated_at: moment('2016-05-27T09:00:00Z').unix()*1000
  },{
    id: '5',
    type: 'TV_EPISODE',
    season: 6,
    episode: 5,
    series: 'Game of Thrones',
    name: 'The Door',
    air_at: moment('2016-05-23T01:00:00Z').unix()*1000,
    lock_at: moment('2016-05-23T00:00:00Z').unix()*1000,
    article: 'http://www.avclub.com/article/beware-greyscale-here-are-weeks-game-thrones-dead--236988',
    confirmation: '',
    order: 4,
    published: true,
    resolved: true,
    created_at: moment('2016-05-20T00:00:00Z').unix()*1000,
    updated_at: moment('2016-05-20T00:00:00Z').unix()*1000
  }, {
    id: '4',
    type: 'TV_EPISODE',
    season: 6,
    episode: 4,
    series: 'Game of Thrones',
    name: 'Book of the Stranger',
    air_at: moment('2016-05-16T01:00:00Z').unix()*1000,
    lock_at: moment('2016-05-16T00:00:00Z').unix()*1000,
    article: 'http://www.avclub.com/article/all-boltons-must-die-here-are-weeks-game-thrones-d-236628',
    confirmation: '',
    order: 3,
    published: true,
    resolved: true,
    created_at: moment('2016-05-13T00:00:00Z').unix()*1000,
    updated_at: moment('2016-05-13T00:00:00Z').unix()*1000
  }, {
    id: '3',
    type: 'TV_EPISODE',
    season: 6,
    episode: 3,
    series: 'Game of Thrones',
    name: 'Oathbreaker',
    air_at: moment('2016-05-09T01:00:00Z').unix()*1000,
    lock_at: moment('2016-05-09T00:00:00Z').unix()*1000,
    article: 'http://www.avclub.com/article/watch-out-waif-here-are-weeks-game-thrones-dead-po-236278',
    confirmation: '',
    order: 2,
    published: true,
    resolved: true,
    created_at: moment('2016-05-06T00:00:00Z').unix()*1000,
    updated_at: moment('2016-05-06T00:00:00Z').unix()*1000
  }, {
    id: '2',
    type: 'TV_EPISODE',
    season: 6,
    episode: 2,
    series: 'Game of Thrones',
    name: 'Home',
    air_at: moment('2016-05-02T01:00:00Z').unix()*1000,
    lock_at: moment('2016-05-02T00:00:00Z').unix()*1000,
    article: 'http://www.avclub.com/article/heres-weeks-game-thrones-dead-pool-complete-profes-235929',
    confirmation: '',
    order: 1,
    published: true,
    resolved: true,
    created_at: moment('2016-04-29T00:00:00Z').unix()*1000,
    updated_at: moment('2016-04-29T00:00:00Z').unix()*1000
  }
];


export default Events;
