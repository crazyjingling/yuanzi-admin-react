/*
 * 作品(照片)
 * */
import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
import moment from 'moment';
var operateUserSchema = new Schema({
	user: {
		type: ObjectId,
		ref: 'UserV2'
	},
	operatedAt: {
		type: Date,
		required: true,
		default: Date.now,
		get: function (date) {
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		}
	}

}, {
	id: false,
	toObject: {
		getters: true

	},
	toJSON: {
		getters: true

	}

});
var stepSchema = new Schema({// 图片 + 描述
	img: {
		type: String,
		required: true
	},
	desc: {
		type: String,
		default: ''
	}

}, {
	id: false,
	toObject: {
		getters: true

	},
	toJSON: {
		getters: true

	}

});
var reportSchema = new Schema({// 图片 + 描述
	user: {
		type: ObjectId,
		ref: 'UserV2'
	},
	operatedAt: {
		type: Date,
		required: true,
		default: Date.now,
		get: function (date) {
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		}
	},
	reason: {
		type: String,
		default: ''
	}

}, {
	id: false,
	toObject: {
		getters: true

	},
	toJSON: {
		getters: true

	}

});
var photoSchema = new Schema({

	strategy: {
		type: ObjectId,
		ref: 'Photo',
		required: true
	},
	content: { // 图片配文字
		type: [
			stepSchema
		]

	},
	owner: { // 作品作者
		type: ObjectId,
		ref: 'UserV2',
		required: true

	},
	praiseUsers: {
		type: [
			operateUserSchema
		]
	},
	reportUsers: { // 举报者
		type: [
			reportSchema
		]
	},
	sharedUsers: { // 分享者
		type: [
			{
				type: ObjectId,
				ref: 'UserV2'
			}
		]
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: function (date) {
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		}

	},
	updatedAt: {
		type: Date,
		default: Date.now,
		get: function (date) {
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		}

	}

}, {
	id: false,
	toObject: {
		getters: true

	},
	toJSON: {
		getters: true

	}

});

operateUserSchema.options.toObject.transform = function (doc, ret) {
	delete ret._id;
};

photoSchema.virtual('photoId').get(function () {
	return this._id;
});
photoSchema.virtual('praiseCount').get(function () {
	return (this.praiseUsers && this.praiseUsers.length) || 0;
});

photoSchema.virtual('sharedCount').get(function () {
	return (this.sharedUsers && this.sharedUsers.length) || 0;
});
photoSchema.virtual('reportCount').get(function () {
	return (this.reportUsers && this.reportUsers.length) || 0;
});
reportSchema.options.toObject.transform = function (doc, ret) {
	delete ret.__v;
	delete ret._id;
};
photoSchema.options.toObject.transform = function (doc, ret) {
	delete ret.__v;
	delete ret._id;
};
stepSchema.options.toObject.transform = function (doc, ret) {
	delete ret._id;
};
var PhotoModel = mongoose.model('PhotoV2', photoSchema);

export default PhotoModel;
