import {
	GraphQLString,
	GraphQLNonNull,
	GraphQLInputObjectType
} from 'graphql';
import {getProjection} from 'relax-framework';
import pluck from 'lodash.pluck';
import authorize from '../../authorize';
import parseFields from '../../../../helpers/parse-fields';
import topicType from '../../types/topic';
import topicInputType from '../../types/topic-input';
import {TopicModel,RevisionModel} from '../../../models';

export default {
	type: topicType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(topicInputType)
		}
	},
	async resolve (root, params, options) {
		authorize(root);
		const projection = getProjection(options.fieldASTs[0]);
		console.log('=================================update params.data', params.data);
		params.data.owner = params.data.owner._id;
		params.data.cover = params.data.cover.ossUrl;
		params.data.labels = pluck(params.data.labels, '_id');
		params.data.strategies = pluck(params.data.strategies,'_id');
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
		console.log('=================================update resultTopic', resultTopic);
		if (!resultTopic) {
			throw new Error('Error updating topic');
		}
		return resultTopic;
	}
};
