import {
	GraphQLList
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import topicType from '../../types/topic';
import {TopicModel,UserModel} from '../../../models';
import {keys,forEach,indexOf} from 'lodash';

export default {
	type: new GraphQLList(topicType),
	args: {
		...paginationQueryArgs
	},
	async resolve (root, params, options) {
		authorize(root);
		const projection = getProjection(options.fieldASTs[0]);
		let searchQueryData = searchQuery({}, params);
		if (searchQueryData['$and']) {
			for (let i = 0; i < searchQueryData['$and'].length; i++) {
				if (keys(searchQueryData['$and'][i]).indexOf('owner') !== -1) {
					searchQueryData['$and'][i].owner = {'$in': await UserModel.find({nickname: searchQueryData['$and'][i].owner}).exec()};
				}
			}
		}

		const query = TopicModel.find(searchQueryData);
		paginateQuery(query, params);

		return query.select(projection).exec();
	}
};
