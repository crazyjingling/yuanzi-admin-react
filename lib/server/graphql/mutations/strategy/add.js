import {
	GraphQLNonNull
} from 'graphql';
import Q from 'q';

import authorize from '../../authorize';
import strategyType from '../../types/strategy';
import strategyInputType from '../../types/strategy-input';
import {StrategyModel} from '../../../models';

import pluck from 'lodash.pluck';
export default {
	type: strategyType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(strategyInputType)
		}
	},
	resolve (root, params, options) {
		authorize(root);
		params.data.owner = params.data.owner._id;
		params.data.cover = params.data.cover.ossUrl;
		params.data.labels = pluck(params.data.labels, '_id');
		params.data.steps = params.data.steps.map((item)=>{
			item.imgUrl = item.imgUrl.ossUrl;
			return item;
		});
		console.log('=================================params.data', params.data);
		const strategy = new StrategyModel(params.data);
		return Q()
			.then((defer) => strategy.save(defer))
			.then((newStrategy) => {
				if (!newStrategy) {
					throw new Error('Strategy not found');
				}
				return newStrategy;
			});
	}
};
