import {
	GraphQLNonNull
} from 'graphql';
import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import parseFields from '../../../../helpers/parse-fields';
import strategyType from '../../types/strategy';
import strategyInputType from '../../types/strategy-input';
import StrategyModel from '../../../models/strategy';
import RevisionModel from '../../../models/revision';

export default {
	type: strategyType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(strategyInputType)
		}
	},
	async resolve (root, params, options) {
		authorize(root);
		console.log('=================================params-update', params.data);
		const projection = getProjection(options.fieldASTs[0]);

		const strategy = await StrategyModel.findById(params.data.id);

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

		const strategyChanges = Object.assign({}, params.data, {
			__v: strategy.__v + 1,
			updatedAt: new Date()
		});

		const resultStrategy = await StrategyModel.findByIdAndUpdate(
			params.data.id,
			strategyChanges,
			{upsert: true, new: true}
		).select(projection).exec();

		if (!resultStrategy) {
			throw new Error('Error updating strategy');
		}
		return resultStrategy;

	}
};
