/*
 * 作品(照片)
 * */
import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
import moment from 'moment';

var materialSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	url: {
		type: String,
		default: ''
	},
	type: {
		type: String,
		default: 'banner',
		enum: [
			'banner'
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

materialSchema.options.toObject.transform = function (doc, ret) {
	delete ret._id;
	delete ret.__v;
};

var MaterialModel = mongoose.model('Material', materialSchema);

export default MaterialModel;
