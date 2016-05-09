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
			label: 'comments'
		}
	],
	showFields: [
		{key: 'createdAt', name: '评论时间', type: 'text'},
		{key: 'targetUser.nickname', name: '评论对象', type: 'text'},
		{key: 'commentUser.nickname', name: '评论者', type: 'text'},
		{key: 'praiseCount', name: '点赞数', type: 'text'},
		{key: 'reportCount', name: '举报数', type: 'text'},
		//{
		//	key: 'options',
		//	name: '操作',
		//	type: 'array.button',
		//	options: [
		//		{value: 'rejected', name: '拒绝 ', action: 'rejectRefund'}
		//	]
		//}
	],
	searchFields: [
		{
			//key: 'createdAt',
			//name: 'createdAt',
			//label: '评论时间',
			//type: 'dateRangePicker',
			//value: {'$lte': moment().add(1,'days').format('YYYY-MM-DD HH:mm:ss')},
			//options: {
			//	dateFormat: 'YYYY-MM-DD HH:mm:ss',
			//	maxDate: moment().add(1,'days')
			//}
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
			reportCount: 1,
			praiseCount: 1,
			createdAt: 1,
			isPassed: 1
			//type: 1
		}
	}

};
commentConfig.searchValues = helps.generateSearchValues(commentConfig.searchFields);
export default commentConfig;
