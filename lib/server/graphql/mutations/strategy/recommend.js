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
import strategyInputType from '../../types/strategy-input';
import StrategyModel from '../../../models/strategy';
import RevisionModel from '../../../models/revision';
const recommendStrategyInput = new GraphQLInputObjectType({
	name: 'RecommendStrategyInput',
	fields: {
		_id: {type: new GraphQLNonNull(GraphQLString)},
		isRecommended: {
			type: new GraphQLInputObjectType({
				name: 'isRecommendedInputType',
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
		console.log('=================================projection', projection);

		const strategy = await StrategyModel.findById(params.data._id);

		const revision = new RevisionModel({
			_id: {
				_id: strategy._id,
				__v: strategy.__v
			},
			date: strategy.updatedDate,
			user: strategy.updatedBy,
			doc: strategy
		});

		await revision.save();

		const strategyChanges = Object.assign({}, strategy._doc, {
			...params.data,
			__v: strategy.__v + 1,
			updatedAt: new Date()
		});
		console.log('=================================strategyChanges', strategyChanges);

		const resultStrategy = await StrategyModel.findByIdAndUpdate(
			params.data._id,
			strategyChanges,
			{upsert: true, new: true}
		).select(projection).exec();

		if (!resultStrategy) {
			throw new Error('Error updating strategy');
		}
		console.log('=================================resultStrategy', resultStrategy);
		return resultStrategy;

	}
};
