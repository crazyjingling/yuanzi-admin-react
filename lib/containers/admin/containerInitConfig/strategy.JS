import helps from './helps';
const stategyConfig = {
    activePanelType: 'strategies',
    breadcrumbs: [
        {
            label: 'Strategies'
        }
    ],
    showFields: [
        { key: 'title', name: '妙招标题', type: 'text' },
        { key: 'cover', name: '封面', type: 'image' },
        { key: 'owner.nickname', name: '作者', type: 'text' },
        { key: 'labels', name: '标签', type: 'text' },
        { key: 'isRecommended.stateType', name: '状态', type: 'text' },
        { key: 'strategyNo', name: '编号', type: 'text' },
        { key: 'artificialdata.artificialtrycount', name: '随机试过数', type: 'text' },
        { key: 'isRecommended.recommendAt', name: '上线时间', type: 'text' },
        { key: 'playCount', name: '播放数', type: 'text' },
        { key: 'sharedCount', name: '分享', type: 'text' },
        { key: 'collectCount', name: '收藏', type: 'text' },
        { key: 'comments', name: '评论', type: 'text' },
        { key: 'comments.isReported', name: '评论举报', type: 'text' },
        { key: 'photoCount', name: '作品数', type: 'text' },
        { key: 'photoReport', name: '作品举报', type: 'text' },
        { key: 'words', name: '敏感词', type: 'text' },
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
stategyConfig.searchValues = helps.generateSearchValues(stategyConfig.searchFields);
export default stategyConfig;