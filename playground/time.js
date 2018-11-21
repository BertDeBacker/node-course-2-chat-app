var moment = require('moment')
    //time is stored as a number
    //0 =  Jan 1st 1970 00:00:00 am

// var date = new Date()
// var months = ['Jan', 'Feb']
// console.log(date.getMonth())

// var date = moment()
// console.log(date.format('MMM Do, YYYY'))

var date = moment()
date.subtract(3, 'hours')
    // 10:35 am
console.log(date.format('hh:mm a'))

// 6:01 am
console.log(date.format('h:mm a'))