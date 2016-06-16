/**
 * Created by matonghe on 16/6/16.
 */
import helps from './helps';
const articleConfig = {
	activePanelType: 'articles',
	breadcrumbs: [
		{
			label: 'Articles'
		}
	],
	showFields: [
		{key: 'title', name: '标题', type: 'text'},
		{key: 'owner.nickname', name: '作者昵称', type: 'text'},
		{key: 'reportsCount', name: '举报数', type: 'number'},
		{key: 'praisesCount', name: '点赞数', type: 'number'},
		{key: 'collectedCount', name: '收藏数', type: 'number'},
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
		article: {
			_id: 1,
			owner: {
				_id: 1,
				nickname: 1
			},
			title: 1,
			isDel: 1,
			reportsCount: 1,
			praisesCount: 1,
			collectedCount: 1,
			updatedAt: 1,
			createdAt: 1
		}
	}

};
articleConfig.searchValues = helps.generateSearchValues(articleConfig.searchFields);
export default articleConfig;
