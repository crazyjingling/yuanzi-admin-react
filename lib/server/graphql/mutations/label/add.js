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
  //resolve (root, params, options) {
  //  const {labelname, name, email, password} = params.data;
  //  const label = new LabelModel({
  //    labelname,
  //    name,
  //    email
  //  });
  //
  //  return Q()
  //    .then(() => LabelModel.count().exec())
  //    .then((count) => {
  //      if (count > 0) {
  //        authorize(root);
  //      }
  //    })
  //    .then(() => Q.ninvoke(LabelModel, 'register', label, password))
  //    .then(() => {
  //      return label;
  //    });
  //}
  resolve (root, params, options) {
    authorize(root);

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
