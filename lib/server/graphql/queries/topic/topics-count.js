import Q from 'q';

import authorize from '../../authorize';
import countType from '../../types/count';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import {TopicModel,UserModel} from '../../../models';

export default {
  type: countType,
  args: {
    ...paginationQueryArgs
  },
	resolve (root, params, options) {
    authorize(root);
    return Q()
    .then(() => {
		const defaultQuery = {'isRecommended.stateType': {'$ne': 'rejected'}};
		let searchQueryData = searchQuery({}, params);
		if (searchQueryData['$and']) {
			searchQueryData['$and'].push(defaultQuery);
		} else {
			searchQueryData = defaultQuery;
		}
		//todo: 查询条件
		//if (searchQueryData['$and']) {
		//	for (let i = 0; i < searchQueryData['$and'].length; i++) {
		//		if (keys(searchQueryData['$and'][i]).indexOf('owner') !== -1) {
		//			searchQueryData['$and'][i].owner = {'$in': await UserModel.find({nickname: searchQueryData['$and'][i].owner}).exec()};
		//		}
		//	}
		//}
		TopicModel.count(searchQueryData);
	})
    .then((count) => {
      return {count};
    });
  }
};
