import {
	GraphQLList
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import materialType from '../../types/material';
import {MaterialModel} from '../../../models';

export default {
	type: new GraphQLList(materialType),
	args: {
		...paginationQueryArgs
	},
	resolve (root, params, options) {
		authorize(root);
		const projection = getProjection(options.fieldASTs[0]);
		const defaultQuery = {'isRecommended.stateType': {'$ne': 'rejected'}};
		let searchQueryData = searchQuery({}, params);
		if (searchQueryData['$and']) {
			searchQueryData['$and'].push(defaultQuery);
		} else {
			searchQueryData = defaultQuery;
		}
		const query = MaterialModel.find(searchQueryData);
		paginateQuery(query, params);

		return query.select(projection).exec();
	}
};
