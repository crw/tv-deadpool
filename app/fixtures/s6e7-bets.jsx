import moment from 'moment';

let i = 0;

export const Bets = {
  '7': [
    {
      name: 'Some guy -- TEST BET',
      desc: '',
      odds_payout: 2,
      odds_wager: 1,
      paid: false,
      note: '',
      official: true,
      order: ++i,
      published: true,
      resolved: false,
      created_at: moment('2016-06-01T09:00:00Z').unix()*1000,
      updated_at: moment('2016-06-01T09:00:00Z').unix()*1000
    }, {
      name: 'Some other guy -- TEST BET',
      desc: '',
      odds_payout: 5,
      odds_wager: 1,
      paid: false,
      note: '',
      official: true,
      order: ++i,
      published: true,
      resolved: false,
      created_at: moment('2016-06-01T09:00:00Z').unix()*1000,
      updated_at: moment('2016-06-01T09:00:00Z').unix()*1000
    }
  ]
};


export default Bets;