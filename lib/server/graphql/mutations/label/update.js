import {
  GraphQLNonNull
} from 'graphql';
import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import labelInputType from '../../types/label-input';
import labelType from '../../types/label';
import LabelModel from '../../../models/label';
import RevisionModel from '../../../models/revision';

export default {
  type: labelType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(labelInputType)
    }
  },
  async resolve (root, params, options) {
    authorize(root);

    const projection = getProjection(options.fieldASTs[0]);

    const label = await LabelModel.findById(params.data._id);

    const revision = new RevisionModel({
      _id: {
        _id: label._id,
        __v: label.__v
      },
      date: label.updatedDate,
      user: label.updatedBy,
      doc: label
    });

    await revision.save();

    const labelChanges = Object.assign({}, params.data, {
      __v: label.__v + 1,
      updatedAt: new Date()
    });
	  console.log('=================================params', params);
    if (params.data.data && typeof params.data.data === 'string') {
      labelChanges.data = JSON.parse(params.data.data);
    }

    const resultLabel = await LabelModel.findByIdAndUpdate(
      params.data._id,
      labelChanges,
      {upsert: true, new: true}
    ).select(projection).exec();

    if (!resultLabel) {
      throw new Error('Error updating label');
    }
    return resultLabel;
  }
};
