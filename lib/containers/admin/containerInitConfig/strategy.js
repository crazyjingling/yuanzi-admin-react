import helps from './helps';
const strategyConfig = {
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
        { key: 'labels', name: '标签', type: 'text', fieldsType: 'array.object',showKey: 'title' },
        { key: 'isRecommended.stateType', name: '状态', type: 'text' },
        { key: 'strategyNo', name: '编号', type: 'text' },
        { key: 'isRecommended.recommendAt', name: '上线时间', type: 'text' },
        { key: 'playCount', name: '播放', type: 'number' },
        { key: 'sharedCount', name: '分享', type: 'number' },
        { key: 'collectCount', name: '收藏', type: 'number' },
        { key: 'commentCount', name: '评论数', type: 'number' },
        { key: 'commentReportCount', name: '评论举报', type: 'number' },
        { key: 'photoCount', name: '作品数', type: 'number' },
        { key: 'photoReportCount', name: '作品举报', type: 'number' },
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
    }],
	fragments: {
		strategy: {
			_id: 1,
			title: 1,
			cover: 1,
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
			strategyNo: 1,
			artificialCount: 1,
			artificialdata: {
				artificialtrycount: 1
			},
			playCount: 1,
			sharedCount: 1,
			collectCount: 1,
			commentCount: 1,
			commentReportCount: 1,
			photoReportCount: 1,
			photoCount: 1,
			updatedAt: 1,
			createdAt: 1
		}
	}

};
strategyConfig.searchValues = helps.generateSearchValues(strategyConfig.searchFields);
export default strategyConfig;
