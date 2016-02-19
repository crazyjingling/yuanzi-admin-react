/**
 * Created by matonghe on 15/5/12.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var labelSchema = new Schema({
	title: {
		type: String

	},
	type: {
		type: String,
		enum: [
			'searchKeyword',
			'cardTopicAssortment',
			'userAssortment'
		],
		default: 'searchKeyword'

	},
	assortment: {
		type: String
	},
	display: {
		type: Boolean,
		default: true
	},
	cover: {
		type: String

	},
	color: {
		type: String

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
		getters: true

	},
	toJSON: {
		getters: true

	}

});
labelSchema.virtual('labelId').get(function () {
	return this._id;
});
labelSchema.options.toObject.transform = function (doc, ret) {
	delete ret.__v;
	delete ret._id;

};
var LabelModel = mongoose.model('Label', labelSchema);

export default LabelModel;