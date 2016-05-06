import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import authorize from '../../authorize';
import activityType from '../../types/activity';
import {ActivityModel} from '../../../models';

export default {
  type: activityType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve (root, params, options) {
    authorize(root);
    return ActivityModel
		.findByIdAndUpdate(params.data,{'isRecommended.stateType': 'rejected'},{upsert: true, new: true})
      .exec()
      .then((removedActivity) => {
        if (!removedActivity) {
          throw new Error('activity not found');
        }
        return removedActivity;
      });
  }
};
