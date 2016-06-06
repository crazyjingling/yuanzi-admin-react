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
import {UserModel, StrategyModel, WorkModel, TopicModel} from '../../models';

const commentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
      _id: {type: new GraphQLNonNull(GraphQLString)},
      type: {
	      type: GraphQLString,
	      async resolve (schemaEntry, params, options) {
		      console.log(schemaEntry)
		      if(schemaEntry.strategy) {
			      return '妙招'
		      }else if(schemaEntry.event) {
			      return '活动'
		      }else if(schemaEntry.photo) {
			      return '作品'
		      }else if(schemaEntry.article) {
			      return '帖子'
		      }else if(schemaEntry.podcast){
			      return '微课'
		      }
	      }
      },
      strategy: {
		  type: strategyType,
		  async resolve (schemaEntry, params, options) {
			  return schemaEntry.strategy && await WorkModel.findById(schemaEntry.strategy).exec();
		  }
      },
	  event: {type: activityType,
		  async resolve (schemaEntry, params, options) {
			  return schemaEntry.event && await WorkModel.findById(schemaEntry.event).exec();
		  }
	  },
	  content: {type:GraphQLString},
	  targetUser: {
		  type: userType,
		  async resolve (schemaEntry, params, options) {
			return schemaEntry.targetUser && await UserModel.findById(schemaEntry.targetUser).exec();
		  }
	  },
	  isReported: {
		  type: GraphQLBoolean,
		  async resolve (schemaEntry, params, options) {
			  if(schemaEntry.reportUsers && schemaEntry.reportUsers.length>0) {
				  return true;
			  }else {
				  return false;
			  }
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
