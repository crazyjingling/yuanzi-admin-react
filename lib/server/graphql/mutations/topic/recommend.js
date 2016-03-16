import {
	GraphQLString,
	GraphQLNonNull,
	GraphQLInputObjectType
} from 'graphql';
import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import parseFields from '../../../../helpers/parse-fields';
import topicType from '../../types/topic';
import topicInputType from '../../types/topic-input';
import {TopicModel} from '../../../models';
import RevisionModel from '../../../models/revision';
const recommendTopicInput = new GraphQLInputObjectType({
	name: 'RecommendTopicInput',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		isRecommended: {
			type: new GraphQLInputObjectType({
				name: 'isRecommendedTopicInputType',
				fields: {
					stateType: {
						type: GraphQLString
					},
					recommendAt: {
						type: GraphQLString
					}
				}
			})
		}
	}
});
export default {
	type: topicType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(recommendTopicInput)
		}
	},
	async resolve (root, params, options) {
		authorize(root);
		const projection = getProjection(options.fieldASTs[0]);

		const topic = await TopicModel.findById(params.data._id);

		const topicChanges = Object.assign({}, topic._doc, {
			...params.data,
			__v: topic.__v + 1,
			updatedAt: new Date()
		});

		const resultTopic = await TopicModel.findByIdAndUpdate(
			params.data._id,
			topicChanges,
			{upsert: true, new: true}
		).select(projection).exec();

		if (!resultTopic) {
			throw new Error('Error updating topic');
		}
		return resultTopic;

	}
};
