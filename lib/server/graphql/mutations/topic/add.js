import {
	GraphQLNonNull
} from 'graphql';
import Q from 'q';

import authorize from '../../authorize';
import topicType from '../../types/topic';
import topicInputType from '../../types/topic-input';
import {TopicModel} from '../../../models';
import pluck from 'lodash.pluck';
export default {
	type: topicType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(topicInputType)
		}
	},
	resolve (root, params, options) {
		authorize(root);
		console.log('=================================params.data', params.data);

		params.data.owner = params.data.owner._id;
		params.data.cover = params.data.cover.ossUrl;
		params.data.labels = pluck(params.data.labels, '_id');
		params.data.strategies = pluck(params.data.strategies,'_id');
		console.log('=================================params.data2', params.data);
		const topic = new TopicModel(params.data);
		return Q()
			.then(() => topic.save())
			.then((newTopic) => {
				if (!newTopic) {
					throw new Error('Topic not found');
				}
				return newTopic;
			});
	}
};
