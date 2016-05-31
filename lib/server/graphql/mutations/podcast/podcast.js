/**
 * Created by matonghe on 16/5/30.
 */
/**
 * Created by matonghe on 16/5/4.
 */
import {
	GraphQLList,
	GraphQLID,
	GraphQLNonNull
} from 'graphql';
import Q from 'q';
import {getProjection} from 'relax-framework';
import authorize from '../../authorize';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import podcastType from '../../types/podcast';
import podcastInputType from '../../types/podcast-input';
import {PodcastModel} from '../../../models';

exports.addPodcast = {
	type: podcastType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(podcastInputType)
		}
	},
	resolve (root, params, options) {
		authorize(root);
		params.data.lecturer = params.data.lecturer._id;
		const podcastr = new PodcastModel(params.data);
		return Q()
			.then(() => podcastr.save())
			.then((newPodcast) => {
				if (!newPodcast) {
					throw new Error('Page not found');
				}
				return newPodcast;
			});
	}
};

exports.updatePodcast = {
	type: podcastType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(podcastInputType)
		}
	},
	resolve (root, params, options) {
		authorize(root);
		params.data.lecturer = params.data.lecturer._id;
		const projection = getProjection(options.fieldASTs[0]);
		return Q()
			.then(()=>PodcastModel.findById(params.data._id))
			.then((podcastr)=>{
				const podcastrChanges = Object.assign({}, podcastr._doc, {
					...params.data,
					__v: podcastr.__v + 1,
					updatedAt: new Date()
				});
				return Q().then(PodcastModel.findByIdAndUpdate(
					params.data._id,
					podcastrChanges,
					{upsert: true, new: true}).select(projection).exec()).then((updatePodcast) => {
					if (!updatePodcast) {
						throw new Error('Page not found');
					}
					return updatePodcast;
				});
			})

	}
};
