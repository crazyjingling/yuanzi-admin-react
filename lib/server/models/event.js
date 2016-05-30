/**
 * Created by matonghe on 16/2/16.
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
}, {
	id: false,
	toObject: {
		getters: true

	},
	toJSON: {
		getters: true

	}

});
var EventSchema = new Schema({
	owner: {
		type: ObjectId,
		ref: 'UserV2'
	},
	title: {
		type: String,
		default: '元子育儿'
	},
	cover: {//封面
		type: String,
		default: ''
	},
	content: { // 内容
		type: String,
		required: true

	},
	isBanner: {
		type: Boolean,
		default: false
	},
	bannerImg: {
		type: String
	},
	tupian: {
		type: String
	},
	location: { // 活动举办地点
		type: String,
		required: true

	},
	number: { // 预设活动人数阈值
		type: Number,
		required: true

	},
	participants: { // 参与者
		type: [
			participantSchema
		]

	},
	status: {
		type: Number,
		enum: [
			-3,//申请取消活动失败//publish
			-2,//申请取消活动//publish
			-1,//发布活动审核不通过//draft
			0,//发布活动审核中//draft
			1,//活动报名中//publish
			2,//活动进行中//publish
			3,//活动结束//draft
			4//活动已取消//draft

		],
		default: 0,
		get: function(status){
			switch (status){
				case -3:
					status = '申请取消活动失败';
					break;
				case -2:
					status = '申请取消活动';
					break;
				case -1:
					status = '发布活动审核不通过';
					break;
				case 0:
					status = '发布活动审核中';
					break;
				case 1:
					status = '活动报名中';
					break;
				case 2:
					status = '活动进行中';
					break;
				case 3:
					status = '活动结束';
					break;
				default:
					status = '活动已取消';
					break
			}
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
	isRecommended: { // 活动状态
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
},
{
	id: false,
	toObject: {
		getters: true,
		setters: true

	}
	,
	toJSON: {
		getters: true,
		setters: true
	}
});

EventSchema.virtual('eventId').get(function () {
	return this._id;
});

EventSchema.virtual('eventStatus').get(function () {
	return moment(this.endDate).format('x') > moment().format('x');
});

EventSchema.options.toObject.transform = function (doc, ret) {
	delete ret.__v;
	delete ret._id;
};

EventSchema.virtual('sharedCount').get(function () {
	return (this.sharedUsers && this.sharedUsers.length) || 0;
});

EventSchema.virtual('participantCount').get(function () {
	return this.enrollCount || 0;
});

participantSchema.options.toObject.transform = function (doc, ret) {
	delete ret._id;
	delete ret.sharedUsers;
};

const EventModel = mongoose.model('activity', EventSchema);
export default {EventModel};
