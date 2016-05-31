/**
 * Created by matonghe on 16/5/30.
 */
import helps from './helps';
const podcastConfig = {
	activePanelType: 'podcasts',
	breadcrumbs: [
		{
			label: 'Podcasts'
		}
	],
	showFields: [
		{key: 'title', name: '微课标题', type: 'text'},
		{key: 'lecturer.nickname', name: '讲师', type: 'text'},
		{key: 'isRecommended.stateType', name: '状态', type: 'text'},
		{key: 'isRecommended.recommendAt', name: '发布时间', type: 'text'},
		{key: 'isBanner', name: 'banner', type: 'status'},
		{key: 'startDate', name: '直播开始时间', type: 'text'},
		{key: 'sharedCount', name: '分享数', type: 'number'},
		{key: 'commentCount', name: '提问数', type: 'number'},
		{key: 'commentReportRelated.commentReportCount', name: '评论举报', type: 'number'},
		{key: 'enrollCount', name: '报名人数', type: 'number'},
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
		{
			key: 'title',
			name: 'title',
			label: '标题',
			type: 'text',
			value: ''
		}],
	fragments: {
		podcast: {
			_id: 1,
			lecturer: {
				_id: 1,
				nickname: 1
			},
			cover: {
				_id: 1,
				ossUrl: 1
			},
			title: 1,
			price: 1,
			isBanner: 1,
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
			bannerImg: {
				ossUrl: 1,
				_id: 1
			},
			tupian: {
				ossUrl: 1,
				_id: 1
			},
			startDate: 1,
			endDate: 1,
			content: 1,
			sharedCount: 1,
			enrollCount: 1,
			updatedAt: 1,
			createdAt: 1
		}
	}

};
podcastConfig.searchValues = helps.generateSearchValues(podcastConfig.searchFields);
export default podcastConfig;
