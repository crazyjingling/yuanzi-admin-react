import {
	GraphQLNonNull,
	GraphQLString
} from 'graphql';

import authorize from '../../authorize';
import config from '../../../../../config';
import topicType from '../../types/topic';
import {TopicModel} from '../../../models';

export default {
	type: topicType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	resolve (root, params, options) {
		authorize(root);
		return TopicModel
			.findByIdAndUpdate(params.data, {'isRecommended.stateType': 'rejected'}, {upsert: true, new: true})
			.exec()
			.then((removedTopic) => {
				if (!removedTopic) {
					throw new Error('topic not found');
				}
				return removedTopic;
			});
	}
};
