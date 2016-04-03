import {
  GraphQLNonNull
} from 'graphql';
import Q from 'q';

import authorize from '../../authorize';
import activityType from '../../types/activity';
import activityInputType from '../../types/activity-input';
import {ActivityModel} from '../../../models';

export default {
  type: activityType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(activityInputType)
    }
  },
  resolve (root, params, options) {
    authorize(root);
	params.data.owner = params.data.owner._id;
    const activity = new ActivityModel(params.data);

    return Q()
        .then(() => activity.save())
        .then((newActivity) => {
          if (!newActivity) {
            throw new Error('Page not found');
          }
          return newActivity;
        });
  }
};
