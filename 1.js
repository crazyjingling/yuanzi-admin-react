var filter = require('lodash.filter');
var keys = require('lodash.keys');
var forEach = require('lodash.forEach');
var indexOf = require('lodash').indexOf;

console.log(Object.assign(
	{},
	{'isRecommended.stateType': {'$ne': 'rejected'}}
));
