import Q from 'q';

import authorize from '../../authorize';
import countType from '../../types/count';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import {MaterialModel} from '../../../models';

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
		MaterialModel.count({});
	})
    .then((count) => {
      return {count};
    });
  }
};