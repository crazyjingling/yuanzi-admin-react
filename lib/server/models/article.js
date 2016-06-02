
/*** Created by matonghe on 15/5/14.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;
import moment from 'moment';
const praisesSchema = new Schema({// 图片 + 描述
	user: {
		type: ObjectId,
		ref: 'UserV2'
	},
	operatedAt: {
		type: Date,
		required: true,
		default: Date.now
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
const reportSchema = new Schema({// 图片 + 描述
	user: {
		type: ObjectId,
		ref: 'UserV2'
	},
	operatedAt: {
		type: Date,
		required: true,
		default: Date.now
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
const collectSchema = new Schema({// 图片 + 描述
	user: {
		type: ObjectId,
		ref: 'UserV2'
	},
	collectedAt: {
		type: Date,
		required: true,
		default: Date.now
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
const articleSchema = new Schema({
	title: {
		type: String

	},
	owner: {
		type: ObjectId,
		ref: 'UserV2',
		required: true
	},
	photos: {
		type: [
			{
				type: String
			}
		]
	},
	reportUsers: { // 举报者
		type: [
			reportSchema
		]
	},
	collectUsers: { // 举报者
		type: [
			collectSchema
		]
	},
	praiseUsers: {
		type: [praisesSchema]
	},
	isDel:{
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

articleSchema.options.toJSON = {
	transform: function(doc, ret) {
		ret.articleId = ret._id;
		ret.reportsCount =  (ret.reportUsers && ret.reportUsers.length) || 0;
		ret.praisesCount =  (ret.praiseUsers && ret.praiseUsers.length) || 0;
		ret.collectedCount =  (ret.collectUsers && ret.collectUsers.length) || 0;
		delete ret._id;
		delete ret.__v;
	}
};
var ArticleModel = mongoose.model('article', articleSchema);
export default ArticleModel;
