import fs from 'fs';
import uuid from 'node-uuid';
import Q from 'q';
import child_process from 'child_process';
import util from 'util';
import logger from '../logger';
import config from '../../../useConfig';
import ossClient from './ossClient';
var ossConfig = config.oss;
var bucket = ossConfig.bucket;

/*
 * filePath：项目服务器上的文件位置（临时文件）,必须是./upload/.....
 * objectValue: 存储的位置（数据库需要保存的位置信息）
 * */
exports.uploadMp3 = function (filePath, objectValue, callback) {
	var filename = uuid.v4();
	Q().then(() => {
		if (fs.existsSync(filePath)) {
			const execStr = util.format('ffmpeg -y -i %s -acodec mp3 -aq 7 %s', filePath, './upload/' + filename + '.mp3');
			return child_process.exec(execStr);
		}
		else {
			throw new Error(filePath + ' 文件不存在');
		}
	}).then(() => {
		let srcFile;
		if (fs.existsSync(config.uploadDir + '/' + filename + '.mp3')) {
			srcFile = config.uploadDir + '/' + filename + '.mp3';
		}
		else {
			srcFile = filePath;
		}

		return ossClient.putObject({
			bucket: bucket,
			object: objectValue,
			srcFile: fs.createReadStream(srcFile),
			contentType: 'audio/mp3',
			contentLength: fs.statSync(srcFile).size

		});
	}).then((result) => callback && callback(null, result))
		.catch((err) => {
			if (err.message === 'getaddrinfo ESRCH') {
				err.message = '服务器网络错误';
			}

			logger.error('上传音频 --path: %s 失败 --file: %s --msg: %s --method: %s', filePath, __filename, err.message, 'publishMp3');
			callback && callback(err, err);
		});
};

/*
 * filePath：项目服务器上的文件位置（临时文件）,必须是./upload/.....
 * objectValue: 存储的位置（数据库需要保存的位置信息）
 * */
exports.uploadImage = function (filePath, objectValue, callback) {
	var filename = uuid.v4();
	Q().then(() => {
		return ossClient.putObject({
			bucket: bucket,
			object: objectValue,
			srcFile: fs.createReadStream(filePath),
			contentType: 'image/jpeg',
			contentLength: fs.statSync(filePath).size
		});
	}).then((result) => callback && callback(null, result))
		.catch((err) => {
			if (err.message === 'getaddrinfo ESRCH') {
				err.message = '服务器网络错误';
			}

			logger.error('--path: %s --file: %s --msg: %s --method: %s', filePath, __filename, err.message, 'publishCard');
			callback && callback(err, err);
		});
};

/*
 * filePath：项目服务器上的文件位置（临时文件）,必须是./upload/.....
 * objectValue: 存储的位置（数据库需要保存的位置信息）
 * */
exports.uploadHtml = function (filePath, objectValue, callback) {
	Q().then((cont) =>
		ossClient.putObject({
			bucket: bucket,
			object: objectValue,
			srcFile: fs.createReadStream(filePath),
			contentType: 'text/html',
			contentLength: fs.statSync(filePath).size

		})
	).then((result) => callback && callback(null, result)
	).catch((err) => {
		if (err.message === 'getaddrinfo ESRCH') {
			err.message = '服务器网络错误';
		}

		logger.error('--msg: %s', err.message);
		callback && callback(err, err);
	});
};
