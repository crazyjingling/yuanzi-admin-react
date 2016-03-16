import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import authorize from '../../authorize';
import materialType from '../../types/material';
import {MaterialModel} from '../../../models';

export default {
  type: materialType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve (root, params, options) {
    authorize(root);

    return MaterialModel
		.findByIdAndRemove(params.data)
      .exec()
      .then((removedMaterial) => {
        if (!removedMaterial) {
          throw new Error('material not found');
        }
        return removedMaterial;
      });
  }
};
