import {
	GraphQLString,
	GraphQLID
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import topicType from '../../types/topic';
import {TopicModel} from '../../../models';

export default {
	type: topicType,
	args: {
		_id: {
			name: '_id',
			type: GraphQLID
		},
	},
	async resolve (root, params, options) {
		authorize(root);
		const projection = getProjection(options.fieldASTs[0]);
		return await TopicModel.findById(params._id).select(projection).exec();
	}
};
