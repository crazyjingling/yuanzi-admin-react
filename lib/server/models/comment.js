/*
 * 评论
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
		default: Date.now
	},
	reason: {
		type: String
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
var commentSchema = new Schema({ // 卡片评论、回复
	commentUser: { // 评论者
		type: ObjectId,
		ref: 'UserV2',
		required: true

	},
	targetUser: { // 评论对象
		type: ObjectId,
		ref: 'UserV2'

	},
	content: { // 内容
		type: String,
		required: true

	},
	images: [{
		type: String
	}],
	imagesCount: {
		type: Number,
		default: 0
	},
	type: {
		type: String,
		enum: [
			'card',
			'strategy',
			'event',
			'photo',
			'article',
			'podcast'
		],
		default: 'strategy'
	},
	reportUsers: { // 举报
		type: [
			operateUserSchema
		]

	},
	strategy: {
		type: ObjectId,
		ref: 'Strategy'
	},
	photo: {
		type: ObjectId,
		ref: 'PhotoV2'
	},
	event: {
		type: ObjectId,
		ref: 'activity'
	},
	card: {
		type: ObjectId,
		ref: 'CardV2'
	},
	article: {
		type: ObjectId,
		ref: 'Article'
	},
	podcast: {
		type: ObjectId,
		ref: 'podcast'
	},
	praiseUsers: {
		type: [
			operateUserSchema
		]
	},
	praiseCount: {
		type: Number,
		default: 0
	},
	isPassed: {
		type: Boolean,
		default: true
	},
	createdAt: {
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

commentSchema.virtual('commentId').get(function () {
	return this._id;
});

commentSchema.options.toObject.transform = function (doc, ret) {
	if (ret.commentUser) {
		delete ret.commentUser._id;
	}
	if (ret.targetUser) {
		delete ret.targetUser._id;
	}
	delete ret.__v;
	delete ret._id;

};
commentSchema.options.toJSON.transform = function (doc, ret) {
	if (ret.commentUser) {
		delete ret.commentUser._id;
	}
	if (ret.targetUser) {
		delete ret.targetUser._id;
	}
	delete ret.isPassed;
	delete ret.__v;
	delete ret._id;
};
operateUserSchema.options.toObject.transform = function (doc, ret) {
	delete ret._id;
};

var CommentModel = mongoose.model('comment', commentSchema);

export default CommentModel;
