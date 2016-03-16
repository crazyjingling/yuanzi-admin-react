import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import authorize from '../../authorize';
import labelType from '../../types/label';
import LabelModel from '../../../models/label';

export default {
  type: labelType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve (root, params, options) {
    authorize(root);

    return LabelModel
		.findByIdAndUpdate(params.data,{'isRecommended.stateType': 'rejected'},{upsert: true, new: true})
      .exec()
      .then((removedLabel) => {
        if (!removedLabel) {
          throw new Error('label not found');
        }
        return removedLabel;
      });
  }
};
