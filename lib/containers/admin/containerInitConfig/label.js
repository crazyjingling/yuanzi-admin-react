import helps from './helps';
const labelConfig = {
    activePanelType: 'labels',
    breadcrumbs: [
        {
            label: 'Labels'
        }
    ],
    showFields: [
        { key: 'title', name: '标题', type: 'text' },
        { key: 'display', name: '是否显示', type: 'status' },
        { key: 'searchNum', name: '搜索数', type: 'text' },
        { key: 'type', name: '分类', type: 'labelType' },
        {
            key: 'options',
            name: '操作',
            type: 'array.button',
            options: [
                { value: 'remove', name: '删除 ', action: 'onRemove' },
                { value: 'edit', name: '编辑 ', action: 'onEdit' },
            ] }
    ],
    searchFields: [{
        key: 'title',
        name: 'title',
        label: '标题',
        type: 'text',
        value: ''
    }, {
        key: 'type',
        name: 'type',
        options: [
            { value: 'all', name: '全部', selected: 'selected' },
            { value: 'classify', name: '妙招攻略分类' },
            { value: 'userAssortment', name: '用户分类' },
            { value: 'cardTopicAssortment', name: '分类集' }
        ],
        label: '分类',
        type: 'select'
    }, {
        key: 'display',
        name: 'display',
        options: [
            { value: 'all', name: '全部', selected: 'selected' },
            { value: true, name: '显示' },
            { value: false, name: '不显示' }
        ],
        label: '是否显示',
        type: 'select'
    }],
	fragments: {
		label: {
			_id: 1,
			title: 1,
			cover: {
				_id: 1,
				ossUrl: 1
			},
			display: 1,
			color: 1,
			type: 1,
			searchNum: 1,
			updatedAt: 1,
			createdAt: 1
		}
	}

};
labelConfig.searchValues = helps.generateSearchValues(labelConfig.searchFields);
export default labelConfig;
