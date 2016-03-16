import filesize from 'file-size';
import mongoose from 'mongoose';
import uuid from 'node-uuid';
import path from 'path';
import {
	GraphQLNonNull
} from 'graphql';

import authorize from '../../authorize';
import createImageThumbnail from '../../../helpers/create-image-thumbnail';
import fileMimetype from '../../../helpers/file-mimetype';
import mediaInputType from '../../types/media-input';
import mediaType from '../../types/media';
import writeFile from '../../../helpers/write-file';
import MediaModel from '../../../models/media';
import {getMediaType} from '../../../../helpers/mime-types';
import {uploadImage} from '../../../helpers/uploadToOss';
import {ossObjURI} from '../../../helpers/ossClient';
import {oss} from '../../../../../useConfig';

export default {
	type: mediaType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(mediaInputType)
		}
	},
	async resolve (root, params, options) {
		authorize(root);

		var newMedia;
		var mediaModel = {};

		const id = mongoose.Types.ObjectId();
		const idStr = id.toString();

		var relativePath;
		var filePath;
		var file = params.data.file;

		const mimetype = fileMimetype(file);
		relativePath = path.join('media', idStr);
		filePath = path.join(__dirname, '../../../../../public', relativePath);
		file = await writeFile(file, filePath);

		//上传到阿里云
		const ossFileName = uuid();
		const ossPath = ossObjURI(idStr) + ossFileName;
		const ossUrl = oss.imgDomain + ossPath;
		console.log('=================================idStr', idStr);
		console.log('=================================ossFileName', ossFileName);
		console.log('=================================ossPath', ossPath);
		console.log('=================================ossUrl', ossUrl);
		try{
			const uploadImageRes = await uploadImage(file.destPath, ossPath);
		}catch (e) {
			console.log('=================================e', e);
		}

		// Image Upload
		if (getMediaType(mimetype) === 'image') {
			const {thumbnailPath, metadata} = await createImageThumbnail(
				file.destPath,
				filePath,
				{
					width: 100,
					height: 100,
					quality: 100
				}
			);

			Object.assign(mediaModel, {
				dimension: {
					width: metadata.width,
					height: metadata.height
				},
				thumbnail: path.join(relativePath, thumbnailPath)
			});
		}
		// Create and save a new `MediaModel`
		const media = new MediaModel(Object.assign(mediaModel, {
			_id: id,
			name: file.filename,
			fileName: file.filename,
			type: mimetype,
			size: filesize(file.size).human(),
			filesize: file.size,
			absoluteUrl: file.destPath,
			url: path.join(relativePath, file.filename),
			ossUrl: ossUrl
		}));

		newMedia = await media.save();

		if (!newMedia) {
			throw new Error('Error adding new media');
		}

		return newMedia;
	}
};
