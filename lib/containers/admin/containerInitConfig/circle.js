/**
 * Created by matonghe on 16/6/15.
 */
import helps from './helps';
const circleConfig = {
	activePanelType: 'circles',
	breadcrumbs: [
		{
			label: 'Circles'
		}
	],
	showFields: [
		{key: 'name', name: '标题', type: 'text'},
		{key: 'cover.ossUrl', name: '图片', type: 'image'},
		{key: 'articlesCount', name: '帖子数', type: 'number'},
		{key: 'membersCount', name: '参加人数', type: 'number'},
		{
			key: 'options',
			name: '操作',
			type: 'array.button',
			options: [
				{value: 'remove', name: '删除 ', action: 'onRemove'},
				{value: 'edit', name: '编辑 ', action: 'onEdit'}
			]
		}
	],
	searchFields: [
		{
			key: 'name',
			name: 'name',
			label: '标题',
			type: 'text',
			value: ''
		}],
	fragments: {
		circle: {
			_id: 1,
			owner: {
				_id: 1,
				nickname: 1
			},
			cover: {
				_id: 1,
				ossUrl: 1
			},
			name: 1,
			summary: 1,
			membersCount: 1,
			articlesCount: 1,
			updatedAt: 1,
			createdAt: 1
		}
	}

};
circleConfig.searchValues = helps.generateSearchValues(circleConfig.searchFields);
export default circleConfig;
