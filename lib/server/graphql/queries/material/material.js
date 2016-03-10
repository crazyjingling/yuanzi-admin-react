import {
	GraphQLString,
	GraphQLID
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import materialType from '../../types/material';
import {MaterialModel} from '../../../models';

export default {
	type: materialType,
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
		return await MaterialModel.findById(params._id).select(projection).exec();
	}
};
