import {labelConfig} from '../../../../containers/admin/containerInitConfig';
const labelFragments = {
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
};
//labelConfig.showFields.map((showField)=> {
//    if(showField.key.indexOf('.') !== -1){
//        showField.key = showField.key.split('.')[0]
//    }
//    labelFragments.label = Object.assign(labelFragments.label, {[showField.key]:1})
//});
export default labelFragments;
