import {
	GraphQLNonNull,
	GraphQLString
} from 'graphql';

import authorize from '../../authorize';
import userType from '../../types/user';
import {UserModel} from '../../../models';

export default {
  type: userType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	resolve (root, params, options) {
		authorize(root);
		return UserModel
			.findByIdAndUpdate(params.data, {'isRecommended.stateType': 'rejected'}, {upsert: true, new: true})
			.exec()
      .then((removedUser) => {
        if (!removedUser) {
          throw new Error('user not found');
				}
        return removedUser;
			});
	}
};
