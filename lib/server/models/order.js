/**
 * Created by matonghe on 16/2/15.
 */
import mongoose from 'mongoose';
var	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId;
import moment from 'moment';
import money from 'money-math'
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
				case 3:
					orderStatus = '已完成';
					break;
				case 4:
					orderStatus = '已退款';
					break;
				default:
					orderStatus = '未申请';
			}
			return orderStatus;
		}
	},
	orderCount: {//订购了几张活动票
		type: Number,
		default: 1
	},
	payment: {
		type: Number,
		get: function (payment) {
			return money.floatToAmount(payment/100);
		}
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
	},
	refund: {//申请退款时间
		refundType: {
			type: String,
			default: 'no',
			enum: [
				'agreed',
				'rejected',
				'no'
			],
			get: function (stateType) {
				switch (stateType) {
					case 'agreed':
						stateType = '已退款';
						break;
					case 'rejected':
						stateType = '忽略';
						break;
					default:
						stateType = '未申请';
				}
				return stateType;
			}
		},
		refundedAt: {//发布时间
			type: Date,
			get: function (date) {
				return this.isRecommended.refundType === '已退款' ? moment(date).format('YYYY-MM-DD HH:mm:ss') : '';
			}

		},
		refundReason:{
			type: String,
			default: ''
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
