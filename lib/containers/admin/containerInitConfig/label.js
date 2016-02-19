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
        { key: 'cover', name: '封面', type: 'image' },
        { key: 'display', name: '是否显示', type: 'text' },
        { key: 'color', name: '颜色', type: 'text' },
        { key: 'type', name: '类型', type: 'text' },
        { key: 'searchNum', name: '搜索数', type: 'text' },
        { key: 'updatedAt', name: '更新时间', type: 'text' },
        { key: 'createdAt', name: '创建时间', type: 'text' }
    ],
    searchFields: [{
        key: 'title',
        name: 'title',
        label: '标题',
        type: 'text',
        value: ''
    }]

};
labelConfig.searchValues = helps.generateSearchValues(labelConfig.searchFields);
export default labelConfig;