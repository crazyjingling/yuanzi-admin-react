import {
	GraphQLList,
	GraphQLObjectType,
	GraphQLString
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import {StrategyModel} from '../../../models';
import strategySearchType from '../../types/strategy-search';

export default {
	type: new GraphQLList(strategySearchType),
	args: {
		...paginationQueryArgs
	},
	resolve (root, params, options) {
		console.log(searchQuery({}, params));
		const defaultQuery = {'isRecommended.stateType': {'$ne': 'rejected'}};
		let searchQueryData = searchQuery({}, params);
		if (searchQueryData['$and']) {
			searchQueryData['$and'].push(defaultQuery);
		} else {
			searchQueryData = defaultQuery;
		}
		authorize(root);
		const projection = getProjection(options.fieldASTs[0]);
		return StrategyModel.find(searchQueryData).limit(8).sort({
			createdAt: 'desc'
		}).select(projection).exec();

	}
};
