/**
 * Created by matonghe on 16/5/30.
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;
import moment from 'moment';
var participantSchema = new Schema({
	participant: {
		type: ObjectId,
		ref: 'UserV2'
	},
	appliedAt: {
		type: Date,
		default: Date.now,
		get: function (date) {
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		}
	}
});
var collectSchema = new Schema({// 图片 + 描述
	user: {
		type: ObjectId,
		ref: 'UserV2'
	},
	collectedAt: {
		type: Date,
		required: true,
		default: Date.now,
		get: function (date) {
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		}
	}

});
var userScoreSchema = new Schema({
	user: {
		type: ObjectId,
		ref: 'UserV2',
		required: true
	},
	score: {
		type: Number,
		default: '0',
		enum: [
			'0',
			'1',
			'2',
			'3',
			'4'
		]
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
var PodcastSchema = new Schema({
	owner: {//讲师
		type: ObjectId,
		ref: 'UserV2'
	},
	ownerIntroduction: {//讲师简介
		type: String,
		default: '元子育儿'
	},
	title: {
		type: String,
		default: '元子育儿'
	},
	cover: {//封面
		type: String,
		default: ''
	},
	content: { // 课程概述
		type: String
	},
	isBanner: {
		type: Boolean,
		default: false
	},
	bannerImg: {
		type: String
	},
	tupian: {//:todo 后台保留字段,API不需要
		type: String
	},
	participants: { // 参与者
		type: [
			participantSchema
		]

	},
	status: {
		type: Number,
		enum: [
			-3,//申请取消微课失败//publish
			-2,//申请取消微课//publish
			-1,//发布微课审核不通过//draft
			0,//发布微课审核中//draft
			1,//微课报名中//publish
			2,//微课进行中//publish
			3,//微课结束//draft
			4//微课已取消//draft

		],
		default: 0,
		get: function(status){
			switch (status){
				case -3:
					status = '申请取消微课失败';
					break;
				case -2:
					status = '申请取消微课';
					break;
				case -1:
					status = '发布微课审核不通过';
					break;
				case 0:
					status = '发布微课审核中';
					break;
				case 1:
					status = '微课报名中';
					break;
				case 2:
					status = '微课进行中';
					break;
				case 3:
					status = '微课结束';
					break;
				default:
					status = '微课已取消';
					break
			}
		}
	},
	collectUsers: { // 收藏者
		type: [
			collectSchema
		]
	},
	userScores: { // 用户评分
		type: [
			userScoreSchema
		]
	},
	scores: {
		level1: {
			type: Number,
			default: 0
		},
		level2: {
			type: Number,
			default: 0
		},
		level3: {
			type: Number,
			default: 0
		},
		level4: {
			type: Number,
			default: 0
		},
		level5: {
			type: Number,
			default: 0
		}
	},
	refundReason:{
		type: String
	},
	price: {
		type: Number
	},
	currency: {
		type: String,
		default: 'CNY'
	},
	priceType: {
		type: String,
		set: function () {
			return this.price > 0 ? '收费' : '免费';
		}
	},
	enrollCount: {
		type: Number,
		default: 0
	},
	isRecommended: { // 微课状态
		stateType: {
			type: String,
			default: 'draft',
			enum: [
				'publish',
				'draft'
			], // 发布,草稿,过期
			get: function (stateType) {
				switch (stateType) {
					case 'publish':
						stateType = '已上线';
						break;
					default:
						stateType = '未上线';
				}
				return stateType;
			}
		},
		recommendAt: {//发布时间
			type: Date,
			get: function (date) {
				return this.isRecommended.stateType === '已上线' ? moment(date).format('YYYY-MM-DD HH:mm:ss') : '';
			}

		}
	},
	sharedUsers: { // 分享者
		type: [
			{
				type: ObjectId,
				ref: 'UserV2'
			}
		]
	},
	startDate: {
		type: Date,
		default: Date.now,
		get: function (date) {
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		}
	},
	endDate: {
		type: Date,
		default: Date.now,
		get: function (date) {
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		}
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: function (date) {
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		}
	}
});

PodcastSchema.options.toJSON = {
transform:
	function (doc, ret) {
		ret.podcastId = ret._id;
		ret.sharedCount = (ret.sharedUsers && ret.sharedUsers.length) || 0;
		ret.collectCount = (ret.collectUsers && ret.collectUsers.length) || 0;
		delete ret.__v;
		delete ret._id;
		delete ret.sharedUsers;
		//delete ret.collectUsers;

	}
};

const PodcastModel = mongoose.model('podcast', PodcastSchema);
export default PodcastModel;
