/**
 * Created by matonghe on 16/5/5.
 */
import helps from './helps';
const orderConfig = {
	activePanelType: 'orders',
	breadcrumbs: [
		{
			label: 'Orders'
		}
	],
	showFields: [
		{key: 'event.title', name: '活动标题', type: 'text'},
		{key: 'owner.nickname', name: '作者', type: 'text'},
		{
			key: 'options',
			name: '操作',
			type: 'array.button',
			options: [
				{value: 'remove', name: '删除 ', action: 'onRemove'},
			]
		}
	],
	searchFields: [
		{
			key: 'title',
			name: 'title',
			label: '标题',
			type: 'text',
			value: ''
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
				title: 1
			},
			payment: 1,
			orderStatus: 1,
			orderCount: 1,
			createdAt: 1
		}
	}

};
orderConfig.searchValues = helps.generateSearchValues(orderConfig.searchFields);
export default orderConfig;
