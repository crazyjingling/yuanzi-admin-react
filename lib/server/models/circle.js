/**
 * Created by matonghe on 15/5/14.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;
import moment from 'moment';
import _ from 'lodash';
var memberSchema = new Schema({
	member: {
		type: ObjectId,
		ref: 'UserV2'
	},
	joinedAt: {
		type: Date,
		default: Date.now
	},
	membership: {
		type: String,
		enum: [
			'pending',
			'member',
			'founder'
		],
		default: 'pending'
	}
});
var circleSchema = new Schema({
	owner: {
		type: ObjectId,
		ref: 'UserV2',
		required: true
	},
	name: {
		type: String

	},
	summary: {
		type: String
	},
	cover: {
		type: String
	},
	articles: {
		type: [
			{
				type: ObjectId,
				ref: 'Article'
			}
		]
	},
	isDel: {
		type: Boolean,
		default: false
	},
	isRecommended: { // 圈子状态
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
	members: {
		type: [memberSchema]
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

memberSchema.options.toJSON = {
	transform: function(doc, ret) {
		delete ret._id;
		delete ret.__v;
		ret.membership = _.indexOf(['pending','member','founder'], ret.membership)
	}
};
circleSchema.options.toJSON = {
	transform: function(doc, ret) {
		ret.circleId = ret._id;
		ret.owner = _.find(ret.members, {membership: 2}).member
		ret.articlesCount =  (ret.articles && ret.articles.length) || 0;
		ret.membersCount = (ret.members && ret.members.length) || 0;

		delete ret._id;
		delete ret.__v;
	}
};
var CircleModel = mongoose.model('circle', circleSchema);
export default  CircleModel;
