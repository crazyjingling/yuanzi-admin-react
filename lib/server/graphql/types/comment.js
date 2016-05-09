import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
	GraphQLInt,
    GraphQLList,
	GraphQLBoolean
} from 'graphql';
import userType from './user';
import strategyType from './strategy';
import activityType from './activity';
import {UserModel, StrategyModel, PhotoModel, TopicModel} from '../../models';

const commentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
      _id: {type: new GraphQLNonNull(GraphQLString)},
      type: {type: GraphQLString},
      strategy: {
		  type: strategyType,
		  async resolve (schemaEntry, params, options) {
			  return schemaEntry.strategy && await PhotoModel.findById(schemaEntry.strategy).exec();
		  }
      },
	  event: {type: activityType,
		  async resolve (schemaEntry, params, options) {
			  return schemaEntry.event && await PhotoModel.findById(schemaEntry.event).exec();
		  }
	  },
      //photo: {
	 	//  type: photoType,
		//  async resolve (schemaEntry, params, options) {
		//	  return schemaEntry.photo && await PhotoModel.findById(schemaEntry.photo).exec();
      //    }
      //},
	  content: {type:GraphQLString},
	  targetUser: {
		  type: userType,
		  async resolve (schemaEntry, params, options) {
			return schemaEntry.targetUser && await UserModel.findById(schemaEntry.targetUser).exec();
		  }
	  },
	  commentUser: {
      		  type: userType,
      		  async resolve (schemaEntry, params, options) {
      			return schemaEntry.commentUser && await UserModel.findById(schemaEntry.commentUser).exec();
      		  }
      	  },
      imagesCount: {type: GraphQLInt},
      images: {type: new GraphQLList(GraphQLString)},
	  praiseCount: {type: GraphQLInt},
	  reportCount: {type: GraphQLInt},
	  isPassed: {type: GraphQLBoolean},
      createdAt: {type: GraphQLString}

  }
});

export default commentType;
