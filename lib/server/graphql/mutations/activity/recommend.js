import {
	GraphQLString,
	GraphQLNonNull,
	GraphQLInputObjectType,
	GraphQLRawObjectType
} from 'graphql';
import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import parseFields from '../../../../helpers/parse-fields';
import activityType from '../../types/activity';
import activityInputType from '../../types/activity-input';
import {ActivityModel} from '../../../models';
import RevisionModel from '../../../models/revision';
const recommendActivityInput = new GraphQLInputObjectType({
	name: 'RecommendActivityInput',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		isRecommended: {
			type: new GraphQLInputObjectType({
				name: 'isRecommendedActivityInputType',
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
	type: activityType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(recommendActivityInput)
		}
	},
	async resolve (root, params, options) {
		authorize(root);
		const projection = getProjection(options.fieldASTs[0]);

		const activity = await ActivityModel.findById(params.data._id);

		const activityChanges = Object.assign({}, activity._doc, {
			...params.data,
			__v: activity.__v || 0 + 1,
			updatedAt: new Date()
		});

		const resultActivity = await ActivityModel.findByIdAndUpdate(
			params.data._id,
			activityChanges,
			{upsert: true, new: true}
		).select(projection).exec();

		if (!resultActivity) {
			throw new Error('Error updating activity');
		}
		return resultActivity;

	}
};
