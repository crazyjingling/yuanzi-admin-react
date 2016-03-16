import {
  GraphQLList,
	GraphQLID,
	GraphQLString
} from 'graphql';

import {getProjection} from 'relax-framework';

import authorize from '../../authorize';
import {paginationQueryArgs, paginateQuery, searchQuery} from '../../query-pagination';
import labelType from '../../types/label';
import {LabelModel} from '../../../models';


export default {
  type: new GraphQLList(labelType),
  args: {
	  _id: {
		  name: '_id',
		  type: GraphQLID
	  },
	  type : {
		  name: 'type',
		  type: GraphQLString
	  }
  },
  async resolve (root, params, options) {
    authorize(root);
    const projection = getProjection(options.fieldASTs[0]);
	  let labels = [];
	  if(params._id){
		  const labelIds = (await LabelModel.findById(params._id).select({labels: 1}).exec()).labels;
		  labels = await LabelModel.find({_id: {'$in': labelIds}}).sort({createdAt: 'desc'}).select(projection).exec();
	  }else{
		  labels = await LabelModel.find(
			  Object.assign(
				  params,
				  {'$and': [{'isRecommended.stateType': {'$ne': 'rejected'}}]}
			  )
		  ).select(projection).exec();

	  }
    return labels;
  }
};
