import helps from './helps';
const materialConfig = {
	activePanelType: 'materials',
	breadcrumbs: [
		{
			label: 'Materials'
		}
	],
	showFields: [
		{key: 'title', name: '页面名称', type: 'text'},
		{key: 'url', name: 'url', type: 'text'},
		{key: 'createdAt', name: '上传时间', type: 'text'},
		{
			key: 'options',
			name: '操作',
			type: 'array.button',
			options: [
				{value: 'remove', name: '删除', action: 'onRemove'}
			]
		}
	],
	searchFields: [],
	fragments: {
		material: {
			_id: 1,
			title: 1,
			url: 1,
			createdAt: 1
		}
	}

};
materialConfig.searchValues = helps.generateSearchValues(materialConfig.searchFields);
export default materialConfig;
