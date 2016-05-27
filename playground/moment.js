var moment = require('moment');

m = moment();

console.log(m.unix());
console.log(m.format());
console.log(moment.unix(m.unix()).format());
console.log(moment.unix(1464220523).format());
