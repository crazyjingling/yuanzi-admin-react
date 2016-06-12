import helps from './helps';
import moment from 'moment';
const strategyConfig = {
	activePanelType: 'strategies',
	breadcrumbs: [
		{
			label: '首页'
		},
		{ label: '妙招列表'}
	],
	showFields: [
		{key: 'title', name: '妙招标题', type: 'text'},
		{key: 'cover.ossUrl', name: '封面', type: 'image'},
		{key: 'owner.nickname', name: '作者', type: 'text'},
		{key: 'labels', name: '标签', type: 'tag', fieldsType: 'array.object', showKey: 'title'},
		{key: 'isRecommended.stateType', name: '状态', type: 'text'},
		{key: 'scope', name: '适用年龄段', type: 'scope'},
		{key: 'playCount', name: '浏览量   ', type: 'number'},
		{key: 'sharedCount', name: '分享', type: 'number'},
		{key: 'collectCount', name: '收藏', type: 'number'},
		{key: 'reportRelated.reportCount', name: '举报', type: 'number'},
		{key: 'commentCount', name: '评论数', type: 'number'},
		{key: 'commentReportRelated.commentReportCount', name: '评论举报', type: 'number'},
		{key: 'photoCount', name: '作品数', type: 'number'},
		{key: 'photoReportRelated.photoReportCount', name: '作品举报', type: 'number'},
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
			{value: 'done', name: '已上线'},
			{value: 'undone', name: '未上线'}
		],
		label: '状态',
		type: 'select'
	},{
		key: 'labels',
		name: 'labels',
		label: '标签',
		type: 'labelPicker',
		labelsType: ['classify'],
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
	},{
		key: 'isRecommended.recommendAt',
		name: 'isRecommended.recommendAt',
		label: '上线时间',
		type: 'dateRangePicker',
		value: {'$lte': moment().add(1,'days').format('YYYY-MM-DD HH:mm:ss')},
		options: {
			dateFormat: 'YYYY-MM-DD HH:mm:ss',
			maxDate: moment().add(1,'days')
		}
	}],
	fragments: {
		strategy: {
			_id: 1,
			title: 1,
			cover: {
				_id: 1,
				ossUrl: 1
			},
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
			scope: 1,
			artificialCount: 1,
			artificialdata: {
				artificialtrycount: 1
			},
			playCount: 1,
			sharedCount: 1,
			collectCount: 1,
			reportUsers: {
				user: 1,
				reason: 1
			},
			reportRelated: {
				reportCount: 1,
				reportInfo: 1
			},
			commentCount: 1,
			commentReportRelated: {
				commentReportCount: 1,
				commentReportInfo: 1
			},
			photoCount: 1,
			photoReportRelated: {
				photoReportCount: 1,
				photoReportInfo: 1
			},
			updatedAt: 1,
			createdAt: 1
		}
	}

};
strategyConfig.searchValues = helps.generateSearchValues(strategyConfig.searchFields);
export default strategyConfig;
