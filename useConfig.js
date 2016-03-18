var config = require('./config');
var configDev = require('./config_dev');
var processEnv = process.env.NODE_ENV;
if (processEnv !== 'production') {
	module.exports = configDev;
}
else {
	//todo: oneapm
	//require('oneapm');
	module.exports = configDev;
}
