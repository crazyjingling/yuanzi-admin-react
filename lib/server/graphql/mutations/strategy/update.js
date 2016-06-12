import {
	GraphQLString,
	GraphQLNonNull,
	GraphQLInputObjectType
} from 'graphql';
import {getProjection} from 'relax-framework';
import pluck from 'lodash.pluck';
import authorize from '../../authorize';
import parseFields from '../../../../helpers/parse-fields';
import strategyType from '../../types/strategy';
import strategyInputType from '../../types/strategy-input';
import {StrategyModel,RevisionModel} from '../../../models';

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
		const projection = getProjection(options.fieldASTs[0]);
		const strategy = await StrategyModel.findById(params.data._id);
		params.data.owner = params.data.owner._id;
		params.data.cover = params.data.cover.ossUrl;
		params.data.labels = pluck(params.data.labels, '_id');
		params.data.steps = params.data.steps.map((item)=>{
			if(item.description){
				if(!item.imgUrl.ossUrl){
					item.imgUrl = '';
				}else{
					item.imgUrl = item.imgUrl.ossUrl;
				}
			}else{
				item.imgUrl = item.imgUrl.ossUrl;
			}
			return item;
		});
		params.data.scope = parseInt(params.data.scope);
		const strategyChanges = Object.assign({},strategy._doc , {
			...params.data,
			__v: strategy.__v || 0 + 1,
			updatedAt: new Date()
		});
		console.log(strategyChanges);
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
