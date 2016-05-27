/**
 * Created by matonghe on 16/5/17.
 */
import {
	GraphQLList,
	GraphQLID,
	GraphQLNonNull
} from 'graphql';
import Q from 'q';
import {getProjection} from 'relax-framework';
import authorize from '../../authorize';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import workType from '../../types/work';
import workInputType from '../../types/work-input';
import {WorkModel} from '../../../models';

exports.updateWork = {
	type: workType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(workInputType)
		}
	},
	resolve (root, params, options) {
		authorize(root);
		params.data.owner = params.data.owner._id;
		const projection = getProjection(options.fieldASTs[0]);
		console.log(params,'update');
		params.data.owner = params.data.owner._id;
		params.data.strategy = params.data.strategy._id;
		return Q()
			.then(()=>WorkModel.findById(params.data._id))
			.then((work)=>{
				const workChanges = Object.assign({}, work._doc, {
					...params.data,
					__v: work.__v + 1,
					updatedAt: new Date()
				});
				return Q().then(WorkModel.findByIdAndUpdate(
					params.data._id,
					workChanges,
					{upsert: true, new: true}).select(projection).exec()).then((updateWork) => {
					if (!updateWork) {
						throw new Error('Page not found');
					}
					return updateWork;
				});
			})

	}
};
