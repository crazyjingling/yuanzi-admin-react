/**
 * Created by matonghe on 16/2/15.
 */
import mongoose from 'mongoose';
var	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;
import moment from 'moment';

var OrderSchema = new Schema({
	owner: {
		type: ObjectId,
		ref: 'UserV2'
	},
	orderCode: {//订单编号
		type: String
	},
	event: {//活动
		type: ObjectId,
		ref: 'activity'
	},
	contact: {
		type: ObjectId,
		ref: 'contact'
	},
	orderStatus: {//支付状态 1 已支付 0 未支付 2 过期
		type: Number,
		default: 0,
		get: function (orderStatus) {
			switch (orderStatus) {
				case 1:
					orderStatus = '已支付';
					break;
				case 0:
					orderStatus = '待付款';
					break;
				case 2:
					orderStatus = '已关闭';
					break;
				default:
					orderStatus = '已完成';
			}
			return orderStatus;
		}
	},
	orderCount: {//订购了几张活动票
		type: Number,
		default: 1
	},
	payment: {
		type: Number
	},
	currency: {
		type: String,
		default: 'CNY'
	},
	charge: {	//pingpp回执订单信息
		type: String
	},
	createdAt: {
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

OrderSchema.virtual('orderId').get(function () {
	return this._id;
});
OrderSchema.options.toObject.transform = function (doc, ret) {
	delete ret.__v;
	delete ret._id;
};
var OrderModel = mongoose.model('order', OrderSchema);

export default OrderModel;
