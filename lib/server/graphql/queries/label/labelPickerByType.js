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
	  console.log('label-picker',params);
		  delete params._id;
	      params.display = true;
		  labels = await LabelModel.find(
			  Object.assign(
				  params,
				  {'$and': [{'isRecommended.stateType': {'$ne': 'rejected'}}]}
			  )
		  ).select(projection).exec();
    return labels;
  }
};
