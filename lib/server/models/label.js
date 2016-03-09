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
