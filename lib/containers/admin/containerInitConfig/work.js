/**
 * Created by matonghe on 16/5/16.
 */
import helps from './helps';
import moment from 'moment';
const workConfig = {
	activePanelType: 'works',
	breadcrumbs: [
		{
			label: 'Works'
		}
	],
	showFields: [
		{key: 'strategy._id', name: '妙招编号', type: 'text'},
		{key: 'strategy.title', name: '妙招标题', type: 'text'},
		{key: 'owner.nickname', name: '作者', type: 'text'},
		//{key: 'content', name: '作品', type: 'image'},
		{key: 'praiseCount', name: '点赞', type: 'number'},
		{key: 'sharedCount', name: '分享', type: 'number'},
		{key: 'reportCount', name: '举报数', type: 'number'},
		{
			key: 'isDelStatus',
			name: '操作',
			type: 'array.button',
			options: [
				{value: 'isDelStatus', name: '屏蔽 ', action: 'onEdit'},
			]
		}
	],
	searchFields: [{
		key: 'isDel',
		name: 'isDel',
		options: [
			{value: 'all', name: '全部', selected: 'selected'},
			{ value: 'true', name: '已屏蔽' },
			{ value: 'false', name: '未屏蔽' }
		],
		label: '状态',
		type: 'select'
	},{
		key: 'owner',
		name: 'owner',
		label: '作者',
		type: 'text',
		value: ''
	},{
		key: 'createdAt',
		name: 'createdAt',
		label: '制作时间',
		type: 'dateRangePicker',
		value: {'$lte': moment().add(1,'days').format('YYYY-MM-DD HH:mm:ss')},
		options: {
			dateFormat: 'YYYY-MM-DD HH:mm:ss',
			maxDate: moment().add(1,'days')
		}
	}],
	fragments: {
		work: {
			_id: 1,
			strategy: {
				_id: 1,
				title: 1
			},
			//content: 1,
			owner: {
				_id: 1,
				nickname: 1
			},
			praiseCount: 1,
			sharedCount: 1,
			reportCount: 1,
			isDel: 1,
			createdAt: 1,
			updatedAt:1
		}
	}

};
workConfig.searchValues = helps.generateSearchValues(workConfig.searchFields);
export default workConfig;
