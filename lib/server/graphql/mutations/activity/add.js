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
	  if(params.data.cover){
		  params.data.cover = params.data.cover.ossUrl;
	  }
	  if(params.data.bannerImg){
		  params.data.bannerImg = params.data.bannerImg.ossUrl;
	  }else{
		  delete params.data.bannerImg;
	  }
	  delete params.data.tupian;
    const activity = new ActivityModel(params.data);
	console.log(params);
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
	async resolve (root, params, options) {
		authorize(root);
		params.data.owner = params.data.owner._id;
		params.data.cover = params.data.cover.ossUrl;
		params.data.tupian = params.data.tupian.ossUrl;
		params.data.bannerImg = params.data.bannerImg.ossUrl;
		const projection = getProjection(options.fieldASTs[0]);
		const activity = await ActivityModel.findById(params.data._id);

		const activityChanges = Object.assign({}, activity._doc, {
			...params.data,
			//__v: activity.__v + 1,
			updatedAt: new Date()
		});
		console.log("activityChanges",activityChanges);
		const resultActivity = await ActivityModel.findByIdAndUpdate(
			params.data._id,
			activityChanges,
			{upsert: true, new: true}).select(projection).exec();
		console.log('=================================update resultActivity', resultActivity);
		if (!resultActivity) {
			throw new Error('Error updating activity');
		}
		return resultActivity;
	}
};
