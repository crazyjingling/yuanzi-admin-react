import {
	GraphQLList
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import userType from '../../types/user';
import {UserModel} from '../../../models';


export default {
	type: new GraphQLList(userType),
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
		const query = UserModel.find(searchQueryData);
		console.log('=================================params', params);

		paginateQuery(query, params);
		return await query.exec();
	}
};
