/**
 * Created by matonghe on 15/5/12.
 */
import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
import moment from 'moment';

var labelSchema = new Schema({
	title: {
		type: String,
		require: true,
		unique: true

	},
	type: {
		type: String,
		enum: [
			'searchKeyword',
			'cardTopicAssortment',
			'userAssortment',
			'classify'//大分类
		],
		default: 'searchKeyword'

	},
	cover: {
		type: String

	},
	color: {
		type: String

	},
	labels: {
		type: [
			{
				type: ObjectId,
				ref: 'Label'

			}
		]
	},
	display: {
		type: Boolean,
		default: true
	},
	sortNum: {//排序
		type: Number
	},
	isOnTop: { // 置顶
		type: Boolean,
		default: false

	},
	searchNum: { // 搜索人次
		type: Number,
		default: 0

	},
	isRecommended: { // 推荐
		stateType: {
			type: String,
			default: 'done',
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

	}

}, {
	id: false,
	toObject: {
		getters: true,
		setters: true

	},
	toJSON: {
		getters: true,
		setters: true

	}

});
labelSchema.virtual('labelId').get(function () {
	return this._id;
});
labelSchema.options.toObject.transform = function (doc, ret) {
	delete ret.__v;
	delete ret._id;
	delete ret.updatedAt;
	delete ret.createdAt;
	delete ret.searchNum;
	delete ret.isOnTop;
	delete ret.type;
	delete ret.display;

};
var LabelModel = mongoose.model('Label', labelSchema);

export default LabelModel;
