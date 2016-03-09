import helps from './helps';
const topicConfig = {
	activePanelType: 'topics',
	breadcrumbs: [
		{
			label: 'Topics'
		}
	],
	showFields: [
		{key: 'title', name: '妙招标题', type: 'text'},
		{key: 'cover', name: '封面', type: 'image'},
		{key: 'owner.nickname', name: '作者', type: 'text'},
		{key: 'labels', name: '标签', type: 'text', fieldsType: 'array.object', showKey: 'title'},
		{key: 'isRecommended.stateType', name: '状态', type: 'text'},
		{key: 'viewCount', name: '浏览', type: 'number'},
		{key: 'sharedCount', name: '分享', type: 'number'},
		{key: 'strategiesCount', name: '妙招', type: 'number'},
		{key: 'createdAt', name: '创建时间', type: 'text'},
		{
			key: 'options',
			name: '操作',
			type: 'array.button',
			options: [
				{value: 'preview', name: '预览', action: 'onPreview'},
				{value: 'remove', name: '删除', action: 'onRemove'},
				{value: 'edit', name: '编辑', action: 'onEdit'},
				{value: 'recommend', name: '上线', action: 'onRecommend'}
			]
		}
	],
	searchFields: [{
		key: 'isRecommended.stateType',
		name: 'isRecommended.stateType',
		options: [
			{value: 'all', name: '全部', selected: 'selected'},
			{ value: 'done', name: '已上线' },
			{ value: 'undone', name: '未上线' }
		],
		label: '状态',
		type: 'select'
	},{
		key: 'labels',
		name: 'labels',
		label: '标签',
		type: 'labelPicker',
		labelsType: ['classify','cardTopicAssortment'],
		value: 'all'
	},{
		key: 'owner',
		name: 'owner',
		label: '作者',
		type: 'text',
		value: ''
	},{
		key: 'title',
		name: 'title',
		label: '标题',
		type: 'text',
		value: ''
	}],
	fragments: {
		topic: {
			_id: 1,
			title: 1,
			cover: 1,
			owner: {
				_id: 1,
				nickname: 1
			},
			labels: {
				_id: 1,
				title: 1
			},
			isRecommended: {
				stateType: 1,
				recommendAt: 1
			},
			viewCount: 1,
			sharedCount: 1,
			strategiesCount: 1,
			createdAt: 1
		}
	}

};
topicConfig.searchValues = helps.generateSearchValues(topicConfig.searchFields);
export default topicConfig;
