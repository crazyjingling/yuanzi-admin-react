/**
 * Created by matonghe on 16/5/30.
 */
import {
	GraphQLString,
	GraphQLID,
	GraphQLList
} from 'graphql';
import Q from 'q';
import {getProjection} from 'relax-framework';
import countType from '../../types/count';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import authorize from '../../authorize';
import podcastType from '../../types/podcast';
import {PodcastModel} from '../../../models';

exports.podcast = {
	type: podcastType,
	args: {
		_id: {
			name: '_id',
			type: GraphQLID
		}
	},
	async resolve (root, params, options) {
		authorize(root);
		const projection = getProjection(options.fieldASTs[0]);
		return await PodcastModel.findById(params._id).select(projection).exec();
	}
};
exports.podcasts = {
	type: new GraphQLList(podcastType),
	args: {
		...paginationQueryArgs
	},
	resolve (root, params, options) {
		authorize(root);
		console.log('podcasts', params);
		const projection = getProjection(options.fieldASTs[0]);
		const defaultQuery = {};
		let searchQueryData = searchQuery({}, params);
		if (searchQueryData['$and']) {
			searchQueryData['$and'].push(defaultQuery);
		} else {
			searchQueryData = defaultQuery;
		}
		const query = PodcastModel.find(searchQueryData);
		paginateQuery(query, params);
		return query.select(projection).exec();
	}
}
exports.podcastsCount = {
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
			.then(() => PodcastModel.count({}))
			.then((count) => {
				return {count};
			});
	}
};
