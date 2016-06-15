/**
 * Created by matonghe on 16/6/13.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;
import moment from 'moment';
const bannerSchema = new Schema({
	cover: {
		type: String,
		required: true

	},
	url: {
		type: String,
		required: true
	},
	isRecommended: { // 推荐
		stateType: {
			type: String,
			default: 'undone',
			enum: [
				'done',
				'undone'
			] // 推荐，未被推荐

		},
		recommendAt: {
			type: Date

		}

	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now

	},
	updatedAt: {
		type: Date,
		required: true,
		default: Date.now

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
bannerSchema.options.toObject.transform = function (doc, ret) {
	delete ret.__v;
	delete ret._id;
};
const BannerModel = mongoose.model('banner', bannerSchema);
export default BannerModel;
