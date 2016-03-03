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
	  const label = new LabelModel(params.data);
	var newLabel;
    return Q()
        .then(() => label.save())
		.then((newLabel) => {
			if (!newLabel) {
				throw new Error('label not found');
			}
			if (params.data.ownedType && params.data.ownedType._id) {
				LabelModel.findByIdAndUpdate(params.data.ownedType._id, {
					'$addToSet': {
						labels: newLabel._id
					}
				}).exec();
			}

			console.log('=================================newLabel', newLabel);
			return newLabel;
		});
  }
};
