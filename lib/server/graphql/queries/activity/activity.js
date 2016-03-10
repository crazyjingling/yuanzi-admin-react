import {
	GraphQLString,
	GraphQLID
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import activityType from '../../types/activity';
import {ActivityModel} from '../../../models';

export default {
	type: activityType,
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
		return await ActivityModel.findById(params._id).select(projection).exec();
	}
};
