import OSS from 'oss-client';
import moment from 'moment';
import config from '../../../useConfig';
import logger from '../logger';
export var ossObjURI = function (mediaId) {
	const date = moment().format('YYYY-MM-DD');
	return 'media/'+ mediaId+ '/' + date + '/';
};
export default OSS.create({
	accessKeyId: config.oss.accessKeyId,
	accessKeySecret: config.oss.accessKeySecret,
	host: config.oss.host,
	port: config.oss.port
});
