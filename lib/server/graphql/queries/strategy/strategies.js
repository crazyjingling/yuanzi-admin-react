import {
	GraphQLList
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import strategyType from '../../types/strategy';
import {StrategyModel,UserModel} from '../../../models';
import {keys,forEach,indexOf} from 'lodash';

export default {
	type: new GraphQLList(strategyType),
	args: {
		...paginationQueryArgs
	},
	async resolve (root, params, options) {
		authorize(root);
		console.log('=================================params', params);

		const projection = getProjection(options.fieldASTs[0]);
		const defaultQuery = {'isRecommended.stateType': {'$ne': 'rejected'}};
		let searchQueryData = searchQuery({}, params);
		if (searchQueryData['$and']) {
			searchQueryData['$and'].push(defaultQuery);
		} else {
			searchQueryData = defaultQuery;
		}
		if (searchQueryData['$and']) {
			for (let i = 0; i < searchQueryData['$and'].length; i++) {
				if (keys(searchQueryData['$and'][i]).indexOf('owner') !== -1) {
					searchQueryData['$and'][i].owner = {'$in': (await UserModel.find({nickname: searchQueryData['$and'][i].owner}).exec())};
				}
			}
		}
		const query = StrategyModel.find(searchQueryData);
		paginateQuery(query, params);

		return query.select(projection).exec();
	}
};
