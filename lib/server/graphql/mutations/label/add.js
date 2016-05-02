import {
  GraphQLNonNull
} from 'graphql';
import Q from 'q';

import authorize from '../../authorize';
import labelType from '../../types/label';
import labelInputType from '../../types/label-input';
import LabelModel from '../../../models/label';

export default {
  type: labelType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(labelInputType)
    }
  },
  resolve (root, params, options) {
    authorize(root);
	  console.log("=======add label============",params);
	  params.data.cover = params.data.cover.ossUrl;
	  const label = new LabelModel(params.data);
    return Q()
        .then(() => label.save())
        .then((newLabel) => {
          if (!newLabel) {
            throw new Error('Page not found');
          }
          return newLabel;
        });
  }
};
