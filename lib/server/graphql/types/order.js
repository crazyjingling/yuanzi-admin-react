import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
	GraphQLInt,
    GraphQLList,
	GraphQLBoolean
} from 'graphql';
import userType from './user';
import labelType from './label';
import count from './count';
import {UserModel, LabelModel, CommentModel, PhotoModel} from '../../models';
import Utils from '../../../helpers/utils';

const orderType = new GraphQLObjectType({
  name: 'Order',
  fields: {
      _id: {type: new GraphQLNonNull(GraphQLString)},
	  orderCode: {type: GraphQLString},
      cover: {type: GraphQLString},
	  owner: {
		  type: userType,
		  async resolve (schemaEntry, params, options) {
			  return schemaEntry.owner && await UserModel.findById(schemaEntry.owner).exec();
		  }
	  },
	  labels: {
		  type: new GraphQLList(labelType),
		  async resolve (schemaEntry, params, options) {
			  return schemaEntry.labels.length ? (await LabelModel.find({_id: {'$in' : schemaEntry.labels}}).exec()) : [];
		  }
	  },
	  isRecommended: {
		  type: new GraphQLObjectType({
			  name: 'isRecommendedOrderType',
			  fields: {
				  stateType: {
					  type: GraphQLString
				  },
				  recommendAt: {
					  type: GraphQLString
				  }
			  }
		  })},
	  viewUsers: {type: new GraphQLList(GraphQLString)},
	  viewCount: {type: GraphQLInt},
	  sharedUsers: {type: new GraphQLList(GraphQLString)},
	  sharedCount: {type: GraphQLInt},
	  cards: {type: new GraphQLList(GraphQLString)},
	  strategiesCount: {type: GraphQLInt},
	  artificialCount: {type: GraphQLInt},
      updatedAt: {type: GraphQLString},
      createdAt: {type: GraphQLString}

  }
});

export default orderType;
