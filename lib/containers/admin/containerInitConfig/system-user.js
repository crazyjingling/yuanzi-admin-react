import helps from './helps';
const systemUserConfig = {
	activePanelType: 'systemUsers',
	breadcrumbs: [
		{
			label: 'SystemUsers'
		}
	],
	showFields: [
		{key: 'nickname', name: '成员名称', type: 'text'},
		{key: 'account.username', name: '账号', type: 'text'},
		{key: 'position', name: '职位', type: 'text'},
		{key: 'contactInfo', name: '联系方式', type: 'text'},
		{key: 'email', name: '账号', type: 'text'},
		{key: 'role', name: '角色', type: 'text', fieldsType: 'array.object', showKey: 'title'},
		{key: 'isDel', name: '状态', type: 'text'},
		{
			key: 'options',
			name: '操作',
			type: 'array.button',
			options: [
				{value: 'reset', name: '重置密码', action: 'onPasswordReset'},
				{value: 'remove', name: '删除', action: 'onRemove'},
				{value: 'edit', name: '编辑', action: 'onEdit'}
			]
		}
	],
	searchFields: [
		{
			key: 'nickname',
			name: 'nickname',
			label: '成员名称',
			type: 'text',
			value: ''
		},
		// todo: 职位Picker
		{
			key: 'labels',
			name: 'labels',
			label: '成员职位',
			type: 'labelPicker',
			labelsType: ['userAssortment'],
			value: 'all'
		},
		{
			key: 'isDel',
			name: 'isDel',
			options: [
				{value: 'all', name: '全部', selected: 'selected'},
				{ value: '0', name: '正常' },
				{ value: '1', name: '不正常' }
			],
			label: '成员状态',
			type: 'select'
		}
	],
	defaultRequiredSearch: { // 查询必需的条件(有几个条件是在graphql查询的时候添加的,例如: 查询用户列表的时候过滤掉被删除的)
		'account.platform': {
			value: 'local'
		}
	},
	fragments: {
		user: {
			_id: 1,
			nickname: 1,
			account: {
				username: 1
			},
			email: 1,
			position: 1,
			contactInfo: 1,
			role: {
				_id: 1,
				title: 1
			},
			isDel: 1
		}
	}

};
systemUserConfig.searchValues = helps.generateSearchValues(systemUserConfig.searchFields);
export default systemUserConfig;
