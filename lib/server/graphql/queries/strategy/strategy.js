import {
	GraphQLString,
	GraphQLID
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import strategyType from '../../types/strategy';
import {StrategyModel} from '../../../models';

export default {
	type: strategyType,
	args: {
		_id: {
			name: '_id',
			type: GraphQLID
		},
	},
	async resolve (root, params, options) {
		authorize(root);
		console.log('=================================projection', projection);
		const projection = getProjection(options.fieldASTs[0]);
		return await StrategyModel.findById(params._id).select(projection).exec();
	}
};
