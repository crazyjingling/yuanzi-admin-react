var filter = require('lodash.filter');
var keys = require('lodash.keys');
var forEach = require('lodash.forEach');
var indexOf = require('lodash').indexOf;
var a =[ { owner: /.*田原子/i } ];
b = forEach(a, function (index, value) {
	if(keys(index).indexOf('owner') !== -1){
		var owner = 'jjjj';
		index['owner'] = owner
	}
});
console.log('=================================b', b);
