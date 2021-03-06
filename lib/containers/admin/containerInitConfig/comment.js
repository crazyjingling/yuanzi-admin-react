/**
 * Created by matonghe on 16/5/9.
 */
/**
 * Created by matonghe on 16/5/5.
 */
import helps from './helps';
import moment from 'moment';

const commentConfig = {
	activePanelType: 'comments',
	breadcrumbs: [
		{
			label: 'Comments'
		}
	],
	showFields: [
		{key: 'type', name: '评论类型', type: 'text'},
		{key: 'createdAt', name: '评论时间', type: 'text'},
		{key: 'content', name: '评论内容', type: 'text'},
		{key: 'targetUser.nickname', name: '评论对象', type: 'text'},
		{key: 'commentUser.nickname', name: '评论者', type: 'text'},
		{key: 'praiseCount', name: '点赞数', type: 'text'},
		{key: 'reportCount', name: '举报数', type: 'text'},
		{
			key: 'isPassed',
			name: '操作',
			type: 'array.button',
			options: [
				{value: 'isPassed', name: '屏蔽 ', action: 'removeComment'}
			]
		}
	],
	searchFields: [
		{
			key: 'content',
			name: 'content',
			label: '评论内容',
			type: 'text',
			value: ''
		},
		{
			key: 'type',
			name: 'type',
			options: [
				{value: 'all', name: '全部', selected: 'selected'},
				{ value: 'strategy', name: '妙招' },
				{ value: 'event', name: '活动' },
				{ value: 'article', name: '帖子' }
			],
			label: '评论类型',
			type: 'select'
		},{
			key: 'isPassed',
			name: 'isPassed',
			options: [
				{value: 'all', name: '全部', selected: 'selected'},
				{ value: 'false', name: '已屏蔽' },
				{ value: 'true', name: '未屏蔽' }
			],
			label: '评论状态',
			type: 'select'
		},{
			key: 'createdAt',
			name: 'createdAt',
			label: '评论时间',
			type: 'dateRangePicker',
			value: {'$lte': moment().add(1,'days').format('YYYY-MM-DD HH:mm:ss')},
			options: {
				dateFormat: 'YYYY-MM-DD HH:mm:ss',
				maxDate: moment().add(1,'days')
			}
		}
	],
	fragments: {
		comment: {
			_id: 1,
			targetUser: {
				_id: 1,
				nickname: 1
			},
			commentUser: {
				_id: 1,
				nickname: 1
			},
			content: 1,
			reportCount: 1,
			praiseCount: 1,
			createdAt: 1,
			isPassed: 1,
			isReported: 1,
			type: 1
		}
	}

};
commentConfig.searchValues = helps.generateSearchValues(commentConfig.searchFields);
export default commentConfig;
