import helps from './helps';
const stategyConfig = {
    activePanelType: 'strategies',
    breadcrumbs: [
        {
            label: 'Strategies'
        }
    ],
    showFields: [
        { key: 'strategyname', name: '妙招标题', type: 'text' },
        { key: 'name', name: '昵称', type: 'text' },
        { key: 'password', name: '密码', type: 'text' },
        { key: 'email', name: '邮箱', type: 'text' },
        { key: 'date', name: '日期', type: 'text' },
    ],
    searchFields: [{
        key: 'email',
        name: 'email',
        label: '邮箱',
        type: 'text',
        value: ''
    }, {
        key: 'name',
        name: 'name',
        options: [
            { value: '0', name: '马慧' },
            { value: '1', name: '马慧1' },
            { value: '2', name: '马慧2', selected: 'selected' },
            { value: '3', name: '马慧3' },
            { value: '4', name: '马慧4' },
        ],
        label: '姓名',
        type: 'select'
    }]

};
stategyConfig.searchValues = helps.generateSearchValues(stategyConfig.searchFields);
export default stategyConfig;