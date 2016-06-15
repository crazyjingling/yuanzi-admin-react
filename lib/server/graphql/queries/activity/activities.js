import {
	GraphQLList
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import activityType from '../../types/activity';
import {ActivityModel} from '../../../models';

export default {
	type: new GraphQLList(activityType),
	args: {
		...paginationQueryArgs
	},
	resolve (root, params, options) {
		authorize(root);
		const projection = getProjection(options.fieldASTs[0]);
		console.log(params);
		const defaultQuery = {'isRecommended.stateType': {'$ne': 'rejected'}};
		let searchQueryData = searchQuery({}, params);
		if (searchQueryData['$and']) {
			searchQueryData['$and'].push(defaultQuery);
		} else {
			searchQueryData = defaultQuery;
		}
		const query = ActivityModel.find(searchQueryData);
		paginateQuery(query, params);

		return query.select(projection).exec();
	}
};
