import {
  GraphQLString
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import labelType from '../../types/label';
import {LabelModel} from '../../../models';

export default {
  type: labelType,
  args: {
    title: {
      name: 'title',
      type: GraphQLString
    }
  },
  resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);
    return LabelModel.findOne(params).select(projection).exec();
  }
};
