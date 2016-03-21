var filter = require('lodash.filter');
var keys = require('lodash.keys');
var forEach = require('lodash.forEach');
var indexOf = require('lodash').indexOf;
var a =[{a:1,b:2},{a:2,b:2}];
console.log('=================================content', filter(a, function (item) {
	return item.b === 2;
}));
