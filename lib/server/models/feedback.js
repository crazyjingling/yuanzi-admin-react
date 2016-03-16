/**
 * 意见反馈
 */
import mongoose from 'mongoose';
var Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;

var feedbackSchema = new Schema({

	desc: { // 描述
		type: String,
		default: '',
		required: true

	},
	user: {
		type: ObjectId,
		ref: 'UserV2',
		required: true
	},
	contactInfo: {
		type: String
	},
	deviceInfo: {},
	images: [String],
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

feedbackSchema.virtual('feedbackId').get(function () {
	return this._id;
});
feedbackSchema.virtual('imagesCount').get(function () {
	return (this.images && this.images.length) || 0;
});
feedbackSchema.options.toObject.transform = function (doc, ret) {
	delete ret.__v;
	delete ret._id;
};
var FeedbackModel = mongoose.model('feedback', feedbackSchema);
export default FeedbackModel;
