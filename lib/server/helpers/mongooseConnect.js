import mongoose from 'mongoose';
import config from '../../../useConfig';
import logger from '../logger';

var connectMongo = function () {
	return mongoose.connect(config.dbURI, {
		mongos: true

	}, function (err) {
		if (err) {
			logger.warn('\u4E0Emongodb\u65AD\u5F00\u8FDE\u63A5 %ssec \u540E\u91CD\u8BD5', config.reConnectTime / 1000);
			setTimeout(connectMongo, config.reConnectTime);
		}
		else {
			logger.info('\u5DF2\u8FDE\u63A5\u5230mongodb');
		}
	});
};

export default connectMongo;
