import {
  GraphQLNonNull
} from 'graphql';
import Q from 'q';

import authorize from '../../authorize';
import materialType from '../../types/material';
import materialInputType from '../../types/material-input';
import {MaterialModel} from '../../../models';

export default {
  type: materialType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(materialInputType)
    }
  },
  resolve (root, params, options) {
    authorize(root);

    const material = new MaterialModel(params.data);

    return Q()
        .then(() => material.save())
        .then((newMaterial) => {
          if (!newMaterial) {
            throw new Error('Page not found');
          }
          return newMaterial;
        });
  }
};
