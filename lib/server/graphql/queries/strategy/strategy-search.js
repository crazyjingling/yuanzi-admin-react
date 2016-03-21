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
		authorize(root);
		const projection = getProjection(options.fieldASTs[0]);
		return StrategyModel.find(searchQuery({}, params)).limit(6).sort({
			createdAt: 'desc'
		}).select(projection).exec();

	}
};
