/**
 * Created by matonghe on 16/5/5.
 */
/**
 * Created by matonghe on 16/2/14.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;
import moment from 'moment';
var ContactSchema = new Schema({
	owner: {
		type: ObjectId,
		ref: 'UserV2'
	},
	name: {
		type: String,
		default: '元子育儿'
	},
	phone: {
		type: String
	},
	isDefault: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	isDel:{
		type: Boolean,
		default: false
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
ContactSchema.virtual('contactId').get(function () {
	return this._id;
});
ContactSchema.options.toObject.transform = function (doc, ret) {
	delete ret.__v;
	delete ret._id;
};
var ContactModel = mongoose.model('contact', ContactSchema);
export default ContactModel;
