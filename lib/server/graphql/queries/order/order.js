/**
 * Created by matonghe on 16/5/5.
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
import orderType from '../../types/order';
import {OrderModel} from '../../../models';

exports.orders = {
	type: new GraphQLList(orderType),
	args: {
		...paginationQueryArgs
	},
	resolve (root, params, options) {
		console.log("====orderType====",params);
		authorize(root);
		const projection = getProjection(options.fieldASTs[0]);
		const defaultQuery = {};
		let searchQueryData = searchQuery({}, params);
		if (searchQueryData['$and']) {
			searchQueryData['$and'].push(defaultQuery);
		} else {
			searchQueryData = defaultQuery;
		}
		const query = OrderModel.find(searchQueryData);
		paginateQuery(query, params);

		return query.select(projection).exec();
	}
}

exports.order = {
	type: orderType,
	args: {
		_id: {
			name: '_id',
			type: GraphQLID
		}
	},
	async resolve (root, params, options) {
		authorize(root);
		const projection = getProjection(options.fieldASTs[0]);
		return await OrderModel.findById(params._id).select(projection).exec();
	}
}
exports.ordersCount = {
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
			.then(() => OrderModel.count({}))
			.then((count) => {
				return {count};
			});
	}
};
