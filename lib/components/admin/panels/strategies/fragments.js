import {strategyConfig} from '../../../../containers/admin/containerInitConfig';
const strategyFragments = {
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
        isRecommended: 1,
        strategyNo: 1,
        artificialdata: 1,
        playCount: 1,
        sharedCount: 1,
        collectCount: 1,
        comments: 1,
        photoCount: 1,
        photoReport: 1,
        words: 1,
        updatedAt: 1,
        createdAt: 1
    }
};
//strategyConfig.showFields.map((showField)=> {
//    if(showField.key.indexOf('.') !== -1){
//        showField.key = showField.key.split('.')[0]
//    }
//    strategyFragments.strategy = Object.assign(strategyFragments.strategy, {[showField.key]:1})
//});
export default strategyFragments;
