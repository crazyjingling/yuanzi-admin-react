import {
  GraphQLNonNull
} from 'graphql';
import Q from 'q';

import authorize from '../../authorize';
import activityType from '../../types/activity';
import activityInputType from '../../types/activity-input';
import {ActivityModel} from '../../../models';
import {getProjection} from 'relax-framework';

exports.addActivity = {
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
	  params.data.cover = params.data.cover.ossUrl;
	  params.data.bannerImg = params.data.bannerImg.ossUrl;
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

exports.updateActivity = {
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
		params.data.cover = params.data.cover.ossUrl;
		params.data.bannerImg = params.data.bannerImg.ossUrl;
		const projection = getProjection(options.fieldASTs[0]);
		return Q()
			.then(()=>ActivityModel.findById(params.data._id))
			.then((activity)=>{
				const activityChanges = Object.assign({}, activity._doc, {
					...params.data,
					__v: activity.__v + 1,
					updatedAt: new Date()
				});
				ActivityModel.findByIdAndUpdate(
					params.data._id,
					activityChanges,
					{upsert: true, new: true}).select(projection).exec()
			})
			.then((newActivity) => {
				if (!newActivity) {
					throw new Error('Page not found');
				}
				return newActivity;
			});
	}
};
