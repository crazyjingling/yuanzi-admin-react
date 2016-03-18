import {
	GraphQLString,
	GraphQLNonNull,
	GraphQLInputObjectType,
	GraphQLRawObjectType
} from 'graphql';
import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import parseFields from '../../../../helpers/parse-fields';
import strategyType from '../../types/strategy';
import {StrategyModel,RevisionModel} from '../../../models';
const recommendStrategyInput = new GraphQLInputObjectType({
	name: 'RecommendStrategyInput',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		isRecommended: {
			type: new GraphQLInputObjectType({
				name: 'isRecommendedStrategyInputType',
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
	type: strategyType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(recommendStrategyInput)
		}
	},
	async resolve (root, params, options) {
		authorize(root);
		const projection = getProjection(options.fieldASTs[0]);

		const strategy = await StrategyModel.findById(params.data._id);
		console.log('=================================recommend params.data', params.data);
		const strategyChanges = Object.assign({}, strategy._doc, {
			...params.data,
			__v: strategy.__v + 1,
			updatedAt: new Date()
		});

		const resultStrategy = await StrategyModel.findByIdAndUpdate(
			params.data._id,
			strategyChanges,
			{upsert: true, new: true}
		).select(projection).exec();

		if (!resultStrategy) {
			throw new Error('Error updating strategy');
		}
		return resultStrategy;

	}
};
