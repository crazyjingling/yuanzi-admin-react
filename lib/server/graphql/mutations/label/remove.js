import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import authorize from '../../authorize';
import config from '../../../../../config';
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

    if (config.demo) {
      throw new Error('Remove label is disabled on the demo');
    }
    return LabelModel
      .findByIdAndRemove(params.data)
      .exec()
      .then((removedLabel) => {
        if (!removedLabel) {
          throw new Error('label not found');
        }
        return removedLabel;
      });
  }
};
