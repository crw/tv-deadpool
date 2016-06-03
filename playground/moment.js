var moment = require('moment');

let convertDate = process.env.DATE_TO_CONVERT;

console.log('Original Date', convertDate);
let unix = moment(convertDate).unix()*1000;
console.log('Unix:', unix);
console.log(moment(unix).format());
