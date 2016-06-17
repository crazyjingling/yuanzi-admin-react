/**
 * Created by matonghe on 16/6/14.
 */

import {
	GraphQLList,
	GraphQLID
} from 'graphql';
import Q from 'q';
import {getProjection} from 'relax-framework';
import countType from '../../types/count';
import authorize from '../../authorize';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import circleType from '../../types/circle';
import {CircleModel} from '../../../models';

exports.circles = {
	type: new GraphQLList(circleType),
	args: {
		...paginationQueryArgs
	},
	resolve (root, params, options) {
		authorize(root);
		const projection = getProjection(options.fieldASTs[0]);
		const defaultQuery = { 'isDel': {'$ne': true}};
		let searchQueryData = searchQuery({}, params);
		if (searchQueryData['$and']) {
			searchQueryData['$and'].push(defaultQuery);
		} else {
			searchQueryData = defaultQuery;
		}
		const query = CircleModel.find(searchQueryData);
		paginateQuery(query, params);
		return query.select(projection).exec();
	}
}

exports.circle = {
	type: circleType,
	args: {
		_id: {
			name: '_id',
			type: GraphQLID
		}
	},
	async resolve (root, params, options) {
		authorize(root);
		const projection = getProjection(options.fieldASTs[0]);
		return await CircleModel.findById(params._id).select(projection).exec();
	}
}
exports.circlesCount = {
	type: countType,
	args: {
		...paginationQueryArgs
	},
	resolve (root, params, options) {
		authorize(root);
		const defaultQuery = {};
		let searchQueryData = searchQuery({}, params);
		if (searchQueryData['$and']) {
			searchQueryData['$and'].push(defaultQuery);
		} else {
			searchQueryData = defaultQuery;
		}
		return Q()
			.then(() => CircleModel.count({}))
			.then((count) => {
				return {count};
			});
	}
};
