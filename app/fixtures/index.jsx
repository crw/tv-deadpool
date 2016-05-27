import moment from 'moment';

export var User = {
  name: 'Craig',
  balance: 70,
  winnings: 0,
  losses: 0,
  labels: {
    'AVClub Staffer': true
  },
  bets: [
    {
      id: '1',
      amount: 30,
      comment: 'Seems like a safe bet',
      created_at: moment().unix(),
      updated_at: moment().unix()
    }
  ],
  created_at: moment().unix(),
  updated_at: moment().unix()
};

export var scoreboard = [
  {
    uid: '123',
    winnings: 150,
    losses: 250,
    balance: 0,
    updated_at: moment().unix(),
    labels: {
      'AVClub Staffer': true
    }
  }
];

export var Bets = [
  {
    id: '1',
    event_id: '5',
    name: 'Loras Tyrell',
    desc: '',
    odds: {
      payout: 3,
      wager: 1
    },
    paid: false,
    closed: false,
    note: '',
    official: true,
    order: 1,
    published: true,
    created_at: moment().unix(),
    updated_at: moment().unix()
  }, {
    id: '2',
    event_id: '5',
    name: 'Kevan Lannister',
    desc: 'the Hand of the King',
    odds: {
      payout: 4,
      wager: 1
    },
    paid: false,
    closed: false,
    note: '',
    official: true,
    order: 2,
    published: true,
    created_at: moment().unix(),
    updated_at: moment().unix()
  }, {
    id: '3',
    event_id: '5',
    name: 'Rickon Stark',
    desc: '',
    odds: {
      payout: 4,
      wager: 1
    },
    paid: false,
    closed: false,
    note: '',
    official: true,
    order: 3,
    published: true,
    created_at: moment().unix(),
    updated_at: moment().unix()
  }, {
    id: '4',
    event_id: '5',
    name: 'Jorah Mormont',
    desc: '',
    odds: {
      payout: 5,
      wager: 1
    },
    paid: false,
    closed: false,
    note: '',
    official: true,
    order: 3,
    published: true,
    created_at: moment().unix(),
    updated_at: moment().unix()
  }, {
    id: '5',
    event_id: '4',
    name: 'Ramsay Bolton',
    desc: '',
    odds: {
      payout: 2,
      wager: 1
    },
    paid: false,
    closed: true,
    note: '',
    official: true,
    order: 1,
    published: true,
    created_at: moment().unix(),
    updated_at: moment().unix()
  }, {
    id: '6',
    event_id: '4',
    name: 'Rickon Stark',
    desc: '',
    odds: {
      payout: 3,
      wager: 1
    },
    paid: false,
    closed: true,
    note: '',
    official: true,
    order: 2,
    published: true,
    created_at: moment().unix(),
    updated_at: moment().unix()
  }, {
    id: '7',
    event_id: '4',
    name: 'Osha',
    desc: '',
    odds: {
      payout: 4,
      wager: 1
    },
    paid: true,
    closed: true,
    note: 'Stabbed in the throat at 23:16 by Ramsay Bolton',
    official: true,
    order: 2,
    published: true,
    created_at: moment().unix(),
    updated_at: moment().unix()
  }
];

export var Events = [
  {
    id: '5',
    type: 'TV_EPISODE',
    season: 6,
    episode: 5,
    series: 'Game of Thrones',
    name: 'The Door',
    aired: false,
    air_at: '2016-05-23T10:00:00Z',
    lock_at: '2016-05-23T08:00:00Z',
    article: 'http://www.avclub.com/article/beware-greyscale-here-are-weeks-game-thrones-dead--236988',
    order: 5,
    published: true,
    created_at: moment().unix(),
    updated_at: moment().unix()
  }, {
    id: '4',
    type: 'TV_EPISODE',
    season: 6,
    episode: 4,
    series: 'Game of Thrones',
    name: 'Book of the Stranger',
    aired: true,
    air_at: '2016-05-16T02:00:00Z',
    lock_at: '2016-05-15T02:00:00Z',
    article: 'http://www.avclub.com/article/all-boltons-must-die-here-are-weeks-game-thrones-d-236628',
    order: 4,
    published: true,
    created_at: moment().unix(),
    updated_at: moment().unix()
  }
];

export var Players = [];
