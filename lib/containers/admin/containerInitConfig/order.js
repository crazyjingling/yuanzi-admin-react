/**
 * Created by matonghe on 16/5/5.
 */
import helps from './helps';
import moment from 'moment';

const orderConfig = {
	activePanelType: 'orders',
	breadcrumbs: [
		{
			label: 'Orders'
		}
	],
	showFields: [
		{key: 'orderCode', name: '订单编号', type: 'text'},
		{key: 'event._id', name: '商品编号', type: 'text'},
		{key: 'event.title', name: '商品名称', type: 'text'},
		{key: 'event.price', name: '商品价格', type: 'text'},
		{key: 'orderCount', name: '订单数量', type: 'text'},
		{key: 'orderStatus', name: '订单状态', type: 'text'},
		{key: 'createdAt', name: '下单时间', type: 'text'},
		{key: 'owner.nickname', name: '用户名', type: 'text'},
		{key: 'contact.name', name: '联系人', type: 'text'},
		{key: 'contact.phone', name: '联系电话', type: 'text'},
		{key: 'payment', name: '支付金额', type: 'text'},
		{key: 'refundReason', name: '申请理由', type: 'text'},
		{
			key: 'options',
			name: '退款操作',
			type: 'array.button',
			options: [
				{value: 'agreed', name: '通过 ', action: 'passedRefund'},
				{value: 'rejected', name: '拒绝 ', action: 'rejectRefund'}
			]
		}
	],
	searchFields: [
		{
			key: 'orderCode',
			name: 'orderCode',
			label: '订单号',
			type: 'text',
			value: ''
		},{
			key: 'event',
			name: 'eventId',
			label: '商品编号',
			type: 'ObjectId',
			value: ''
		},{
			key: 'createdAt',
			name: 'createdAt',
			label: '订单时间',
			type: 'dateRangePicker',
			value: {'$lte': moment().add(1,'days').format('YYYY-MM-DD HH:mm:ss')},
			options: {
				dateFormat: 'YYYY-MM-DD HH:mm:ss',
				maxDate: moment().add(1,'days')
			}
		},
		{
			key: 'orderStatus',
			name: 'orderStatus',
			options: [
				{value: 'all', name: '全部', selected: 'selected'},
				{ value: '0', name: '待付款' },
				{ value: '1', name: '已支付' },
				{ value: '2', name: '已关闭' },
				{ value: '3', name: '已完成' },
				{ value: '-1', name: '申请退款' },
				{ value: '-2', name: '退款申请未通过' },
				{ value: '-3', name: '通过退款申请' }
			],
			label: '状态',
			type: 'select'
		}],
	fragments: {
		order: {
			_id: 1,
			owner: {
				_id: 1,
				nickname: 1
			},
			contact: {
				_id: 1,
				name: 1,
				phone:1
			},
			event: {
				_id: 1,
				title: 1,
				price:1
			},
			payment: 1,
			orderStatus: 1,
			orderCode: 1,
			orderCount: 1,
			createdAt: 1,
			refundReason: 1
		}
	}

};
orderConfig.searchValues = helps.generateSearchValues(orderConfig.searchFields);
export default orderConfig;
