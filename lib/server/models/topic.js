import mongoose, {Schema} from 'mongoose';
import moment from 'moment';
import uniqueValidator from 'mongoose-unique-validator';
//todo: autoIncrement 在 graphql 中不能用,需要在graphql中实现此功能
//import autoIncrement from 'mongoose-auto-increment';
import _ from 'lodash';
var ObjectId = Schema.Types.ObjectId;

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
var topicCommentSchema = new Schema({ // 话题评论、回复
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
	isReported: { // 举报
		type: Boolean,
		default: false

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
var topicSchema = new Schema({

	owner: { // 话题作者
		type: ObjectId,
		ref: 'UserV2',
		required: true

	}, // own user id
	actors: { // 话题参与者
		type: [
			{
				type: ObjectId,
				ref: 'UserV2'

			}
		]

	},
	cards: { // 卡片
		type: [
			{
				type: ObjectId,
				ref: 'CardV2'

			}
		]

	},
	strategies: { // 妙招
		type: [
			{
				type: ObjectId,
				ref: 'Strategy'

			}
		]

	},
	title: { // 标题
		type: String,
		required: true,
		validate: function (val) {
			return val.length <= 20;
		}

	},
	labels: {
		type: [
			{
				type: ObjectId,
				ref: 'label'

			}
		]

	},
	onLabelTop: {//
		type: Date,
		default: Date.now
	},
	subTitle: { // 副标题
		type: String,
		default: ''

	},
	content: { // 话题内容
		type: String,
		default: ''

	},
	comments: { // 评论
		type: [
			topicCommentSchema
		]

	},
	viewUsers: { // 浏览者
		type: [
			{
				type: ObjectId,
				ref: 'UserV2'

			}
		]

	},
	praiseUsers: { // 收藏（点赞）者
		type: [
			{
				type: ObjectId,
				ref: 'UserV2'

			}
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
	followers: { // 关注
		type: [
			{
				type: ObjectId,
				ref: 'UserV2'

			}
		]

	},
	reportUsers: { // 举报者
		type: [
			{
				type: ObjectId,
				ref: 'UserV2'

			}
		]

	},
	collectUsers: {
		type: [
			operateUserSchema
		]
	},
	color: { // 颜色
		type: String,
		default: ''

	},
	cover: { // 封面
		type: String

	},
	isRecommended: { // 推荐
		stateType: {
			type: String,
			default: 'undone',
			enum: [
				'done',//通过审核
				'undone',//待审核
				'rejected'//未通过审核的,及删除的
			], // 推荐，未被推荐
			get: function (stateType, a, b, c) {
				return stateType === 'done' ? this.isRecommended.recommendAt : '未上线'
			}
		},
		recommendAt: {
			type: Date,
			get: function (date) {
				return moment(date).format('YYYY-MM-DD');
			}

		}

	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
		get: function (date) {
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		}

	},
	updatedAt: {
		type: Date,
		required: true,
		default: Date.now,
		get: function (date) {
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		}

	},
	//虚拟数
	artificialCount: {
		type: Number,
		default: 0
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
topicCommentSchema.virtual('commentId').get(function () {
	return this._id;
});
topicSchema.virtual('topicId').get(function () {
	return this._id;
});
topicSchema.virtual('commentCount').get(function () {
	//return (this.comments && this.comments.length) || 0;
	return (this.cards && this.cards.length) || 0;
});
topicSchema.virtual('praiseCount').get(function () {
	return (this.praiseUsers && this.praiseUsers.length) || 0;
});
topicSchema.virtual('sharedCount').get(function () {
	return (this.sharedUsers && this.sharedUsers.length) || 0;
});
topicSchema.virtual('collectCount').get(function () {
	return (this.collectUsers && this.collectUsers.length) || 0;
});
topicSchema.virtual('cardsCount').get(function () {
	return (this.cards && this.cards.length) || 0;
});
topicSchema.virtual('strategiesCount').get(function () {
	return (this.cards && this.cards.length) || 0;
});
topicSchema.virtual('followersCount').get(function () {
	return (this.followers && this.followers.length) || 0;
});
topicSchema.virtual('viewCount').get(function () {
	//return (this.viewUsers && this.viewUsers.length) || 0;
	//请先设置更新数据库中的artificialCount的值
	var count = (this.viewUsers && this.viewUsers.length) || 0;
	if(!this.artificialCount){
		this.artificialCount = 0;
	}
	return count + parseInt(this.artificialCount);
});
topicSchema.virtual('isReported').get(function () {
	return (this.reportUsers && this.reportUsers.length) ? true : false;
});

topicSchema.options.toObject.transform = function (doc, ret) {
	delete ret.__v;
	delete ret._id;
	delete ret.artificialCount;
	delete ret.onLabelTop;
	//delete ret.isRecommended;
	delete ret.sharedUsers;
	delete ret.viewUsers;
	delete ret.reportUsers;

};
topicCommentSchema.options.toObject.transform = function (doc, ret) {
	if (ret.commentUser) {
		delete ret.commentUser._id;
	}
	if (ret.targetUser) {
		delete ret.targetUser._id;
	}
// TODO:试了无数遍_id commentId都会同时出现同时消失
};
operateUserSchema.options.toObject.transform = function (doc, ret) {
	delete ret._id;
};

var TopicCommentommentModel = mongoose.model('TopicCommentModel', topicCommentSchema);
var TopicModel = mongoose.model('TopicV2', topicSchema);
export default {TopicModel, TopicCommentommentModel};
