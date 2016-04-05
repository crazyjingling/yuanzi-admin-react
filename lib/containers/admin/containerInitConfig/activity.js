import helps from './helps';
const activityConfig = {
	activePanelType: 'activities',
	breadcrumbs: [
		{
			label: 'Activities'
		}
	],
	showFields: [
		{key: 'title', name: '妙招标题', type: 'text'},
		{key: 'priceType', name: '作者', type: 'text'},
		{key: 'isRecommended.stateType', name: '状态', type: 'text'},
		{key: 'isRecommended.recommendAt', name: '上线时间', type: 'text'},
		{key: 'startDate', name: '开始时间', type: 'text'},
		{key: 'viewCount', name: '浏览', type: 'number'},
		{key: 'sharedCount', name: '分享', type: 'number'},
		{key: 'commentCount', name: '评论数', type: 'number'},
		{key: 'commentReportRelated.commentReportCount', name: '评论举报', type: 'number'},
		{key: 'number', name: '人数限制', type: 'number'},
		{key: 'participantCount', name: '参加人数', type: 'number'},
		{key: 'updatedAt', name: '更新时间', type: 'text'},
		{key: 'createdAt', name: '创建时间', type: 'text'},
		{
			key: 'options',
			name: '操作',
			type: 'array.button',
			options: [
				{value: 'preview', name: '预览 ', action: 'onPreview'},
				{value: 'remove', name: '删除 ', action: 'onRemove'},
				{value: 'edit', name: '编辑 ', action: 'onEdit'},
				{value: 'recommend', name: '上线', action: 'onRecommend'}
			]
		}
	],
	searchFields: [{
		key: 'isRecommended.stateType',
		name: 'isRecommended.stateType',
		options: [
			{value: 'all', name: '全部', selected: 'selected'},
			{value: 'publish', name: '已上线'},
			{value: 'draft', name: '未上线'}
		],
		label: '状态',
		type: 'select'
	},
		//{
		//	key: 'priceType',
		//	name: 'priceType',
		//	options: [
		//		{value: 'all', name: '全部', selected: 'selected'},
		//		{ value: '收费', name: '收费' },
		//		{ value: '免费', name: '免费' }
		//	],
		//	label: '活动形式',
		//	type: 'select'
		//},
		{
			key: 'title',
			name: 'title',
			label: '标题',
			type: 'text',
			value: ''
		}],
	fragments: {
		activity: {
			_id: 1,
			title: 1,
			price: 1,
			priceType: 1,
			isRecommended: {
				stateType: 1,
				recommendAt: 1
			},
			commentCount: 1,
			commentReportRelated: {
				commentReportCount: 1,
				commentReportInfo: 1
			},
			startDate: 1,
			viewCount: 1,
			sharedUsers: 1,
			sharedCount: 1,
			participants: 1,
			participantCount: 1,
			number: 1,
			updatedAt: 1,
			createdAt: 1
		}
	}

};
activityConfig.searchValues = helps.generateSearchValues(activityConfig.searchFields);
export default activityConfig;
