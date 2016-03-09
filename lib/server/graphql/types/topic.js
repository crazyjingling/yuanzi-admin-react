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

const topicType = new GraphQLObjectType({
  name: 'Topic',
  fields: {
      _id: {type: new GraphQLNonNull(GraphQLString)},
      title: {type: GraphQLString},
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
			  name: 'isRecommendedTopicType',
			  fields: {
				  stateType: {
					  type: GraphQLString
				  },
				  recommendAt: {
					  type: GraphQLString
				  }
			  }
		  })},
	  viewUsers: {type: GraphQLString},
	  viewCount: {type: GraphQLInt},
	  sharedUsers: {type: GraphQLString},
	  sharedCount: {type: GraphQLInt},
	  cards: {type: GraphQLString},
	  strategiesCount: {type: GraphQLInt},
	  artificialCount: {type: GraphQLInt},
      updatedAt: {type: GraphQLString},
      createdAt: {type: GraphQLString}

  }
});

export default topicType;
