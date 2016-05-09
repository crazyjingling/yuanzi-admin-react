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
import commentsType from '../../types/comment';
import {CommentModel} from '../../../models';

exports.Comments = {
	type: new GraphQLList(commentsType),
	args: {
		...paginationQueryArgs
	},
	resolve (root, params, options) {
		authorize(root);
		console.log("===params====params=====",params);
		const projection = getProjection(options.fieldASTs[0]);
		const defaultQuery = {};
		let searchQueryData = searchQuery({}, params);
		if (searchQueryData['$and']) {
			searchQueryData['$and'].push(defaultQuery);
		} else {
			searchQueryData = defaultQuery;
		}
		const query = CommentModel.find(searchQueryData);
		paginateQuery(query, params);

		return query.select(projection).exec();
	}
}

exports.comment = {
	type: commentsType,
	args: {
		_id: {
			name: '_id',
			type: GraphQLID
		}
	},
	async resolve (root, params, options) {
		authorize(root);
		const projection = getProjection(options.fieldASTs[0]);
		return await CommentModel.findById(params._id).select(projection).exec();
	}
}
exports.CommentsCount = {
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
			.then(() => CommentModel.count({}))
			.then((count) => {
				return {count};
			});
	}
};
