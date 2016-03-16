import helps from './helps';
const feedbackConfig = {
	activePanelType: 'feedbacks',
	breadcrumbs: [
		{
			label: 'feedbacks'
		}
	],
	showFields: [
		{key: 'user.nickname', name: '用户名', type: 'text'},
		{key: 'deviceInfo.deviceType', name: '平台', type: 'text'},
		{key: 'deviceInfo.deviceVersion', name: '手机型号', type: 'text'},
		{key: 'deviceInfo.systemVersion', name: '系统版本', type: 'text'},
		{key: 'createdAt', name: '反馈时间', type: 'text'},
		{key: 'desc', name: '反馈内容', type: 'text'},
		{key: 'imagesCount', name: '图片', type: 'number'},
		{key: 'contactInfo', name: '联系方式', type: 'text'}
	],
	searchFields: [{
		key: 'deviceInfo.deviceType',
		name: 'deviceInfo.deviceType',
		options: [
			{value: 'all', name: '全部', selected: 'selected'},
			{value: 'iOS', name: 'iOS'},
			{value: 'android', name: 'Android'}
		],
		label: '平台',
		type: 'select'
	}],
	fragments: {
		feedback: {
			_id: 1,
			user: {
				_id: 1,
				nickname: 1
			},
			deviceInfo: {
				deviceType: 1,
				deviceVersion: 1,
				systemVersion: 1,
			},
			desc: 1,
			images: 1,
			imagesCount: 1,
			contactInfo: 1,
			createdAt: 1
		}
	}

};
feedbackConfig.searchValues = helps.generateSearchValues(feedbackConfig.searchFields);
export default feedbackConfig;
