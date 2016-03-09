import helps from './helps';
const userConfig = {
	activePanelType: 'users',
	breadcrumbs: [
		{
			label: 'Users'
		}
	],
	showFields: [
		{key: 'account.platform', name: '平台', type: 'text'},
		{key: 'account.username', name: '用户名', type: 'text'},
		{key: 'nickname', name: '昵称', type: 'text'},
		{key: 'avatar', name: '头像', type: 'image.circle'},
		{key: 'gender', name: '性别', type: 'text'},
		{key: 'isDel', name: '状态', type: 'text'},
		{key: 'labels', name: '标签', type: 'text', fieldsType: 'array.object', showKey: 'title'},
		{key: 'fansCount', name: '粉丝数', type: 'number'},
		{key: 'createdAt', name: '注册时间', type: 'text'},
		{
			key: 'talentInfo',
			name: '达人审批',
			type: 'array.button',
			options: [
				{value: 'check', name: '申请资料', action: 'onCheck'}
			]
		},
		{
			key: 'options',
			name: '操作',
			type: 'array.button',
			options: [
				{value: 'isDel', name: '封号', action: 'onDel'},
				{value: 'editLabels', name: '编辑', action: 'onEditLabels'}
			]
		}
	],
	searchFields: [
		{
			key: 'account.platform',
			name: 'account.platform',
			options: [
				{value: 'all', name: '全部', selected: 'selected'},
				{value: 'weibo', name: '微博'},
				{value: 'qq', name: 'QQ'},
				{value: 'weixin', name: '微信'},
				{value: 'mobile', name: '手机'},
				{value: 'local', name: '后台'}
			],
			label: '平台',
			type: 'select'
		},
		{
			key: 'isDel',
			name: 'isDel',
			options: [
				{value: 'all', name: '全部', selected: 'selected'},
				{ value: '0', name: '正常' },
				{ value: '1', name: '不正常' }
			],
			label: '状态',
			type: 'select'
		},
		{
			key: 'labels',
			name: 'labels',
			label: '标签',
			type: 'labelPicker',
			labelsType: ['userAssortment'],
			value: 'all'
		},
		{
			key: 'nickname',
			name: 'nickname',
			label: '昵称',
			type: 'text',
			value: ''
		},
		{
			key: 'account.username',
			name: 'account.username',
			label: '手机号',
			type: 'text',
			value: ''
		}
	],
	fragments: {
		user: {
			_id: 1,
			nickname: 1,
			avatar: 1,
			account: {
				platform: 1,
				username: 1
			},
			labels: {
				_id: 1,
				title: 1
			},
			fans: 1,
			fansCount: 1,
			isDel: 1,
			gender: 1,
			talentStatus: 1,
			talentInfo: {
				name: 1,
				mobile:1,
				wechat: 1,
				goodAt: 1,
				goodAtOther: 1
			},
			createdAt: 1
		}
	}

};
userConfig.searchValues = helps.generateSearchValues(userConfig.searchFields);
export default userConfig;
