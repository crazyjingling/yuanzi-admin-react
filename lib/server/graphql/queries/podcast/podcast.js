/**
 * Created by matonghe on 16/5/30.
 */
import {
	GraphQLString,
	GraphQLID
} from 'graphql';

import {getProjection} from 'relax-framework';
import authorize from '../../authorize';
import podcastType from '../../types/podcast';
import {PodcastModel} from '../../../models';

exports.getPodcast = {
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
